import { createCheckoutSessionService, stripeWebHookService } from "../services/payment.service.js";

export const createCheckoutSession =  async (req, res, next) => {
  const userId = req.user._id
  const { products } = req.body;

  try {
    const { sessionUrl, orderId } = await createCheckoutSessionService(userId, products);

    res.json({ url: sessionUrl, orderId });
  } catch (error) {
    next(error);
  }
}

// Stripe webhook controller
export const stripeWebHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    await stripeWebHookService(sig, req.body)

    res.json({ received: true });
  } catch (error) {
    return res.status(400).send(`Webhook Error ${error.message}`);
  }
}