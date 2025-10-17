import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets.js";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-2 flex justify-between items-center xl:px-16">
      <img className="w-40 py-2" src={assets.nav_logo} alt="" />
      {/* hamburger - smaller screens */}
      <div className="mr-2 lg:hidden">
        <Hamburger
          size={25}
          color="#FFC46B"
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>

      {/* Bigger screens */}
      {/* Links */}
      <div className="space-x-2 hidden lg:flex xl:space-x-6 text-sm text-nowrap">
        <Link to="/product-category/all-books" className="hover:text-primary transition py-8 px-2">ALL BOOKS</Link>
        <Link to="/product-category/new-arrival" className="hover:text-primary transition py-8 px-2">NEW ARRIVAL</Link>
        <Link to="/product-category/best-seller" className="hover:text-primary transition py-8 px-2">BEST SELLER</Link>
        <Link to="/product-category/editors-pick" className="hover:text-primary transition py-8 px-2">EDITORS PICK</Link>
        <Link to="about" className="hover:text-primary transition py-8 px-2">ABOUT</Link>
        <Link to="contact" className="hover:text-primary transition py-8 px-2">CONTACT</Link>
      </div>
      {/* icons */}
      <div className="center hidden lg:flex gap-4 lg:mr-2 xl:mr-6">
        <Link className="border-2 relative p-2">
          <span className="absolute size-4 bg-black rounded-full text-sm font-semibold text-white center -right-1 -top-1">1</span>
          <img className="size-5" src={assets.cart_icon} alt="" />
        </Link>
        <Link className="p-2">
          <img className="size-5" src={assets.account_icon} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
