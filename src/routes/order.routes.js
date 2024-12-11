import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import * as orderMiddlewares from "../middlewares/order.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";
import { upload, addFileUrls } from '../libs/imageHandler.js';

const router = Router();


router.post('/:id', userMiddlewares.isAuth, userMiddlewares.isDriver, upload.array('image'), addFileUrls, orderMiddlewares.createFolder, orderController.createFolder)
router.get('/search/:name', userMiddlewares.isAuth, userMiddlewares.isStaffOrManager, orderController.searchFolder)
router.get('/search-first/:name', userMiddlewares.isAuth, userMiddlewares.isStaffOrManager, orderController.searchSpecificFolder)
router.get('/download-zip/:id', userMiddlewares.isAuth, userMiddlewares.isStaffOrManager, orderController.downloadArchive)
router.get('/', userMiddlewares.isAuth, userMiddlewares.isStaffOrManager, orderController.getFolders)
router.delete('/:id', userMiddlewares.isAuth, userMiddlewares.isAdmin, orderController.deleteFolder)


export default router;