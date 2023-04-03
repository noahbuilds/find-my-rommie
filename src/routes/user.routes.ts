import { Router } from "express";
import { userController } from "../controllers";

const router: Router = Router();

router.get("/", userController.getUsers);

export { router as userRouter };
