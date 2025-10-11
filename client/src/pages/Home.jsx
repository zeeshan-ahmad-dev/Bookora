import React from "react";
import Hero from "../components/Hero";
import assets from "../assets/assets";
import CardContainer from "../components/CardContainer";
import CategoryGallery from "../components/CategoryGallery";

const Home = () => {
  return (
    <>
      <Hero />

      {/* Discover Books Section */}
      <section className="py-8 px-8 xl:px-16 bg-light-gray">
        <h1 className="text-3xl md:text-5xl font-noto-serif font-semibold text-center py-2 lg:mt-5">
          Discover Your New Book
        </h1>
        <p className="text-sm lg:text-base px-1 text-black/90 leading-4 text-center py-2 lg:mt-5">
          Congue, gravida placeat nibh sunt semper elementum anim Integer lectus
          debitis auctor.
        </p>
        <div className="py-6 pt-10 text-center">
          <CardContainer />
          <button className="bg-primary font-semibold px-8 mt-14 py-4">
            DISCOVER MORE BOOKS
          </button>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-8 px-0 md:px-5 bg-light-gray">
        <h1 className="text-3xl md:text-5xl font-noto-serif font-semibold text-center py-3 mb-8">
          Choose By Category
        </h1>

        {/* Category Gallery */}
        <CategoryGallery />
        <div className="py-6 pt-0 text-center">
          <button className="bg-primary font-semibold px-8 mt-14 py-4">
            SEE ALL CATEGORIES
          </button>
        </div>
      </section>

      <section className="relative px-8 py-14 flex">
        <img src={assets.bestseller_bg} className="absolute w-full md:w-[60%] md:max-h-full left-0 top-0 " alt="" />
        <div className="relative">
          <img src={assets.bestseller_book} className="" alt="" />
        </div>
        <div className="text-center py-10 space-y-2 relative">
          <h5 className="text-lg text-black/80 ">World's Best Seller</h5>
          <h1 className="text-3xl font-noto-serif font-bold">Below Zero</h1>
          <p className="text-sm font-light">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          <button className="bg-primary font-semibold px-8 mt-8 py-4">
            BUY NOW
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
