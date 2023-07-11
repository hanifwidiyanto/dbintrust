import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  getTrend,
  postTrend,
  // updateTrendById,
  deleteTrendById,
} from "../../controllers/page/trendController.js";
const router = express.Router();

router
  .route("/trend/:id")
  // .put(protect, updateTrendById)
  .delete(protect, deleteTrendById);
router.route("/trend").get(protect, getTrend).post(protect, postTrend);

export default router;
