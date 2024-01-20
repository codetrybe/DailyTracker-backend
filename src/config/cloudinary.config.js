// import cloudinary from 'cloudinary';
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";
config();

// setting up cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Instantiate an instance of cloudinary storage
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "DailyTracker",
    allowedFormats: ["png", "jpg", "jpeg", "svg"],
    //transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

export default cloudinary;
