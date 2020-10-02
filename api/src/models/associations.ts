import Account from './Account';
import Post from './Post';

Post.belongsTo(Account, {
  constraints: false,
  foreignKeyConstraint: false,
  foreignKey: 'authorId',
  as: 'author',
});

// User.hasMany(Account, { sourceKey: 'userId' });
// Account.belongsTo(User, { foreignKey: 'userId' });
