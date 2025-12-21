import express from 'express';
import morgan from 'morgan';
import bookRoute from './route/bookRoute.js';
import errorHandler from './utils/errorHandler.js';
const app = express ();

app.use (express.json ());
app.use (morgan ());
// Routes
app.use ('/books', bookRoute);
app.use ((req, res, next) => {
  res.status (404).json ({
    success: false,
    message: 'Route not found',
  });
});
app.use (errorHandler);
export default app;
