"use client";
import React, { useContext, useState } from "react";
import Addnewdata from "../Addnewdata";
import Invoicingdata from "../Invoicingdata";
import { Datacontext } from "@/Contexts/DataContext";

export default function Home() {
  const [visible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(true);
  const context = useContext(Datacontext);
  const allusersData = context?.allusersData ?? [];
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<
    number | null
  >(null);

  const showhiddendiv = () => {
    setIsVisible(true);
    setDisplay(false);
  };

  const hidedetailsection = () => {
    setIsVisible(false);
    setDisplay(true);
  };

  const toggleCustomerDetails = (index: number) => {
    setSelectedCustomerIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <div>
      <div className="flex flex-col justify-between px-10">
        {display && (
          <>
            <Addnewdata showhiddendiv={showhiddendiv} />
            <div className="flex flex-col gap-3 px-10 mt-5">
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
                      className="border  border-gray-300 rounded-md p-3"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex gap-15">
                          <div className="flex flex-col gap-1 ">
                            <label className="font-bold text-gray-600">
                              Voucher
                            </label>
                            <p className="text-sm"> 09765567</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-gray-600">
                              Date:
                            </label>
                            <p className="text-sm">
                              {data.Transactiondatendtype?.date}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-gray-600">
                              Customer:
                            </label>
                            <p className="text-sm">
                              {data.Customerdetails?.name}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-gray-600">
                              Amount:
                            </label>
                            <p className="text-sm">
                              {data.Itemdetails?.[0]?.price}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-gray-600">
                              Status:
                            </label>
                            <p className="text-sm">post/ un-post</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-gray-600">
                              Validate:
                            </label>
                            <p className="text-sm">Valid/In-valid</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-bold text-gray-600">
                              Fbr invoice No:
                            </label>
                            <p className="text-sm">G056765487735245</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleCustomerDetails(index)}
                          className="bg-gray-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                          {selectedCustomerIndex === index ? `Hide` : "Show"}
                        </button>
                      </div>

                      {selectedCustomerIndex === index && (
                        <div className="bg-white shadow-md p-4 mt-4 rounded-md">
                          <div className="flex justify-between gap-10">
                            <div>
                              <h3 className="font-bold mb-2">
                                Customer Details
                              </h3>
                              <p>
                                <strong>Name:</strong>{" "}
                                {data.Customerdetails?.name}
                              </p>
                              <p>
                                <strong>CNIC/NTN:</strong>{" "}
                                {data.Customerdetails?.CNIC}
                              </p>
                              <p>
                                <strong>Mobile number:</strong>{" "}
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
                                <strong>Customer Receivable:</strong>{" "}
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
                                <strong>Shipping Address:</strong>{" "}
                                {data.Customerdetails?.shippingaddress}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-bold mb-2">Transaction</h3>
                              <p>
                                <strong>Transaction Date:</strong>{" "}
                                {data.Transactiondatendtype?.date}
                              </p>
                              <p>
                                <strong>Transaction Type:</strong>{" "}
                                {data.Transactiondatendtype?.types}
                              </p>
                              <p>
                                <strong>Remarks:</strong>{" "}
                                {data.Transactiondatendtype?.remarks}
                              </p>

                              <h3 className="font-bold mt-4 mb-2">
                                Item Details
                              </h3>
                              <p>
                                <strong>Item Name:</strong>{" "}
                                {data.Itemdetails?.[0]?.itemname}
                              </p>
                              <p>
                                <strong>Bar Code:</strong>{" "}
                                {data.Itemdetails?.[0]?.barcode}
                              </p>
                              <p>
                                <strong>Category:</strong>{" "}
                                {data.Itemdetails?.[0]?.category}
                              </p>
                              <p>
                                <strong>Hs Code:</strong>{" "}
                                {data.Itemdetails?.[0]?.HsCode}
                              </p>
                              <p>
                                <strong>SRO:</strong>{" "}
                                {data.Itemdetails?.[0]?.SRO}
                              </p>
                              <p>
                                <strong>SRO Item No:</strong>{" "}
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
                      )}
                    </div>
                  )
                )
              ) : (
                <p className="text-center text-gray-500">
                  No customer data found.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {visible && <Invoicingdata hidedetailsection={hidedetailsection} />}
    </div>
  );
}
