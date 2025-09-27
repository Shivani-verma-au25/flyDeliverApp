import multer from 'multer'

// Store uploads in ./public/uploads relative to project root
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // relative path
  },
  filename: function (req, file, cb) {
    cb(null , file.originalname)
  },
});

export const upload = multer({ storage });





