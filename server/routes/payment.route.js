import express from "express";
import Stripe from "stripe";

const paymentRoutes = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);

paymentRoutes.post("/create-checkout-session", async (req, res) => {
    console.log(req.body)
    try {
        const { products } = req.body;

        const amount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.title,
                    images: [product.cover]
                },
                unit_amount: product.price * 100
            },
            quantity: product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/cancel",
        })

        res.json({url: session.url})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

export default paymentRoutes;