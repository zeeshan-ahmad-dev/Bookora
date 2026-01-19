import { useEffect, useState } from "react";
import SubscribeEmail from "../components/SubscribeEmail";
import CardContainer from "../components/CardContainer";
import { Link } from "react-router-dom";

const BookPageLayout = ({ title, books }) => {
  const [sortedBooks, setSortedBooks] = useState([]);

  const handleChangeSorting = (e) => {

    if (e.target.value === 'default') {
      return setSortedBooks([...books]);
    }

    if (e.target.value === 'popularity') {
      return setSortedBooks(prev => [...prev].sort((a, b) => b.sales - a.sales));
    }
    
    if (e.target.value === 'latest') {
      return setSortedBooks(prev => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }

    if (e.target.value === 'lowToHigh') {
      return setSortedBooks(prev => [...prev].sort((a, b) => a.price - b.price));
    }

    if (e.target.value === 'highToLow') {
      return setSortedBooks(prev => [...prev].sort((a, b) =>  b.price - a.price));
    }
  }
  
  useEffect(() => {
    setSortedBooks([...books]);
  }, [books]);

  useEffect(() => {
    console.log(sortedBooks)
  }, [sortedBooks]);

  return (
    <main className="bg-secondary">
      <section className="py-12 md:py-16 px-4 xl:px-20">
        <div>
          <p className="text-black/50 text-xs md:text-sm">
            <Link to="/">Home</Link> / {title}
          </p>
          <h1 className="text-4xl md:text-6xl font-noto-serif font-bold py-6 md:py-8 text-primary">
            {title}
          </h1>
        </div>
        <div>
          <div className="flex text-sm md:text-base justify-between items-center py-6">
            <p className="text-nowrap text-black/80">
              Showing all {books.length} results
            </p>
            <select
              name="sort"
              onChange={handleChangeSorting}
              id="sort"
              className=" p-1 outline-none focus:border focus:border-dotted text-black/70"
            >
              <option value="default" className="text-xs">
                Default Sorting
              </option>
              <option value="popularity" className="text-xs">
                Sort by popularity
              </option>
              <option value="latest" className="text-xs">
                Sort by latest
              </option>
              <option value="lowToHigh" className="text-xs">
                Sort by price: low to high
              </option>
              <option value="highToLow" className="text-xs">
                Sort by price: high to low
              </option>
            </select>
          </div>
          <div className="pb-8">
            <CardContainer books={sortedBooks} />
          </div>
        </div>
      </section>

      {/* Subscribe to Email Section */}
      <SubscribeEmail />
    </main>
  );
};

export default BookPageLayout;
