import { Link, Outlet } from "react-router-dom";
import assets from "../assets/assets.js";

const CheckoutLayout = () => {
  return (
    <>
      <nav className="px-2 relative flex justify-between items-center xl:px-16">
        <Link to="/">
          <img className="w-40 py-2" src={assets.nav_logo} alt="" />
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default CheckoutLayout;
