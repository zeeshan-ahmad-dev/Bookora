import assets from "../assets/assets";
import {Link} from 'react-router-dom';
import { FaFacebookSquare, FaInstagramSquare, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center space-y-20 pt-16 bg-black text-white">
      <div className="flex text-center md:pl-2 md:pr-6 xl:px-24 flex-col md:flex-row items-center md:items-start md:gap-10 xl:gap-28">
        <div className="size-fit">
          <img className="w-58 py-2" src={assets.footer_logo} alt="" />
        </div>
        <div className="space-y-10 md:flex justify-between md:gap-40 xl:gap-48 md:text-left">
          <div className="space-y-6">
              <h4 className="text-xl font-semibold font-noto-serif">Quick Links</h4>
              <ul className="text-primary text-sm md:text-base">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/books">Books</Link></li>
                  <li><Link to="/deals">Deals</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
              </ul>
          </div>

          {/* Explore */}
          <div className="space-y-6">
              <h4 className="text-xl font-semibold font-noto-serif">Explore</h4>
              <ul className="text-primary text-sm md:text-base">
                  <li><Link to="/bestsellers">Bestsellers</Link></li>
                  <li><Link to="/on-sale">On Sale</Link></li>
                  <li><Link to="/editors-pick">Editors Pick</Link></li>
                  <li><Link to="/best-of-2022">Best Of 2022</Link></li>
                  <li><Link to="/featured">Featured</Link></li>
              </ul>
          </div>

          {/* Help */}
          <div className="space-y-6">
              <h4 className="text-xl font-semibold font-noto-serif">Help</h4>
              <ul className="text-primary text-sm md:text-base">
                  <li><Link to="/track-order">Track Order</Link></li>
                  <li><Link to="/delivery-returns">Delivery & Returns</Link></li>
                  <li><Link to="/faqs">FAQs</Link></li>
                  <li><Link to="/community">Community</Link></li>
              </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/70 px-16 md:px-0 xl:px-24 py-6 flex flex-col md:flex-row md:justify-around lg:justify-between items-center space-y-3">
        <p className="text-xs md:w-60 lg:w-80 lg:text-left">Copyright © 2025 Book Worms | Powered by Book Worms</p>
        <div className="w-fit md:mr-36">
          <img src={assets.cards_image} className="w-fit" alt="" />
        </div>
        <div className="flex text-xl gap-3 mb-2 md:mb-10">
          <FaFacebookSquare />
          <FaTwitter />
          <FaInstagramSquare />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
