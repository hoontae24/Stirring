import { Schema, model, Document } from 'mongoose';
import crypto from 'lib/crypto';

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
      required: true,
      trim: true,
      select: false,
    },
    auth_token: {
      type: String,
      select: false,
      alias: 'authToken',
    },
    profile_file_id: {
      type: String,
      default: null,
      alias: 'profileFileId',
    },
    interest_tag_ids: {
      type: [String],
      default: [],
      alias: 'interestTagIds',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.statics.create = async function createUser(user: Model.User) {
  if (!user.password) throw new Error('비밀번호가 입력되지 않았습니다.');
  const hashPassword = crypto.createHash(user.password || '');
  const newUser = new this({ ...user, password: hashPassword });
  delete newUser.password;
  return newUser.save();
};

UserSchema.methods.verifyPassword = async function verifyPassword(
  password: string,
) {
  return crypto.createHash(password) === this.password;
};

export default model<Document & Model.User>('User', UserSchema);
