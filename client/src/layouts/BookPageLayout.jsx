import React from 'react'
import SubscribeEmail from "../components/SubscribeEmail";
import CardContainer from "../components/CardContainer";
import { Link } from "react-router-dom";

const BookPageLayout = ({title, books}) => {
  return (
    <main className="bg-secondary">
      <section className="py-12 md:py-16 px-4 xl:px-20">
        <div>
          <p className="text-black/50 text-xs md:text-sm">
            <Link to="/">Home</Link> / { title }
          </p>
          <h1 className="text-4xl md:text-6xl font-noto-serif font-bold py-6 md:py-8 text-primary">{ title }</h1>
        </div>
        <div>
          <div className="flex text-sm md:text-base justify-between items-center py-6">
            <p className="text-nowrap text-black/80">Showing all {books.length} results</p>
            <select name="sort" id="sort" className=" p-1 outline-none focus:border focus:border-dotted text-black/70">
              <option value="default" className="text-xs">Default Sorting</option>
              <option value="popularity" className="text-xs">Sort by popularity</option>
              <option value="average_rating" className="text-xs">Sort by average rating</option>
            </select>
          </div>
          <div className="pb-8">
            <CardContainer books={books} />
          </div>
        </div>
      </section>

      {/* Subscribe to Email Section */}
      <SubscribeEmail />
    </main>
  )
}

export default BookPageLayout