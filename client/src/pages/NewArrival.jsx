import BookPageLayout from "../layouts/BooksPageLayout";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await api.get("/books?type=new");

        setBooks(res.data.books);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return <BookPageLayout title={"New Arrival"} books={books} isLoading={isLoading} />;
};

export default AllBooks;
