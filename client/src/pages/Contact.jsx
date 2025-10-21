import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import SubscribeEmail from "../components/SubscribeEmail";

const Contact = () => {
  return (
    <main>
      <section className="py-16 md:py-32 px-12 md:px-48 xl:px-68 text-center space-y-6 bg-hero">
        <h1 className="text-4xl md:text-6xl font-bold font-noto-serif">
          Contact Us
        </h1>
        <p className="text-sm text-black/80">
          Natoque euismod a hic porta. Auctor, consequatur occaecati magna natus
          pretium ornare ornare penatibus. Tempor viverra, erat veritatis
        </p>
      </section>
      <section className="py-16 px-8 lg:py-20 md:px-16 lg:px-44 xl:px-20 space-y-6 md:space-y-12 bg-white/95 lg:flex md:justify-start lg:gap-10">
        <div className="text-center md:text-left space-y-6 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
          <div className="space-y-4">
          <h4 className="text-lg lg:text-3xl font-noto-serif font-bold">Get In Touch</h4>
            <div className="flex flex-col md:flex-row justify-center md:justify-start md:items-center md:gap-4 space-y-4">
              <div className="flex justify-center">
                <FaMapMarkerAlt className="text-2xl text-primary text-center" />
              </div>
              <div>
                <h6 className="font-noto-serif lg:text-lg font-bold">Our Location</h6>
                <p className="text-sm font-black/60">
                  1569 2nd Ave, New York, NY 10028, USA
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start md:items-center md:gap-4 space-y-4">
              <div className="flex justify-center">
                <FaPhoneAlt className="text-2xl text-primary text-center" />
              </div>
              <div>
                <h6 className="font-noto-serif lg:text-lg font-bold">Call Us</h6>
                <p className="text-sm font-black/60">+39 123 456 7890</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start md:items-center md:gap-4 space-y-4">
              <div className="flex justify-center">
                <FaEnvelope className="text-2xl text-primary text-center" />
              </div>
              <div>
                <h6 className="font-noto-serif lg:text-lg font-bold">Email</h6>
                <p className="text-sm font-black/60">info@example.com</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg lg:text-3xl font-noto-serif font-bold">Follow Us</h4>
            <div className="flex gap-3 justify-center md:justify-start py-4 text-2xl text-white">
                <div className="bg-primary rounded-full p-2">
                    <FaFacebook />
                </div>
                <div className="bg-primary rounded-full p-2">
                    <FaTwitter />
                </div>
                <div className="bg-primary rounded-full p-2">
                    <FaInstagram />
                </div>
                <div className="bg-primary rounded-full p-2">
                    <FaYoutube />
                </div>
            </div>
          </div>
        </div>

        <form className="bg-secondary px-4 lg:px-10 py-12 space-y-6 lg:flex-[1.5]" name="contact" id="contact">
            <input type="text" placeholder="Your Name" className="bg-white border-black/15 border outline-none px-2 py-3 text-sm w-full" />
            <input type="email" placeholder="Your Email" className="bg-white border-black/15 border outline-none px-2 py-3 text-sm w-full" />
            <input type="text" placeholder="Subject" className="bg-white border-black/15 border outline-none px-2 py-3 text-sm w-full" />
            <textarea rows="5" type="text" placeholder="Message" className="bg-white border-black/15 border outline-none px-2 py-3 text-sm w-full" />
            <button className="cta-btn my-0">Submit</button>
        </form>
      </section>

      {/* Email Section */}
      <SubscribeEmail />
    </main>
  );
};

export default Contact;
