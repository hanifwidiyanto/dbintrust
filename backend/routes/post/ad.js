import express from "express";
import { updateAdById, deleteAdById, getAdByPostId, getAd, createAd } from "../../controllers/post/adController.js";
import { protect } from "../../middleware/auth.js";
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
  .put(protect, updateAdById)
  .delete(protect, deleteAdById)
  .get(protect, getAdByPostId);
router.route("/ad").post(protect,  upload.single("img"),createAd).get(protect, getAd);

export default router;
