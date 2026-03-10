import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import { protect } from './middleware/auth.middleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);


app.get('/api/dashboard', protect, (req, res) => {
  res.json({
    success: true,
    message: `Welcome to your dashboard, ${req.user.full_name}!`,
    user: req.user
  });
});


app.get('/', (req, res) => {
  res.json({ message: 'Auth API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});