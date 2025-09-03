"use client";
import React, { useContext, useState } from "react";
import Addnewdata from "../Addnewdata";
import Invoicingdata from "../Invoicingdata";
import { Datacontext } from "@/Contexts/DataContext";
import searching from "../../../assests/images/icons8-search-in-list-100.png";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import { RiDeleteBin6Line } from "react-icons/ri";

export default function Home() {
  const [visible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(true);
  const context = useContext(Datacontext);
  const { allusersData = [], setAllUsersData } = context || {};
  // Explicitly type allusersData if possible, e.g.:
  // const { allusersData = [], setAllUsersData } = context as { allusersData: YourDataType[]; setAllUsersData: (data: YourDataType[]) => void } || {};
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<
    number | null
  >(null);

  const showhiddendiv = () => {
    setIsVisible(true);
    setDisplay(false);
  };

  console.log(allusersData, "-complete data");

  const hidedetailsection = () => {
    setIsVisible(false);
    setDisplay(true);
  };

  const toggleCustomerDetails = (index: number) => {
    setSelectedCustomerIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const deleteitem = (index: number): void => {
    const deleted = allusersData.filter((_, idx) => idx !== index);
    if (setAllUsersData) {
      setAllUsersData(deleted);
    }
  };

  // allusersData
  return (
    <div className="">
      <div className="px-16.5 pt-20">
        {display && (
          <div className="bg-gray-50 w-full shadow-xl shadow-gray-100 h-full rounded-sm justify-self-center">
            <div className="flex flex-col justify-between px-4 pt-3">
              {display && (
                <>
                  <Addnewdata showhiddendiv={showhiddendiv} />
                </>
              )}
            </div>
            {/* Just comment */}

            {/* {display && ( */}
            <div className="flex flex-col gap-4 px-10 h-10/12 justify-center  py-6">
              {Array.isArray(allusersData) && allusersData.length > 0 ? (
                allusersData.map(
                  (
                    data: {
                      Transactiondatendtype?: {
                        date?: string;
                        types?: string;
                        remarks?: string;
                      };
                      Customerdetails?: {
                        name?: string;
                        CNIC?: string;
                        mobileNumber?: string;
                        email?: string;
                        status?: string;
                        creditLimit?: string;
                        customerreceivable?: string;
                        description?: string;
                        contactperson?: string;
                        Site?: string;
                        address?: string;
                        shippingaddress?: string;
                      };
                      invoiceNo?: number;
                      Itemdetails?: Array<{
                        itemname?: string;
                        barcode?: string;
                        category?: string;
                        HsCode?: string;
                        SRO?: string;
                        SroItemNO?: string;
                        Uom?: string;
                        assestAccount?: string;
                        price?: string;
                        quantity?: string;
                        remarks?: string;
                      }>;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="border border-gray-200 shadow-sm bg-white rounded-lg p-5 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-8">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              {/* {allusersData} */}
                              Invoice No
                            </span>
                            <p className="text-sm font-medium text-gray-700">
                              {data.invoiceNo}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              Voucher
                            </span>
                            <p className="text-sm font-medium text-gray-700">
                              09765567
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              Date
                            </span>
                            <p className="text-sm font-medium text-gray-700">
                              {data.Transactiondatendtype?.date}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              Customer
                            </span>
                            <p className="text-sm font-medium text-gray-700">
                              {data.Customerdetails?.name}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              Amount
                            </span>
                            <p className="text-sm font-medium text-green-600">
                              {data.Itemdetails?.[0]?.price}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              Status
                            </span>
                            <p className="text-sm font-medium text-yellow-600">
                              post / un-post
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              Validate
                            </span>
                            <p className="text-sm font-medium text-blue-600">
                              Valid / In-valid
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              FBR Invoice No
                            </span>
                            <p className="text-sm font-medium text-gray-700">
                              G056765487735245
                            </p>
                          </div>
                        </div>

                        <div className="flex ml-6 gap-4">
                          <button
                            onClick={() => toggleCustomerDetails(index)}
                            className="  text-gray-600 cursor-pointer  rounded-md text-xl hover:text-gray-900 hover:bg--800 transition"
                          >
                            {selectedCustomerIndex === index ? (
                              <FiEyeOff />
                            ) : (
                              <FiEye />
                            )}
                          </button>
                          <button
                            onClick={() => deleteitem(index)}
                            className="text-gray-600 cursor-pointer  rounded-md text-xl hover:text-gray-900 hover:bg--800 transition"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>

                      {selectedCustomerIndex === index && (
                        <div className="bg-gray-50 border border-gray-200 p-5 mt-5 rounded-md">
                          <div className="flex flex-col md:flex-row justify-between gap-10">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                                Customer Details
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  <strong>Name:</strong>{" "}
                                  {data.Customerdetails?.name}
                                </p>
                                <p>
                                  <strong>CNIC/NTN:</strong>{" "}
                                  {data.Customerdetails?.CNIC}
                                </p>
                                <p>
                                  <strong>Mobile:</strong>{" "}
                                  {data.Customerdetails?.mobileNumber}
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {data.Customerdetails?.email}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  {data.Customerdetails?.status}
                                </p>
                                <p>
                                  <strong>Credit Limit:</strong>{" "}
                                  {data.Customerdetails?.creditLimit}
                                </p>
                                <p>
                                  <strong>Receivable:</strong>{" "}
                                  {data.Customerdetails?.customerreceivable}
                                </p>
                                <p>
                                  <strong>Description:</strong>{" "}
                                  {data.Customerdetails?.description}
                                </p>
                                <p>
                                  <strong>Contact Person:</strong>{" "}
                                  {data.Customerdetails?.contactperson}
                                </p>
                                <p>
                                  <strong>Site:</strong>{" "}
                                  {data.Customerdetails?.Site}
                                </p>
                                <p>
                                  <strong>Address:</strong>{" "}
                                  {data.Customerdetails?.address}
                                </p>
                                <p>
                                  <strong>Shipping:</strong>{" "}
                                  {data.Customerdetails?.shippingaddress}
                                </p>
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-3 text-gray-700">
                                Transaction
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  <strong>Date:</strong>{" "}
                                  {data.Transactiondatendtype?.date}
                                </p>
                                <p>
                                  <strong>Type:</strong>{" "}
                                  {data.Transactiondatendtype?.types}
                                </p>
                                <p>
                                  <strong>Remarks:</strong>{" "}
                                  {data.Transactiondatendtype?.remarks}
                                </p>
                              </div>

                              <h3 className="font-semibold text-lg mt-5 mb-3 text-gray-700">
                                Item Details
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  <strong>Name:</strong>{" "}
                                  {data.Itemdetails?.[0]?.itemname}
                                </p>
                                <p>
                                  <strong>Barcode:</strong>{" "}
                                  {data.Itemdetails?.[0]?.barcode}
                                </p>
                                <p>
                                  <strong>Category:</strong>{" "}
                                  {data.Itemdetails?.[0]?.category}
                                </p>
                                <p>
                                  <strong>HS Code:</strong>{" "}
                                  {data.Itemdetails?.[0]?.HsCode}
                                </p>
                                <p>
                                  <strong>SRO:</strong>{" "}
                                  {data.Itemdetails?.[0]?.SRO}
                                </p>
                                <p>
                                  <strong>SRO Item:</strong>{" "}
                                  {data.Itemdetails?.[0]?.SroItemNO}
                                </p>
                                <p>
                                  <strong>UOM:</strong>{" "}
                                  {data.Itemdetails?.[0]?.Uom}
                                </p>
                                <p>
                                  <strong>Asset Account:</strong>{" "}
                                  {data.Itemdetails?.[0]?.assestAccount}
                                </p>
                                <p>
                                  <strong>Price:</strong>{" "}
                                  {data.Itemdetails?.[0]?.price}
                                </p>
                                <p>
                                  <strong>Quantity:</strong>{" "}
                                  {data.Itemdetails?.[0]?.quantity}
                                </p>
                                <p>
                                  <strong>Remarks:</strong>{" "}
                                  {data.Itemdetails?.[0]?.remarks}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )
              ) : (
                <p className="text-center text-gray-500 flex text-lg py-20  items-center gap-2 self-center">
                  No Customer Data Found!
                  <Image
                    src={searching}
                    alt="searching..."
                    width={55}
                    height={55}
                  />
                </p>
              )}
            </div>
            {/* // )} */}
          </div>
        )}
      </div>
      {visible && <Invoicingdata hidedetailsection={hidedetailsection} />}
    </div>
  );
}
