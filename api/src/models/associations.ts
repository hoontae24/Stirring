import Account from './Account';
import Post from './Post';
import Action from './Action';

Post.belongsTo(Account, {
  constraints: false,
  foreignKeyConstraint: false,
  foreignKey: 'authorId',
  as: 'author',
});

Action.belongsTo(Account, {
  constraints: false,
  foreignKeyConstraint: false,
  foreignKey: 'actorId',
  as: 'actor',
});
