import { Router } from "express";
// import {
//   registerUser,
//   verifyOtp,
//   resendOtp,
// } from "../controllers/user.controllers.js";

import  {
  sendOtpForRegistration,
  verifyOtpAndRegister
} from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
     {
      name: "coverImage",
      maxCount: 1,
    }
  ]),
  sendOtpForRegistration
);

router.route("/verify-otp").post(verifyOtpAndRegister);
// router.route("/resend-otp").post(resendOtp);

export default router;
