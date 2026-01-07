import { ChevronDown } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import Item from "../components/checkout/Item";

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
  ]);

  const onSubmitCheckout = (data) => {
    console.log(data);
  };

  const errorMsg = "text-red-400 text-start text-xs my-2 ml-1";

  useEffect(() => {
    console.log(showOrderSummary);
  }, [showOrderSummary]);

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
            className="w-full px-4 py-3 text-sm outline-none border-black/10 border-1 rounded-md"
            type="text"
            placeholder="Coupon Code"
          />
          <button
            type="submit"
            disabled={isCheckoutSubmitting}
            className="w-full cursor-pointer bg-primary py-3 mt-2 text-lg font-semibold text-black rounded-sm hover:bg-primary/90 transition-all"
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

      <div className="flex justify-evenly border-y border-black/10 no-scrollbar">
        <form
          onSubmit={handleCheckoutSubmit(onSubmitCheckout)}
          className="hide-scrollbar p-5 md:p-8 lg:pl-20 lg:py-10 space-y-8 flex-1"
        >
          <div className="space-y-5">
            <h2 className="text-xl font-noto-serif font-bold capitalize">
              Contact
            </h2>
            <div>
              {/* Email */}
              <label
                htmlFor="email"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.email
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    emailValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Email Address
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    emailValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  {...checkout("email", {
                    required: "Email is required",
                  })}
                />
              </label>
              {checkoutErrors.email && (
                <p className={errorMsg}>{checkoutErrors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl mb-5 font-noto-serif font-bold capitalize">
              Billing details
            </h2>
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.firstName
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    firstNameValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  First Name
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    firstNameValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="First Name *"
                  id="firstName"
                  {...checkout("firstName", {
                    required: "First Name is required",
                  })}
                />
              </label>
              {checkoutErrors.firstName && (
                <p className={errorMsg}>{checkoutErrors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.lastName
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    lastNameValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Last Name
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    lastNameValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="Last Name *"
                  id="lastName"
                  {...checkout("lastName", {
                    required: "Last Name is required",
                  })}
                />
              </label>
              {checkoutErrors.lastName && (
                <p className={errorMsg}>{checkoutErrors.lastName.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.country
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    countryValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Country
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    countryValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="Country *"
                  id="country"
                  {...checkout("country", { required: "Country is required" })}
                />
              </label>
              {checkoutErrors.country && (
                <p className={errorMsg}>{checkoutErrors.country.message}</p>
              )}
            </div>

            {/* Street Address */}
            <div>
              <label
                htmlFor="StreetAddress"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.StreetAddress
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    StreetAddressValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Street Address
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    StreetAddressValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="Street Address *"
                  id="StreetAddress"
                  {...checkout("StreetAddress", {
                    required: "Street Address is required",
                  })}
                />
              </label>
              {checkoutErrors.StreetAddress && (
                <p className={errorMsg}>
                  {checkoutErrors.StreetAddress.message}
                </p>
              )}
            </div>

            {/* Building */}
            <div>
              <label
                htmlFor="building"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.building
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    buildingValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Building
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    buildingValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="Building *"
                  id="building"
                  {...checkout("building", {
                    required: "Building is required",
                  })}
                />
              </label>
              {checkoutErrors.building && (
                <p className={errorMsg}>{checkoutErrors.building.message}</p>
              )}
            </div>

            {/* Town / City */}
            <div>
              <label
                htmlFor="TownCity"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.TownCity
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    TownCityValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Town / City
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    TownCityValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="Town / City *"
                  id="TownCity"
                  {...checkout("TownCity", {
                    required: "Town / City is required",
                  })}
                />
              </label>
              {checkoutErrors.TownCity && (
                <p className={errorMsg}>{checkoutErrors.TownCity.message}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="State"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.State
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    StateValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  State
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    StateValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="State *"
                  id="State"
                  {...checkout("State", { required: "State is required" })}
                />
              </label>
              {checkoutErrors.State && (
                <p className={errorMsg}>{checkoutErrors.State.message}</p>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor="postalCode"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.postalCode
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    postalCodeValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Postal Code
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    postalCodeValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="text"
                  placeholder="Postal Code *"
                  id="postalCode"
                  {...checkout("postalCode", {
                    required: "Postal Code is required",
                  })}
                />
              </label>
              {checkoutErrors.postalCode && (
                <p className={errorMsg}>{checkoutErrors.postalCode.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.phone
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    phoneValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Phone
                </span>

                <input
                  className={`outline-none bg-transparent border-none transition-all ${
                    phoneValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="tel"
                  placeholder="Phone *"
                  id="phone"
                  {...checkout("phone", { required: "Phone is required" })}
                />
              </label>
              {checkoutErrors.phone && (
                <p className={errorMsg}>{checkoutErrors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl mb-5 font-noto-serif font-bold capitalize">
              Additional Information
            </h2>
            {/* Additional Info */}
            <div>
              <label
                htmlFor="email"
                className={`bg-white border border-black/10 cursor-text flex flex-col w-full px-3 py-4 rounded-sm group focus-within:border-primary focus-within:border text-sm relative ${
                  checkoutErrors.email
                    ? "outline outline-red-700 border-none"
                    : ""
                }`}
              >
                <span
                  className={`absolute transition-all -translate-y-3 text-gray-500 text-xs ${
                    emailValue?.length > 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Order notes(optional)
                </span>

                <textarea
                  className={`outline-none bg-transparent border-none transition-all ${
                    emailValue?.length > 0
                      ? "text-xs translate-y-2"
                      : "translate-y-0"
                  }`}
                  type="email"
                  placeholder="Note about your order, e.g. special notes for delivery."
                  id="email"
                  {...checkout("email", {
                    required: "Email is required",
                  })}
                ></textarea>
              </label>
              {checkoutErrors.email && (
                <p className={errorMsg}>{checkoutErrors.email.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isCheckoutSubmitting}
            className="w-full cursor-pointer bg-primary py-3 mt-2 text-lg font-semibold text-black rounded-sm hover:bg-primary/90 transition-all"
          >
            {isCheckoutSubmitting ? "Placing Order..." : "Place Order $40.00"}
          </button>
        </form>

        <section className="hidden lg:block border-l border-black/10 p-5 lg:p-12 lg:pr-15 space-y-6 flex-[0.9] bg-white">
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
          <div className="lg:flex justify-center items-center gap-3">
            <input
              className="w-full h-full px-4 py-4 flex-1 text-sm outline-none border-black/10 border-1 rounded-md focus-within:border-primary focus-within:border-2 transition-all duration-300"
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
      </div>
    </div>
  );
};

export default Checkout;