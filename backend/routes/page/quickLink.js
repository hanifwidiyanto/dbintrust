import express from "express";
import {
  getQuickLink,
  postQuickLink,
  deleteQuickLinkById,
  updateQuickLinkById,
} from "../../controllers/page/quickLinkController.js";
import { protect } from "../../middleware/auth.js";
const router = express.Router();

router
  .route("/quick-link/:id")
  .put(protect, updateQuickLinkById)
  .delete(protect, deleteQuickLinkById);
router
  .route("/quick-link")
  .get(protect, getQuickLink)
  .post(protect, postQuickLink);

export default router;
