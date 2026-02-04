import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";
import {
  cartItemValidation,
  cartUpdateValidation,
} from "../utils/validation.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", validate(cartItemValidation), addToCart);
router.put("/:productId", validate(cartUpdateValidation), updateCart);
router.delete("/:productId", validate(cartUpdateValidation), removeFromCart);

export default router;


