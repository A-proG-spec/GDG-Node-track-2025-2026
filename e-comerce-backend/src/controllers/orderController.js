import { Order } from "../models/order.js";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    const stockIssues = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        stockIssues.push(`Product ${item.name} not found`);
      } else if (product.stock < item.quantity) {
        stockIssues.push(`Insufficient stock for ${item.name}`);
      }
    }

    if (stockIssues.length > 0) {
      return res.status(400).json({
        error: "Stock issues",
        details: stockIssues,
      });
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      orderItems: cart.items,
      totalAmount: cart.totalAmount,
    });
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ orderDate: -1 });
  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};
