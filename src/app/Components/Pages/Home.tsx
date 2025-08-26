"use client";
import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { IoChevronUp } from "react-icons/io5";

import { IoIosSearch } from "react-icons/io";
import { transactiondata } from "../transactiondata";
export default function Home() {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(true);
  const [date, setDate] = useState<string>("");
  const [types, setTypes] = useState("");
  const [transactionTypes, setTransactionTypes] = useState<boolean>(false);
  const [customerdetails, setCustomerDetails] = useState<boolean>(false);
  const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevrondown, setChevrondown] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState(transactiondata);
  const showtransactiontypes = (): void => {
    if (transactionTypes) {
      setTransactionTypes(false);
      setChevronup(false);
      setChevrondown(true);
    } else {
      setChevronup(true);
      setChevrondown(false);
      setTransactionTypes(true);
    }
  };

  const showhiddendiv = (): void => {
    setIsVisible(true);
    setDisplay(false);
  };
  const hidedetailsection = (): void => {
    setIsVisible(false);
    setDisplay(true);
  };

  const savevalue = (value: string): void => {
    setTransactionTypes(false);
    setTypes(value);
  };

  const showcustomerdetails = () => {
    if (customerdetails) {
      setCustomerDetails(false);
    } else {
      setCustomerDetails(true);
    }
  };

  const handlefilterdata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const SearchTerm = e.target.value;
    const filteritems = transactiondata.filter((data) =>
      data.title.toLowerCase().includes(SearchTerm.toLowerCase())
    );
    setFilteredData(filteritems);
  };

  return (
    <div>
      <div className="flex justify-end px-10">
        {display && (
          <button
            onClick={() => showhiddendiv()}
            className="bg-green-700 flex items-center gap-2 cursor-pointer hover:bg-green-800 text-white  px-4 py-1 rounded-sm"
          >
            Add New
            <IoMdAdd />
          </button>
        )}
      </div>
      {visible && (
        // <form className="">
        <div className="flex flex-col bg-white w-[90%] justify-self-center rounded-sm mt-6 px-10 py-4">
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
              <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
                <label className="text-gray-600">SubTotal</label>
                <p>0</p>
              </div>
              <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
                <label className="text-gray-600">Total Tax</label>
                <p>0</p>
              </div>
              <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
                <label className="text-gray-600">Net Amount</label>
                <p>0</p>
              </div>
              <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
                <label className="text-gray-600">Fbr Invoice No.</label>
                <p></p>
              </div>
              <div className="flex flex-col bg-gray-100 pl-2 pr-12 py-1 border border-gray-300 rounded-md">
                <label className="text-gray-600">Transaction No.</label>
                <p></p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="border flex flex-col bg-gray-200 rounded-sm px-3 py-1 border-gray-400 w-fit">
              <label className="text-sm text-gray-700">*Transaction Date</label>
              <input
                value={date}
                className="cursor-pointer"
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </div>
            <div className="border flex flex-col bg-gray-200 rounded-sm px-3 py-1 border-gray-400 w-fit">
              <div>
                <p>*Transaction Type</p>
              </div>
              <div className="relative">
                <p
                  onClick={() => showtransactiontypes()}
                  className="cursor-pointer w-[210px] flex justify-between gap-2 items-center hover:bg-gray-400 bg-gray-300 px-2 border border-gray-400 rounded-sm"
                >
                  <span className="line-clamp-1">
                    {types ? types : "Select Transaction Type"}
                  </span>

                  {chevrondown && (
                    <span>
                      <IoChevronDownOutline />
                    </span>
                  )}
                  {chevronup && (
                    <span>
                      <IoChevronUp />
                    </span>
                  )}
                </p>

                {transactionTypes && (
                  <div className="absolute w-full bg-white px-1 py-2">
                    <div className="border flex rounded-sm items-center pl-2 py-0 ">
                      <input
                        type="text"
                        onChange={handlefilterdata}
                        className="outline-none -mr-3"
                      />
                      <p className="bg-white">
                        <IoIosSearch />
                      </p>
                    </div>
                    <div className="flex flex-col h-33 pt-3 gap-2 overflow-auto">
                      {filteredData.map((data) => (
                        <div
                          onClick={() => savevalue(data.value)}
                          className="cursor-pointer hover:bg-blue-500 hover:text-white"
                          key={data.id}
                        >
                          <p>{data.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          <div className="border flex flex-col bg-gray-200 rounded-sm px-3 py-1 border-gray-400 w-fit">
              <div>
                <p>*Customer Details</p>
              </div>
              <div className="relative">
                <p
                  onClick={() => showcustomerdetails()}
                  className="cursor-pointer w-[210px] flex justify-between gap-2 items-center hover:bg-gray-400 bg-gray-300 px-2 border border-gray-400 rounded-sm"
                >
                  <span className="line-clamp-1">
Select Customer
                  </span>

                  <span>
                    <IoChevronDownOutline />
                  </span>
                </p>
                {customerdetails && (
                  <div className="absolute w-full bg-white px-1 py-2">
                    <div className="cursor-pointer hover:text-blue-600">
                    Add Customers +
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        // {/* </form> */}
      )}

      {/* <div className="flex justify-center pt-10">
        //   <form onSubmit={handlesubmitdata} className="flex flex-col gap-6">
        //     <div className="flex gap-6">
        //       <div className="flex flex-col">
        //         <label htmlFor="">Voucher:</label>
        //         <input
        //           value={voucherValue}
        //           onChange={(e) => setValuevalue(e.target.value)} */}
      {/* //           type="text"
        //           className="border"
        //         /> */}
      {/* //       </div> */}
      {/* //       <div className="flex flex-col"> */}
      {/* //         <label htmlFor="">Date:</label>
        //         <input
        //           value={date}
        //           onChange={(e) => setDate(e.target.value)}
        //           type="date"
        //           className="border"
        //         /> */}
      {/* //       </div> */}
      {/* //       <div className="flex flex-col">
        //         <label htmlFor="">Customer:</label>
        //         <input
        //           value={customer}
        //           onChange={(e) => setCustomer(e.target.value)}
        //           type="text"
        //           className="border"
        //         />
        //       </div>
        //       <div className="flex flex-col">
        //         <label htmlFor="">Amount:</label>
        //         <input
        //           value={amount}
        //           onChange={(e) => setAmount(e.target.value)}
        //           type="number"
        //           className="border"
        //         />
        //       </div>
        //       <div className="flex flex-col">
        //         <label htmlFor="">Status:</label>
        //         <input
        //           value={status}
        //           onChange={(e) => setStatus(e.target.value)}
        //           type="text"
        //           className="border"
        //         />
        //       </div>
        //       <div className="flex flex-col">
        //         <label htmlFor="">Validate:</label>
        //         <select className="border">
        //           <option>Valid</option>
        //           <option>UnValid</option>
        //         </select>
        //       </div>
        //       <div className="flex flex-col">
        //         <label htmlFor="">FBR Invoice No:</label>
        //         <input
        //           value={invoiceNo}
        //           onChange={(e) => setInvoiceNo(e.target.value)}
        //           type="text"
        //           className="border"
        //         />
        //       </div> */}
      {/* //     </div>
        //     <div className="flex justify-center"> */}
      {/* //       <button
        //         type="submit"
        //         className=" bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-md py-2  px-10 w-fit"
        //       >
        //         Add
        //       </button>
            </div>
          </form>
        </div> */}
    </div>
  );
}
