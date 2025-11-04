import BookPageLayout from "../layouts/BooksPageLayout";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");   
  
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
    <BookPageLayout title={"New Arrival"} books={books} />
  );
};

export default AllBooks;
