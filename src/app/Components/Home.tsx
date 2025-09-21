import React from "react";
import Herosection from "./Herosection";
// Just comment
import WhyChooseUs from "./WhyChooseUs";
import HowitWorks from "./HowitWorks";
import StartNow from "./StartNow";
import Footer from "./Common/Footer";
export default function Landingpage() {
  return (
    <div>
      <Herosection />
      <WhyChooseUs />
      <HowitWorks />
      <StartNow />
      <Footer />
    </div>
  );
}
