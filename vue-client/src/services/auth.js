import Service from './service';

const path = `/auth`;

class AuthService extends Service {
  constructor() {
    super(path);
  }

  register(account) {
    const path = `${this.path}/register`;
    return this.base(path, Service.methods.POST, account);
  }

  login(email, password) {
    const path = `${this.path}/login`;
    return this.base(path, Service.methods.POST, { email, password });
  }

  verify() {
    const path = this.path.concat('/verify');
    return this.base(path, Service.methods.GET);
  }
}

export default new AuthService();
