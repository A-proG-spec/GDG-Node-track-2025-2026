import { Product } from "../models/product.js";

export const getAllProducts = async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(filter);
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock, category, arrivalDate } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    arrivalDate,
  });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Product not found" });
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Product not found" });
  res.json({ message: "Product deleted" });
};
