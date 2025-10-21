import assets from "../assets/assets";
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedin,
} from "react-icons/fa";
import SubscribeEmail from "../components/SubscribeEmail";

const authors = [
  {
    title: "Author",
    name: "Melissa Miner",
    image: assets.author_image1,
  },
  {
    title: "Author",
    name: "Steven Moore",
    image: assets.author_image2,
  },
  {
    title: "Author",
    name: "Jenny Sanders",
    image: assets.author_image3,
  },
  {
    title: "Author",
    name: "Andrew Woods",
    image: assets.author_image4,
  },
];

const About = () => {
  return (
    <main>
      <section className="py-16 md:py-32 px-12 md:px-48 xl:px-68 text-center space-y-6 bg-hero">
        <h1 className="text-4xl md:text-6xl font-bold font-noto-serif">
          About Us
        </h1>
        <p className="text-sm text-black/80">
          Natoque euismod a hic porta. Auctor, consequatur occaecati magna natus
          pretium ornare ornare penatibus. Tempor viverra, erat veritatis
        </p>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-8 md:px-16 lg:px-44 xl:px-20 space-y-6 md:space-y-12 bg-secondary lg:flex lg:gap-10">
        <div className="space-y-10 md:flex md:flex-col md:items-center lg:items-start">
          <div className="text-center lg:text-left text-pretty space-y-5 md:space-y-3 lg:space-y-6">
            <h1 className="about-h1">Welcome to Bookworm</h1>
            <p className="about-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              eget condimentum enim libero ultricies amet odio fringilla. Ut
              nibh morbi augue porta aliquet commodo. Fermentum auctor lacus
              eget in ut integer viverra sed. Penatibus tortor consequat,
              habitasse non nisl.
            </p>
          </div>
          <div>
            <img src={assets.about_image} alt="" />
          </div>
        </div>
        <div className="space-y-6 xl:space-y-8 ">
          <div className="text-center xl:text-left text-pretty space-y-5 md:space-y-3 xl:space-y-8">
            <h1 className="about-h1">Our Vision</h1>
            <p className="about-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              eget condimentum enim libero ultricies amet odio fringilla. Ut
              nibh morbi augue porta aliquet commodo. Fermentum auctor lacus
              eget in ut integer viverra sed. Penatibus tortor consequat,
              habitasse non nisl.
            </p>
            <p className="about-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus cras
              lacus tellus morbi viverra suspendisse ornare. Sit volutpat,
              volutpat ut netus malesuada enim penatibus non aliquet.
            </p>
          </div>
          <div className="px-3 pt-3 xl:pt-0 font-noto-serif text-center xl:text-left text-sm xl:text-base border-l-2 md:border-l-[3px]">
            <b>
              Integ nosd quos cras demque sint fames sque optio aut Impedit
              metus quas neque accu minus be since 1918
            </b>
          </div>
          <div>
            <div className="text-center xl:text-left text-pretty space-y-5">
              <h1 className="about-h1">Our Mission</h1>
              <p className="about-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                eget condimentum enim libero ultricies amet odio fringilla. Ut
                nibh morbi augue porta aliquet commodo. Fermentum auctor lacus
                eget in ut integer viverra sed. Penatibus tortor consequat,
                habitasse non nisl.
              </p>
              <p className="about-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus
                cras lacus tellus morbi viverra suspendisse ornare. Sit
                volutpat, volutpat ut netus malesuada enim penatibus non
                aliquet.
              </p>
              <p className="about-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus
                cras lacus tellus morbi viverra suspendisse ornare. Sit
                volutpat, volutpat ut netus malesuada enim penatibus non
                aliquet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Authors */}
      <section className="py-16 md:py-20 px-10 md:px-16 lg:px-44 xl:px-24 space-y-4 md:space-y-12 bg-white/95 text-center">
        <div className="space-y-6 lg:px-60">
          <h1 className="text-[1.75rem] md:text-4xl lg:text-5xl font-bold font-noto-serif">
            Most Popular Authors
          </h1>
          <p className="text-sm text-black/80 leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20 xl:gap-16">
          {authors.map((author, index) => (
            <div key={index}>
              <div>
                <img src={author.image} alt="" />
              </div>
              <div className="pt-6 md:text-left">
                <h6 className="font-noto-serif lg:text-2xl font-bold">
                  {author.name}
                </h6>
                <p className="text-black/80">{author.title}</p>
                <div className="flex items-center justify-center md:justify-start pt-4 gap-4">
                  <div className="p-2 bg-primary rounded-full">
                    <FaFacebookSquare />
                  </div>
                  <div className="p-2 bg-primary rounded-full">
                    <FaLinkedin />
                  </div>
                  <div className="p-2 bg-primary rounded-full">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visit Insta Section */}
      <section className="py-8 md:py-10 px-10 md:px-16 lg:px-44 space-y-4 bg-secondary text-center flex flex-col items-center">
        <FaInstagram className="text-3xl lg:text-5xl" />
        <h1 className="text-2xl lg:text-4xl font-noto-serif font-bold">
          Follow @bookora
        </h1>
        <p className="text-sm font-light">
          Leo nulla cras augue eros, diam vivamus et lectus volutpat at facilisi
          tortor porta
        </p>
        <a
          href="https://www.instagram.com/zeeshanahmad5445/"
          className="cta-btn flex mt-2 items-center gap-1"
        >
          <FaInstagram />
          View Instagram
        </a>
      </section>

      {/* Instagram Feed image */}
      <section className="w-full">
        <img src={assets.instagram_feed} className="w-full" alt="" />
      </section>

      <SubscribeEmail />
    </main>
  );
};

export default About;
