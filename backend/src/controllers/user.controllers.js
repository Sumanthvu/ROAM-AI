//user controller
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



// const sendOtpForRegistration = asyncHandler(async (req, res) => {
//   const { userName, email, password } = req.body;

//   if (!userName || !email || !password) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

//   if (existingUser) {
//     throw new ApiError(409, "User with this email or username already exists");
//   }

//   //   const hashedPassword = await bcrypt.hash(password, 10);

//   let coverImageLocalPath;
//   if (
//     req.files &&
//     Array.isArray(req.files.coverImage) &&
//     req.files.coverImage.length > 0
//   ) {
//     coverImageLocalPath = req.files.coverImage[0].path;
//   }

//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//   const otp = generateOtp();

//   req.session.registrationData = {
//     userName,
//     email,
//     password: password,
//     coverImage: coverImage?.url || "",
//     otp,
//     timestamp: Date.now(),
//   };

//   // Explicitly save the session before sending response
//   await new Promise((resolve, reject) => {
//     req.session.save((err) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });

//   console.log("Session saved successfully:", req.session.id);

//   await sendEmail(email, "Verify Your Email", `Your OTP is: ${otp}`);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "OTP sent successfully."));
// });

// const verifyOtpAndRegister = asyncHandler(async (req, res) => {
//   const { otp } = req.body;

//   console.log("Session ID on verify:", req.session.id);
//   console.log("Session data:", req.session.registrationData);

//   const registrationData = req.session.registrationData;

//   if (!registrationData) {
//     throw new ApiError(400, "Session expired. Please try again.");
//   }

//   if (registrationData.otp !== otp) {
//     throw new ApiError(400, "Invalid OTP.");
//   }

//   const { userName, email, password, coverImage } = registrationData;
//   const user = await User.create({
//     userName,
//     email,
//     password,
//     coverImage,
//     isEmailVerified: true,
//   });

//   // Clear the session data after successful registration
//   req.session.registrationData = null;

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

  // Store registration data in session
  req.session.registrationData = {
    userName,
    email,
    password: password,
    coverImage: coverImage?.url || "",
    otp,
    timestamp: Date.now(),
  };

  // Save session and wait for it to complete
  await new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        reject(err);
      } else {
        console.log("Session saved successfully:", req.session.id);
        console.log("Session data:", req.session.registrationData);
        resolve();
      }
    });
  });

  // Send email
  try {
    await sendEmail(email, "Verify Your Email", `Your OTP is: ${otp}`);
  } catch (emailError) {
    console.error("Email sending error:", emailError);
    throw new ApiError(500, "Failed to send OTP email");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        { sessionId: req.session.id }, // Return session ID for debugging
        "OTP sent successfully."
      )
    );
});

const verifyOtpAndRegister = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  console.log("Session ID on verify:", req.session.id);
  console.log("Session data:", req.session.registrationData);
  console.log("All cookies:", req.cookies);
  console.log("Signed cookies:", req.signedCookies);

  const registrationData = req.session.registrationData;

  if (!registrationData) {
    throw new ApiError(400, "Session expired or invalid. Please register again.");
  }

  // Check if session is too old (more than 15 minutes)
  const sessionAge = Date.now() - registrationData.timestamp;
  if (sessionAge > 15 * 60 * 1000) {
    req.session.destroy();
    throw new ApiError(400, "OTP expired. Please register again.");
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

  // Clear the session data after successful registration
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
  });

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
    sameSite: "None",
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
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out Successfully"));
});

const forgotPassowrd = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(401, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError("User does not exist");
  }

  const otp = generateOtp();

  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.passwordResetOtp = otp;

  user.passwordResetOtpExpires = otpExpires;

  await user.save({ validateBeforeSave: false });

  const emailSubject = "Reset Your Password";
  const emailMessage = `<p>You have requested to reset your password. Your One-Time Password (OTP) is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

  try {
    await sendEmail(email, emailSubject, emailMessage);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Password reset OTP has been sent to your email."
        )
      );
  } catch (error) {
    user.passwordResetOtp = undefined;
    user.passwordResetOtpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new ApiError(
      500,
      "Failed to send password reset email. Please try again."
    );
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(401, "All fields are required");
  }

  const user = await User.findOne({
    email,
    passwordResetOtp: otp,
    passwordResetOtpExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials entered");
  }

  user.password = newPassword;

  user.passwordResetOtp = undefined;
  user.passwordResetOtpExpires = undefined;

  user.refreshToken=undefined

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Your password has been reset successfully. You can now login using your new password"
      )
    );
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

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
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

// const updateUserCoverImage = asyncHandler(async (req, res) => {
//   const coverImageLocalPath = req.file?.path;

//   if (!coverImageLocalPath) {
//     throw new ApiError(400, "File is missing");
//   }

//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//   if (!coverImage?.url) {
//     throw new ApiError(400, "Error while uploading");
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         coverImage: coverImage.url,
//       },
//     },
//     { new: true }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Cover image updated successfully"));
// });


const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  let newCoverImageUrl = null; 

  if (coverImageLocalPath) {
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage?.url) {
      throw new ApiError(500, "Error while uploading to Cloudinary");
    }
    newCoverImageUrl = coverImage.url;
  } else {
    newCoverImageUrl = null;
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: newCoverImageUrl,
      },
    },
    { new: true }
  ).select("-password");

  const message = newCoverImageUrl ? "Cover image updated successfully" : "Cover image removed successfully";

  return res
    .status(200)
    .json(new ApiResponse(200, user, message));
});
const userProfile = asyncHandler(async(req,res)=>{
    const user = req.user

    return res
    .status(200)
    .json(new ApiResponse(200,user,"User profile fetched successfully"))
})

export {
  sendOtpForRegistration,
  verifyOtpAndRegister,
  loginUser,
  logOutUser,
  changeCurrentPassword,
  refreshAccessToken,
  updateUserCoverImage,
  forgotPassowrd,
  resetPassword,
  userProfile
};