import React from "react";
import { howitworkscards } from "@/Constants/Framerdata";
import Image from "next/image";
export default function HowitWorks() {
  return (
    <div className="">
      <div className="flex flex-col items-center pt-19.5 px-4">
        <h2 className="text-4xl font-bold text-gray-800">How it Works</h2>
        <p className="text-[#6B7280] pt-4 text-lg text-center max-w-160">
          Get started with FBR-compliant digital invoicing in three simple
          steps. No technical expertise required.
        </p>
      </div>
      <div className="grid grid-cols-1 w-full lg:w-fit sm:grid sm:grid-col-2 lg:grid lg:grid-cols-3 justify-self-center pt-14 gap-6 max-w-[1212px] px-4 lg:px-0 lg:mr-3">
        {howitworkscards.map((card,i) => (
          <div
            key={card.id}
            className="text-center bg-gradient-to-r hover:-translate-y-2 transition duration-500 hover:shadow-xl from-[#FFFFFF] to-[#F0F6FF] px-4  pb-7 pt-8 rounded-xl shadow-lg"
          >
            <Image
              src={card.src}
              alt="card-img"
              className="w-13 justify-self-center pb-5"
            />
            <h4 className="text-4xl font-semibold text-gray-300">
              {card.numbering}
            </h4>
            <h1 className="font-semibold text-2xl pt-4">{card.heading}</h1>
            <p className={`text-gray-600 text-sm ${i === 2 ? "pt-6" : "pt-4"} max-w-full lg:max-w-[400px] leading-6`}>
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
