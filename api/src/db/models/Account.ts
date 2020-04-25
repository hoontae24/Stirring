import { Model, DataTypes } from 'sequelize';

import crypto from '@/lib/crypto';

import { sequelize } from '..';

class Account extends Model {
  public id!: number;
  public userId!: number;
  public socialDomain?: string;
  public socialToken?: string;
  public email?: string;
  public password?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public async verifyPassword(pw: string) {
    const password = crypto.createHash(pw);
    return password === this.password;
  }
}

Account.init(
  {
    // userId: { type: DataTypes.INTEGER }, generated with association
    socialDomain: { type: DataTypes.STRING },
    socialToken: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
  },
  {
    indexes: [{ fields: ['id'] }, { fields: ['email'] }],
    sequelize,
    paranoid: true,
    freezeTableName: true,
  },
);

Account.beforeSave(account => {
  if (account.password) {
    account.set('password', crypto.createHash(account.password));
  }
});

export default Account;
