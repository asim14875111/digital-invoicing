import React from "react";
import { cards } from "../../Constants/Framerdata";
import Image from "next/image";
import gradient from "../../assests/images/Gradient.png";
import vector from "../../assests/images/Vector.png";
export default function WhyChooseUs() {
  return (
    <div className="bg-gradient-to-b from-[#FFFFFF] to-[#FAFAFA] pb-20">
      <div className="flex flex-col items-center pt-17 px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Why Choose Invox?</h1>
        <p className="text-[#6B7280] pt-4 text-lg text-center max-w-160">
          Built specifically for Pakistani businesses, our platform ensures
          compliance while making invoicing effortless and professional.
        </p>
      </div>
      <div className="grid grid-cols-1 w-full lg:w-fit sm:grid sm:grid-cols-2 px-6 mr-0 lg:grid lg:grid-cols-3 justify-self-center gap-6 lg:mr-3.5  pt-20">
        {cards.map((card) => (
          <div
            className="flex bg-gradient-to-r hover:scale-101 transition  from-[#FFFFFF] to-[#F0F6FF] flex-col relative bg-[#F0F6FF] pt-6  shadow-md shadow-gray-50 hover:shadow-xl rounded-md pl-4 pr-13"
            key={card.id}
          >
            <Image
              src={gradient}
              alt="gradient"
              className="absolute w-10 top-0 right-0"
            />
            <Image src={card.src} alt="img" width={44} height={44} />
            <h3 className="font-semibold text-[#111827] pt-5">{card.title}</h3>
            <p className="text-sm text-[#6B7280] max-w-full lg:max-w-80 pt-5 pb-6">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center border w-fit mt-15 justify-self-center px-6 py-2 rounded-full   border-[#3293b3] bg-[#3293b31a]">
        <Image src={vector} className="w-3.5 h-4" alt="vector" />
        <p className="text-[8px] sm:text-sm text-[#3293b3]">
          Trusted by 10,000+ Pakistani businesses for FBR compliance
        </p>
      </div>
    </div>
  );
}
