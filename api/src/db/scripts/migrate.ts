import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { QueryInterface, Transaction } from 'sequelize';
import commandLineArgs, { OptionDefinition } from 'command-line-args';

import { sequelize } from '@/db';
import { DB } from '@/types/db';
import MigrationMeta, { VersionName } from '@/db/MigrationMeta';

const migrationPath = path.resolve(__dirname, '../migrations');
const seederPath = path.resolve(__dirname, 'seeders');

const prompt = inquirer.createPromptModule();

const logging = false;
const DOWN_ALL = Symbol('__down_all_miagraions__');
const UNINITIAL = 'No Migrations';

const main = async ({
  init,
  force,
  current,
  latest,
  up,
  down,
  downAll,
}: Options) => {
  const initialized = await isInitialized();
  if (init) {
    if (!force && initialized) {
      console.log('Already initialized.');
      return;
    }
    await MigrationMeta.sync({ logging, force: true });
    console.log('Migration metas are Initialized.');
    return;
  }
  if (!initialized) {
    console.log(
      'Initialize migration first with: npm run db:migrate --init',
    );
    return;
  }

  const migrations = getAllMigrations();
  const currentVersion = await getCurrentVersion();
  const currentIndex = currentVersion
    ? migrations.indexOf(currentVersion)
    : -1;

  if (current) {
    console.log(
      'Current migration version:',
      currentVersion || (currentIndex === -1 ? UNINITIAL : ''),
    );
    return;
  }

  const targetVersion = latest
    ? migrations[migrations.length - 1]
    : up
    ? migrations[currentIndex + 1]
    : downAll
    ? DOWN_ALL
    : down
    ? currentIndex !== 0
      ? migrations[currentIndex - 1]
      : DOWN_ALL
    : await getTargetVersion(migrations, currentVersion);
  if (!targetVersion) {
    console.log('No Migration version selected.');
    return;
  }
  const targetIndex =
    targetVersion === DOWN_ALL
      ? -1
      : migrations.indexOf(targetVersion);

  if (currentIndex === targetIndex) {
    console.log(
      'Already same to current version:',
      currentVersion || UNINITIAL,
    );
    return;
  }

  const { startIndex, endIndex, acc } = calcIndices(
    currentIndex,
    targetIndex,
  );

  const queryInterface = sequelize.getQueryInterface();
  const transaction = await sequelize.transaction({
    logging,
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  });
  try {
    console.log(
      'Listing to migrate:',
      acc === 1 ? 'Upward' : 'Downward',
    );
    for (let i = startIndex; i !== endIndex; i += acc) {
      console.log(`${i + 1}.`, migrations[i]);
    }
    console.log();
    for (let i = startIndex; i !== endIndex; i += acc) {
      await runMigration(
        queryInterface,
        { transaction, logging },
        migrations[i],
        acc === 1,
      );
    }

    await transaction.commit();
  } catch (e) {
    console.error(e);
    await transaction.rollback();
  }
};

const isInitialized = async () => {
  const query = await sequelize.getQueryInterface();
  const definition = await query
    .describeTable(MigrationMeta.tableName, { logging })
    .catch(() => null);
  return Boolean(definition);
};

const getAllMigrations = () => {
  const dirents = fs.readdirSync(migrationPath, {
    withFileTypes: true,
  });
  return Array.isArray(dirents)
    ? dirents
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name.replace(/.ts$/, ''))
    : [];
};

const getCurrentVersion = async (): Promise<VersionName | null> => {
  const lastVersion = await MigrationMeta.findOne({
    order: [['id', 'desc']],
    logging,
  });
  return lastVersion ? lastVersion.versionName : null;
};

const getTargetVersion = async (
  migrations: string[],
  currentVersion: string | null,
): Promise<VersionName | null> => {
  const suffix = ' (CurrentVersion)';
  const choices = migrations.map((migration) =>
    migration === currentVersion ? migration + suffix : migration,
  );
  const { target }: { target: string } = await prompt({
    type: 'list',
    message: 'Select migration version',
    name: 'target',
    choices,
  });

  return target.replace(suffix, '');
};

const calcIndices = (currentIndex: number, targetIndex: number) => {
  let startIndex: number;
  let endIndex: number;
  let acc: 1 | -1 | 0;
  if (currentIndex === targetIndex) {
    startIndex = currentIndex;
    endIndex = currentIndex;
    acc = 0;
  } else if (currentIndex < targetIndex) {
    startIndex = currentIndex + 1;
    endIndex = targetIndex + 1;
    acc = 1;
  } else {
    startIndex = currentIndex;
    endIndex = targetIndex;
    acc = -1;
  }
  return { startIndex, endIndex, acc };
};

const runMigration = async (
  queryInteface: QueryInterface,
  options: DB.MigrationFunctionOptions,
  filename: string,
  isUpward: boolean,
) => {
  const migration = getMigration(filename);
  if (!filename || !migration) {
    throw new Error('There is no migration: '.concat(filename));
  }
  if (isUpward) {
    const version = await MigrationMeta.findOne({
      where: { versionName: filename },
      ...options,
    });
    if (version) {
      throw new Error(`Already committed migration: ${filename}`);
    }
    const versionCreated = await MigrationMeta.create(
      { versionName: filename },
      { ...options },
    );
    await migration.up(queryInteface, options);
    return versionCreated;
  }
  const version = await MigrationMeta.findOne({
    where: { versionName: filename },
    ...options,
  });
  if (!version) {
    throw new Error(`Already rollbacked migration: ${filename}`);
  }
  await version.destroy(options);
  await migration.down(queryInteface, options);
  return version;
};

const getMigration = (filename: string): DB.Migration | null =>
  // eslint-disable-next-line
  (require(path.resolve(migrationPath, filename)) || {}).default ||
  null;

type Options = ReturnType<typeof getNodeArguments>;
const getNodeArguments = () => {
  let argv = process.argv.slice(2);
  if (!argv.length) {
    if (process.env.npm_config_argv) {
      const npmArgvObj = JSON.parse(process.env.npm_config_argv);
      const npmArgv =
        npmArgvObj &&
        Array.isArray(npmArgvObj.original) &&
        npmArgvObj.original.slice(2);
      if (npmArgv) {
        argv = npmArgv;
      }
    }
  }
  const optionDefinitions: OptionDefinition[] = [
    { name: 'init', type: Boolean, alias: 'i' },
    { name: 'force', type: Boolean, alias: 'f' },
    { name: 'current', type: Boolean, alias: 'c' },
    { name: 'latest', type: Boolean },
    { name: 'up', type: Boolean, alias: 'u' },
    { name: 'down', type: Boolean, alias: 'd' },
    { name: 'down-all', type: Boolean },
  ];
  const options = commandLineArgs(optionDefinitions, { argv });

  if (options['down-all']) {
    options.downAll = true;
  }

  return options;
};

Promise.resolve(getNodeArguments())
  .then(main)
  .catch(console.error)
  .finally(() => sequelize.close());
