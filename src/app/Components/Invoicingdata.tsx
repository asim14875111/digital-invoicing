import React from "react";
import { RxExit } from "react-icons/rx";
import Customerdetails from "../Components/Customerdetails";
type InvoicingdataProps = {
    hidedetailsection : () => void
}
export default function Invoicingdata({hidedetailsection}: InvoicingdataProps) {
  return (
    <div className="pb-40">
      <div className="flex flex-col bg-gray-50 shadow-xl shadow-gray-200 w-[90%] justify-self-center rounded-sm mt-0 px-10 py-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex flex-row gap-2 items-center">
            <p
              onClick={hidedetailsection}
              className="text-xl cursor-pointer hover:scale-105 transition"
            >
              {" "}
              <RxExit />
            </p>
            <p className="text-2xl">Digital Invoicing</p>
          </div>
          <div className="flex gap-2 pb-4">
            <div className="flex flex-col bg-[#f3f4f6] pl-2 pr-12 py-1 border border-gray-300 rounded-md">
              <label className="text-[#4a5565] text-sm">SubTotal</label>
              <p>0</p>
            </div>
            <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
              <label className="text-[#4a5565] text-sm">Total Tax</label>
              <p>0</p>
            </div>
            <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
              <label className="text-[#4a5565] text-sm">Net Amount</label>
              <p>0</p>
            </div>
            <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
              <label className="text-[#4a5565] text-sm">Fbr Invoice No.</label>
              <p></p>
            </div>
            <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
              <label className="text-[#4a5565] text-sm">Transaction No.</label>
              <p></p>
            </div>
          </div>
        </div>
        <Customerdetails hidedetailsection={hidedetailsection} />
      </div>
      </div>
  );
}
