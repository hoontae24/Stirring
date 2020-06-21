import {
  QueryInterface,
  DataTypes,
  ModelAttributes,
} from 'sequelize';

import { DB } from '@/types/db';
import { Account, Post } from '@/models';
import { createTableIfNotExist, dropTableIfExist } from './commons';

const up = async (
  queryInterface: QueryInterface,
  options?: DB.MigrationFunctionOptions,
) => {
  // CREATE TABLE "Account"
  await createTableIfNotExist(
    queryInterface,
    Account.tableName,
    accountAttrs,
    options,
  );
  await queryInterface.addIndex(Account.tableName, ['id'], options);
  await queryInterface.addIndex(Account.tableName, ['email'], options);

  // CREATE TABLE "Post"
  await createTableIfNotExist(
    queryInterface,
    Post.tableName,
    postAttrs,
    options,
  );
  await queryInterface.addIndex(Post.tableName, ['id'], options);
  await queryInterface.addIndex(Post.tableName, ['authorId'], options);
  await queryInterface.addIndex(Post.tableName, ['tagNames'], options);
};

const down = async (
  queryInterface: QueryInterface,
  options?: DB.MigrationFunctionOptions,
) => {
  await dropTableIfExist(queryInterface, Post.tableName, options);
  await queryInterface.removeIndex(Post.tableName, ['id'], options);
  await queryInterface.removeIndex(Post.tableName, ['authorId'], options);
  await queryInterface.removeIndex(Post.tableName, ['tagNames'], options);

  await dropTableIfExist(queryInterface, Account.tableName, options);
  await queryInterface.removeIndex(Account.tableName, ['id'], options);
};

export default { up, down };

const accountAttrs: ModelAttributes = {
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
    allowNull: false,
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

const postAttrs: ModelAttributes = {
  authorId: { type: DataTypes.STRING },
  resourceIds: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  tagNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
};
