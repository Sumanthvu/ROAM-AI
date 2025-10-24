import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePathOrUrl) => {
  try {
    if (!filePathOrUrl) return null;

    let response;

    if (filePathOrUrl.startsWith("http")) {
      response = await cloudinary.uploader.upload(filePathOrUrl, {
        resource_type: "auto",
        folder: "trip_photos",
      });
    }
     else {
      response = await cloudinary.uploader.upload(filePathOrUrl, {
        resource_type: "auto",
        // folder: "trip_photos",
      });

      fs.unlinkSync(filePathOrUrl);
    }

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);

    if (!filePathOrUrl.startsWith("http") && fs.existsSync(filePathOrUrl)) {
      fs.unlinkSync(filePathOrUrl);
    }

    return null;
  }
};

export { uploadOnCloudinary };

