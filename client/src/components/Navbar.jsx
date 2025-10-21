import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import assets from "../assets/assets.js";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const pathName = location.pathname;

  return (
    <nav className="px-2 relative flex justify-between items-center xl:px-16">
      <Link to="/">
        <img className="w-40 py-2" src={assets.nav_logo} alt="" />
      </Link>
      {/* hamburger - smaller screens */}
      <div className="mr-2 md:hidden">
        <Hamburger
          size={25}
          color="#FFC46B"
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>

      {/* Bigger screens */}
      {/* Links */}
      <div className="space-x-2 hidden md:flex xl:space-x-6 text-sm text-nowrap">
        <Link
          to="/product-category/all-books"
          className={`hover:text-primary transition py-8 px-2 ${
            pathName.includes("/product-category/all-books")
              ? "text-primary"
              : ""
          }`}
        >
          ALL BOOKS
        </Link>
        <Link
          to="/product-category/new-arrival"
          className={`hover:text-primary transition py-8 px-2 ${
            pathName.includes("/product-category/new-arrival")
              ? "text-primary"
              : ""
          }`}
        >
          NEW ARRIVAL
        </Link>
        <Link
          to="/product-category/best-seller"
          className={`hover:text-primary transition py-8 px-2 ${
            pathName.includes("/product-category/best-seller")
              ? "text-primary"
              : ""
          }`}
        >
          BEST SELLER
        </Link>
        <Link
          to="/product-category/editors-pick"
          className={`hover:text-primary transition py-8 px-2 ${
            pathName.includes("/product-category/editors-pick")
              ? "text-primary"
              : ""
          }`}
        >
          EDITORS PICK
        </Link>
        <Link
          to="/about"
          className={`hover:text-primary transition py-8 px-2 ${
            pathName.includes("/about") ? "text-primary" : ""
          }`}
        >
          ABOUT
        </Link>
        <Link
          to="/contact"
          className={`hover:text-primary transition py-8 px-2 ${
            pathName.includes("/contact") ? "text-primary" : ""
          }`}
        >
          CONTACT
        </Link>
      </div>
      {/* icons */}
      <div className="center hidden md:flex gap-4 lg:mr-2 xl:mr-6">
        <Link className="border-2 relative p-2">
          <span className="absolute size-4 bg-black rounded-full text-sm font-semibold text-white center -right-1 -top-1">
            1
          </span>
          <img className="size-5" src={assets.cart_icon} alt="" />
        </Link>
        <Link className="p-2">
          <img className="size-5" src={assets.account_icon} alt="" />
        </Link>
      </div>

      {/* Menu */}
        <div className={`absolute transition-all duration-300 z-50 top-full left-0 bg-secondary px-3 py-2 w-full h-fit ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
          <ul className="text-sm text-primary">
            <li className="py-3">
              <Link
                to="/product-category/all-books"
                className={`hover:text-primary transition py-8 px-2 ${
                  pathName.includes("/product-category/all-books")
                    ? "text-primary"
                    : ""
                }`}
              >
                All Books
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/product-category/new-arrival"
                className={`hover:text-primary transition py-8 px-2 ${
                  pathName.includes("/product-category/new-arrival")
                    ? "text-primary"
                    : ""
                }`}
              >
                New Arrival
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/product-category/best-seller"
                className={`hover:text-primary transition py-8 px-2 ${
                  pathName.includes("/product-category/best-seller")
                    ? "text-primary"
                    : ""
                }`}
              >
                Best Seller
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/product-category/editors-pick"
                className={`hover:text-primary transition py-8 px-2 ${
                  pathName.includes("/product-category/editors-pick")
                    ? "text-primary"
                    : ""
                }`}
              >
                Editors Pick
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/about"
                className={`hover:text-primary transition py-8 px-2 ${
                  pathName.includes("/about") ? "text-primary" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/contact"
                className={`hover:text-primary transition py-8 px-2 ${
                  pathName.includes("/contact") ? "text-primary" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
    </nav>
  );
};

export default Navbar;
