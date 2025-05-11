import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();


router.post('/', userMiddlewares.createUser, userController.createUser)
router.get('/', userMiddlewares.isAuth, userController.getUsers);

export default router;