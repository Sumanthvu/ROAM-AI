import { Router } from "express";
import {
  loginUser,
  sendOtpForRegistration,
  verifyOtpAndRegister,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

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

export default router;
