import { Router } from "express";
import * as folderController from "../controllers/folder.controller.js";
import * as folderMiddlewares from "../middlewares/folder.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();


router.post('/', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, folderMiddlewares.createFolder, folderController.createFolder)
router.get('/', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, folderController.getFolders)
router.delete('/:id', userMiddlewares.isAuth, userMiddlewares.isAdmin, folderController.deleteFolder)


export default router;