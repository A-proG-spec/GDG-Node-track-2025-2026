import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import {
  productValidation,
  updateProductValidation,
} from "../utils/validation.js";
import { validate } from "../middleware/validator.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validate(productValidation), createProduct);
router.put("/:id", validate(updateProductValidation), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
