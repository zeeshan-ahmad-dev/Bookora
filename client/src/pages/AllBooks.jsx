import { useEffect } from "react";
import BookPageLayout from "../layouts/BooksPageLayout.jsx";
import { useState } from "react";
import api from '../api.js';
import { toast } from "react-toastify";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books?type=all");   

      setBooks(res.data.books);
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookPageLayout title={"All Books"} books={books} />
  );
};

export default AllBooks;
