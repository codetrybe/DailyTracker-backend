import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// File filter function to validate file extensions
const fileFilter = function (req, file, cb) {
  // Allowed file extensions
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  // Check if the file extension is allowed
  const extension = file.originalname.toLowerCase().match(/\.\w+$/);
  if (!extension || !allowedExtensions.includes(extension[0])) {
    return cb(
      new Error(
        "Only image files with extensions .jpg, .jpeg, .png, .gif are allowed"
      )
    );
  }

  // File size limit (in bytes)
  const maxSize = 5 * 1024 * 1024; // 5MB

  // Check if the file size exceeds the limit
  if (file.size > maxSize) {
    return cb(new Error("File size exceeds the limit of 5MB"));
  }

  // If the file passes the validation, accept it
  cb(null, true);
};

// Configure multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
