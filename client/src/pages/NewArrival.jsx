import React from "react";
import assets from "../assets/assets";
import BookPageLayout from "../layouts/BookPageLayout";

const AllBooks = () => {
  const books = [
    {
      imgUrl: assets.book1,
      title: "Become the beast",
      price: "12.45",
    },
    {
      imgUrl: assets.book7,
      title: "The Night",
      price: "06.77",
    },
    {
      imgUrl: assets.book8,
      title: "Grudge",
      price: "09.42",
    },
    {
      imgUrl: assets.book5,
      title: "Snake Heart",
      price: "11.05",
    },
    {
      imgUrl: assets.book4,
      title: "Genesis",
      price: "07.88",
    },
  ];

  return (
    <BookPageLayout title={"New Arrival"} books={books} />
  );
};

export default AllBooks;
