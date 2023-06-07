import { Router } from 'express';
import { UserController } from '../controllers';

import { container } from 'tsyringe';
import { isLoggedIn } from '../middlewares/auth';
import multer from 'multer';
// import storage from '../services/image.service';

const router: Router = Router();

const userController = container.resolve(UserController);
const uploadOptions = multer({ storage: multer.memoryStorage() });

router
    .get('/', isLoggedIn, userController.getUsers)
    .post('/signup', userController.createUser)
    .get('/match/', isLoggedIn, userController.matchUser)
    .get(
        '/match/single/:userToMatchId/:currentUserId',
        userController.matchSingleProfile
    )
    .get('/:userId', userController.getUserById)
    .post('/login', userController.loginUser)
    .post('find-rommie', userController.findRoommie)
    .put('/update/', isLoggedIn, userController.updateProfile)
    .get('/find/whoami', isLoggedIn, userController.getWhoIam)
    .post(
        '/upload/',
        isLoggedIn,
        uploadOptions.single('file'),
        userController.uploadFile
    );
// router

export { router as userRouter };
