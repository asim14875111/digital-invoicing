import React from "react";
import Link from "next/link";
export default function Sidebar() {
  return (
    <div className=" ">
      <div className="flex pl-0  border-r w-[260px]  border-gray-200 h-[100vh] bg-gray-50 flex-col gap-2 pt-6">
        <Link
          href="/company"
          className="pl-12 text-lg font-semibold text-gray-800 hover:bg-gray-200 rounded-r-2xl"
        >
          <div className="">Company</div>
        </Link>
        <Link
          href="/invoice"
          className="pl-12 text-lg hover:bg-gray-200 rounded-r-2xl mt-2 font-semibold text-gray-800"
        >
          <div className=" ">Digital invoicing</div>
        </Link>
        <Link
          href="/integration"
          className="pl-12 text-lg hover:bg-gray-200 rounded-r-2xl mt-2 font-semibold text-gray-800"
        >
          <div className="">Integration settings</div>
        </Link>

        <div className="pl-12 text-lg font-semibold text-gray-800 mt-2 hover:bg-gray-200 rounded-r-2xl cursor-pointer">
          Logout
        </div>
      </div>
      {/* <div>2</div> */}
    </div>
  );
}
