import { Model, DataTypes } from 'sequelize';

import { sequelize } from '@/db';
import crypto from '@/lib/crypto';
import { commonAttrs } from '@/db/migrations/commons';

class Account extends Model {
  public id!: string;
  public socialDomain?: string;
  public socialToken?: string;
  public email?: string;
  public password?: string;
  public name?: string;
  public profileResourceId?: string;
  public tagNames?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public associations?: {};

  public async verifyPassword(password: string) {
    if (!this.password) {
      await this.reload({ attributes: { include: ['password'] } });
    }
    const matched = this.password === crypto.createHash(password);
    this.set('password', undefined);
    return matched;
  }
}

Account.init(
  {
    id: commonAttrs.id,
    socialDomain: { type: DataTypes.STRING },
    socialToken: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, allowNull: false },
    profileResourceId: { type: DataTypes.STRING },
    tagNames: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    indexes: [{ fields: ['email'] }],
    sequelize,
    paranoid: true,
    freezeTableName: true,
    defaultScope: { attributes: { exclude: ['password'] } },
  },
);

Account.beforeSave((account) => {
  if (account.password) {
    account.set('password', crypto.createHash(account.password));
  }
});

export default Account;
