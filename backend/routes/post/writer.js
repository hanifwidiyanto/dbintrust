import express from "express";
import {
  createWriter,
  getWriter,
  updateWriterById,
  deleteWriterById,
  getWriterById,
} from "../../controllers/post/writerController.js";
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
    if (file.fieldname === "profilePicture") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"));
    }
  },
});

router
  .route("/writer/:id")
  .put(protect, updateWriterById)
  .delete(protect, deleteWriterById)
  .get(getWriterById)
router
  .route("/writer")
  .get(getWriter)
  .post(protect, upload.single("profilePicture"), createWriter);

export default router;
