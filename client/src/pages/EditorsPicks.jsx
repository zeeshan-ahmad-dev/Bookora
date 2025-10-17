import React from "react";
import assets from "../assets/assets";
import BookPageLayout from "../layouts/BookPageLayout";

const AllBooks = () => {
  const books = [
    {
      imgUrl: assets.book9,
      title: "This Dark Road To Mercy",
      price: "17.15",
    },
    {
      imgUrl: assets.book10,
      title: "Into The Wild",
      price: "14.35",
    },
    {
      imgUrl: assets.book12,
      title: "Game Of Spades",
      price: "19.25",
    },
  ];

  return <BookPageLayout title={"Editors Pick"} books={books} />;
};

export default AllBooks;
