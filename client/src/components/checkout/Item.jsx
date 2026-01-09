import React from "react";

const Item = ({ quantity, cover, title, price }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3 text-sm text-black/80">
        <div className="relative">
          <div className="absolute bg-primary rounded-full size-5.5 -right-3 -top-3 z-40 grid place-content-center text-xs text-white font-semibold">
            {quantity}
          </div>
          <img className="w-14 lg:w-16 rounded-sm" src={cover} alt="" />
        </div>
        <span>{title}</span>
      </div>
      <div className="text-black/80">${price}</div>
    </div>
  );
};

export default Item;
