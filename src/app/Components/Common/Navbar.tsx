import Navbarlogo from "../../../assests/images/ChatGPT Image Sep 2, 2025, 06_29_14 PM.png";
import Image from "next/image";
export default function Navbar() {
  return (
    <div className="flex px-10 py-2 justify-between items-center bg-gray-50 shadow-md shadow-gray-200">
      <div className="flex items-center h-[40px] pt-2">
        <Image src={Navbarlogo} alt="navbar-logo" width={150} height={150} />
      </div>
      <div className="flex gap-6 items-center pr-6.5">
        <a className="text-[15px] font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition">
          About Us
        </a>
        <a className="text-[15px] font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition">
          Pricing
        </a>
        <a className="text-[15px] bg-[#233f88] text-white px-3 py-1 cursor-pointer hover:bg-blue-800 transition rounded-md">
          Contact us
        </a>
      </div>
    </div>
  );
}
