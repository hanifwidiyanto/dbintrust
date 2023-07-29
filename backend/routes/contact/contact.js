import express from "express";

import { protect } from "../../middleware/auth.js";
import {
    deleteContactUs,
    getContactUs,
    postContactUs
} from "../../controllers/contact/contactController.js";
const router = express.Router();


router
  .route("/")
  .get(protect,getContactUs)
  .post(postContactUs);
router
  .route("/:id")
  .delete(protect, deleteContactUs);

export default router;
