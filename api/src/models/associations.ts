import Account from './Account';
import User from './User';

// User.hasMany(Account, { sourceKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId' });
