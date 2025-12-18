import express from 'express';
import morgan from 'morgan';
import bookRoute from './route/bookRoute.js';

const app = express ();

app.use (express.json ());

// Routes
app.use ('/books', bookRoute);

export default app;
