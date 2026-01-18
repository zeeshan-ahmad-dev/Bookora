import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import assets from "../assets/assets.js";
import Hamburger from "hamburger-react";
import { FaChevronDown } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext.jsx";
import api from "../api.js";
import { toast } from "react-toastify";

const Navbar = () => {
  const { cart, subtotal, removeBookFromCart } = useContext(CartContext);
  const { isLoggedIn, logoutUser, user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showCartMobile, setShowCartMobile] = useState(false);
  const [showAccountMobile, setShowAccountMobile] = useState(false);

  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      logoutUser();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-2 xl:px-16 bg-white/95">
      {/* Logo */}
      <Link to="/">
        <img className="w-40 py-2" src={assets.nav_logo} alt="Logo" />
      </Link>

      {/* Hamburger (mobile) */}
      <div className="flex items-center"> 
        {/* Cart Icon */}
        <Link to="/cart" className="relative lg:hidden block p-2 border-2 group-hover">
          <span className="absolute text-sm font-semibold text-white bg-black rounded-full size-4 center -right-1 -top-1">
            {cart?.length}
          </span>
          <img className="size-4" src={assets.cart_icon} alt="Cart" />
        </Link>
        <div className="mr-2 lg:hidden">
          <Hamburger
            size={25}
            color="#FFC46B"
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden space-x-2 text-sm lg:flex xl:space-x-6 text-nowrap">
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

      {/* Desktop Icons */}
      <div className="relative hidden gap-4 center lg:flex lg:mr-2 xl:mr-6">
        {/* Cart Icon */}
        <div className="relative group">
          <Link className="relative block p-2 border-2 group-hover">
            <span className="absolute text-sm font-semibold text-white bg-black rounded-full size-4 center -right-1 -top-1">
              {cart?.length}
            </span>
            <img className="size-5" src={assets.cart_icon} alt="Cart" />
          </Link>

          {/* Cart Dropdown */}
          <div className="absolute bg-white top-full right-0 w-fit pt-3 text-sm border border-black/15 text-center before:content-[''] before:size-2.5 before:absolute before:-top-1.5 before:right-2 before:rotate-45 before:bg-white before:border-t before:border-l before:border-black/15 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 min-w-68">
            {cart?.length > 0 ? (
              <>
                <div className="px-5 mb-2 overflow-y-scroll max-h-44">
                  {cart.map((book, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 items-start py-2 border-black/10 ${
                        cart.length - 1 === index ? "border-none" : "border-b"
                      }`}
                    >
                      <img
                        className="size-14"
                        src={book.cover}
                        alt={book.title}
                      />
                      <div className="flex-1 space-y-1 text-left">
                        <h6 className="text-sm">{book.title}</h6>
                        <p className="text-xs">
                          {book.quantity} x ${book.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeBookFromCart(book._id)}
                        className="rounded-full border p-0.5 opacity-50 cursor-pointer"
                      >
                        <img
                          className="w-3.5"
                          src={assets.remove_icon}
                          alt="Remove"
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between px-5 py-3 border-t border-b border-black/15">
                  <p>Subtotal:</p>
                  <p className="text-sm text-black/70">${subtotal}</p>
                </div>

                <div className="px-5 gap-1.5 my-3 flex flex-col">
                  <Link
                    to="/cart"
                    className="px-10 py-4 font-bold border cursor-pointer text-nowrap border-primary text-primary"
                  >
                    View cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="px-10 py-4 font-bold text-black border-none cursor-pointer text-nowrap bg-primary"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            ) : (
              <div className="px-5">
                <p className="my-2 font-light">No products in the cart.</p>
                <Link
                  to="/product-category/all-books"
                  className="inline-block px-10 py-4 mt-2 mb-4 font-bold border cursor-pointer text-nowrap border-primary text-primary"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Account Icon */}
        <div className="relative group">
          <Link className="relative block p-2 border-2 group-hover">
            <img className="size-5" src={assets.account_icon} alt="Account" />
          </Link>

          {/* Account Dropdown */}
          <div className="absolute bg-white top-full right-0 w-fit pt-3 text-base border border-black/15 text-center before:content-[''] before:size-2.5 before:absolute before:-top-1.5 before:right-2 before:rotate-45 before:bg-white before:border-t before:border-l before:border-black/15 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 min-w-68">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 px-5 py-3">
                <Link
                  to="/login"
                  className="px-10 py-4 font-bold border cursor-pointer text-nowrap border-primary text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-10 py-4 font-bold text-black cursor-pointer bg-primary text-nowrap"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="px-5 mb-3 text-left">
                {/* Profile picture */}
                <div className="flex items-center gap-3 mb-2">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="size-14 rounded-full object-cover border border-black/10"
                    />
                  ) : (
                    <div className="size-14 rounded-full flex justify-center items-center text-3xl font-semibold text-white font-noto-serif bg-primary">
                      {user.firstName[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">Hello, {user.firstName}</p>
                    <p className="text-xs text-black/60">Account Menu</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {!user?.isVerified && (
                    <button className="px-10 py-3 font-bold text-center border border-primary text-primary text-nowrap">
                      Verify Account
                    </button>
                  )}
                  <Link
                    to="/orders"
                    className="px-10 py-3 font-bold text-center border border-primary text-primary text-nowrap"
                  >
                    Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/books/add"
                      className="px-10 py-3 font-bold text-center border border-primary text-primary text-nowrap"
                    >
                      Add Book
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="px-10 py-3 font-bold text-center text-white bg-primary rounded text-nowrap"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute transition-all duration-300 z-50 top-full left-0 bg-secondary px-3 py-3 w-full h-fit lg:hidden ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <ul className="text-base text-primary flex flex-col gap-3">
          {/* Page Links */}
          <li>
            <Link to="/product-category/all-books">All Books</Link>
          </li>
          <li>
            <Link to="/product-category/new-arrival">New Arrival</Link>
          </li>
          <li>
            <Link to="/product-category/best-seller">Best Seller</Link>
          </li>
          <li>
            <Link to="/product-category/editors-pick">Editors Pick</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <hr className="my-2 border-black/10" />

          {/* Cart (mobile) */}
          <li>
            <button
              className="w-full text-left flex items-center justify-between text-base"
              onClick={() => setShowCartMobile(!showCartMobile)}
            >
              Cart ({cart?.length})
              <div className="pr-4">
                <FaChevronDown
                  className={`transform transition-all ${
                    showCartMobile ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </button>
            {showCartMobile && (
              <div className="px-3 my-2 py-2 border border-black/10 rounded-md text-base">
                {cart?.length > 0 ? (
                  cart.map((book, index) => (
                    <div key={index} className="flex justify-between py-1">
                      <span>{book.title}</span>
                      <span>
                        {book.quantity} x ${book.price}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-base">No items in cart</p>
                )}
                <p className="mt-2 font-semibold">Subtotal: ${subtotal}</p>
              </div>
            )}
          </li>

          {/* Account (mobile) */}
          <li>
            <button
              className="w-full text-left flex items-center justify-between text-base"
              onClick={() => setShowAccountMobile(!showAccountMobile)}
            >
              {isLoggedIn ? user.firstName : "Account"}
              <div className="pr-4">
                <FaChevronDown
                  className={`transform transition-all ${
                    showAccountMobile ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </button>
            {showAccountMobile && (
              <div className="flex flex-col gap-3 mt-2 py-2 px-3 text-base">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                ) : (
                  <>
                    <Link to="/orders">Orders</Link>
                    {user?.isAdmin && <Link to="/books/add">Add Book</Link>}
                    <button onClick={logout}>Logout</button>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
