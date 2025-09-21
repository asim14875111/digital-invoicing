"use client";
import React, { useContext, useState } from "react";
import Addnewdata from "../Components/Addnewdata";
import Invoicingdata from "../Components/Invoicingdata";
import { Datacontext } from "@/Contexts/DataContext";
import { UseintegrationDetails } from "@/Contexts/integrationcontext";
// import searching from "../../../assests/images/icons8-search-in-list-100.png";
import Sidebar from "../Components/Sidebar";
import searching from "../../assests/images/icons8-search-in-list-100.png";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import { useRouter } from "next/navigation";
import { useCompanyDetails } from "@/Contexts/Companycontext";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
// import { hsCodeUomMap, getAllowedUomsForHs } from "@/Constants/hsCodeUomMap";
// import { normalizeUom } from "@/Constants/uomNormalization";
export default function Home() {
  const [visible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(true);
  const context = useContext(Datacontext);
  const [viewData, setViewData] = useState<boolean>(true);
  const [hideData, sethideData] = useState<boolean>(false);
  const { companyDetails } = useCompanyDetails();
  const { allusersData = [], setAllUsersData } = context || {};
  const [details, setDetails] = useState(false);
  const { integrationdetails } = UseintegrationDetails();
  const router = useRouter();
  const [validationStatus, setValidationStatus] = useState<{
    [key: number]: string;
  }>({});

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

  const showdetails = (): void => {
    setViewData(false);
    sethideData(true);
    setDetails(true);
  };
  const hidedetails = (): void => {
    setViewData(true);
    sethideData(false);
    setDetails(false);
  };
  // allusersData

  // const senddatatofbr = (index:number): void => {
  //   if (!integrationdetails?.environemnt || !integrationdetails.token) {
  //     const btn = document.getElementById("validate-btn");

  //     if (btn) {
  //       btn.textContent = "add token!";
  //     }
  //     alert("add environement and token!");
  //     router.push("/integration");
  //     return;
  //   }
  // };

  const validatefromfbr = async (index: number) => {
    setValidationStatus((prev) => ({ ...prev, [index]: "Sending..." }));

    if (!integrationdetails?.environemnt || !integrationdetails.token) {
      alert("Add environment and token!");
      router.push("/integration");
      setValidationStatus((prev) => ({ ...prev, [index]: "Validate Again" }));
      return;
    }

    const sanitizeString = (
      val: string | number | undefined | null,
      removeDashes = false
    ): string => {
      if (!val) return "";
      const str = String(val);
      return removeDashes ? str.replace(/-/g, "") : str;
    };

    const invoiceitems = {
      invoiceType: sanitizeString(
        allusersData?.[index]?.Itemdetails?.[0]?.serviceAccount
      ),
      invoiceDate: allusersData[index].Transactiondatendtype.date,
      sellerBusinessName: allusersData[index].Customerdetails.name,
      sellerProvince: allusersData[index].Customerdetails.Site,
      sellerNTNCNIC: sanitizeString(
        allusersData?.[index]?.Customerdetails?.CNIC,
        true
      ),
      sellerAddress: allusersData[index].Customerdetails.address,
      buyerNTNCNIC: companyDetails?.ntn,
      buyerBusinessName: companyDetails?.companyName,
      buyerProvince: companyDetails?.province,
      buyerAddress: companyDetails?.address,
      invoiceRefNo: "INV-" + allusersData[index].invoiceNo,
      scenarioId: allusersData[index].Transactiondatendtype.types.value,
      buyerRegistrationType: companyDetails?.businessType,
      items: [
        {
          hsCode: allusersData[index].Itemdetails[0].order,
          productDescription: allusersData[index].Itemdetails[0].description,
          rate: allusersData[index].Itemdetails[0].rate + "%",
          uoM: allusersData[index].Itemdetails[0].Uom,
          quantity: allusersData[index].Itemdetails[0].quantity,
          fixedNotifiedValueOrRetailPrice: 0.0,
          salesTaxWithheldAtSource:
            allusersData[index].Itemdetails[0].salesTaxWithheldAtSource,
          extraTax: allusersData[index].Itemdetails[0].extraTax,
          furtherTax: allusersData[index].Itemdetails[0].furtherTax,
          sroScheduleNo: allusersData[index].Itemdetails[0].SRO,
          fedPayable: allusersData[index].Itemdetails[0].fedPayable,
          discount: allusersData[index].Itemdetails[0].discount,
          totalValues:
            Number(allusersData[index].Itemdetails[0].price) *
              Number(allusersData[index].Itemdetails[0].quantity) +
            (Number(allusersData[index].Itemdetails[0].price) *
              Number(allusersData[index].Itemdetails[0].quantity) *
              Number(allusersData[index].Itemdetails[0].rate)) /
              100 +
            Number(allusersData[index].Itemdetails[0].fedPayable || 0) +
            Number(allusersData[index].Itemdetails[0].extraTax || 0) +
            Number(allusersData[index].Itemdetails[0].furtherTax || 0) -
            Number(allusersData[index].Itemdetails[0].discount || 0),
          valueSalesExcludingST:
            Number(allusersData[index].Itemdetails[0].price) *
            Number(allusersData[index].Itemdetails[0].quantity),
          salesTaxApplicable:
            (Number(allusersData[index].Itemdetails[0].price) *
              Number(allusersData[index].Itemdetails[0].quantity) *
              Number(allusersData[index].Itemdetails[0].rate)) /
            100,
          saleType: allusersData[index].Transactiondatendtype.types.title,
          sroItemSerialNo: allusersData[index].Itemdetails[0].SroItemNO,
        },
      ],
    };

    try {
      const res = await fetch("/api/validate-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          environment: integrationdetails.environemnt,
          token: integrationdetails.token,
          customerData: invoiceitems,
        }),
      });

      const data = await res.json();
      console.log("Validation response", data);

      if (res.ok) {
        setValidationStatus((prev) => ({ ...prev, [index]: "Sended" }));
      } else {
        setValidationStatus((prev) => ({ ...prev, [index]: "Send Again" }));
      }
    } catch (err) {
      console.log(err, "Error");
      setValidationStatus((prev) => ({ ...prev, [index]: "Send Again" }));
      alert(err)
    }
  };

  return (
    <div className="flex mt-15 w-full">
      <Sidebar />
      <div className="pt-10 flex flex-col pb-30 w-full">
        <div className="flex mx-13.5 flex-col bg-gray-50  rounded-b-sm mr-18.5">
          <div className="flex items-center justify-between bg-gray-50 px-6 py-3 rounded-md shadow-sm">
            {companyDetails ? (
              <h3 className="text-lg font-semibold text-gray-700">
                {companyDetails?.companyName}
              </h3>
            ) : (
              <Link href="/company">
                <button className="bg-[#2d80ff] cursor-pointer text-white px-5 py-2 rounded-sm text-sm hover:bg-[#1c74fb] transition">
                  Add Company
                </button>
              </Link>
            )}

            {viewData && (
              <p
                onClick={showdetails}
                className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
              >
                <FiEye size={20} />
              </p>
            )}
            {hideData && (
              <p
                onClick={hidedetails}
                className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
              >
                <FiEyeOff size={20} />
              </p>
            )}
          </div>

          {details && (
            <div className="mx-4 mr-4 px-4  bg-white border py-2 border-gray-200 rounded-sm my-4">
              {companyDetails ? (
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <label className="text-xl font-semibold text-gray-700 pb-2">
                      Company details
                    </label>
                    <div className="flex flex-row items-center gap-1">
                      <label>Company name:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.companyName}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Address:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.address}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Phone:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.phonenum}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Bank name:</label>
                      {/* <p className="text-sm text-gray-600">
                        {companyDetails.bankname}
                      </p> */}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Bank branch:</label>
                      {/* <p className="text-sm text-gray-600">
                        {companyDetails.branch}
                      </p> */}
                    </div>
                  </div>
                  <div className="flex flex-col  gap-1">
                    <div className="flex flex-row items-center gap-1">
                      <label>NTN:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.ntn}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Business Type:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.businessType}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>GST/STRN:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.gst}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Email:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.email}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Bank account no:</label>
                      {/* <p className="text-sm text-gray-600">
                        {companyDetails.account}
                      </p> */}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      {/* <label>Iban:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.iban}
                      </p> */}
                    </div>
                  </div>{" "}
                </div>
              ) : (
                <div className="py-2">
                  <p className="text-gray-600 text-sm text-center">
                    ! Nothing to see here
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-13.5 pt-25 pr-18.5">
          {display && (
            <div className="bg-gray-50 w-full shadow-xl shadow-gray-100 h-full rounded-md">
              <div className="flex flex-col justify-between px-6 pt-4">
                {display && <Addnewdata showhiddendiv={showhiddendiv} />}
              </div>

              <div className="flex flex-col gap-4 px-10 py-6 h-10/12">
                {Array.isArray(allusersData) && allusersData.length > 0 ? (
                  allusersData.map(
                    (
                      data: import("@/Contexts/DataContext").AllUsersDataType,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border border-gray-200 bg-white rounded-md shadow-sm p-5 hover:shadow-md transition"
                      >
                        {/* TOP ROW */}
                        <div className="flex flex-col">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full">
                              {/* Invoice Details */}
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Invoice No
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  {data.invoiceNo}
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Voucher
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  09765567
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Date
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  {data.Transactiondatendtype?.date}
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Customer
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  {data.Customerdetails?.name}
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Amount
                                </span>
                                <p className="text-sm font-medium text-green-600">
                                  {data.Itemdetails?.[0]?.price}
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Status
                                </span>
                                <p className="text-sm font-medium text-yellow-600">
                                  post / un-post
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Validate
                                </span>
                                <p className="text-sm font-medium text-blue-600">
                                  Valid / In-valid
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  FBR Invoice No
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  G056765487735245
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 ml-6 mt-2">
                              <button
                                onClick={() => toggleCustomerDetails(index)}
                                className="text-gray-600 hover:text-gray-900 transition text-xl"
                              >
                                {selectedCustomerIndex === index ? (
                                  <FiEyeOff />
                                ) : (
                                  <FiEye />
                                )}
                              </button>

                              <button
                                onClick={() => deleteitem(index)}
                                className="text-gray-600 hover:text-red-600 transition text-xl"
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>

                          {/* Send to FBR Button */}
                          <div className="flex pt-6">
                            <button
                              onClick={() => validatefromfbr(index)}
                              disabled={validationStatus[index] === "Validated"} // disable if already validated
                              className={`px-4 py-1 rounded-sm font-semibold transition ${
                                validationStatus[index] === "Validated"
                                  ? "bg-green-500 text-white cursor-not-allowed"
                                  : validationStatus[index] === "Sending..."
                                  ? "bg-yellow-600 text-white"
                                  : "bg-blue-600 hover:bg-blue-700 text-white"
                              }`}
                            >
                              {validationStatus[index] || "Send to FBR"}
                            </button>
                          </div>
                        </div>

                        {/* COLLAPSIBLE DETAILS */}
                        {selectedCustomerIndex === index && (
                          <div className="bg-gray-50 border border-gray-200 p-5 mt-6 rounded-md">
                            <div className="flex flex-col md:flex-row gap-8">
                              {/* Customer Details */}
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-700 mb-3">
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
                                </div>
                              </div>

                              {/* Transaction + Item Details */}
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg text-gray-700 mb-3">
                                  Transaction
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p>
                                    <strong>Date:</strong>{" "}
                                    {data.Transactiondatendtype?.date}
                                  </p>
                                  <p>
                                    <strong>Type:</strong>{" "}
                                    {data.Transactiondatendtype?.types?.value}
                                  </p>
                                  <p>
                                    <strong>Remarks:</strong>{" "}
                                    {data.Transactiondatendtype?.remarks}
                                  </p>
                                </div>

                                <h3 className="font-semibold text-lg text-gray-700 mt-5 mb-3">
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
                                    {data.Itemdetails?.[0]?.price?.toString()}
                                  </p>
                                  <p>
                                    <strong>Quantity:</strong>{" "}
                                    {data.Itemdetails?.[0]?.quantity?.toString()}
                                  </p>
                                  <p>
                                    <strong>Remarks:</strong>{" "}
                                    {data.Itemdetails?.[0]?.remarks}
                                  </p>
                                  <p>
                                    <strong>Tax Amount:</strong>{" "}
                                    {data.Itemdetails?.[0]?.taxAmount}
                                  </p>
                                  <p>
                                    <strong>Net Amount:</strong>{" "}
                                    {data.Itemdetails?.[0]?.netAmount}
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
                  <p className="text-center text-gray-500 text-lg py-20 flex items-center justify-center gap-2">
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
            </div>
          )}
        </div>

        {visible && <Invoicingdata hidedetailsection={hidedetailsection} />}
      </div>
    </div>
  );
}
