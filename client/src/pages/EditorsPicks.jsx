import BookPageLayout from "../layouts/BooksPageLayout";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
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


  return <BookPageLayout title={"Editors Pick"} books={books} />;
};

export default AllBooks;
