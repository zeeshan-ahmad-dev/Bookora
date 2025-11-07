import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import assets from "../assets/assets.js";
import Hamburger from "hamburger-react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart, subtotal } = useContext(CartContext);
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
      <div className="center hidden md:flex gap-4 lg:mr-2 xl:mr-6 relative">
        {/* Cart Icon */}
        <div className="relative group">
          <Link className="border-2 group-hover relative p-2 block">
            <span className="absolute size-4 bg-black rounded-full text-sm font-semibold text-white center -right-1 -top-1">
              {cart.length}
            </span>
            <img className="size-5" src={assets.cart_icon} alt="" />
          </Link>

          {/* Drop down */}
          <div className="absolute bg-white top-full right-0 w-fit pt-3 text-sm border border-black/15 text-center before:content-[''] before:size-2.5 before:absolute before:-top-1.5 before:right-2 before:rotate-45 before:bg-white before:border-t before:border-l before:border-black/15 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 min-w-68">
            {cart.length > 0 && (
              <div className="px-5 max-h-44 overflow-y-scroll mb-2">
                {cart.map((book, index) => (
                  <div
                    className={`flex gap-2 items-start py-2 border-black/10 ${
                      cart.length - 1 === index ? "border-none" : "border-b"
                    }`}
                  >
                    <div>
                      <img className="size-14" src={book.cover} alt="" />
                    </div>
                    <div className="flex-1 space-y-1 text-left">
                      <h6 className="text-sm">2024 Sanctuary</h6>
                      <p className="text-xs">1 x ${book.price}</p>
                    </div>
                    <button className="rounded-full border p-0.5 opacity-50 cursor-pointer">
                      <img className="w-3.5" src={assets.remove_icon} alt="" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-b border-black/15 py-3 px-5 flex justify-between">
                <p>Subtotal: </p>
                <p className="text-sm text-black/70">${subtotal}</p>
              </div>
            )}

            {cart.length > 0 && (
              <div className="px-5 gap-1.5 my-3 flex flex-col">
                <button className="border text-nowrap border-primary text-primary px-10 py-4 font-bold cursor-pointer">
                  View cart
                </button>
                <button className="border-none text-nowrap bg-primary text-black px-10 py-4 font-bold cursor-pointer">
                  Checkout
                </button>
              </div>
            )}
            {cart.length === 0 && (
              <div className="px-5">
                <p className="my-2 font-light">No products in the cart.</p>
                <button className="border mb-4 mt-2 text-nowrap border-primary text-primary px-10 py-4 font-bold cursor-pointer">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Icon */}
        <Link className="p-2">
          <img className="size-5" src={assets.account_icon} alt="" />
        </Link>
      </div>

      {/* Menu */}
      <div
        className={`absolute transition-all duration-300 z-50 top-full left-0 bg-secondary px-3 py-2 w-full h-fit ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
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
