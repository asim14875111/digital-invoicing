"use client";
import React, { useContext, useState } from "react";
import { postInvoiceData, validateInvoiceData } from "@/api/fbrApi";

// Map internal invoice data to FBR API payload
function mapToFBRPayload(data: any, companyDetails?: any) {
  return {
    invoiceType: data.invoiceType || "Sale Invoice",
    invoiceDate: data.Transactiondatendtype?.date || data.invoiceDate || "",
    sellerNTNCNIC: companyDetails?.ntn || data.sellerNTNCNIC || "",
    sellerBusinessName: companyDetails?.companyName || data.sellerBusinessName || "",
    sellerProvince: companyDetails?.province || data.sellerProvince || "",
    sellerAddress: companyDetails?.address || data.sellerAddress || "",
    buyerNTNCNIC: data.Customerdetails?.CNIC || data.buyerNTNCNIC || "",
    buyerBusinessName: data.Customerdetails?.name || data.buyerBusinessName || "",
    buyerProvince: data.Customerdetails?.province || data.buyerProvince || "",
    buyerAddress: data.Customerdetails?.address || data.buyerAddress || "",
    buyerRegistrationType: data.Customerdetails?.registrationType || data.buyerRegistrationType || "",
    invoiceRefNo: String(data.invoiceNo ?? data.invoiceRefNo ?? ""),
    scenarioId: data.scenarioId || "SN000",
    items: (data.Itemdetails || data.items || []).map((item: any) => ({
      hsCode: item.HsCode || item.hsCode || "",
      productDescription: item.itemname || item.productDescription || "",
      rate: item.taxRate || item.rate || "",
      uoM: item.Uom || item.uoM || "",
      quantity: Number(item.quantity) || 0,
      totalValues: Number(item.price) || Number(item.totalValues) || 0,
      valueSalesExcludingST: Number(item.valueSalesExcludingST) || 0,
      fixedNotifiedValueOrRetailPrice: Number(item.fixedNotifiedValueOrRetailPrice) || 0,
      salesTaxApplicable: Number(item.salesTaxApplicable) || 0,
      salesTaxWithheldAtSource: Number(item.salesTaxWithheldAtSource) || 0,
      extraTax: item.extraTax || "",
      furtherTax: Number(item.furtherTax) || 0,
      sroScheduleNo: item.SRO || item.sroScheduleNo || "",
      fedPayable: Number(item.fedPayable) || 0,
      discount: Number(item.discount) || 0,
      saleType: item.saleType || "",
      sroItemSerialNo: item.SroItemNO || item.sroItemSerialNo || ""
    }))
  };
}
import Addnewdata from "../Components/Addnewdata";
import Invoicingdata from "../Components/Invoicingdata";
import { Datacontext } from "@/Contexts/DataContext";
// import searching from "../../../assests/images/icons8-search-in-list-100.png";
import Sidebar from "../Components/Sidebar";
import searching from "../../assests/images/icons8-search-in-list-100.png";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useCompanyDetails } from "@/Contexts/Companycontext";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
export default function Home() {
  const [visible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(true);
  const context = useContext(Datacontext);
  const [viewData, setViewData] = useState<boolean>(true);
  const [hideData, sethideData] = useState<boolean>(false);
  const { companyDetails } = useCompanyDetails();
  const { allusersData = [], setAllUsersData } = context || {};
  const [details, setDetails] = useState(false);
  // Explicitly type allusersData if possible, e.g.:
  // const { allusersData = [], setAllUsersData } = context as { allusersData: YourDataType[]; setAllUsersData: (data: YourDataType[]) => void } || {};
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<
    number | null
  >(null);
  const [fbrResponse, setFbrResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Example: Post invoice to FBR
  const handlePostToFBR = async (invoice: any) => {
    setLoading(true);
    setFbrResponse(null);
    try {
      const payload = mapToFBRPayload(invoice, companyDetails);
      const res = await postInvoiceData(payload);
      setFbrResponse("Posted: " + JSON.stringify(res));
    } catch (err: any) {
      setFbrResponse("Error: " + JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  // Example: Validate invoice with FBR
  const handleValidateFBR = async (invoice: any) => {
    setLoading(true);
    setFbrResponse(null);
    try {
      const payload = mapToFBRPayload(invoice, companyDetails);
      const res = await validateInvoiceData(payload);
      setFbrResponse("Validated: " + JSON.stringify(res));
    } catch (err: any) {
      setFbrResponse("Error: " + JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

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
  return (
    <div className="flex mt-15 w-full">
      <Sidebar />

      <div className="pt-10 flex flex-col pb-30 w-full">
        <div className="flex mx-13.5 flex-col bg-gray-50  rounded-b-sm mr-18.5">
          <div className=" flex bg-gray-50 items-center rounded-sm  px-4 py-2 justify-between">
            {companyDetails ? (
              <h3 className="text-xl  text-gray-600">
                {companyDetails?.companyName}
              </h3>
            ) : (
              <Link href="/company">
                <h3 className="text-blue-600 hover:underline cursor-pointer">
                  Add company
                </h3>
              </Link>
            )}
            {viewData && (
              <p
                onClick={showdetails}
                className="cursor-pointer hover:text-gray-600"
              >
                <FiEye />
              </p>
            )}
            {hideData && (
              <p
                onClick={hidedetails}
                className="cursor-pointer hover:text-gray-600"
              >
                <FiEyeOff />
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
                      <p className="text-sm text-gray-600">
                        {companyDetails.bankname}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Bank branch:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.branch}
                      </p>
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
                      <p className="text-sm text-gray-600">
                        {companyDetails.account}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Iban:</label>
                      <p className="text-sm text-gray-600">
                        {companyDetails.iban}
                      </p>
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
                          taxAmount?: string;
                          netAmount?: string;
                        }>;
                      },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="border border-gray-200 shadow-sm bg-white rounded-lg p-5 hover:shadow-md transition mt-4"
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
                              onClick={() => handlePostToFBR(data)}
                              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                              disabled={loading}
                            >
                              Post to FBR
                            </button>
                            <button
                              onClick={() => handleValidateFBR(data)}
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                              disabled={loading}
                            >
                              Validate FBR
                            </button>
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
        {/* FBR API Response */}
        {fbrResponse && (
          <div className="fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg z-50 max-w-lg max-h-60 overflow-auto">
            <div className="font-semibold mb-2">FBR API Response</div>
            <pre className="text-xs whitespace-pre-wrap break-all">{fbrResponse}</pre>
            <button className="mt-2 text-xs text-blue-600 underline" onClick={() => setFbrResponse(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
