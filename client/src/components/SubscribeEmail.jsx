import React from "react";
import assets from "../assets/assets";

const SubscribeEmail = () => {
  return (
    <section className="py-16 md:py-20 xl:py-20 px-10 md:px-10 xl:px-20 md:mx-0 bg-hero md:flex md:items-center">
      <div className="md:flex-[0.7] realtive">
        <h1 className="text-[1.7rem] md:text-5xl md:text-left md:pr-40 leading-9 md:leading-14 text-center font-noto-serif font-bold mb-11">
          Join Book Lovers Comunity and Get Latest Updates
        </h1>
        <div className="flex flex-col md:flex-row space-y-1 md: md:items-center gap-2 md:gap-2 w-full">
          <input
            type="text"
            placeholder="Your Email Address"
            className="bg-white text-black/90 px-3 py-4 text-sm font-medium border border-gray-200 outline-none md:my-4 h-full flex-[0.6] xl:flex-[0.7]"
          />
          <button className="cta-btn my-1 mb-0 text-sm h-full flex-[0.2] xl:flex-[0.1">
            SUBSCRIBE
          </button>
        </div>
      </div>
      <div className="md:flex-[0.6] lg:flex-[0.4] md:relative md:px-6 lg:px-0">
        <img src={assets.subscribe_image} className="md:w-full" alt="" />
      </div>
    </section>
  );
};

export default SubscribeEmail;
