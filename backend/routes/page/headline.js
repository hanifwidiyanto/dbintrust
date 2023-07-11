import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  getHeadline,
  postHeadline,
  // updateHeadlineById,
  deleteHeadlineById,
} from "../../controllers/page/headlineController.js";

const router = express.Router();

router
  .route("/headline/:id")
  // .put(protect, updateHeadlineById)
  .delete(protect, deleteHeadlineById);
router.route("/headline").get(protect, getHeadline).post(protect, postHeadline);

export default router;
