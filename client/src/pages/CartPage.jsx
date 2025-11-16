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
    if (!isChange) setIsChange(true); // Sets true to isChange

    const newQuantity = parseInt(e.target.value);

    console.log(e);
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
    const total = tempCart.reduce((sum, book) => sum + book.quantity * book.price, 0);
    setSubTotal(total?.toFixed(2));
    console.log(tempCart);
  }, [tempCart, RemoveBook]);

  useEffect(() => {
    console.log("From my end", cart);
    setTempCart(cart);
    setSubTotal(subtotal);
  }, [cart]);

  return (
    <main className="bg-secondary py-6">
      <section className="px-5 lg:px-20">
        <h2 className="text-2xl font-noto-serif font-bold">Cart</h2>
        <table className="flex border border-black/10 lg:block my-4 relative">
          <thead className="flex-1 lg:flex hidden border-b text-black/70 border-black/10 bg-white/40">
            <tr className="flex justify-between w-full text-left">
              <th className="min-h-8 py-2 px-4 flex-[0.4] "></th>
              <th className="min-h-8 py-2 px-4 flex-1 "></th>
              <th className="min-h-8 py-2 px-4 flex-1 ">Product</th>
              <th className="min-h-8 py-2 px-4 flex-1 ">Price</th>
              <th className="min-h-8 py-2 px-4 flex-1 ">Quantity</th>
              <th className="min-h-8 py-2 px-4 flex-1 ">Subtotal</th>
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
                    <button onClick={() => RemoveBook(book._id)} className="rounded-full border p-0.5 opacity-50 cursor-pointer">
                      <img className="w-3.5" src={assets.remove_icon} alt="" />
                    </button>
                  </td>
                  <td className="lg:flex-1 py-3 border-b border-black/15 px-4 flex justify-center lg:justify-start items-center">
                    <img className="w-17" src={book.cover} alt="Book Cover" />
                  </td>
                  <td className="lg:flex-1 py-3 border-b border-black/15 px-4 flex justify-between lg:items-center">
                    <h6 className="lg:hidden font-bold text-sm lg:text-base text-black/80">
                      Product:
                    </h6>
                    <Link
                      to={`/books/${book._id}`}
                      className="text-sm lg:text-base text-primary "
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="lg:flex-1 py-3 border-b border-black/15 px-4 flex justify-between lg:items-center">
                    <h6 className="lg:hidden font-bold text-sm lg:text-base text-black/80">
                      Price:
                    </h6>
                    <span className="text-sm lg:text-base text-black/80">
                      ${book.price?.toFixed(2)}
                    </span>
                  </td>
                  <td className="lg:flex-1 py-3 border-b border-black/15 px-4 flex justify-between lg:items-center">
                    <h6 className="lg:hidden font-bold text-sm lg:text-base text-black/80">
                      Quantity:
                    </h6>
                    <input
                      className="bg-white text-sm lg:text-base text-black/70 border border-gray-300 outline-none w-12 text-center py-1"
                      type="number"
                      name="quantity"
                      id="quantity"
                      onChange={(e) => handleChange(e, index)}
                      value={book.quantity}
                      min="1"
                      max="1000"
                    />
                  </td>
                  <td className="lg:flex-1 py-3 border-b border-black/15 px-4 flex justify-between lg:items-center">
                    <h6 className="lg:hidden font-bold text-sm lg:text-base text-black/80">
                      Subtotal:
                    </h6>
                    <span className="text-sm lg:text-base text-black/80">
                      ${(book.price * book.quantity).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}

            <tr className="p-4 flex justify-end">
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

        {/* Cart Total */}
        <div className="my-6 lg:flex justify-end">
          <div className="border border-black/15 lg:flex-[0.4]">
            <div className="bg-white/70 px-4 py-2 border-b border-black/15">
              <h3 className="text-base font-noto-serif font-bold">
                Cart totals
              </h3>
            </div>
            <div className="px-4 py-6 text-sm text-black/60">
              <div className="flex justify-between border-b py-3 px-4 border-black/15">
                <p className="font-bold text-black/70">Subtotal:</p>
                <span>${tempSubTotal}</span>
              </div>
              <div className="flex justify-between border-b py-3 px-4 border-black/15">
                <p className="font-bold text-black/70">Total:</p>
                <span>${tempSubTotal}</span>
              </div>
              <button className="cta-btn font-bold text-black text-base w-full mt-5">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe to Email Section */}
      <SubscribeEmail />
    </main>
  );
};

export default CartPage;
