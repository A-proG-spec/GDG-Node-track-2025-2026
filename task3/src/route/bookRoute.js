import express from 'express';
import {
  getAllBooks,
  searchBooks,
  getBookById,
  createBook,
  deleteBook,
} from '../controller/bookController.js';

const router = express.Router ();

router.get ('/', getAllBooks);
router.get ('/search', searchBooks);
router.get ('/:id', getBookById);
router.post ('/', createBook);
router.delete ('/:id', deleteBook);

export default router;
