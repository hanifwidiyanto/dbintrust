import express from "express";
import {
  // updateTrendById,
  deleteTrendById,
  getTrend,
  postTrend,
} from "../../controllers/home/trendController.js";
import { protect } from "../../middleware/auth.js";
const router = express.Router();

router
  .route("/trend/:id")
  // .put(protect, updateTrendById)
  .delete(protect, deleteTrendById);
router.route("/trend").get(getTrend).post(protect, postTrend);

export default router;
