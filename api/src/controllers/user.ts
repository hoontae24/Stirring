import { userService } from 'services';
import { Credentials } from 'services/user';

const register: Koa.Middleware = async ctx => {
  try {
    const { request } = ctx;
    const { email, name, password, ...rest } = request.body;
    const credentials: Credentials = {
      email: email && email.trim(),
      name: name && name.trim(),
      password: password && password.trim(),
    };

    const validation = await userService.validate(credentials);
    if (!validation) throw new Error('잘못된 사용자 정보입니다.');

    const user = await userService.register({ ...credentials, ...rest });

    ctx.body = { user };
  } catch (e) {
    return ctx.throw(400, e.message);
  }
};

export default { register };
