import multer from "multer";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './src/.images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '..' + file.originalname)
  }
})

export const uploads = multer({storage: fileStorageEngine})