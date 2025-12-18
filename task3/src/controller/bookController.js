import bookSchema from '../utils/validationSchema.js';

let books = [];

// GET /books
export const getAllBooks = (req, res) => {
  res.json (books);
};

// GET /books/search
export const searchBooks = (req, res) => {
  res.send ('You are on the search page');
};

// GET /books/:id
export const getBookById = (req, res) => {
  const book = books.find (b => b.id === req.params.id);

  if (!book) {
    return res.status (404).json ({message: 'Book not found'});
  }

  res.json (book);
};

// POST /books
export const createBook = (req, res) => {
  const {error} = bookSchema.validate (req.body);

  if (error) {
    return res.status (400).json ({
      error: error.details[0].message,
    });
  }

  const newBook = {
    id: Date.now ().toString (),
    ...req.body,
  };

  books.push (newBook);
  res.status (201).json (newBook);
};

// DELETE /books/:id
export const deleteBook = (req, res) => {
  const index = books.findIndex (b => b.id === req.params.id);

  if (index === -1) {
    return res.status (404).json ({message: 'Book not found'});
  }

  books.splice (index, 1);
  res.status (200).json ({message: 'Book deleted successfully'});
};
