import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import assets from "../assets/assets";
import SubscribeEmail from "../components/SubscribeEmail";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, subtotal, setUpdatedCart } = useContext(CartContext);
  const [isChange, setIsChange] = useState(false);
  const [tempCart, setTempCart] = useState([]);
  const [tempSubTotal, setSubTotal] = useState(0);

  const handleChange = (e, index) => {
    if (!isChange) setIsChange(true);

    const newQuantity = parseInt(e.target.value);

    setTempCart((prev) => {
      const updatedCart = [...prev];
      updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
      return updatedCart;
    });
  };

  const RemoveBook = (id) => {
    if (!isChange) setIsChange(true);

    setTempCart((prev) => {
      const updatedCart = prev.filter((book) => book._id !== id);
      return updatedCart;
    });
  };

  const updateCart = () => {
    if (isChange) {
      setUpdatedCart(tempCart);
      setIsChange(false);
    }
  };

  useEffect(() => {
    const total = tempCart.reduce(
      (sum, book) => sum + book.quantity * book.price,
      0
    );
    setSubTotal(total?.toFixed(2));
  }, [tempCart]);

  useEffect(() => {
    setTempCart(cart);
    setSubTotal(subtotal);
  }, [cart]);

  return (
    <main className="py-6 bg-secondary">
      <section className="px-5 lg:px-20">
        <h2 className="text-2xl font-bold font-noto-serif">Cart</h2>
        {cart.length > 0 && (
          <table className="relative flex my-4 border border-black/10 lg:block">
            <thead className="flex-1 hidden border-b lg:flex text-black/70 border-black/10 bg-white/40">
              <tr className="flex justify-between w-full text-left">
                <th className="min-h-8 py-2 px-4 flex-[0.4] "></th>
                <th className="flex-1 px-4 py-2 min-h-8 "></th>
                <th className="flex-1 px-4 py-2 min-h-8 ">Product</th>
                <th className="flex-1 px-4 py-2 min-h-8 ">Price</th>
                <th className="flex-1 px-4 py-2 min-h-8 ">Quantity</th>
                <th className="flex-1 px-4 py-2 min-h-8 ">Subtotal</th>
              </tr>
            </thead>
            <tbody className="flex-1 lg:block lg:w-full">
              {cart &&
                tempCart.map((book, index) => (
                  <tr
                    key={index}
                    className="flex flex-col lg:justify-between lg:flex-row lg:w-full"
                  >
                    <td className="flex-[0.4] lg:flex justify-center items-center py-3 border-b border-black/15 px-4 text-right">
                      <button
                        onClick={() => RemoveBook(book._id)}
                        className="rounded-full border p-0.5 opacity-50 cursor-pointer"
                      >
                        <img
                          className="w-3.5"
                          src={assets.remove_icon}
                          alt=""
                        />
                      </button>
                    </td>
                    <td className="flex items-center justify-center px-4 py-3 border-b lg:flex-1 border-black/15 lg:justify-start">
                      <img className="w-17" src={book.cover} alt="Book Cover" />
                    </td>
                    <td className="flex justify-between px-4 py-3 border-b lg:flex-1 border-black/15 lg:items-center">
                      <h6 className="text-sm font-bold lg:hidden lg:text-base text-black/80">
                        Product:
                      </h6>
                      <Link
                        to={`/books/${book._id}`}
                        className="text-sm lg:text-base text-primary "
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td className="flex justify-between px-4 py-3 border-b lg:flex-1 border-black/15 lg:items-center">
                      <h6 className="text-sm font-bold lg:hidden lg:text-base text-black/80">
                        Price:
                      </h6>
                      <span className="text-sm lg:text-base text-black/80">
                        ${book.price?.toFixed(2)}
                      </span>
                    </td>
                    <td className="flex justify-between px-4 py-3 border-b lg:flex-1 border-black/15 lg:items-center">
                      <h6 className="text-sm font-bold lg:hidden lg:text-base text-black/80">
                        Quantity:
                      </h6>
                      <input
                        className="w-12 py-1 text-sm text-center bg-white border border-gray-300 outline-none lg:text-base text-black/70"
                        type="number"
                        name="quantity"
                        id="quantity"
                        onChange={(e) => handleChange(e, index)}
                        value={book.quantity}
                        min="1"
                        max="1000"
                      />
                    </td>
                    <td className="flex justify-between px-4 py-3 border-b lg:flex-1 border-black/15 lg:items-center">
                      <h6 className="text-sm font-bold lg:hidden lg:text-base text-black/80">
                        Subtotal:
                      </h6>
                      <span className="text-sm lg:text-base text-black/80">
                        ${(book.price * book.quantity).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}

              <tr className="flex justify-end p-4">
                <td className="w-full lg:w-fit">
                  <button
                    onClick={updateCart}
                    className={`w-full bg-primary text-black cursor-no-drop font-semibold px-4 py-3 ${
                      isChange
                        ? "opacity-100 cursor-pointer"
                        : "opacity-60 cursor-no-drop"
                    }`}
                  >
                    Update cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Cart Total */}
        {cart.length > 0 && (
          <div className="justify-end my-6 lg:flex">
            <div className="border border-black/15 lg:flex-[0.4]">
              <div className="px-4 py-2 border-b bg-white/70 border-black/15">
                <h3 className="text-base font-bold font-noto-serif">
                  Cart totals
                </h3>
              </div>
              <div className="px-4 py-6 text-sm flex flex-col items-center text-black/60">
                <div className="flex-1 w-full flex justify-between px-4 py-3 border-b border-black/15">
                  <p className="font-bold text-black/70">Subtotal:</p>
                  <span>${tempSubTotal}</span>
                </div>
                <div className="flex-1 w-full flex justify-between px-4 py-3 border-b border-black/15">
                  <p className="font-bold text-black/70">Total:</p>
                  <span>${tempSubTotal}</span>
                </div>
                <Link to="/checkout" className="w-full mt-5 text-base  text-center font-bold text-black cta-btn">
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </div>
        )}

        {cart.length < 1 && (
          <div className="pt-4 my-6 border-t-4 border-primary">
            <h4 className="text-sm text-gray-600"> Your cart is currently empty.</h4>
            <Link to="/product-category/all-books" className="mt-5 text-sm font-bold text-black cta-btn">
              Return to shop
            </Link>
          </div>
        )}
      </section>

      {/* Subscribe to Email Section */}
      <SubscribeEmail />
    </main>
  );
};

export default CartPage;
