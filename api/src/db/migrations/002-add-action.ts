import { DataTypes, ModelAttributes } from 'sequelize';

import { Action } from '@/models';
import { DB } from '@/types/db';
import { createTableIfNotExist, dropTableIfExist } from './commons';

const up: DB.MigrationFunction = async (queryInterface, options) => {
  // CREATE TABLE "Action"
  await createTableIfNotExist(
    queryInterface,
    Action.tableName,
    actionAttrs,
    options,
  );
  await queryInterface.addIndex(
    Action.tableName,
    ['actorId'],
    options,
  );
  await queryInterface.addIndex(
    Action.tableName,
    ['targetId', 'targetKind'],
    options,
  );
};

const down: DB.MigrationFunction = async (
  queryInterface,
  options,
) => {
  await dropTableIfExist(queryInterface, Action.tableName, options);
};

export default { up, down };

const actionAttrs: ModelAttributes = {
  type: { type: DataTypes.STRING },
  actorId: { type: DataTypes.STRING },
  targetId: { type: DataTypes.STRING },
  targetKind: { type: DataTypes.STRING },
  data: {
    type: DataTypes.JSONB,
    defaultValue: {},
    allowNull: false,
  },
};
