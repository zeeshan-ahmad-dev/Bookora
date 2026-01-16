import { toast } from "react-toastify";
import BookPageLayout from "../layouts/BooksPageLayout";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books?type=bestseller");   
        console.log(res)
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
    <BookPageLayout title={"Best Seller"} books={books} />
  );
};

export default AllBooks;
