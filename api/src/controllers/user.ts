import { userService } from 'services';
import { Credentials } from 'services/user';
import { errors } from 'consts';

const register: Koa.Middleware = async ctx => {
  const { request } = ctx;
  const { email, name, password, ...rest } = request.body;
  const credentials: Credentials = {
    email: email && email.trim(),
    name: name && name.trim(),
    password: password && password.trim(),
  };

  const validation = await userService.validate(credentials);
  if (!validation) throw errors.USER_REGISTER_DATA_EMPTY;

  const user = await userService.register({ ...credentials, ...rest });

  ctx.body = { user };
};

export default { register };
