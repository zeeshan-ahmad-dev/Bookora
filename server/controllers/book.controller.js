import {
  addBookService,
  fetchBooksService,
  fetchBookByIdService,
} from "../services/book.service.js";

export const fetchBooksController = async (req, res) => {
  const { limit, type, sort } = req.query;

  try {
    console.log(limit, type, sort)
    const books = await fetchBooksService(limit, type, sort);
    res.status(200).json({
      success: true,
      message: "Books fetched successfully!",
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchBookByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await fetchBookByIdService(id);
    res.status(200).json({
      success: true,
      message: "Book fetched successfully!",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addBookController = async (req, res) => {
	console.log("From my side friend", req.user)
  if (!req.user.isAdmin) {
	console.log("It ran?")
    return res.status(405).json({
      success: false,
      message: "You are not admin!",
    });
  }

  try {
    const { title, description, price, author, categories } = req.body;
	console.log("File", req.file)
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
    console.log(error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};
