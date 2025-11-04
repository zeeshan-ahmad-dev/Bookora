import CardItem from "./CardItem";

const CardContainer = ({ books }) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
      {books.map((book, index) => (
        <CardItem
          key={index}
          id={book._id}
          imgUrl={book.cover}
          title={book.title}
          price={book.price}
        />
      ))}
    </div>
  );
};

export default CardContainer;
