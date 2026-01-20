import { useEffect } from "react";
import BookPageLayout from "../layouts/BooksPageLayout.jsx";
import { useState } from "react";
import api from "../api.js";
import { toast } from "react-toastify";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/books?type=all");

        setBooks(res.data.books);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return <BookPageLayout title={"All Books"} books={books} isLoading={isLoading} />;
};

export default AllBooks;
