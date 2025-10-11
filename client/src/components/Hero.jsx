import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import assets from "../assets/assets";

const Hero = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="bg-hero py-14 md:py-24 lg:py-32 lg:flex overflow-hidden">
      <div className="space-y-5 relative px-8 md:px-12 lg:pl-40 lg:pr-0 lg:w-[60%]">
        <h6 className="text-xl font-semibold text-black/80">Latest Books</h6>
        <h1 className="text-4xl md:text-5xl lg:text-[4.2rem] leading-12 lg:leading-20 font-bold font-noto-serif">
          You're Only One Book Away From a Good Mood
        </h1>
        <p className="text-sm font-light text-black/95">
          Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed
          quia consequuntur magni dolores eos qui ratione voluptatem sequi
          nesciunt.
        </p>
        <button className="bg-primary font-semibold px-8 mt-6 py-4">
          DISCOVER NOW
        </button>
        <img src={assets.swirl_arrow_icon} className="hidden xl:inline absolute -right-52 rotate-12 top-[40%] w-60" alt="" />
      </div>

      {/* carousel */}
      <div className="pt-20 lg:grow lg:pl-20 xl:pl-0 ml-4 md:ml-12 relative -right-4 w-[115%] xl:w-[115%] lg:-right-20 overflow-hidden flex items-center">
        <div className="w-full md:w-[150%] xl:w-full lg:scale-">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={7000}
          keyBoardControl={true}
          customTransition=""
          transitionDuration={500}
          containerClass="carousel-container p-0 m-0"
          itemClass="px-2"
          customRightArrow={
            <button className="absolute right-24  top-1/2 -translate-y-1/2 bg-transparent text-white/80 font-bold text-xl p-2 rounded-full transition cursor-pointer">
              <ChevronRight size={30} strokeWidth={3} />
            </button>
          }
          customLeftArrow={
            <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-transparent text-white/80 font-bold text-xl p-2 rounded-full transition cursor-pointer">
              <ChevronLeft size={30} strokeWidth={3} />
            </button>
          }
          
        >
          {[
            assets.book_cover_1,
            assets.book_cover_2,
            assets.book_cover_3,
            assets.book_cover_4,
          ].map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden p-0 m-0">
              <img draggable="false" className="rounded-lg w-full" src={img} alt={img} />
            </div>
          ))}
        </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
