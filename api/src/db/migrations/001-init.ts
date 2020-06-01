import {
  QueryInterface,
  DataTypes,
  ModelAttributes,
} from 'sequelize';

import { DB } from '@/types/db';
import { Account, User } from '@/models';
import {
  commonAttrs,
  createTableIfNotExist,
  dropTableIfExist,
} from './commons';

const up = async (
  queryInterface: QueryInterface,
  options?: DB.MigrationFunctionOptions,
) => {
  await createTableIfNotExist(
    queryInterface,
    User.tableName,
    userAttributes,
    options,
  );
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
  await dropTableIfExist(queryInterface, User.tableName, options);
};

export default { up, down };

const accountAttributes: ModelAttributes = {
  ...commonAttrs,
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
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },
};

const userAttributes: ModelAttributes = {
  ...commonAttrs,
  name: {
    type: DataTypes.STRING,
  },
  profileResourceId: {
    type: DataTypes.INTEGER,
  },
  tagNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  tags: {
    type: DataTypes.JSON,
  },
};
