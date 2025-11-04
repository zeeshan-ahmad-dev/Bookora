import { Star, ShoppingBagIcon } from "lucide-react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CardItem = ({ imgUrl, title, price, id }) => {
  const navigate = useNavigate();

  console.log(id)
  
  return (
    <div onClick={() => navigate(`/books/${id}`)} className="cursor-pointer">
      <div className="relative group">
        <span className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:bg-white transition-all right-4 top-4 bg-white/70 rounded-full p-1.5 center group/item shadow-sm">
          <span className="opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible bg-black absolute right-10 text-xs px-2 rounded-sm py-2 text-white w-max after:content-[''] after:absolute after:size-3 after:bg-black after:top-2.5 after:rotate-45">Add to cart</span>
          <img src={assets.shopping_bag_icon} className="w-4" />
        </span>
        <img src={imgUrl} className="w-full" alt="" />
      </div>
      <div className="py-2">
        <h6 className="text-sm font-noto-serif font-bold">{title}</h6>
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
