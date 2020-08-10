import { Model, DataTypes } from 'sequelize';

import { sequelize } from '@/db';
import { commonAttrs } from '@/db/migrations/commons';

class Resource extends Model {
  public id!: string;
  public filename!: string;
  public originalname!: string;
  public size!: number;
  public mimetype!: string;
  public extension!: string;
  public meta!: Partial<{
    width: number;
    height: number;
  }>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public associations?: {};
}

Resource.init(
  {
    id: commonAttrs.id,
    filename: { type: DataTypes.STRING, allowNull: false },
    originalname: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.INTEGER },
    mimetype: { type: DataTypes.STRING },
    extension: { type: DataTypes.STRING },
    meta: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    paranoid: true,
    freezeTableName: true,
  },
);

export default Resource;
