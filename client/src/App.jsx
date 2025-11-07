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

function App() {
  return (
    <>
      <CartContextProvider>
        <ToastContainer />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product-category/all-books" element={<AllBooks />} />
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
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/books/:id" element={<ProductDetailPage />}></Route>
          </Route>
        </Routes>
      </CartContextProvider>
    </>
  );
}

export default App;
