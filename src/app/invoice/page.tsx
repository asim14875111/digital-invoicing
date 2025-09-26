"use client";
import React, { useContext, useEffect, useState } from "react";
import Addnewdata from "../Components/Addnewdata";
import Invoicingdata from "../Components/Invoicingdata";
import { Datacontext, AllUsersDataType } from "@/Contexts/DataContext";
import { UseintegrationDetails } from "@/Contexts/integrationcontext";
import Sidebar from "../Components/Sidebar";
import searching from "../../assests/images/icons8-search-in-list-100.png";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCompanyDetails } from "@/Contexts/Companycontext";
import Link from "next/link";
import { auth } from "@/firebaseConfig";
import { database } from "@/firebaseConfig";
import { onValue, push, ref, update } from "firebase/database";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
export default function Home() {
  const [visible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(true);
  const context = useContext(Datacontext);
  const [viewData, setViewData] = useState<boolean>(true);
  const [hideData, sethideData] = useState<boolean>(false);
  const { companyDetails } = useCompanyDetails();
  const { allusersData = [], setAllUsersData } = context || {};
  type firebasebuyerdetails = {
    companyName: string;
    ntn: number | string;
    address: string;
    gst: string;
    phonenum: number | string;
    email: number | string;
    bankname: string;
    branch: string;
    account: number | string;
    iban: number | string;
    businessType: string;
    province: string;
  };
  const [buyerDetails, setBuyerDetails] = useState<firebasebuyerdetails | null>(
    null
  );
  const [details, setDetails] = useState(false);

  type FirebaseInvoice = {
    id?: string;
    date?: string;
    Invoicenum?: number;
    customer?: {
      name?: string;
      CNIC?: string;
      mobileNumber?: string;
      email?: string;
      status?: string;
      creditLimit?: string;
      description?: string;
      contactperson?: string;
      Site?: string;
      address?: string;
    };
    types?: {
      date?: string;
      value?: string;
      title?: string;
      remarks?: string;
    };
    items?: FBItemType[];
    // items?: Array<{
    itemname?: string;
    barcode?: string;
    order?: string;
    SRO?: string;
    SroItemNO?: string;
    Uom?: string;
    price?: number | string;
    quantity?: number | string;
    remarks?: string;
    taxAmount?: number | string;
    netAmount?: number | string;
    fbrinvoiceno?: string;
    fbrTimestamp?: string;
    fbrValidationStatus?: string;
    // }>; // replaced by FBItemType[]
  };

  type FBItemType = Partial<{
    itemname: string;
    barcode: string;
    order: string;
    SRO: string;
    SroItemNO: string;
    Uom: string;
    price: number | string;
    quantity: number | string;
    remarks: string;
    taxAmount: number | string;
    netAmount: number | string;
    serviceAccount: string;
    rate: number | string;
    fedPayable: number | string;
    extraTax: number | string;
    furtherTax: number | string;
    discount: number | string;
    salesTaxWithheldAtSource: number | null | undefined;
    description: string;
  }>;

  const [firebasedata, setfirebasedata] = useState<FirebaseInvoice[]>([]);
  const { integrationdetails } = UseintegrationDetails();
  const router = useRouter();
  type ValidationResponse = {
    status?: string;
    data?: {
      invoiceNumber?: string;
      validationResponse?: {
        status?: string;
        error?: string;

        invoiceStatuses?: {
          error?: string;
        };
      };
      fault?: {
        description?: string;
      };
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  const [responses, setResponses] = useState<{
    [key: number]: ValidationResponse;
  }>({});
  const [validationStatus, setValidationStatus] = useState<{
    [key: number]: string;
  }>({});

  // map function moved into the useEffect below to avoid changing dependencies

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

  // const deleteitem = (index: number): void => {
  //   const deleted = allusersData.filter((_, idx) => idx !== index);
  //   if (setAllUsersData) {
  //     setAllUsersData(deleted);
  //   }
  // };

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
    const data = firebasedata[index];

    setValidationStatus((prev) => ({ ...prev, [index]: "Sending..." }));

    if (!integrationdetails?.environemnt || !integrationdetails.token) {
      alert("Add environment and token!");
      router.push("/integration");
      setValidationStatus((prev) => ({ ...prev, [index]: "Send Again" }));
      return;
    }

    // Prefer the CompanyProvider context but fall back to the buyerDetails
    // that we also load directly from firebase. This prevents a false
    // 'Add buyer details' alert after a page refresh when the context may
    // not yet be populated but firebase does contain buyer details.
    const effectiveCompany = companyDetails || buyerDetails;

    const isCompanyDetailsValid = (
      c: firebasebuyerdetails | null | undefined
    ): boolean => {
      if (!c) return false;
      return (
        typeof c.companyName === "string" &&
        c.companyName.trim() !== "" &&
        (typeof c.ntn === "string" || typeof c.ntn === "number") &&
        String(c.ntn).trim() !== "" &&
        typeof c.address === "string" &&
        c.address.trim() !== ""
      );
    };

    if (!isCompanyDetailsValid(effectiveCompany)) {
      alert("Add buyer details!");
      router.push("/company");
      setValidationStatus((prev) => ({ ...prev, [index]: "Send Again" }));
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
    const fbItem: FBItemType =
      (data?.items?.[0] as FBItemType) ||
      (allusersData?.[index]?.Itemdetails?.[0] as FBItemType) ||
      {};

    const price = Number(fbItem.price ?? 0);
    const qty = Number(fbItem.quantity ?? 0);
    const rate = Number(fbItem.rate ?? 0);
    const fedPayable = Number(fbItem.fedPayable ?? 0);
    const extraTax = Number(fbItem.extraTax ?? 0);
    const furtherTax = Number(fbItem.furtherTax ?? 0);
    const discount = Number(fbItem.discount ?? 0);

    const valueSalesExcludingST = price * qty;
    const salesTaxApplicable = (valueSalesExcludingST * rate) / 100;
    const totalValues =
      valueSalesExcludingST +
      salesTaxApplicable +
      fedPayable +
      extraTax +
      furtherTax -
      discount;

    const invoiceitems = {
      invoiceType:
        sanitizeString(
          // prefer firebase field if available, otherwise fallback to local allusersData
          fbItem.serviceAccount ??
            allusersData?.[index]?.Itemdetails?.[0]?.serviceAccount
        ) || "",
      invoiceDate: data?.date ?? "",
      buyerBusinessName: data?.customer?.name ?? "",
      buyerProvince: data?.customer?.Site ?? "",
      buyerNTNCNIC: sanitizeString(data?.customer?.CNIC, true),
      buyerAddress: data?.customer?.address ?? "",
      sellerNTNCNIC: effectiveCompany?.ntn ?? "",
      sellerBusinessName: effectiveCompany?.companyName ?? "",
      sellerProvince: effectiveCompany?.province ?? "",
      sellerAddress: effectiveCompany?.address ?? "",
      invoiceRefNo: "INV-" + (data?.Invoicenum ?? ""),
      scenarioId: data?.types?.value ?? "",
      buyerRegistrationType: data?.customer?.status,
      items: [
        {
          hsCode: fbItem.order ?? "",
          productDescription: fbItem.itemname ?? fbItem.description ?? "",
          rate: rate ? `${rate}%` : "",
          uoM: fbItem.Uom ?? "",
          quantity: qty,
          fixedNotifiedValueOrRetailPrice: 0.0,
          salesTaxWithheldAtSource: fbItem.salesTaxWithheldAtSource ?? null,
          extraTax: extraTax || 0,
          furtherTax: furtherTax || 0,
          sroScheduleNo: fbItem.SRO ?? "",
          fedPayable: fedPayable || 0,
          discount: discount || 0,
          totalValues,
          valueSalesExcludingST,
          salesTaxApplicable,
          saleType:
            data?.types?.title ??
            allusersData?.[index]?.Transactiondatendtype?.types?.title ??
            "",
          sroItemSerialNo: fbItem.SroItemNO ?? "",
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
      setResponses((prev) => ({ ...prev, [index]: data }));

      // extract invoice number from response (support multiple shapes)
      const invoiceNumber =
        data?.data?.invoiceNumber || data?.invoiceNumber || null;

      if (res.ok) {
        // try to derive a human-friendly validation status
        const validationStatusFromResponse =
          (data?.data?.validationResponse?.status as string | undefined) ||
          (data?.validationResponse?.status as string | undefined) ||
          (data?.data?.validationResponse as string | undefined) ||
          null;

        const humanStatus = validationStatusFromResponse || "Valid";

        setValidationStatus((prev) => ({ ...prev, [index]: "Sent" }));

        // persist FBR invoice number and validation status to firebase under the invoice record
        try {
          const user = auth?.currentUser;
          if (user) {
            const invoiceId = firebasedata?.[index]?.id;
            if (invoiceId && invoiceNumber) {
              const invRef = ref(
                database,
                `User_data/${user.uid}/invoices/${invoiceId}`
              );
              await update(invRef, {
                fbrinvoiceno: invoiceNumber,
                fbrTimestamp: new Date().toISOString(),
                fbrValidationStatus: humanStatus,
              });
            } else if (invoiceNumber) {
              // fallback: create a small record for fbr invoice if invoice record missing
              const dbref = ref(database, `User_data/${user.uid}/invoices`);
              await push(dbref, {
                fbrinvoiceno: invoiceNumber,
                fbrTimestamp: new Date().toISOString(),
                fbrValidationStatus: humanStatus,
              });
            }
          }
        } catch (err) {
          console.error(err, "Error saving FBR invoice number to firebase");
        }
      } else {
        setValidationStatus((prev) => ({ ...prev, [index]: "Send Again" }));
      }
    } catch (err) {
      console.log(err, "Error");
      setValidationStatus((prev) => ({ ...prev, [index]: "Send Again" }));
      alert(err);
    }

    // No extra push here; fbr invoice persistence handled above when response is successful.
  };

  // Import data from firebase data base and map it
  // import { onValue, ref } from "firebase/database";

  // ...existing code...
  useEffect(() => {
    if (typeof window === "undefined") return; // only run in browser
    let off: (() => void) | null = null;
    let unsubAuth: (() => void) | null = null;

    const setupAuthListener = (authClient: typeof auth) => {
      unsubAuth = authClient
        ? onAuthStateChanged(authClient, (user) => {
            // clear previous db listener if user signs out
            if (!user) {
              if (off) {
                off();
                off = null;
              }
              return;
            }

            const datRef = ref(database, `User_data/${user.uid}/invoices`);
            // attach realtime listener and store its unsubscribe
            off = onValue(datRef, (snapshot) => {
              if (snapshot.exists()) {
                const dataObj = snapshot.val();
                const dataArr: FirebaseInvoice[] = Object.entries(dataObj).map(
                  ([id, value]) => ({ id, ...(value as FirebaseInvoice) })
                );
                const mapped: AllUsersDataType[] = dataArr.map((fi) => ({
                  Transactiondatendtype: {
                    date: fi.date ?? "",
                    types: {
                      value: fi.types?.value ?? "",
                      title: fi.types?.title ?? "",
                    },
                    remarks: fi.types?.remarks ?? "",
                  },
                  Customerdetails: {
                    name: fi.customer?.name ?? "",
                    description: fi.customer?.description ?? "",
                    CNIC: fi.customer?.CNIC ?? "",
                    status: fi.customer?.status ?? "",
                    address: fi.customer?.address ?? "",
                    Phonenumber: "",
                    mobileNumber: fi.customer?.mobileNumber ?? "",
                    email: fi.customer?.email ?? "",
                    website: "",
                    contactperson: fi.customer?.contactperson ?? "",
                    creditLimit: fi.customer?.creditLimit ?? "",
                    Site: fi.customer?.Site ?? "",
                  },
                  Itemdetails:
                    fi.items?.map((it) => ({
                      itemname: it.itemname ?? "",
                      barcode: it.barcode ?? "",
                      order: it.order ?? "",
                      maxorder: "0",
                      reorderLevel: "0",
                      category: "",
                      HsCode: "",
                      Uom: it.Uom ?? "",
                      revenueAccount: "",
                      assestAccount: "",
                      cogsAccount: "",
                      serviceAccount: it.serviceAccount ?? "",
                      file: null,
                      quantity: Number(it.quantity ?? 0),
                      price: Number(it.price ?? 0),
                      rate: Number(it.rate ?? 0),
                      SRO: it.SRO ?? "",
                      SroItemNO: it.SroItemNO ?? "",
                      remarks: it.remarks ?? "",
                      taxAmount:
                        typeof it.taxAmount === "number"
                          ? it.taxAmount
                          : Number(it.taxAmount ?? 0),
                      netAmount:
                        typeof it.netAmount === "number"
                          ? it.netAmount
                          : Number(it.netAmount ?? 0),
                      description:
                        (it as { description?: string }).description ?? "",
                      totalValues: 0,
                      extraTax: Number(it.extraTax ?? 0),
                      furtherTax: Number(it.furtherTax ?? 0),
                      discount: Number(it.discount ?? 0),
                      fedPayable: Number(it.fedPayable ?? 0),
                      salesTaxWithheldAtSource: Number(
                        it.salesTaxWithheldAtSource ?? 0
                      ),
                      fixedNotifiedValueOrRetailPrice: 0,
                    })) ?? [],
                }));

                if (setAllUsersData) {
                  setAllUsersData(mapped);
                }
                setfirebasedata(dataArr as FirebaseInvoice[]);
              } else {
                console.log("No data available");
              }
            });
          })
        : () => {};
    };

    if (auth) {
      setupAuthListener(auth);
    } else {
      import("firebase/auth").then((m) => {
        const authClient = m.getAuth();
        setupAuthListener(authClient);
      });
    }

    return () => {
      if (off) off();
      if (typeof unsubAuth === "function") unsubAuth();
    };
  }, [setAllUsersData]);
  // ...existing code...

  useEffect(() => {
    const user = auth?.currentUser;
    if (!user) {
      console.log("User is not registered!");
      return;
    }
    const dataref = ref(database, `User_data/${user.uid}/companydetails`);

    const unsubscribe = onValue(dataref, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Possible shapes:
        // 1) flat object with fields (companyName, ntn, ...)
        // 2) object with a 'details' child { details: { ...fields } }
        // 3) map/object of keyed entries -> take first value
        let details: firebasebuyerdetails | null = null;

        if (data.details && typeof data.details === "object") {
          details = data.details as firebasebuyerdetails;
        } else if (data.companyName || data.ntn || data.address || data.gst) {
          details = data as firebasebuyerdetails;
        } else if (typeof data === "object") {
          const vals = Object.values(data);
          if (vals.length > 0 && typeof vals[0] === "object") {
            details = vals[0] as firebasebuyerdetails;
          }
        }

        if (setBuyerDetails) setBuyerDetails(details ?? null);
        console.log(details, "Buyer details loaded from firebase");
      }

      return () => unsubscribe();
    });
  }, [setBuyerDetails]);

  console.log(firebasedata, "data getted from firebase");

  console.log(responses, "Response from fbr on sending invoice");

  return (
    <div className="flex mt-15 w-full">
      <Sidebar />
      <div className="pt-10 flex flex-col pb-30 w-full h-[100vh]">
        <div className="flex mx-13.5 flex-col bg-gray-50  rounded-b-sm mr-18.5">
          <div className="flex items-center justify-between bg-gray-50 px-6 py-3 rounded-md shadow-sm">
            {buyerDetails ? (
              <div className="flex gap-1 items-center">
                <p className="text-xl text-gray-800 font-semibold">Company:</p>
                <h3 className="text-lg font-semibold text-gray-700">
                  {buyerDetails.companyName}
                </h3>
              </div>
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
              {buyerDetails ? (
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <label className="text-xl font-semibold text-gray-700 pb-2">
                      Company details
                    </label>
                    <div className="flex flex-row items-center gap-1">
                      <label>Name:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.companyName}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Address:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.address}
                      </p>
                    </div>

                    {/* <div className="flex flex-row items-center gap-1">
                      <label>Bank name:</label>
                      {/* <p className="text-sm text-gray-600">
                        {companyDetails.bankname}
                      </p> */}
                    {/* </div> */}
                    {/* <div className="flex flex-row items-center gap-1">
                      <label>Bank branch:</label>
                      {/* <p className="text-sm text-gray-600">
                        {companyDetails.branch}
                      </p> */}
                    {/* </div> */}
                  </div>
                  <div className="flex flex-col  gap-1">
                    <div className="flex flex-row items-center gap-1">
                      <label>NTN/CNIC:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.ntn}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>Phone:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.phonenum}
                      </p>
                    </div>
                    {/* <div className="flex flex-row items-center gap-1">
                      <label>Business Type:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.businessType}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <label>GST/STRN:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.gst}
                      </p>
                    </div> */}
                    <div className="flex flex-row items-center gap-1">
                      <label>Email:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.email}
                      </p>
                    </div>
                    {/* <div className="flex flex-row items-center gap-1">
                      <label>Bank account no:</label>
                      {/* <p className="text-sm text-gray-600">
                        {buyerDetails.account}
                      </p> */}
                    {/* </div> */}
                    {/* <div className="flex flex-row items-center gap-1">
                      {/* <label>Iban:</label>
                      <p className="text-sm text-gray-600">
                        {buyerDetails.iban}
                      </p> */}
                    {/* </div> */}
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
                {Array.isArray(firebasedata) && firebasedata.length > 0 ? (
                  firebasedata.map((data, index: number) => {
                    // compute persisted and response invoice numbers
                    const persistedFbr =
                      (data as FirebaseInvoice)?.fbrinvoiceno ?? null;
                    const responseInvoiceNumber =
                      (
                        responses[index]?.data as
                          | { invoiceNumber?: string }
                          | undefined
                      )?.invoiceNumber ?? null;
                    const isSent = Boolean(
                      persistedFbr || responseInvoiceNumber
                    );
                    const displayedInvoiceNo =
                      persistedFbr || responseInvoiceNumber || null;

                    return (
                      <div
                        key={index}
                        className="border border-gray-200 bg-white rounded-md shadow-sm p-5 hover:shadow-md transition"
                      >
                        <div className="flex flex-col">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full">
                              {/* Invoice Details */}
                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Invoice No
                                </span>
                                <p className="text-sm font-medium flex text-gray-700">
                                  INV-{data.Invoicenum}
                                </p>
                              </div>

                              {/* <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Voucher
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  09765567
                                </p>
                              </div> */}

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Date
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  {data.date}
                                </p>
                              </div>

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Customer
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  {data.customer?.name}
                                </p>
                              </div>

                              {/* <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Amount
                                </span>
                                <p className="text-sm font-medium text-green-600">
                                  {data.Itemdetails?.[0]?.price}
                                </p>
                              </div> */}

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Status
                                </span>
                                <p className="text-sm font-medium text-yellow-600">
                                  {
                                    // prefer persisted validation status from firebase record
                                    (data as FirebaseInvoice)
                                      ?.fbrValidationStatus ||
                                      (
                                        responses[index]?.data as {
                                          validationResponse?: {
                                            status?: string;
                                          };
                                          invoiceNumber?: string;
                                        }
                                      )?.validationResponse?.status ||
                                      "Invalid"
                                  }
                                </p>
                              </div>

                              {/* <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  Validate
                                </span>
                                <p className="text-sm font-medium text-blue-600">
                                  Valid / In-valid
                                </p>
                              </div> */}

                              <div className="flex flex-col gap-0.5">
                                <span className="text-xs font-semibold text-gray-500">
                                  FBR Invoice No
                                </span>
                                <p className="text-sm font-medium text-gray-700">
                                  {displayedInvoiceNo || "Pending"}
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 ml-6 mt-2">
                              <div>
                                <button
                                  onClick={() => toggleCustomerDetails(index)}
                                  className="text-gray-600 cursor-pointer hover:text-gray-900 transition text-xl"
                                >
                                  {selectedCustomerIndex === index ? (
                                    <FiEyeOff />
                                  ) : (
                                    <FiEye />
                                  )}
                                </button>
                                {/* <p>View details</p> */}
                              </div>

                              {/* <button
                                onClick={() => deleteitem(index)}
                                className="text-gray-600 hover:text-red-600 transition text-xl"
                              >
                                <RiDeleteBin6Line />
                              </button> */}
                            </div>
                          </div>

                          {/* Send to FBR Button */}
                          <div className="flex flex-col w-fit gap-2 pt-6">
                            <button
                              onClick={() => validatefromfbr(index)}
                              disabled={isSent}
                              className={`px-4 py-1 rounded-sm font-semibold w-fit transition ${
                                isSent
                                  ? "bg-green-600 text-white cursor-not-allowed opacity-95"
                                  : validationStatus[index] === "Validated"
                                  ? "bg-green-500 text-white cursor-not-allowed"
                                  : validationStatus[index] === "Sending..."
                                  ? "bg-yellow-600 text-white"
                                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer text-white"
                              }`}
                            >
                              {isSent
                                ? "Sent"
                                : validationStatus[index] || "Send to FBR"}
                            </button>
                            <div className="flex gap-0.5">
                              {/* <span className="text-xs font-semibold text-gray-500">
                                Response from fbr
                              </span> */}
                              <div className="text-sm font-medium text-red-500">
                                {(() => {
                                  const resp = responses[index] ?? {};
                                  const d =
                                    (resp as ValidationResponse).data ?? resp;
                                  const faultDesc =
                                    d?.fault &&
                                    typeof d.fault === "object" &&
                                    "description" in d.fault
                                      ? (d.fault as { description?: string })
                                          .description
                                      : d?.fault ?? null;
                                  const validationError =
                                    (d?.validationResponse &&
                                    typeof d.validationResponse === "object" &&
                                    "error" in d.validationResponse
                                      ? (
                                          d.validationResponse as {
                                            error?: string;
                                          }
                                        ).error
                                      : undefined) ??
                                    (typeof d?.validationResponse === "string"
                                      ? d.validationResponse
                                      : null);
                                  const invoiceStatuses =
                                    (d?.validationResponse &&
                                    typeof d.validationResponse === "object" &&
                                    "invoiceStatuses" in d.validationResponse
                                      ? (
                                          d.validationResponse as {
                                            invoiceStatuses?: unknown;
                                          }
                                        ).invoiceStatuses
                                      : undefined) ??
                                    (d && "invoiceStatuses" in d
                                      ? (d as { invoiceStatuses?: unknown })
                                          .invoiceStatuses
                                      : undefined) ??
                                    null;
                                  const invoiceStatusError = Array.isArray(
                                    invoiceStatuses
                                  )
                                    ? invoiceStatuses
                                        .map(
                                          (s: { error?: string }) => s?.error
                                        )
                                        .filter(Boolean)
                                        .join("; ")
                                    : invoiceStatuses &&
                                      typeof invoiceStatuses === "object" &&
                                      "error" in invoiceStatuses
                                    ? (invoiceStatuses as { error?: string })
                                        .error
                                    : null;
                                  const displayError =
                                    faultDesc ||
                                    validationError ||
                                    invoiceStatusError;
                                  return displayError ? (
                                    <p className="text-xs max-w-200">
                                      {String(displayError)}
                                    </p>
                                  ) : null;
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* COLLAPSIBLE DETAILS */}
                        {selectedCustomerIndex === index && (
                          <div className="bg-gray-50 border border-gray-200 p-5 mt-6 rounded-md">
                            <div className="flex flex-col md:flex-col gap-8">
                              {/* Customer Details */}
                              <div className="flex-1">
                                {/* <h3 className="font-semibold text-lg text-gray-700 mb-3">
                                  Customer / Seller Details
                                </h3> */}
                                <div className="space-y-1">
                                  <p className="text-3xl text-gray-800 font-semibold ">
                                    {/* <strong>Name:</strong>  */}
                                    {companyDetails?.companyName}
                                  </p>
                                  {/* <p>
                                    <strong>CNIC/NTN:</strong>{" "}
                                    {companyDetails?.ntn}
                                  </p> */}
                                  {/* <p>
                                    <strong>Mobile:</strong>{" "}
                                    {data.customer?.mobileNumber}
                                  </p> */}
                                  {/* <p>
                                    <strong>Email:</strong>{" "}
                                    {data.customer?.email}
                                  </p> */}
                                  {/* <p>
                                    <strong>Status:</strong>{" "}
                                    {data.customer?.status}
                                  </p> */}
                                  {/* <p>
                                    <strong>Credit Limit:</strong>{" "}
                                    {data.customer?.creditLimit}
                                  </p> */}
                                  {/* <p>
                                    <strong>Description:</strong>{" "}
                                    {data.customer?.description}
                                  </p> */}
                                  {/* <p>
                                    <strong>Contact Person:</strong>{" "}
                                    {data.customer?.contactperson}
                                  </p> */}
                                  {/* <p>
                                    <strong>Province:</strong>{" "}
                                    {data.customer?.Site}
                                  </p> */}
                                  <p className="pl-2 text-sm text-gray-600">
                                    {/* <strong>Address:</strong>{" "} */}
                                    {data.customer?.address}
                                  </p>
                                </div>
                                <div className="flex flex-ro"></div>
                                <div className="flex flex-col gap-4">
                                  <div>Company/seller details</div>
                                  <div>Buyer details</div>
                                </div>
                              </div>
                              <div className="flex-1">
                                {/* <h3 className="font-semibold text-lg text-gray-700 mb-3">
                                  Transaction
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p>
                                    <strong>Date:</strong> {data.date}
                                  </p>
                                  <p>
                                    <strong>Type:</strong> {data.types?.title}
                                  </p>
                                  {/* <p>
                                    <strong>Remarks:</strong>{" "}
                                    {data.Transactiondatendtype?.remarks}
                                  </p> */}
                                {/* </div> */}

                                <h3 className="font-semibold text-lg text-gray-700 mt-5 mb-3">
                                  Item Details
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p>
                                    <strong>Name:</strong>{" "}
                                    {data.items?.[0]?.itemname}
                                  </p>
                                  <p>
                                    <strong>Barcode:</strong>{" "}
                                    {data.items?.[0]?.barcode}
                                  </p>
                                  {/* <p>
                                    <strong>Category:</strong>{" "}
                                    {data.Itemdetails?.[0]?.category}
                                  </p> */}
                                  <p>
                                    <strong>HS Code:</strong>{" "}
                                    {data.items?.[0]?.order}
                                  </p>
                                  <p>
                                    <strong>SRO:</strong> {data.items?.[0]?.SRO}
                                  </p>
                                  <p>
                                    <strong>SRO Item:</strong>{" "}
                                    {data.items?.[0]?.SroItemNO}
                                  </p>
                                  <p>
                                    <strong>UOM:</strong> {data.items?.[0]?.Uom}
                                  </p>
                                  {/* <p>
                                    <strong>Asset Account:</strong>{" "}
                                    {data.Itemdetails?.[0]?.assestAccount}
                                  </p> */}
                                  <p>
                                    <strong>Price:</strong>{" "}
                                    {data.items?.[0]?.price?.toString()}
                                  </p>
                                  <p>
                                    <strong>Quantity:</strong>{" "}
                                    {data.items?.[0]?.quantity?.toString()}
                                  </p>
                                  <p>
                                    <strong>Remarks:</strong>{" "}
                                    {data.items?.[0]?.remarks}
                                  </p>
                                  <p>
                                    <strong>Tax Amount:</strong>{" "}
                                    {data.items?.[0]?.taxAmount}
                                  </p>
                                  <p>
                                    <strong>Net Amount:</strong>{" "}
                                    {data.items?.[0]?.netAmount}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
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
