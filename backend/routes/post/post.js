import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  getPostById,
  updatePostById,
  getPost,
  deletePostById,
  postNews,
} from "../../controllers/post/postController.js";

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
    if (file.fieldname === "thumbnail") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"));
    }
  },
});

router
  .route("/news/:id")
  .get(protect, getPostById)
  .put(protect, updatePostById)
  .delete(protect, deletePostById);
router
  .route("/news")
  .get(protect, getPost)
  .post(upload.single("thumbnail"), postNews);

export default router;
