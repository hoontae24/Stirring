import { Model, ModelAttributes, InitOptions, DataTypes } from 'sequelize';

import { sequelize } from '@/db';

class User extends Model {
  public id!: number;
  public name!: string;
  public tagIds!: number[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

const attributes: ModelAttributes = {
  name: { type: DataTypes.STRING },
  profileFileId: { type: DataTypes.INTEGER },
  tagIds: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
};

const options: InitOptions<User> = {
  sequelize,
  paranoid: true,
  freezeTableName: true,
};

User.init(attributes, options);

export default User;
