import Item from "./Item";

const OrderSummary = ({ cart, isCheckoutSubmitting, subtotal }) => {
  return (
    <section className="sticky hidden p-12 space-y-6 bg-white lg:block pr-15">
            <div className="space-y-6">
              {cart &&
                cart.map((item) => (
                  <Item
                    key={item._id}
                    quantity={item.quantity}
                    cover={item.cover}
                    title={item.title}
                    price={item.price}
                  />
                ))}
            </div>
            <div className="items-center justify-center gap-3 lg:flex">
              <input
                className="flex-1 w-full h-full px-4 py-4 text-sm transition-all duration-300 rounded-md outline-none border-black/10 border-1 focus-within:border-primary focus-within:border-2"
                type="text"
                placeholder="Coupon Code"
              />
              <button
                type="submit"
                disabled={isCheckoutSubmitting}
                className="flex-[0.4] cursor-pointer bg-primary py-3.5 font-semibold text-black rounded-sm hover:bg-primary/90 transition-all"
              >
                Apply
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-xl">
                <span>Total:</span>
                <span>${subtotal}</span>
              </div>
            </div>
          </section>
  )
}

export default OrderSummary