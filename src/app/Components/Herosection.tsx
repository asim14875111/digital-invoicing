import React from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import heroimg from "../../assests/images/Overlay+Shadow.png";
import Image from "next/image";
export default function Herosection() {
  return (
    <div className="flex flex-col px-4 lg:flex lg:flex-row justify-center gap-20 pt-20 pb-14 bg-[#f4fafa]">
      <div className="flex flex-col">
        <div className="flex gap-1 bg-[#dbeff6] w-fit border border-[#3a91ad]  px-6 py-1 text-[#3a91ad] rounded-full">
          <p className="text-[13px] flex items-center gap-2 font-light">
            <span className="text-base ">
              <IoShieldCheckmarkOutline />
            </span>
            FBR Compliant & Secure
          </p>
        </div>
        <div className="pt-5">
          <h2 className="text-[55px] lg:text-[65px]  leading-18 font-bold max-w-full lg:max-w-140 text-gray-700">
            Digital Invoicing{" "}
            <span className="text-[#3a91ad]">Made Simple</span>
          </h2>
          <p className="text-gray-600 max-w-full pr-4 lg:pr-0 lg:max-w-145 pt-3 text-lg">
            Streamline your business with FBR-compliant digital invoicing. Send
            professional invoices, track payments, and ensure tax compliance
            with Pakistans leading invoicing solution.
          </p>
        </div>
        <div className="pt-14.5 flex flex-col w-full  lg:flex lg:flex-row gap-2">
          <p className="bg-[#2d8eb8] px-14 rounded-lg w-full lg:w-fit text-center cursor-pointer hover:bg-[#32718c] shadow transition text-xl lg:text-sm font-light py-2.5  text-white">
            Start Now
          </p>
          <p className="bg-white px-9 rounded-lg cursor-pointer border border-gray-200 hover:text-white hover:bg-gray-400 shadow transition lg:text-sm font-light lg:py-2 text-center py-2.5 text-xl w-full lg:w-fit text-black">
            Watch Demo
          </p>
        </div>
      </div>
      <div className="w-full lg:w-[570px] pt-7.5">
        <Image src={heroimg} alt="hero-img" className="w-full" />
      </div>
    </div>
  );
}
