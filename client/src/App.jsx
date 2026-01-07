import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AllBooks from "./pages/AllBooks";
import NewArrival from "./pages/NewArrival";
import BestSeller from "./pages/BestSeller";
import EditorsPicks from "./pages/EditorsPicks";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddBook from "./pages/AddBook";
import ProductDetailPage from "./pages/ProductDetailPage";
import { ToastContainer } from "react-toastify";
import { CartContextProvider } from "./context/CartContext";
import { UserContextProvider } from "./context/UserContext";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import AuthSuccess from './pages/AuthSuccess'
import Checkout from "./pages/Checkout";
import CheckoutLayout from "./layouts/CheckoutLayout";

function App() {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route element={<CheckoutLayout />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/auth/success" element={<AuthSuccess />} />
              <Route
                path="/product-category/all-books"
                element={<AllBooks />}
              />
              <Route
                path="/product-category/new-arrival/"
                element={<NewArrival />}
              />
              <Route
                path="/product-category/best-seller"
                element={<BestSeller />}
              />
              <Route
                path="/product-category/editors-pick"
                element={<EditorsPicks />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/books/add" element={<AddBook />} />
              <Route path="/books/:id" element={<ProductDetailPage />}></Route>
            </Route>
          </Routes>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
