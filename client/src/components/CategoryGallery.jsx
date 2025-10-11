import React from "react";
import assets from "../assets/assets";

const CategoryGallery = () => {
  return (
    <div className="flex flex-col md:flex-row justify-stretch gap-2">
      {/* Left Cards */}
      <div className="flex-[1] flex flex-col gap-2">
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="relative p-10 h-54 w-full flex items-end">
            <img
              className="w-full h-full absolute top-0 left-0"
              src={assets.category_image01}
              alt=""
            />
            <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
              Religion & Spirituality
            </h3>
          </div>
          <div className="relative p-10 h-54 w-full flex items-end">
            <img
              className="w-full h-full absolute top-0 left-0"
              src={assets.category_image02}
              alt=""
            />

            <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
              Teen & Young Adult
            </h3>
          </div>
        </div>

        <div>
          <div className="relative p-10 h-54 md:h-72 w-full flex items-end">
            <img
              className="w-full h-full absolute top-0 left-0"
              src={assets.category_image03}
              alt=""
            />

            <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
              Literature & Fiction
            </h3>
          </div>
        </div>
      </div>

      {/* Right Cards */}
      <div className="flex-[1.4] gap-2 flex flex-col md:flex-row">
        <div className="flex-[1.4]">
          <div className="relative p-10 h-64 md:h-full w-full flex items-end">
            <img
              className="w-full h-full absolute top-0 left-0"
              src={assets.category_image04}
              alt=""
            />
            <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
              Crime & Suspense
            </h3>
          </div>
        </div>
        <div className="flex flex-col h-full gap-2 flex-[0.8]">
          <div className="relative p-10 h-64 md:h-1/2 w-full flex items-end">
            <img
              className="w-full h-full absolute top-0 left-0"
              src={assets.category_image05}
              alt=""
            />

            <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
              Biographies & Memoirs
            </h3>
          </div>
          <div className="relative p-10 h-64 md:h-1/2 w-full flex items-end">
            <img
              className="w-full h-full absolute top-0 left-0"
              src={assets.category_image06}
              alt=""
            />

            <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
              Mystery & Thriller
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryGallery;
