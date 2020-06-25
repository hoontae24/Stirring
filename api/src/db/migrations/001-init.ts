import {
  QueryInterface,
  DataTypes,
  ModelAttributes,
} from 'sequelize';

import { DB } from '@/types/db';
import { Account, Post, Resource } from '@/models';
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
  await queryInterface.addIndex(
    Account.tableName,
    ['email'],
    options,
  );

  // CREATE TABLE "Post"
  await createTableIfNotExist(
    queryInterface,
    Post.tableName,
    postAttrs,
    options,
  );
  await queryInterface.addIndex(
    Post.tableName,
    ['authorId'],
    options,
  );
  await queryInterface.addIndex(
    Post.tableName,
    ['tagNames'],
    options,
  );

  // CREATE TABLE "Resource"
  await createTableIfNotExist(
    queryInterface,
    Resource.tableName,
    resourceAttrs,
    options,
  );
};

const down = async (
  queryInterface: QueryInterface,
  options?: DB.MigrationFunctionOptions,
) => {
  await dropTableIfExist(queryInterface, Resource.tableName, options);
  await dropTableIfExist(queryInterface, Post.tableName, options);
  await dropTableIfExist(queryInterface, Account.tableName, options);
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

const resourceAttrs: ModelAttributes = {
  filename: { type: DataTypes.STRING, allowNull: false },
  originalname: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.INTEGER },
  mimetype: { type: DataTypes.STRING },
  extension: { type: DataTypes.STRING },
  meta: { type: DataTypes.JSONB, defaultValue: {} },
};
