import Router from 'koa-router';

import { userController } from 'controllers';

const router = new Router();

router.post('/', userController.register);

export default router;
