import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(401, "All fields are required");
  }

  const checkIfUserExists = await User.findOne({
    $or: [{ userName, email }],
  });

  if (checkIfUserExists) {
    throw new ApiError(401, "User already exists");
  }

  console.log(req.files);

  let avatarLocalPath = null;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  if (avatarLocalPath !== null) {
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      throw new ApiError(401, "Avatar file is not being uploaded");
    }
  }
});

export { registerUser };
