//user routes
import { Router } from "express";
import {
  changeCurrentPassword,
  loginUser,
  logOutUser,
  sendOtpForRegistration,
  verifyOtpAndRegister,
  refreshAccessToken,
  updateUserCoverImage,
  forgotPassowrd,
  resetPassword,
  userProfile
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

router.route("/refresh-token").post(refreshAccessToken);

router
  .route("/update-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/forgot-password").post(forgotPassowrd);

router.route("/reset-password").post(resetPassword);


//secured routes

router
  .route("/update-cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/logout").post(verifyJWT, logOutUser);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/profile").get(verifyJWT,userProfile)

export default router;
