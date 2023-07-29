import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  getPostById,
  updatePostById,
  getPost,
updateThumbnailById,
getPostByLink,
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
  .get(getPostById)
  .put(protect, updatePostById)
 
router.delete("/news/:id", protect, deletePostById)

router.put("/thumbnail/:id", protect, upload.single("thumbnail"), updateThumbnailById)

router
  .route("/news")
  .get( getPost)
  .post(upload.single("thumbnail"), postNews);

router.get("/news-url/:url", getPostByLink)
export default router;
