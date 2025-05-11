import { Router } from "express";
import * as organizationController from "../controllers/organization.controller.js";
import * as organizationMiddlewares from "../middlewares/organization.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";

const router = Router();


router.get('/:id', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationMember, organizationController.getOrganizationByIdentifier);
router.get('/', userMiddlewares.isAuth, organizationController.getOrganizations);
router.post('/', userMiddlewares.isAuth, organizationController.createOrganization);
router.put('/set-member', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationAdmin, organizationController.setOrganizationMember);
router.delete('/remove-member', userMiddlewares.isAuth, organizationMiddlewares.isOrganizationAdmin, organizationController.setOrganizationMember);


export default router;