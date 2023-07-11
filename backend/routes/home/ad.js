import {
  // updateAdById,
  deleteAdById,
  getAd,
  createAd,
} from "../../controllers/home/adController.js";
import { protect } from "../../middleware/auth.js";
import express from "express";
import multer from "multer";

const router = express.Router();

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
    if (file.fieldname === "img") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"));
    }
  },
});

router
  .route("/ad/:id")
  // .put(protect, updateAdById)
  .delete(protect, deleteAdById);
router.route("/ad").get(protect, getAd).post(protect, upload.single("img"), createAd);

export default router;
