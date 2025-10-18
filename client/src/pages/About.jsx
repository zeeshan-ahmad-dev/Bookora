import React from "react";
import assets from "../assets/assets";

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
      <section className="py-16 px-8 xl:px-16 space-y-6 bg-secondary">
        <div className="space-y-10">
          <div className="text-center text-pretty space-y-5">
            <h1 className="text-2xl font-bold font-noto-serif">
              Welcome to Bookworm
            </h1>
            <p className="text-sm leading-6 text-black/80">
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
        <div className="space-y-6">
          <div className="text-center text-pretty space-y-5">
            <h1 className="text-2xl font-bold font-noto-serif">Our Vision</h1>
            <p className="text-sm leading-6 text-black/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              eget condimentum enim libero ultricies amet odio fringilla. Ut
              nibh morbi augue porta aliquet commodo. Fermentum auctor lacus
              eget in ut integer viverra sed. Penatibus tortor consequat,
              habitasse non nisl.
            </p>
            <p className="text-sm leading-6 text-black/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus cras
              lacus tellus morbi viverra suspendisse ornare. Sit volutpat,
              volutpat ut netus malesuada enim penatibus non aliquet.
            </p>
          </div>
          <div className="px-3 pt-3 font-noto-serif text-center text-sm border-l-2">
            <b>
              Integ nosd quos cras demque sint fames sque optio aut Impedit
              metus quas neque accu minus be since 1918
            </b>
          </div>
          <div>
            <div className="text-center text-pretty space-y-5">
              <h1 className="text-2xl font-bold font-noto-serif">Our Mission</h1>
              <p className="text-sm leading-6 text-black/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                eget condimentum enim libero ultricies amet odio fringilla. Ut
                nibh morbi augue porta aliquet commodo. Fermentum auctor lacus
                eget in ut integer viverra sed. Penatibus tortor consequat,
                habitasse non nisl.
              </p>
              <p className="text-sm leading-6 text-black/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus
                cras lacus tellus morbi viverra suspendisse ornare. Sit
                volutpat, volutpat ut netus malesuada enim penatibus non
                aliquet.
              </p>
              <p className="text-sm leading-6 text-black/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus
                cras lacus tellus morbi viverra suspendisse ornare. Sit
                volutpat, volutpat ut netus malesuada enim penatibus non
                aliquet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
