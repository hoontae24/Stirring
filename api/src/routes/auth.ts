import Router from 'koa-router';

import { authController } from '@/controllers';

const router = new Router();

router.post('/login', authController.login);
router.get('/verify', authController.verify);

export default router;
