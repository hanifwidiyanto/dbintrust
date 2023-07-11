import express from "express";
import {
  deleteHeadlineById,
  updateHeadlineById,
  getHeadline,
  postHeadline,
} from "../../controllers/home/headlineController.js";
import { protect } from "../../middleware/auth.js";
const router = express.Router();

router
  .route("/headline/:id")
  .put(protect, updateHeadlineById)
  .delete(protect, deleteHeadlineById);
router.route("/headline").get(getHeadline).post(protect, postHeadline);

export default router;
