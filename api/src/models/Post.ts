import { Model, DataTypes, BelongsTo } from 'sequelize';

import { sequelize } from '@/db';
import { commonAttrs } from '@/db/migrations/commons';
import { Account, Resource } from '@/models';

class Post extends Model {
  public id!: string;
  public authorId!: string;
  public resourceIds!: string[];
  public tagNames?: string[];
  public readonly resources!: Resource[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public associations?: {
    author?: BelongsTo<Post, Account>;
  };
}

Post.init(
  {
    id: commonAttrs.id,
    authorId: { type: DataTypes.STRING },
    resourceIds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    tagNames: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    indexes: [{ fields: ['authorId'] }, { fields: ['tagNames'] }],
    sequelize,
    paranoid: true,
    freezeTableName: true,
  },
);

export default Post;
