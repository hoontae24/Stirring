import {
  QueryInterface,
  DataTypes,
  ModelAttributes,
} from 'sequelize';

import { DB } from '@/types/db';
import { Account } from '@/models';
import { createTableIfNotExist, dropTableIfExist } from './commons';

const up = async (
  queryInterface: QueryInterface,
  options?: DB.MigrationFunctionOptions,
) => {
  await createTableIfNotExist(
    queryInterface,
    Account.tableName,
    accountAttributes,
    options,
  );
};

const down = async (
  queryInterface: QueryInterface,
  options?: DB.MigrationFunctionOptions,
) => {
  await dropTableIfExist(queryInterface, Account.tableName, options);
};

export default { up, down };

const accountAttributes: ModelAttributes = {
  socialDomain: {
    type: DataTypes.STRING,
  },
  socialToken: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  profileResourceId: {
    type: DataTypes.STRING,
  },
  tagNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
};
