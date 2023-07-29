import { protect } from "../../middleware/auth.js";
import {
  updatePageById,
  deletePageById,
  getPage,
  createPage,
} from "../../controllers/home/pageController.js";
import express from 'express'

const router = express.Router();

router
  .route("/page/:id")
  .put(protect, updatePageById)
  .delete(protect, deletePageById)
router.route("/page").get(getPage).post(createPage);

export default router;
