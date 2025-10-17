import React from "react";
import assets from "../assets/assets";
import BookPageLayout from "../layouts/BookPageLayout";

const AllBooks = () => {
  const books = [
    {
      imgUrl: assets.book1,
      title: "This Dark Road To Mercy",
      price: "17.15",
    },
    {
      imgUrl: assets.book6,
      title: "History vs Present",
      price: "14.35",
    },
    {
      imgUrl: assets.book4,
      title: "Master of Non",
      price: "21.55",
    },
    {
      imgUrl: assets.book12,
      title: "Game Of Spades",
      price: "19.25",
    },
    {
      imgUrl: assets.book11,
      title: "I'll Catch You",
      price: "21.55",
    },
    {
      imgUrl: assets.book12,
      title: "Game Of Spades",
      price: "19.25",
    },
  ];

  return (
    <BookPageLayout title={"Best Seller"} books={books} />
  );
};

export default AllBooks;
