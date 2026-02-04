import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getCart = async (req, res) => {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [], totalAmount: 0 });
  res.json(cart);
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product || product.stock < quantity)
      return res.status(400).json({ error: "Invalid product or stock" });

    let cart = await Cart.findOne();
    if (!cart) cart = await Cart.create({ items: [], totalAmount: 0 });

    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId,
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        name: product.name,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (error) {
   res.status(500).json({ error: "Failed to add item to  cart" });
  }
};

export const updateCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne();
  if (!cart) {
    return res.status(404).json({ error: "no cart found" });
  }
  const item = cart.items.find((i) => i.productId.toString() === productId);

  if (!item) return res.status(404).json({ error: "Item not found" });

  const product = await Product.findById(productId);
  if (product.stock < quantity)
    return res.status(400).json({ error: "Insufficient stock" });

  item.quantity += quantity;

  cart.totalAmount = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne();
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ error: "item is not found in the cart" });
    }
    if (item.quantity < quantity) {
      return res.status(400).json({ error: `you have only ${item.quantity}` });
    } else if (item.quantity == quantity) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId,
      );
    } else if (item.quantity > quantity) {
      item.quantity = item.quantity - quantity;
    }
    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};
