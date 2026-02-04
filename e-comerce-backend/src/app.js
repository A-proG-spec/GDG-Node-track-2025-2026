import express from "express";
import connectDB from "./config/database.js";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();

connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

export default app;
