import { addBookService, fetchBooksService } from "../services/book.service.js";

export const fetchBooksController = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  try {
    const books = await fetchBooksService(limit);

    res.status(200).json({ success: true, message: "Books fetched successfully!", books });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
}

export const addBookController = async (req, res) => {
  try {
    const { title, description, price, author } = req.body;

    if (req.file) {
        await addBookService(title, description, price, author, req.file);

        return res.status(201).json({success: true, message: "Book added successfully"});
    } else {
        return res.status(400).json({success: false, message: "Please upload a cover image"});
    }
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
