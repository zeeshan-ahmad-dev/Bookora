import Stripe from "stripe";
import Order from "../model/order.model.js";
import Book from "../model/book.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

/**
 * Creates a Stripe session for the user's selected products
 *
 * @param { string } userId The Id of the user
 * @param { Array<Object> } products Array of products objects to purchase
 * @returns { Promise<Object> } Retrns an object containing:
 *          - sessionUrl: string (Stripe checkout session URL)
 *          - orderId: string (Id of the newly created order)
 * @throws {Error} Throws an error if order creation or Stripe session fails
 */
export const createCheckoutSessionService = async (userId, products) => {
  try {
    const amount = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0,
    );

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.cover],
        },
        unit_amount: Math.floor(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const order = await Order.create({
      user: userId,
      products,
      amount,
      payment_status: "pending",
    });

    console.log("Frontend url",process.env.FRONTEND_URL);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return { sessionUrl: session.url, orderId: order._id };
  } catch (error) {
    throw error;
  }
};

/**
 * Checks if payment was successful, updates order payment_status and book sales
 *
 * @param { string } sig Stripe signature from headers
 * @param { object } payload Raw body from webhook request
 * @returns { Promise<string> } returns the type of stripe event processed
 * @throws { Error } Throws an error if Stripe signature verification fails or DB update fails
 */
export const stripeWebHookService = async (sig, payload) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const order = await Order.findById(session.metadata.orderId);

      await Promise.all(
        order.products.map((book) =>
          Book.findByIdAndUpdate(book._id, {
            $inc: { sales: book.quantity || 1 },
          }),
        ),
      );

      await Order.findByIdAndUpdate(session.metadata.orderId, {
        payment_status: "paid",
        stripe_session_id: session.id,
      });
    }

    return event.type;
  } catch (error) {
    throw error;
  }
};
