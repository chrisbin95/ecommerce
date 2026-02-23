import React from "react"
import SlideCard from "./SlideCard"

const SliderHome = () => {
  return (
    <section className="homeSlide md:py-12 lg:py-0 w-full overflow-hidden">
      <div className="container mx-auto px-4 py-4">
        <SlideCard />
      </div>
    </section>
  );
};

export default SliderHome
