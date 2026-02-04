import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    min: 0,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
