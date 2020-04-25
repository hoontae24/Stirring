import Account from './Account';
import User from './User';

User.hasOne(Account, { constraints: false });
