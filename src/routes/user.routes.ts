import { Router } from 'express';
import { UserController } from '../controllers';

import { container } from 'tsyringe';

const router: Router = Router();

const userController = container.resolve(UserController);

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/match/:userId', userController.matchUser);

export { router as userRouter };
