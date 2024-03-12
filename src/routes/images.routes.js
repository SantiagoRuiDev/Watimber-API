import { Router } from "express";
import * as imageController from "../controllers/image.controller.js";
import * as imageMiddlewares from "../middlewares/image.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";
import { uploadImage } from '../libs/imageHandler.js';

const router = Router();


router.post('/:id', uploadImage('image'), userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, imageMiddlewares.createImage, imageController.createImage)
router.get('/search/:name', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, imageController.searchImage)
router.get('/find/:id', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, imageController.getImageById)
router.get('/:id', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, imageController.getImage)
router.delete('/:id', userMiddlewares.isAuth, userMiddlewares.isWorkerOrAdmin, imageController.deleteImage)


export default router;