import express from "express";
import {
  updateQuickLinkById,
  deleteQuickLinkById,
  getQuickLink,
  postQuickLink,
} from "../../controllers/home/quickLinkController.js";
import { protect } from "../../middleware/auth.js";
const router = express.Router();

router
  .route("/quick-link/:id")
  .put(protect, updateQuickLinkById)
  .delete(protect, deleteQuickLinkById);
router.route("/quick-link").get(getQuickLink).post(protect, postQuickLink);

export default router;
