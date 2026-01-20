import { toast } from "react-toastify";
import BookPageLayout from "../layouts/BooksPageLayout";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/books?type=bestseller");
        setBooks(res.data.books);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return <BookPageLayout title={"Best Seller"} books={books} isLoading={isLoading} />;
};

export default AllBooks;
