import { Router } from 'express';
import { UserController } from '../controllers';

import { container } from 'tsyringe';
import { isLoggedIn } from '../middlewares/auth';

const router: Router = Router();

const userController = container.resolve(UserController);

router
    .get('/', isLoggedIn, userController.getUsers)
    .post('/', userController.createUser)
    .get('/match/', isLoggedIn, userController.matchUser)
    .get(
        '/match/single/:userToMatchId/:currentUserId',
        userController.matchSingleProfile
    )
    .get('/:userId', userController.getUserById)
    .post('/login', userController.loginUser)
    .post('find-rommie', userController.findRoommie);
// router

export { router as userRouter };
