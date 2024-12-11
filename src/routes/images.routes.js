import { Router } from "express";
import * as imageController from "../controllers/image.controller.js";
import * as imageMiddlewares from "../middlewares/image.middlewares.js";
import * as userMiddlewares from "../middlewares/user.middlewares.js";
import { upload, addFileUrls } from "../libs/imageHandler.js";

const router = Router();

router.post(
  "/:id",
  userMiddlewares.isAuth,
  userMiddlewares.isDriver,
  upload.array("image"),
  addFileUrls,
  imageMiddlewares.createImage,
  imageController.createImage
);
router.get(
  "/find/:id",
  userMiddlewares.isAuth,
  userMiddlewares.isStaffOrManager,
  imageController.getImageById
);
router.get(
  "/:id",
  userMiddlewares.isAuth,
  userMiddlewares.isStaffOrManager,
  imageController.getImage
);
router.delete(
  "/:id",
  userMiddlewares.isAuth,
  userMiddlewares.isStaffOrManager,
  imageController.deleteImage
);

export default router;
