import { Router } from "express";
import {
  registerUser,
  verifyOtp,
  resendOtp,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middle.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/verify-otp").post(verifyOtp);
router.route("/resend-otp").post(resendOtp);

export default router;
