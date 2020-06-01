import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@/db';

export type VersionName = string;

class MigrationMeta extends Model {
  public id!: number;
  public versionName!: VersionName;
  public readonly createdAt!: Date;
}

MigrationMeta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    versionName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
  },
);

export default MigrationMeta;
