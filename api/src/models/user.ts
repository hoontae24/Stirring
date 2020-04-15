import { Schema, model } from 'mongoose';

import crypto from '@/lib/crypto';
import { modelName } from '@/consts';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      select: false,
      default: null,
    },
    auth_token: {
      alias: 'authToken',
      type: String,
      select: false,
      default: null,
    },
    profile_file_id: {
      alias: 'profileFileId',
      type: Schema.Types.ObjectId,
      default: null,
      ref: 'File',
    },
    interest_tag_ids: {
      alias: 'interestTagIds',
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Tag',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

UserSchema.statics.create = async function createUser(user: User) {
  const hashPassword = crypto.createHash(user.password);
  const newUser = new this({ ...user, password: hashPassword });
  return newUser.save();
};

UserSchema.methods.verifyPassword = async function verifyPassword(
  password: string,
) {
  const user = await this.model(modelName.USER)
    .findById(this.id)
    .select('password');
  return crypto.createHash(password) === user.password;
};

export default model<User>(modelName.USER, UserSchema);
