import express from "express";
import dotenv from "dotenv";
import cartRoute from "./routes/cart.route.js";
import authRoute from "./routes/auth.route.js";
import bookRoute from "./routes/book.route.js";
import connectDB from "./db/config.js";
import session from "express-session";
import cors from 'cors';
import mongoStore from 'connect-mongo';

dotenv.config();
connectDB(); // connect to database

const app = express();

app.use(express.json());
app.use(cors({origin: ["http://localhost:5173"], credentials: true}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({ // study this 
    mongoUrl: process.env.DB_URI,
    collectionName: "sessions",
  }),
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hi, you idiot");
});

app.use("/auth", authRoute);
app.use("/books", bookRoute);
app.use("/cart", cartRoute);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
