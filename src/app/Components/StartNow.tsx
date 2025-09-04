import React from "react";

export default function StartNow() {
  return (
    <div className="pt-20">
      <div className="flex flex-col items-center text-center bg-[#fcfdff] py-16">
        <h2 className="text-4xl font-bold text-gray-800">Ready to Get Started?</h2>
        <p className="text-gray-600 text-lg max-w-[560px] pt-4">
          Join thousands of Pakistani businesses already using invox
          for their digital invoicing needs.
        </p>
       <button className="bg-[#2d8eb8] px-16 py-1.5 cursor-pointer hover:bg-[#277394] transition  mt-6 text-white rounded-md">Start Now</button>
      </div>
    </div>
  );
}
