import express from "express";
import {
  getVideo,
  getVideoById,
  updateVideoById,
  deleteVideoById,
  postVideo,
} from "../../controllers/content/videoController.js";
import { protect } from "../../middleware/auth.js";
const router = express.Router();

router
  .route("/video:id")
  .get(getVideoById)
  .put(protect, updateVideoById)
  .delete(protect, deleteVideoById);
router.route("/video").get(getVideo).post(protect, postVideo);

export default router;
