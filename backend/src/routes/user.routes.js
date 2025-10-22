import { Router } from "express";
import {
  changeCurrentPassword,
  loginUser,
  logOutUser,
  sendOtpForRegistration,
  verifyOtpAndRegister,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  sendOtpForRegistration
);

router.route("/verify-otp").post(verifyOtpAndRegister);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,logOutUser)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

export default router;
