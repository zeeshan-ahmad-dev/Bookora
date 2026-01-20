import {
  addBookService,
  fetchBooksService,
  fetchBookByIdService,
} from "../services/book.service.js";

export const fetchBooksController = async (req, res, next) => {
  const { limit, type, sort } = req.query;

  try {
    const books = await fetchBooksService(limit, type, sort);

    res.status(200).json({
      success: true,
      message: "Books fetched successfully!",
      books,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchBookByIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await fetchBookByIdService(id);

    res.status(200).json({
      success: true,
      message: "Book fetched successfully!",
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const addBookController = async (req, res, next) => {
  const { title, description, price, author, categories } = req.body;

  if (!req.user.isAdmin) {
    return res.status(405).json({
      success: false,
      message: "You are not admin!",
    });
  }

  try {
    if (req.file) {
      await addBookService(
        title,
        description,
        price,
        author,
        categories,
        req.file
      );
      
      return res.status(201).json({
        success: true,
        message: "Book added successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Please upload a cover image",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
      success: false,
      message: "Book with this title already exists",
    });
    }
    console.log(error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};
