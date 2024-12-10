import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import * as orderMiddlewares from "../middlewares/order.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";
import { upload, addFileUrls } from '../libs/imageHandler.js';

const router = Router();


router.post('/:id', upload.array('image'), addFileUrls, userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, orderMiddlewares.createFolder, orderController.createFolder)
router.get('/search/:name', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, orderController.searchFolder)
router.get('/search-first/:name', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, orderController.searchSpecificFolder)
router.get('/download-zip/:id', orderController.downloadArchive)
router.get('/', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, orderController.getFolders)
router.delete('/:id', userMiddlewares.isAuth, userMiddlewares.isAdmin, orderController.deleteFolder)


export default router;