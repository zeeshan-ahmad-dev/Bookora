import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import CardContainer from "../components/CardContainer";
import SubscribeEmail from "../components/SubscribeEmail";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {
  const { addBookToCart } = useContext(CartContext);

  const { id } = useParams();

  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [books, setBooks] = useState([]);

  const fetchBook = useCallback(async () => {
    if (!id) return;
    try {
      const res = await api.get(`/books/${id}`);
      if (res.data.book) {
        setBook(res.data.book);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, [id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    addBookToCart(id, quantity);
  };

  const fetchRelatedBooks = useCallback( async () => {
    if (!id) return;

    try {
      const res = await api.get("/books?limit=4");

      setBooks(res.data.books);
    } catch (error) {
      toast.error(error.message);
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.value < 1) {
      setQuantity(1);
    } else {
      setQuantity(e.target.value);
    }
  };

  useEffect(() => {
    if (!id) return;
    
    fetchBook();
    fetchRelatedBooks();
  }, [id, fetchBook, fetchRelatedBooks]);

  return (
    <main className="bg-secondary">
      <section className="py-6 xl:pt-0 xl:pb-10 px-5 xl:px-20 bg-secondary">
        <div className="xl:grid xl:grid-cols-2 xl:gap-12 md:pb-10 xl:pb-14">
          <div className="w-full bg-cover">
            <img className="w-full" src={book.cover} alt="" />
          </div>
          <div className="space-y-2">
            <p className="mt-5 text-sm">
              <span className="text-primary">All Books</span>,{" "}
              <span className="text-primary">Best Seller</span>,{" "}
              <span className="text-primary">Editors Pick</span>
            </p>

            <h2 className="text-2xl font-bold font-noto-serif">{book.title}</h2>
            <h3 className="text-xl font-bold text-black/70">${book.price}</h3>
            <div className="flex gap-4 items-center relative">
              <input
                className="bg-white border border-gray-300 outline-none w-14 p-2"
                type="number"
                name="quantity"
                id="quantity"
                onChange={handleChange}
                value={quantity}
              />
              <button onClick={handleAddToCart} className="bg-primary hover:bg-primary-hover cursor-pointer px-4 py-2 font-bold">
                Add to cart
              </button>
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 text-xs py-2 my-4">
              Categories:
              <p className="">
                <span className="text-primary">All Books</span>,{" "}
                <span className="text-primary">Best Seller</span>,{" "}
                <span className="text-primary">Editors Pick</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          {/* Description & Review tabs */}
          <div className="md:flex flex-col md:flex-row md:items-center py-8 md:py-0 md:gap-4 md:border-t md:border-black/10">
            <button className="flex text-left font-bold text-sm text-black/70 py-2 cursor-pointer  hover:text-black border-t-2 w-full md:w-fit border-primary">
              Description
            </button>
            <button className="flex text-left font-bold text-sm text-black/70 py-2 cursor-pointer hover:text-black w-full md:w-fit">
              Reviews (0)
            </button>
          </div>

          {/* Description */}
          <div className="text-sm lg:text-base text-black/80 md:mt-4">
            {book.description}
          </div>
        </div>
      </section>
      <section className="px-4 xl:px-20 py-14">
        <h2 className="font-noto-serif text-3xl xl:text-5xl font-bold mb-6">
          Related Products
        </h2>
        <CardContainer books={books} />
      </section>
      <SubscribeEmail />
    </main>
  );
};

export default ProductDetailPage;
