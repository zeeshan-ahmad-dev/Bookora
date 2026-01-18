import { Star } from "lucide-react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CardItem = ({ imgUrl, title, price, id }) => {
  const navigate = useNavigate();
  const { addBookToCart, removeBookFromCart, cart, updatingIds } = useContext(CartContext);

  const isInCart = cart?.some((book) => book._id === id);

  const handleAddToCartToggle = (e) => {
    e.stopPropagation();

    // If book found remove it else add
    if (isInCart) {
      return removeBookFromCart(id);
    }

    addBookToCart(id);
  };

  return (
    <div className="z-40">
      <div
        className={`relative group ${
          isInCart ? "cursor-pointer" : "cursor-pointer"
        }`}
      >
        <span
          onClick={handleAddToCartToggle}
          className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:bg-white transition-all right-4 top-4 bg-white/70 rounded-full p-1.5 center group/item shadow-sm"
        >
          <span
            className={`opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible bg-black absolute right-10 text-xs px-2 rounded-sm py-2 text-white w-max after:content-[''] after:absolute after:size-3 after:bg-black after:top-2.5 after:rotate-45 after:z-50`}
          >
            {isInCart ? "Remove from cart" : "Add to cart"}
          </span>
          {updatingIds.has(id) ? (
            <div className="size-4 animate-dotPing bg-black rounded-full"></div>
          ) : (
            <img src={assets.shopping_bag_icon} className="w-4" />
          )}
          {/* <ShoppingCartPlus className="w-4" /> */}
        </span>
        <img
          onClick={() => navigate(`/books/${id}`)}
          src={imgUrl}
          className="w-full cursor-pointer"
          alt=""
        />
      </div>

      <div className="py-2">
        <h6
          onClick={() => navigate(`/books/${id}`)}
          className="text-sm font-noto-serif cursor-pointer font-bold"
        >
          {title}
        </h6>
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star className="w-3" key={index} />
            ))}
        </div>
        <p className="text-xs font-bold text-black/70">${price}</p>
      </div>
    </div>
  );
};

export default CardItem;
