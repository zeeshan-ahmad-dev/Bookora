import assets from "../assets/assets";

const categories = [
  { img: assets.category_image01, title: "Religion & Spirituality" },
  { img: assets.category_image02, title: "Teen & Young Adult" },
  { img: assets.category_image03, title: "Literature & Fiction" },
  { img: assets.category_image04, title: "Crime & Suspense" },
  { img: assets.category_image05, title: "Biographies & Memoirs" },
  { img: assets.category_image06, title: "Mystery & Thriller" },
];

const CategoryCard = ({ img, title, className }) => (
  <div className={`relative p-10 ${className} flex items-end`}>
    <img
      className="w-full h-full absolute top-0 left-0 object-cover"
      src={img}
      alt={`${title} category`}
    />
    <h3 className="text-white underline text-[1.4rem] leading-6.5 break-words font-bold font-noto-serif w-40 relative">
      {title}
    </h3>
  </div>
);

const CategoryGallery = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-stretch gap-2">
      {/* Left Column */}
      <div className="flex-[1] flex flex-col gap-2">
        <div className="flex gap-2 flex-col md:flex-row">
          <CategoryCard img={categories[0].img} title={categories[0].title} className="h-54 w-full" />
          <CategoryCard img={categories[1].img} title={categories[1].title} className="h-54 w-full" />
        </div>
        <CategoryCard img={categories[2].img} title={categories[2].title} className="h-54 md:h-72 w-full" />
      </div>

      {/* Right Column */}
      <div className="flex-[1.4] flex gap-2 flex-col md:flex-row">
        <div className="md:flex-[1.4]">
          <CategoryCard img={categories[3].img} title={categories[3].title} className="h-54 md:h-full w-full" />
        </div>
        <div className="flex flex-col gap-2 flex-[0.8]">
          <CategoryCard img={categories[4].img} title={categories[4].title} className="h-54 md:h-1/2 w-full" />
          <CategoryCard img={categories[5].img} title={categories[5].title} className="h-54 md:h-1/2 w-full" />
        </div>
      </div>
    </div>
  );
};

export default CategoryGallery;
