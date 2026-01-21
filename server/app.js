import express from "express";
import dotenv from "dotenv";
import cartRoute from "./routes/cart.route.js";
import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";
import paymentRoute from "./routes/payment.route.js";
import orderRoute from "./routes/order.route.js";
import connectDB from "./db/config.js";
import session from "express-session";
import cors from "cors";
import mongoStore from "connect-mongo";
import passport from "./config/passport.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { stripeWebHook } from "./controllers/payment.controller.js";

dotenv.config();
connectDB(); // connect to database

const app = express();
const PORT = process.env.PORT;

app.set("trust proxy", 1); // ✅ REQUIRED FOR RAILWAY / VERCEL

app.use(cors({ origin: ["http://localhost:5173", "https://bookora-z.vercel.app"], credentials: true }));
app.use("/payment/webhook", express.raw({ type: "application/json" }), stripeWebHook); // for stripe webhook
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/books", bookRoute);
app.use("/cart", cartRoute);
app.use("/payment", paymentRoute);
app.use("/orders", orderRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
