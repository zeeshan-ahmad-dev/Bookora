import BookPageLayout from "../layouts/BooksPageLayout";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/books?limit=8");

        setBooks(res.data.books);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return <BookPageLayout title={"Editors Pick"} books={books} isLoading={isLoading} />;
};

export default AllBooks;
