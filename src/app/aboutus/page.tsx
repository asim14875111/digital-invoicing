import React from "react";
import { aboutuscards } from "@/Constants/Framerdata";
export default function AboutusPage() {
  return (
    <div>
      <div className="text-center pt-40">
        <h1 className="text-5xl text-[#2d8eb8]">About Us</h1>
        <p className="text-gray-400 text-lg font-light pt-3">
          Empowering Pakistani businesses with seamless FBR-compliant digital
          invoicing solutions since 2024
        </p>
      </div>
      <div className="flex max-w-[1100px] justify-self-center gap-6 justify-center pt-20 pb-20">
        {aboutuscards.map((card) => (
          <div
            key={card.id}
            className="text-center bg-white rounded-md shadow-lg py-10 px-4 hover:-translate-y-1 transition duration-500"
          >
            <h2 className="text-2xl font-semibold">{card.title}</h2>
            <p className="text-sm text-gray-500 max-w-[600px] font-light pt-4">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center flex flex-col items-center pt-10">
        <h1 className="text-5xl text-[#2d8eb8]">Our Story</h1>
        <p className="text-gray-400 text-lg font-light pt-4 pb-26 max-w-[900px] ">
          FBR Invoice Pro was born from the frustration of dealing with complex
          tax compliance requirements. Our founders, experienced Pakistani
          entrepreneurs, recognized the need for a simple yet powerful digital
          invoicing solution that could seamlessly integrate with FBR
          requirements.{" "}
        </p>
      </div>
    </div>
  );
}
