import {
  updatePageById,
  deletePageById,
  getPageById,
  getAllPage,
  createPage,
} from "../../controllers/page/pageController.js";
import express from 'express'
import { protect } from "../../middleware/auth.js";
const router = express.Router();

router
  .route("/page/:id")
  .put(protect, updatePageById)
  .delete(protect, deletePageById)
  .get(getPageById);
router.route("/page").get(getAllPage).post(protect, createPage);

export default router;
