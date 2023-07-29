import express from 'express'
import {postImage, getImage, deleteImageById} from '../../controllers/image/imageControllers.js'
import {protect} from '../../middleware/auth.js'
import multer from 'multer'


const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Menentukan folder penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Menentukan nama file
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"));
    }
  },
});

router.get("/get", getImage);
router.post("/upload", upload.single("image"), postImage);
router.delete("/delete/:id",deleteImageById);


export default router;
