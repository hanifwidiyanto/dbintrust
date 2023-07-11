import express from "express";

import { protect } from "../../middleware/auth.js";
import {
  deleteOpinionById,
  getOpinion,
  postOpinion,
  updateOpinionById,
} from "../../controllers/content/opinionController.js";
const router = express.Router();

import multer from "multer";

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
    if (file.fieldname === "imgProfile") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"));
    }
  },
});

router
  .route("/opinion")
  .get(getOpinion)
  .post(protect, upload.single("imgProfile"), postOpinion);
router
  .route("/opinion/:id")
  .put(protect, updateOpinionById)
  .delete(protect, deleteOpinionById);

export default router;
