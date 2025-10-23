import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import transporter from "../config/nodemailer.js";
import { sendEmail } from "../config/sendMail.js";
import bcrypt from "bcrypt";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// const registerUser = asyncHandler(async (req, res) => {
//   const { userName, email, password } = req.body;

//   if (
//     !userName ||
//     !email ||
//     !password ||
//     [userName, email, password].some((field) => field.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   let user = await User.findOne({ $or: [{ userName }, { email }] });

//   if (user && user.isEmailVerified) {
//     throw new ApiError(409, "User with this email already exists");
//   }

//   if (!user) {
//     user = new User({ userName, email });
//   }

//   //   console.log(req.files);

//   let profilePictureUrl = "";
//   if (
//     req.files &&
//     Array.isArray(req.files.avatar) &&
//     req.files.avatar.length > 0
//   ) {
//     const avatarLocalPath = req.files.avatar[0].path;
//     const avatar = await uploadOnCloudinary(avatarLocalPath);
//     if (!avatar || !avatar.url) {
//       throw new ApiError(500, "Failed to upload avatar to Cloudinary");
//     }
//     profilePictureUrl = avatar.url;
//   }

//   const otp = generateOtp();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   user.userName = userName;
//   user.password = password;
//   if (profilePictureUrl) {
//     user.profilePicture = profilePictureUrl;
//   }
//   user.emailVerificationOtp = otp;
//   user.emailVerificationOtpExpires = otpExpires;
//   user.isEmailVerified = false;

//   await user.save();

//   const emailSubject = "Verify Your Email Address";
//   const emailMessage = `<p>Your OTP for email verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

//   try {
//     await sendEmail(email, emailSubject, emailMessage);
//     return res
//       .status(201)
//       .json(
//         new ApiResponse(
//           201,
//           { userId: user._id },
//           "OTP sent to your email. Please verify."
//         )
//       );
//   } catch (error) {
//     // await User.findByIdAndDelete(user._id)
//     throw new ApiError(
//       500,
//       "Failed to send verification email. Please try registering again."
//     );
//   }
// });

// const verifyOtp = asyncHandler(async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     throw new ApiError(400, "Email and otp are required");
//   }

//   const user = await User.findOne({
//     email,
//     emailVerificationOtp: otp,
//     emailVerificationOtpExpires: {
//       $gt: Date.now(),
//     },
//   });

//   if (!user) {
//     throw new ApiError(400, "Invalid credentials");
//   }

//   user.isEmailVerified = true;
//   user.emailVerificationOtp = undefined;
//   user.emailVerificationOtpExpires = undefined;
//   await user.save();

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { verified: true },
//         "User mail id verified succcessfully"
//       )
//     );
// });

// A new function to handle the first step of registration

// const resendOtp = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     throw new ApiError(400, "Email is required");
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   if (user.isEmailVerified) {
//     throw new ApiError(401, "Email is already verified");
//   }

//   const otp = generateOtp();
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

//   user.emailVerificationOtp = otp;
//   user.emailVerificationOtpExpires = otpExpires;

//   await user.save();

//   const emailSubject = "Resend: Verify your email address";
//   const emailMessage = `<p>Your new OTP for email verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

//   try {
//     await sendEmail(email, emailSubject, emailMessage);
//     return res
//       .status(200)
//       .json(new ApiResponse(200, {}, "A new OTP has been sent to your email."));
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Failed to resend verification email.Please try again later"
//     );
//   }
// });
// const sendOtpForRegistration = asyncHandler(async (req, res) => {
//   const { userName, email, password } = req.body;

//   if (
//     !userName ||
//     !email ||
//     !password ||
//     [userName, email, password].some((field) => field.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }
//   const existingUser = await User.findOne({
//     $or: [{ email }, { userName }],
//     isEmailVerified: true,
//   });

//   if (existingUser) {
//     throw new ApiError(409, "User with this email or username already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   let profilePictureUrl = "";
//   if (
//     req.files &&
//     Array.isArray(req.files.avatar) &&
//     req.files.avatar.length > 0
//   ) {
//     const avatarLocalPath = req.files.avatar[0].path;
//     const avatar = await uploadOnCloudinary(avatarLocalPath);
//     if (!avatar || !avatar.url) {
//       throw new ApiError(500, "Failed to upload avatar to Cloudinary");
//     }
//     profilePictureUrl = avatar.url;
//   }

//   const otp = generateOtp();

//   const registrationPayload = {
//     userName,
//     email,
//     password: hashedPassword,
//     avatar: profilePictureUrl,
//     otp,
//   };

//   const registrationToken = jwt.sign(
//     registrationPayload,
//     process.env.REGISTRATION_TOKEN_SECRET,
//     { expiresIn: "10m" }
//   );

//   const emailSubject = "Verify Your Email Address";
//   const emailMessage = `<p>Your OTP for email verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

//   try {
//     await sendEmail(email, emailSubject, emailMessage);
//     return res
//       .status(200)
//       .json(
//         new ApiResponse(
//           200,
//           { registrationToken },
//           "OTP sent to your email. Please verify."
//         )
//       );
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Failed to send verification email. Please try again."
//     );
//   }
// });

// const verifyOtpAndRegister = asyncHandler(async (req, res) => {
//   const { otp, registrationToken } = req.body;

//   if (!otp || !registrationToken) {
//     throw new ApiError(400, "OTP and registration token are required");
//   }

//   let decodedPayload;
//   try {
//     decodedPayload = jwt.verify(
//       registrationToken,
//       process.env.REGISTRATION_TOKEN_SECRET
//     );
//   } catch (error) {
//     throw new ApiError(401, "Invalid or expired registration token.");
//   }

//   if (decodedPayload.otp !== otp) {
//     throw new ApiError(400, "Invalid OTP.");
//   }
//   const { userName, email, password, profilePicture } = decodedPayload;

//   const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
//   if (existingUser) {
//     throw new ApiError(409, "User with this email or username already exists.");
//   }

//   const user = await User.create({
//     userName,
//     email,
//     password,
//     profilePicture,
//     isEmailVerified: true,
//   });

//   return res
//     .status(201)
//     .json(
//       new ApiResponse(
//         201,
//         { userId: user._id },
//         "User registered successfully!"
//       )
//     );
// });

const sendOtpForRegistration = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

  if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const otp = generateOtp();

  req.session.registrationData = {
    userName,
    email,
    password: password,
    coverImage: coverImage?.url || "",
    otp,
  };

  await sendEmail(email, "Verify Your Email", `Your OTP is: ${otp}`);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP sent successfully."));
});

const verifyOtpAndRegister = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  const registrationData = req.session.registrationData;

  if (!registrationData) {
    throw new ApiError(400, "Session expired. Please try again.");
  }

  if (registrationData.otp !== otp) {
    throw new ApiError(400, "Invalid OTP.");
  }

  const { userName, email, password, coverImage } = registrationData;
  const user = await User.create({
    userName,
    email,
    password,
    coverImage,
    isEmailVerified: true,
  });

  req.session.registrationData = null;

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { userId: user._id },
        "User registered successfully!"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "Both email and password are required for login");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not  exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    -"password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out Successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old password given is incorrect");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken: newrefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "Access Token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "File is missing");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage?.url) {
    throw new ApiError(400, "Error while uploading");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

export {
  sendOtpForRegistration,
  verifyOtpAndRegister,
  loginUser,
  logOutUser,
  changeCurrentPassword,
  refreshAccessToken,
  updateUserCoverImage
};
