import { Router } from 'express';
import { UserController } from '../controllers';

import { container } from 'tsyringe';

const router: Router = Router();

const userController = container.resolve(UserController);

router
    .get('/', userController.getUsers)
    .post('/', userController.createUser)
    .get('/match/:userId', userController.matchUser)
    .get(
        '/match/single/:userToMatchId/:currentUserId',
        userController.matchSingleProfile
    )
    .get('/:userId', userController.getUserById)
    .post('/login', userController.loginUser)
    .post('find-rommie', userController.findRoommie);
// router

export { router as userRouter };
