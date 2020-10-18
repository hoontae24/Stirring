import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '@/db';
import { commonAttrs } from '@/db/migrations/commons';
import { Account } from '@/models';
import { ActionType } from '@/consts/action';

class Action extends Model {
  public id!: string;
  public type!: ActionType;
  public actorId!: string;
  public targetId!: string;
  public targetKind!: string;
  public data!: {};

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public associations?: {
    actor?: BelongsTo<Action, Account>;
  };
}

Action.init(
  {
    id: commonAttrs.id,
    type: { type: DataTypes.STRING, allowNull: false },
    actorId: { type: DataTypes.STRING },
    targetId: { type: DataTypes.STRING },
    targetKind: { type: DataTypes.STRING },
    data: {
      type: DataTypes.JSONB,
      defaultValue: {},
      allowNull: false,
    },
  },
  {
    indexes: [
      { fields: ['actorId'] },
      { fields: ['targetId', 'targetKind'] },
    ],
    sequelize,
    paranoid: true,
    freezeTableName: true,
  },
);

export default Action;
