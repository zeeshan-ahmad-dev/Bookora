import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../context/CartContext";
import Item from "../components/checkout/Item";
import { ChevronDown } from "lucide-react";
import CheckoutInput from "../components/checkout/CheckoutInput";
import OrderSummary from "../components/checkout/OrderSummary";
import { makePayment } from "../services/payment";

const Checkout = () => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const {
    register: checkout,
    watch,
    handleSubmit: handleCheckoutSubmit,
    formState: { errors: checkoutErrors, isSubmitting: isCheckoutSubmitting },
  } = useForm();

  const { cart, subtotal } = useContext(CartContext);

  const [
    emailValue,
    firstNameValue,
    lastNameValue,
    countryValue,
    StreetAddressValue,
    buildingValue,
    TownCityValue,
    StateValue,
    postalCodeValue,
    phoneValue,
    infoValue,
  ] = watch([
    "email",
    "firstName",
    "lastName",
    "country",
    "StreetAddress",
    "building",
    "TownCity",
    "State",
    "postalCode",
    "phone",
    "info",
  ]);

  const handleCheckout = () => makePayment(cart);

  return (
    <div className="bg-secondary">
      <div className="lg:hidden flex justify-between border-y border-black/10 p-5 md:p-8 bg-[$555]">
        <button
          onClick={() => {
            setShowOrderSummary((prev) => !prev);
          }}
          className="flex gap-1 cursor-pointer"
        >
          {showOrderSummary ? "Hide" : "Show"} Order Summary
          <ChevronDown
            className={`transition-transform duration-300 ${
              showOrderSummary ? "rotate-180" : ""
            }`}
          />
        </button>
        <span className="text-xl">${subtotal}</span>
      </div>

      {/* Smaller Screen Books Info */}
      <section
        className={`lg:hidden bg-white transition-all duration-500 px-5 md:px-8 space-y-6 ${
          showOrderSummary
            ? "max-h-[1000px] py-5 md:py-8 opacity-100 "
            : "max-h-0 my-0 py-0 opacity-0"
        }`}
      >
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
        <div className="space-y-1">
          <input
            className="w-full px-4 py-3 text-sm rounded-md outline-none border-black/10 border-1"
            type="text"
            placeholder="Coupon Code"
          />
          <button
            type="submit"
            disabled={isCheckoutSubmitting}
            className="w-full py-3 mt-2 text-lg font-semibold text-black transition-all rounded-sm cursor-pointer bg-primary hover:bg-primary/90"
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

      <div className="block lg:flex lg:bg-white justify-evenly border-y border-black/10 no-scrollbar">
        <form
          onSubmit={handleCheckoutSubmit(handleCheckout)}
          className="flex-1 p-5 space-y-8 border-r hide-scrollbar bg-secondary border-black/10 md:p-8 lg:pl-20 lg:py-10"
        >
          <div className="space-y-5">
            <h2 className="text-xl font-bold capitalize font-noto-serif">
              Contact
            </h2>
            <CheckoutInput
              label={"Email Address"}
              id={"email"}
              register={checkout}
              errors={checkoutErrors}
              placeholder={"Email Address"}
              type="email"
              value={emailValue}
            />
          </div>
          <div className="space-y-3">
            <h2 className="mb-5 text-xl font-bold capitalize font-noto-serif">
              Billing details
            </h2>
            <div className="space-y-3 lg:flex justify-stretch lg:gap-3">
              <div className="flex-1">
                <CheckoutInput
                  label={"First Name"}
                  id={"firstName"}
                  register={checkout}
                  errors={checkoutErrors}
                  placeholder={"First Name"}
                  type="text"
                  value={firstNameValue}
                />
              </div>

              {/* Last Name */}
              <div className="flex-1">
                <CheckoutInput
                  label={"Last Name"}
                  id={"lastName"}
                  register={checkout}
                  errors={checkoutErrors}
                  placeholder={"Last Name"}
                  type="text"
                  value={lastNameValue}
                />
              </div>
            </div>

            {/* Country */}
            <CheckoutInput
              label={"Country"}
              id={"country"}
              register={checkout}
              errors={checkoutErrors}
              placeholder={"Country"}
              type="text"
              value={countryValue}
            />

            {/* Street Address */}
            <CheckoutInput
              label={"Street Address"}
              id={"StreetAddress"}
              register={checkout}
              errors={checkoutErrors}
              placeholder={"Street Address"}
              type="text"
              value={StreetAddressValue}
            />

            {/* Building */}
            <CheckoutInput
              label={"Building"}
              placeholder={"Building"}
              id={"building"}
              register={checkout}
              errors={checkoutErrors}
              type="text"
              value={buildingValue}
            />

            <div className="space-y-3 md:flex justify-stretch md:gap-3">
              {/* Town / City */}
              <div className="flex-1">
                <CheckoutInput
                  label={"Town / City"}
                  placeholder={"Town / City"}
                  id={"TownCity"}
                  register={checkout}
                  errors={checkoutErrors}
                  type="text"
                  value={TownCityValue}
                />
              </div>

              {/* State */}
              <div className="flex-1">
                <CheckoutInput
                  label={"State"}
                  placeholder={"State"}
                  id={"State"}
                  register={checkout}
                  errors={checkoutErrors}
                  type="text"
                  value={StateValue}
                />
              </div>

              {/* Postal Code */}
              <div className="flex-1">
                <CheckoutInput
                  label={"Postal Code"}
                  placeholder={"Postal Code"}
                  id={"postalCode"}
                  register={checkout}
                  errors={checkoutErrors}
                  type="text"
                  value={postalCodeValue}
                />
              </div>
            </div>

            {/* Phone */}
            <CheckoutInput
              label={"Phone"}
              placeholder={"Phone"}
              id={"phone"}
              register={checkout}
              errors={checkoutErrors}
              type="text"
              value={phoneValue}
            />
          </div>

          <div className="space-y-3">
            <h2 className="mb-5 text-xl font-bold capitalize font-noto-serif">
              Additional Information
            </h2>
            {/* Additional Info */}
            <CheckoutInput
              label={"Order notes(optional)"}
              placeholder={
                "Note about your order, e.g. special notes for delivery."
              }
              id={"info"}
              register={checkout}
              errors={checkoutErrors}
              type="text"
              value={infoValue}
              required={false}
            />
          </div>

          <button
            type="submit"
            disabled={isCheckoutSubmitting}
            className="w-full py-3 mt-2 text-lg font-semibold text-black transition-all rounded-sm cursor-pointer bg-primary hover:bg-primary/90"
          >
            {isCheckoutSubmitting
              ? "Placing Order..."
              : `Place Order $${subtotal}`}
          </button>
        </form>

        <div className="flex-[0.9] h-[100%] ">
          <OrderSummary
            cart={cart}
            isCheckoutSubmitting={isCheckoutSubmitting}
            subtotal={subtotal}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
