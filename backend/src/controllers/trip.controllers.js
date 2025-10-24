import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcrypt";

const saveTriplan = asyncHandler(async (req, res) => {
  const { tripPlan } = req.body;

  const userId = req.user._id;

  if (
    !tripPlan ||
    typeof tripPlan !== "object" ||
    Object.keys(tripPlan).length === 0
  ) {
    throw new ApiError(400, "A valid trip plan data is required");
  }

  if (tripPlan.suggestions && Array.isArray(tripPlan.suggestions)) {
    await Promise.all(
      tripPlan.suggestions.map(async (suggestion) => {
        if (
          suggestion.photos &&
          Array.isArray(suggestion.photos) &&
          suggestion.photos.length > 0
        ) {
          const uploadPromises = suggestion.photos.map((url) =>
            uploadOnCloudinary(url)
          );
          const uploadResults = await Promise.all(uploadPromises);

          suggestion.photos = uploadResults
            .filter((result) => result && result.url)
            .map((result) => result.url);
        }
      })
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        trips: { tripPlan: tripPlan },
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(500, "Could not save trip, Please try again");
  }

  const newTrip = updatedUser.trips.slice(-1)[0];

  return res
    .status(200)
    .json(new ApiResponse(200, newTrip, "Trip saved to profile successfully"));
});

const getMySavedTrips = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, req.user.trips),
      "User trips fetched successfully"
    );
});

const unSaveTrip = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user._id;

  if (!tripId) {
    throw new ApiError(400, "Trip Id is required");
  }

  await User.findByIdAndUpdate(userId, {
    $pull: {
      trips: {
        _id: tripId,
      },
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { tripId: tripId }, "Trip unsaved successfully"));
});

export { saveTriplan, getMySavedTrips,unSaveTrip };
