import React from "react";
import CardItem from "./CardItem";
import assets from "../assets/assets";

const CardContainer = ({ books }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
      {books.map((book, index) => (
        <CardItem
          key={index}
          imgUrl={book.imgUrl}
          title={book.title}
          price={book.price}
        />
      ))}
    </div>
  );
};

export default CardContainer;
