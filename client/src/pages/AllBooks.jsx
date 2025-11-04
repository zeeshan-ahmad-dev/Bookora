import { useEffect } from "react";
import BookPageLayout from "../layouts/BooksPageLayout.jsx";
import { useState } from "react";
import api from '../api.js';
import { toast } from "react-toastify";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books?limit=5");   

      setBooks(res.data.books);
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message);
      console.log(res);
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
