import jwt from '@/lib/jwt';
import { errors } from '@/consts';
import {
  SocialDomainKey,
  socialDomains,
} from '@/consts/socialDomains';
import * as models from '@/models';

import Service from './Service';

class Auth extends Service {
  private accountModel: typeof models.Account;
  private userModel: typeof models.User;

  public constructor(deps: { models?: typeof models }) {
    super();
    if (!deps.models || !deps.models.Account || !deps.models.User) {
      throw new Error(
        'No models injected on auth service constructor',
      );
    }
    this.accountModel = deps.models.Account;
    this.userModel = deps.models.User;
  }

  public async register(
    email: string,
    password: string,
    socialDomain: SocialDomainKey = socialDomains.LOCAL,
  ) {
    if (!email.trim()) throw errors.AUTH_REGISTER_EMAIL_EMPTY;
    if (!password.trim()) {
      throw errors.AUTH_REGISTER_PASSWORD_EMPTY;
    }

    const exists = await this.accountModel.findOne({
      where: { email },
    });
    if (exists) throw errors.AUTH_REGISTER_EMAIL_DUPLICATED;

    const newAccount = await this.accountModel.create({
      email,
      password,
      socialDomain,
    });

    return newAccount;
  }

  public async login(email: string = '', password: string = '') {
    const account = await this.accountModel.findOne({
      where: { email },
    });
    if (!account) throw errors.AUTH_LOGIN_EMAIL_UNREGISTERED;

    const verified = await account.verifyPassword(password);
    if (!verified) throw errors.AUTH_LOGIN_PASSWORD_UNMATCHED;

    const token = jwt.sign({ id: account.id, email: account.email });

    return { user: account, token };
  }

  public verifyToken = async (token: string) => {
    const decoded = jwt.verify(token);
    if (decoded) {
      const { id } = decoded;
      const account = await this.accountModel.findByPk(id);
      return { account, decoded };
    }
    return { account: null, decoded: null };
  };
}

export default Auth;
