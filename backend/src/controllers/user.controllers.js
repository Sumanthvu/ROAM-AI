import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import transporter from "../config/nodemailer.js";
import { sendEmail } from "../config/sendMail.js";

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password || [userName, email, password].some(field => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }


   let user = await User.findOne({ email });

  if (user && user.isEmailVerified) {
    throw new ApiError(409, "User with this email already exists");
  }

  if (!user) {
    user = new User({ userName, email });
  }

//   console.log(req.files);

  let profilePictureUrl = "";
  if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
    const avatarLocalPath = req.files.avatar[0].path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
      throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }
    profilePictureUrl = avatar.url;
  }

  const otp = generateOtp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.userName = userName;
  user.password = password; 
  if (profilePictureUrl) {
      user.profilePicture = profilePictureUrl;
  }
  user.emailVerificationOtp = otp;
  user.emailVerificationOtpExpires = otpExpires;
  user.isEmailVerified = false; 

  await user.save();

  const emailSubject = "Verify Your Email Address";
  const emailMessage = `<p>Your OTP for email verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

  try {
    await sendEmail(email, emailSubject, emailMessage);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { userId: user._id },
          "OTP sent to your email. Please verify."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to send verification email. Please try registering again."
    );
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Email and otp are required");
  }

  const user = await User.findOne({
    email,
    emailVerificationOtp: otp,
    emailVerificationOtpExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  user.isEmailVerified = true;
  user.emailVerificationOtp = undefined;
  user.emailVerificationOtpExpires = undefined;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {verified:true}, "User mail id verified succcessfully"));
});

const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isEmailVerified) {
    throw new ApiError(401, "Email is already verified");
  }

  const otp = generateOtp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.emailVerificationOtp = otp;
  user.emailVerificationOtpExpires = otpExpires;

  await user.save();

  const emailSubject = "Resend: Verify your email address";
  const emailMessage = `<p>Your new OTP for email verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

  try {
    await sendEmail(email, emailSubject, emailMessage);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "A new OTP has been sent to your email."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to resend verification email.Please try again later"
    );
  }
});

export { registerUser, verifyOtp, resendOtp };
