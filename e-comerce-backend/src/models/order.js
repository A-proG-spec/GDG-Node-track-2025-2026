import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        min: 1,
      },
      price: {
        type: Number,
        min: 0,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);

