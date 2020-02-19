import { Document } from 'mongoose';

declare global {
  interface User extends Document {
    name: string;
    email: string;
    password: string;
    authToken?: string;
    profileFileId?: string;
    interestTagIds?: string[];
    deleted?: boolean;

    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    readonly profileFile?: File;
    readonly interestTags?: Tag;

    verifyPassword: (password: string) => Promise<boolean>;
  }
  interface Post extends Document {}
  interface Collection extends Document {}
  interface File extends Document {}
  interface Tag extends Document {}
  interface Action extends Document {}
}
