import Stripe from "stripe";
import Order from "../model/order.model.js";
import Book from "../model/book.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

// todo: Create service file 
export const createCheckoutSession =  async (req, res) => {
  try {
    const userId = req.user._id
    const { products } = req.body;

    const amount = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/cancel",
      metadata: {
        orderId: order._id.toString()
      },
    });

    console.log("sesion url: ", session.url);

    res.json({ url: session.url, orderId: order._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Stripe webhook controller
export const stripeWebHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const order = await Order.findById(session.metadata.orderId);

      order.products.forEach(async (book) => {
        await Book.findByIdAndUpdate(book._id, {
          $inc: {sales: book.quantity || 1}
        })
      });

      await Order.findByIdAndUpdate(
        session.metadata.orderId,
        {
            payment_status: "paid",
            stripe_session_id: session.id
        }
      )
    }

    res.json({ received: true });
  } catch (error) {
    console.log("Webhook signature verification failed: ", error.message);
    return res.status(400).send(`Webhook Error ${error.message}`);
  }
}