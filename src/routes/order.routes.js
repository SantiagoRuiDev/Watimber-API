import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import * as orderMiddlewares from "../middlewares/order.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";
import * as organizationMiddlewares from "../middlewares/organization.middlewares.js";
import { upload, addFileUrls } from '../libs/imageHandler.js';

const router = Router();


router.post('/:id/:organization', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationMember, upload.array('image'), addFileUrls, orderMiddlewares.createFolder, orderController.createFolder)
router.get('/search/:name/:organization', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationMember, orderController.searchFolder)
router.get('/search-first/:name/:organization', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationMember, orderController.searchSpecificFolder)
router.get('/download-zip/:id', userMiddlewares.isAuth, orderController.downloadArchive)
router.get('/:organization', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationMember, orderController.getFolders)
router.delete('/:id/:organization', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationAdmin, orderController.deleteFolder)


export default router;