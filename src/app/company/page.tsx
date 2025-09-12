"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { businesstypes } from "@/Constants/Framerdata";
import { useCompanyDetails } from "@/Contexts/Companycontext";
import { useRouter } from "next/navigation";
export default function Company() {
  const [companyName, setCompanyName] = useState<string>("");
  const [ntn, setNtnNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [gst, setGst] = useState<string>("");
  const [phonenum, setPhonenumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bankname, setBankName] = useState<string>("");
  const [branch, setBranchName] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [visible, setIsVisible] = useState<boolean>(true);
  const [businessdata, setBusinessData] = useState<boolean>(false);
  const [businessType, setBusinessType] = useState<string>("");
  const { companyDetails, setCompanyDetails } = useCompanyDetails();
  const router = useRouter();
  const savecompanydetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const details = {
      companyName,
      ntn,
      address,
      gst,
      phonenum,
      email,
      bankname,
      branch,
      account,
      iban,
      businessType,
    };
    setCompanyDetails(details);
    console.log("data saved");
    router.push("/invoice");
  };

  useEffect(() => {
    if (companyDetails) {
      setCompanyName(companyDetails.companyName || "");
      setNtnNumber(companyDetails.ntn || "");
      setAddress(companyDetails.address || "");
      setGst(companyDetails.gst || "");
      setPhonenumber(companyDetails.phonenum || "");
      setEmail(companyDetails.email || "");
      setBankName(companyDetails.bankname || "");
      setAccount(companyDetails.account || "");
      setIban(companyDetails.iban || "");
      setBusinessType(companyDetails.businessType || "");
    }
    console.log(companyDetails, "Company details");
  }, [companyDetails]);

  const setntnvalues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 8) inpvalue = inpvalue.slice(0, 8);
    setNtnNumber(inpvalue);
  };

  const setphonnodigits = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputvalue = e.target.value.replace(/\D/g, "");
    if (inputvalue.length > 10) inputvalue = inputvalue.slice(0, 10);
    setPhonenumber(inputvalue);
  };

  const setAccountdigits = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inpvalue = e.target.value.replace(/\D/g, "");
    setAccount(inpvalue);
  };

  const hidechvrndwn = (): void => {
    if (visible) {
      setIsVisible(false);
      setDisplay(true);
      setBusinessData(true);
    } else {
      setBusinessData(false);
      setIsVisible(true);
      setDisplay(false);
    }
  };

  const selectvalue = (value: string): void => {
    setBusinessData(false);
    setIsVisible(true);
    setDisplay(false);
    setBusinessType(value);
  };

  const setgstnum = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 12) inpvalue = inpvalue.slice(0, 12);
    setGst(inpvalue);
  };

  const setIbanregex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputvalue = e.target.value
      .replace(/[^a-zA-Z0-9]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setIban(inputvalue);
  };

  return (
    <div className="flex gap-5 mt-15">
      <Sidebar />
      <div className="px-14 w-full flex pr-17  items-center">
        <div className="flex flex-col bg-gray-50  rounded-[6px] w-full ">
          <div className="flex justify-between bg-gray-100 py-1 rounded-[6px] w-full">
            <p className="text-lg pl-2 text-gray-600">Company details</p>
            <p></p>
          </div>
          <form onSubmit={savecompanydetails}>
            <div className="grid grid-cols-1 gap-4 px-8 py-4 pb-10">
              <div className="flex gap-4">
                <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                  <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                    <span className="text-red-400 font-semibold ">* </span>
                    Company name{" "}
                  </label>
                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                  />
                </div>{" "}
                <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                  <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                    <span className="text-red-400 font-semibold ">* </span>
                    NTN{" "}
                  </label>
                  <input
                    value={ntn}
                    onChange={setntnvalues}
                    type="text"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                  />
                </div>{" "}
              </div>
              <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Address{" "}
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit relative  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  buisness type{" "}
                </label>
                <div
                  onClick={hidechvrndwn}
                  className="text-sm bg-gray-100 py-1 px-2 rounded-md border border-gray-200 text-gray-700 hover:border-gray-300 transition cursor-pointer flex justify-between items-center"
                >
                  <p>{businessType ? businessType : "Select business type"}</p>
                  {visible && (
                    <p className="text-gray-500">
                      <IoChevronDown />
                    </p>
                  )}
                  {display && (
                    <p>
                      <IoChevronUp />
                    </p>
                  )}
                </div>
                {businessdata && (
                  <div className="absolute top-13 rounded-b-sm border border- border-gray-200  bg-gray-100 w-full">
                    <div className="flex flex-col">
                      {businesstypes.map((type) => (
                        <div
                          onClick={() => selectvalue(type.value)}
                          className="text-sm hover:bg-blue-500 cursor-pointer hover:text-white pl-2 py-1"
                          key={type.id}
                        >
                          <p>{type.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>{" "}
              <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1 flex flex-row-reverse justify-between text-gray-600">
                  <span className="text-red-400 font-semibold text-xs">
                    Required only if your company is registered for sales tax.
                  </span>
                  <span>GST/STRN </span>
                </label>
                <input
                  value={gst}
                  onChange={setgstnum}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex gap-4">
                <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                  <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                    <span className="text-red-400 font-semibold "> </span>
                    Phone{" "}
                  </label>
                  <input
                    value={phonenum}
                    onChange={setphonnodigits}
                    type="text"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                  />
                </div>{" "}
                <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                  <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                    <span className="text-red-400 font-semibold "> </span>
                    Email{" "}
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                  />
                </div>{" "}
              </div>
              <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold "> </span>
                  Bank details{" "}
                </label>
                <div className="flex gap-4 w-full">
                  <input
                    value={bankname}
                    onChange={(e) => setBankName(e.target.value)}
                    type="text"
                    placeholder="Bank name"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200  w-full focus:ring-gray-300 bg-gray-100 mt-1 placeholder:text-sm rounded-md outline-0"
                  />
                  <input
                    value={branch}
                    onChange={(e) => setBranchName(e.target.value)}
                    type="text"
                    placeholder="Branch"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 w-full focus:ring-gray-300 bg-gray-100 mt-1 placeholder:text-sm rounded-md outline-0"
                  />
                  <input
                    value={account}
                    onChange={setAccountdigits}
                    type="text"
                    placeholder=" Account"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 w-full focus:ring-gray-300 bg-gray-100 mt-1 placeholder:text-sm rounded-md outline-0"
                  />
                  <input
                    value={iban}
                    onChange={setIbanregex}
                    type="text"
                    placeholder="IBAN"
                    className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 w-full focus:ring-gray-300 bg-gray-100 mt-1 placeholder:text-sm rounded-md outline-0"
                  />
                </div>
              </div>{" "}
            </div>
            <div className="flex justify-self-end px-8 pb-3">
              <button
                disabled={!companyName || !ntn || !address || !businessType}
                type="submit"
                className={` text-white px-5 py-1 rounded-sm  transition ${
                  !companyName || !ntn || !address || !businessType
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-[#223f8f] cursor-pointer hover:bg-[#1a3274]"
                } `}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
