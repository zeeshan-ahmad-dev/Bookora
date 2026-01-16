import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import assets from "../assets/assets";
import CardContainer from "../components/CardContainer";
import CategoryGallery from "../components/CategoryGallery";
import { FaTruck, FaRecycle, FaDivide, FaGift } from "react-icons/fa";
import SubscribeEmail from "../components/SubscribeEmail";
import { toast } from "react-toastify";
import api from "../api";

const Home = () => {
  const [discoverBooks, setDiscoverBooks] = useState([]);
  
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books?limit=8");   
  
        setDiscoverBooks(res.data.books);
        toast.success(res.data.message)
      } catch (error) {
        toast.error(error.message);
      }
    }
  
    useEffect(() => {
      fetchBooks();
    }, []);

  const editorBooks = [
    {
      cover: assets.book9,
      title: "This Dark Road To Mercy",
      price: "17.15",
    },
    {
      cover: assets.book10,
      title: "Into The Wild",
      price: "14.35",
    },
    {
      cover: assets.book11,
      title: "I'll Catch You",
      price: "21.55",
    },
    {
      cover: assets.book12,
      title: "Game Of Spades",
      price: "19.25",
    },
  ];

  return (
    <>
      <Hero />

      {/* Discover Books Section */}
      <section className="py-8 px-8 xl:px-16 bg-secondary">
        <h1 className="text-3xl md:text-5xl font-noto-serif font-semibold text-center py-2 lg:mt-5">
          Discover Your New Book
        </h1>
        <p className="text-sm lg:text-base px-1 text-black/90 leading-4 text-center py-2 lg:mt-5">
          Congue, gravida placeat nibh sunt semper elementum anim Integer lectus
          debitis auctor.
        </p>
        <div className="py-6 pt-10 text-center">
          <CardContainer books={discoverBooks} />
          <button className="cta-btn">DISCOVER MORE BOOKS</button>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-8 px-0 md:px-5 bg-secondary">
        <h1 className="text-3xl md:text-5xl font-noto-serif font-semibold text-center py-3 mb-8">
          Choose By Category
        </h1>

        {/* Category Gallery */}
        <CategoryGallery />
        <div className="py-6 pt-0 text-center">
          <button className="cta-btn">SEE ALL CATEGORIES</button>
        </div>
      </section>

      {/* World's Best Seller Section */}
      <section className="relative px-8 md:px-14 lg:px-20 py-14 md:py-14 lg:py-20 flex items-center flex-col md:flex-row">
        <img
          src={assets.bestseller_bg}
          className="absolute w-full md:w-[100%] lg:w-[60%] md:h-full md:max-h-full left-0 top-0 "
          alt=""
        />
        <div className="relative lg:ml-10 md:ml-0">
          <img
            src={assets.dots_icon}
            className="hidden md:inline absolute -right-12 -top-12"
            alt=""
          />
          <img
            src={assets.bestseller_book}
            className="relative w-full"
            alt=""
          />
        </div>
        <div className="text-center md:text-left py-10 md:ml-24 lg:ml-44 space-y-2 md:space-y-4 relative flex-1">
          <img
            src={assets.swirl_arrow_icon}
            className="hidden md:inline absolute -left-36 -bottom-24 w-max-40"
            alt=""
          />
          <h5 className="text-lg md:text-xl font-semibold text-black/80 ">
            World's Best Seller
          </h5>
          <h1 className="text-3xl md:text-5xl font-noto-serif font-bold">
            Below Zero
          </h1>
          <p className="text-sm md:text-base font-light">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit sed quia consequuntur magni dolores eos qui ratione voluptatem
            sequi nesciunt.
          </p>
          <button className="cta-btn">BUY NOW</button>
        </div>
      </section>

      {/* Author of the Month */}
      <section className="py-8 md:py-14 xl:py-24 px-10 md:px-10 xl:px-20 md:mx-0 bg-secondary">
        <h1 className="text-2xl lg:text-4xl font-noto-serif font-semibold text-center md:text-left py-12 lg:mt-5">
          Author of the Month
        </h1>
        <div className="lg:grid grid-cols-3 md:items-center">
          <div className="relative">
            <img src={assets.author_image} className="relative z-50" alt="" />
            <img
              src={assets.dots_icon}
              className="absolute z-10 -bottom-44 -left-32 md:-bottom-16 md:-left-32"
              alt=""
            />
          </div>
          <div className="py-14 space-y-5 relative lg:px-9">
            <h1 className="text-2xl md:text-4xl font-noto-serif font-bold">
              Melissa Miner
            </h1>
            <p className="text-sm md:text-base font-light">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
            <button className="cta-btn">READ MORE</button>
          </div>
          <div className="flex lg:flex-col justify-center md:justify-start lg:justify-center">
            <div className="grid grid-cols-1 md:grid-cols-1 md:grid-rows-3 gap-4 text-left">
              {[
                {
                  cover: assets.small_book_1,
                  title: "Cyber Angel",
                  price: [20, 22],
                },
                {
                  cover: assets.small_book_2,
                  title: "Ark Forging",
                  price: [17, 23],
                },
                {
                  cover: assets.small_book_3,
                  title: "Now You See Mee",
                  price: [16, 18],
                },
              ].map((book, index) => (
                <div key={index} className="md:flex md:items-center md:gap-10 lg:gap-4">
                  <div className="relative">
                    <img className="md:w-[115%] lg:w-auto" src={book.cover} alt="" />
                  </div>
                  <div className="py-2 md:space-y-2">
                    <h6 className="text-sm md:text-xl lg:text-2xl font-noto-serif font-bold">
                      {book.title}
                    </h6>
                    <p className="text-xs md:text-base font-bold text-black/70">
                      ${book.price[0].toFixed(2)}- ${book.price[1].toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-14 xl:py-24 px-10 md:px-0 xl:px-20 md:mx-0 bg-secondary">
        <h1 className="text-3xl md:text-5xl font-noto-serif font-semibold text-center py-2 lg:mt-5">
          Picked By Editors
        </h1>
        <p className="text-sm lg:text-base px-1 text-black/90 leading-4 text-center py-2 lg:mt-5">
          Congue, gravida placeat nibh sunt semper elementum anim Integer lectus
          debitis auctor.
        </p>
        <div className="py-6 md:px-10 pt-10 text-center">
          <CardContainer books={editorBooks} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-14 xl:py-20 px-2 md:px-10 xl:px-20 md:mx-0 bg-hero">
        <div className="flex flex-col md:flex-row space-y-4 md:space-x-8">
          <div className="space-y-1 md:space-y-3 flex flex-col items-center md:items-start md:justify-start text-left">
            <FaTruck className="text-3xl md:text-5xl w-fit" />
            <h3 className="font-noto-serif text-lg md:text-xl font-bold">
              Worldwide Free Shipping
            </h3>
            <p className="text-black/80 text-sm md:text-base">
              Justo vestibulum risus impe rdietsconse sectetur.
            </p>
          </div>
          <div className="space-y-1 md:space-y-3 flex flex-col items-center md:items-start md:justify-start text-left">
            <FaRecycle className="text-3xl md:text-5xl w-fit" />
            <h3 className="font-noto-serif text-lg md:text-xl font-bold">
              Free Returns For All
            </h3>
            <p className="text-black/80 text-sm md:text-base">
              Justo vestibulum risus impe rdietsconse sectetur.
            </p>
          </div>
          <div className="space-y-1 md:space-y-3 flex flex-col items-center md:items-start md:justify-start text-left">
            <FaDivide className="text-3xl md:text-5xl w-fit -rotate-45" />
            <h3 className="font-noto-serif text-lg md:text-xl font-bold">
              10% Student Discounts
            </h3>
            <p className="text-black/80 text-sm md:text-base">
              Justo vestibulum risus impe rdietsconse sectetur.
            </p>
          </div>
          <div className="space-1 md:space-y-3-1 flex flex-col items-center md:items-start md:justify-start text-left">
            <FaGift className="text-3xl md:text-5xl w-fit" />
            <h3 className="font-noto-serif text-lg md:text-xl font-bold">
              Gift Vouchers
            </h3>
            <p className="text-black/80 text-sm md:text-base">
              Justo vestibulum risus impe rdietsconse sectetur.
            </p>
          </div>
        </div>
      </section>

      {/* Publisher's Section */}
      <section className="py-16 md:py-14 xl:py-20 px-10 xl:px-32 md:mx-0 bg-secondary md:flex md:items-center">
        <div className="md:px-6">
          <img src={assets.publisher_image} alt="" />
        </div>
        <div className="text-center md:text-left py-10 lg:ml-20 space-y-6 md:space-y-4 relative flex-1">
          <h5 className="text-lg md:text-xl font-semibold text-black/80 ">
            Become Our Partner
          </h5>
          <h1 className="text-2xl md:text-4xl font-noto-serif font-bold">
            Self - Publishing And Book Writing
          </h1>
          <p className="text- text-xs md:text-base font-light">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit sed quia consequuntur magni dolores eos qui ratione voluptatem
            sequi nesciunt.
          </p>
          <button className="cta-btn">CONTACT NOW</button>
        </div>
      </section>

      {/* Subscribe to Email Section */}
        <SubscribeEmail />
    </>
  );
};

export default Home;
