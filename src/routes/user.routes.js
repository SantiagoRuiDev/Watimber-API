import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();


router.post('/', userMiddlewares.isAuth, userMiddlewares.isAdmin, userMiddlewares.createUser, userController.createUser)

router.delete('/:id', userMiddlewares.isAuth, userMiddlewares.isAdmin, userController.deleteUser)

router.get('/', userMiddlewares.isAuth, userController.getUsers);

export default router;