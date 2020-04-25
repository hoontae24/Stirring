import jwt from '@/lib/jwt';
import { errors } from '@/consts';
import { SocialDomainKey, socialDomains } from '@/consts/socialDomains';
import { models } from '@/db';

import Service from './Service';

class Auth extends Service {
  private userModel: typeof models.User;
  private accountModel: typeof models.Account;

  public constructor(deps: { models?: typeof models }) {
    super();
    if (!deps.models) throw new Error('No models in service constructor');
    this.accountModel = deps.models.Account;
    this.userModel = deps.models.User;
  }

  public async register(
    email: string,
    password: string,
    socialDomain: SocialDomainKey = socialDomains.LOCAL,
  ) {
    if (!email.trim()) throw errors.USER_REGISTER_EMAIL_EMPTY;
    if (!password.trim()) {
      throw errors.USER_REGISTER_PASSWORD_EMPTY;
    }

    const exists = await this.accountModel.findOne({ where: { email } });
    if (exists) throw errors.USER_REGISTER_EMAIL_DUPLICATED;

    const newAccount = await this.accountModel.create({ email, password });

    return newAccount;
  }

  public async login(email: string, password: string) {
    const account = await this.accountModel.findOne({ where: { email } });
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
