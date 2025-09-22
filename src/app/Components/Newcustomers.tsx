"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoChevronUp, IoChevronDownOutline } from "react-icons/io5";
import {  Status, Sites } from "@/Constants/Framerdata";
import { ToastContainer, toast } from "react-toastify";
import { useCustomer } from "@/Contexts/MyContext";
// import Select from "react-select";
// import {
// Country,
// State,
// City,
// ICountry,
// IState,
// ICity,
// } from "country-state-city";

type NewcustomersProps = {
  hidedetailssection: () => void;
  setDetailsSection: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Newcustomers({
  hidedetailssection,
  setDetailsSection,
}: NewcustomersProps) {
  // const [chevronDown, setchevronDown] = useState(true);
  // const [chevronup, setChevronup] = useState(false);
  const [chevronDown2, setchevronDown2] = useState(true);
  const [chevronup2, setChevronup2] = useState(false);
  // const [receivablesData, setreceivablesData] = useState(false);
  const [StautsData, setStautsData] = useState(false);
  const [SitesData, setSitesData] = useState(false);
  // const [, setData] = useState("");
  const [status, SetStatus] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // const [shippingaddress, setShippingAddress] = useState("");
  const [description, setDescription] = useState("");
  const [CNIC, setCnic] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [contactperson, setcontactPerson] = useState("");
  const [Phonenumber, setPhonenumber] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [sitechvrnup, setSitechvrnup] = useState(false);
  const [sitechvrndwn, setSitechvrndwn] = useState(true);
  // const [country, setSelectedCountry] = useState<ICountry | null>(null);
  // const [States, setSelectedState] = useState<IState | null>(null);
  // const [city, setSelectedCity] = useState<ICity | null>(null);
  const [Site, SetSite] = useState("");

  const { Customerdetails, setInputsdata } = useCustomer();

  // const showcustomerreceivables = () => {
  //   setchevronDown(!chevronDown);
  //   setChevronup(!chevronup);
  //   setreceivablesData(!receivablesData);
  // };

  // const setreceivable = (value: string) => {
  //   setData(value);
  //   setreceivablesData(false);
  //   setChevronup(false);
  //   setchevronDown(true);
  // };

  const addcustomerdetails = () => {
    document.body.style.overflow = "auto";
    const inputsData = {
      // customerreceivable,
      name,
      description,
      CNIC,
      status,
      address,
      // shippingaddress,
      Phonenumber,
      mobileNumber,
      email,
      website,
      // country,
      // States,
      // city,
      contactperson,
      creditLimit,
      Site,
    };

    if (!name || !CNIC || !status || !Site) {
      toast.error("Please fill in all required fields!");
    } else {
      setDetailsSection(false);
      setInputsdata(inputsData);
    }
  };

  useEffect(() => {
    console.log(Customerdetails, "-All inputs data");
  }, [Customerdetails]);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 13) inpvalue = inpvalue.slice(0, 13);
    setCnic(inpvalue);
  };

  const handlephonenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 10) inpvalue = inpvalue.slice(0, 10);
    setPhonenumber(inpvalue);
  };

  const handlemobilenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 11) inpvalue = inpvalue.slice(0, 11);
    setmobileNumber(inpvalue);
  };

  const showstatus = () => {
    setStautsData(!StautsData);
    setchevronDown2(!chevronDown2);
    setChevronup2(!chevronup2);
  };

  const showsites = () => {
    setSitesData(!SitesData);
    setSitechvrndwn(!sitechvrndwn);
    setSitechvrnup(!sitechvrnup);
  };

  const slectsites = (value: string) => {
    setSitechvrndwn(true);
    setSitechvrnup(false);
    setSitesData(false);
    SetSite(value);
  };

  const setstatus = (value: string) => {
    setStautsData(false);
    setChevronup2(false);
    setchevronDown2(true);
    SetStatus(value);
  };

  return (
    <div>
      <div className="fixed w-full bg-black/40 inset-0 z-60 px-6 py-12 flex justify-center overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
        <div className="bg-white relative text-black w-full max-w-6xl rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex justify-between bg-gray-100 rounded-t-xl px-6 py-3 border-b border-gray-200">
            <p className="text-xl font-semibold text-gray-800">
              Customer Details
            </p>
            <button
              onClick={hidedetailssection}
              className="text-2xl hover:scale-110 transition cursor-pointer text-red-600"
            >
              <RxCross2 />
            </button>
          </div>

          {/* Form */}
          <div className="bg-white">
            <div className="grid grid-cols-3 gap-6 px-8 py-8">
              {/* Parent Account */}
              {/* <div className="relative w-full">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Parent Account
                </label>
                <div
                  onClick={showcustomerreceivables}
                  className="bg-gray-50 flex border border-gray-300 justify-between items-center px-3 py-2 mt-2 rounded-md cursor-pointer hover:border-gray-400 transition"
                >
                  <p className="text-sm text-gray-600">
                    {customerreceivable || "Customer Receivables"}
                  </p>
                  {chevronDown ? (
                    <IoChevronDownOutline className="text-gray-500" />
                  ) : (
                    <IoChevronUp className="text-gray-500" />
                  )}
                </div>
                {receivablesData && (
                  <div className="absolute mt-1 flex flex-col gap-1 w-full max-h-32 overflow-auto text-sm text-gray-700 bg-white border rounded-md shadow-lg z-50">
                    {customerreceivables.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => setreceivable(data.value)}
                        className="px-3 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                      >
                        {data.title}
                      </div>
                    ))}
                  </div>
                )}
              </div> */}

              {/* Name */}
              <div className="flex flex-col w-full col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* CNIC */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> CNIC/NTN Number
                </label>
                <input
                  value={CNIC}
                  onChange={handlechange}
                  type="text"
                  maxLength={13}
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Status */}
              <div className="relative w-full">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Status
                </label>
                <div
                  onClick={showstatus}
                  className="bg-gray-50 flex border border-gray-300 justify-between items-center px-3 py-2 mt-2 rounded-md cursor-pointer hover:border-gray-400 transition"
                >
                  <p className="text-sm text-gray-600">
                    {status || "Select Status"}
                  </p>
                  {chevronDown2 ? (
                    <IoChevronDownOutline className="text-gray-500" />
                  ) : (
                    <IoChevronUp className="text-gray-500" />
                  )}
                </div>
                {StautsData && (
                  <div className="absolute mt-1 flex flex-col gap-1 w-full max-h-32 overflow-auto text-sm text-gray-700 bg-white border rounded-md shadow-lg z-50">
                    {Status.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => setstatus(data.value)}
                        className="px-3 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                      >
                        {data.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Province */}
              <div className="relative w-full">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Province
                </label>
                <div
                  onClick={showsites}
                  className="bg-gray-50 flex border border-gray-300 justify-between items-center px-3 py-2 mt-2 rounded-md cursor-pointer hover:border-gray-400 transition"
                >
                  <p className="text-sm text-gray-600">
                    {Site || "Select Province"}
                  </p>
                  {sitechvrndwn ? (
                    <IoChevronDownOutline className="text-gray-500" />
                  ) : (
                    <IoChevronUp className="text-gray-500" />
                  )}
                </div>
                {SitesData && (
                  <div className="absolute mt-1 flex flex-col gap-1 w-full max-h-32 overflow-auto text-sm text-gray-700 bg-white border rounded-md shadow-lg z-50">
                    {Sites.map((data) => (
                      <div
                        key={data.id}
                        onClick={() => slectsites(data.value)}
                        className="px-3 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                      >
                        {data.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full col-span-1">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">* </span>
                  Address
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {/* 
              <div className="flex flex-col w-full col-span-3">
                <label className="text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <input
                  value={shippingaddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div> */}

              {/* Phone */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  value={Phonenumber}
                  onChange={handlephonenumber}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  value={mobileNumber}
                  onChange={handlemobilenumber}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Country */}
              {/* <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  <span className="text-red-500">*</span> Country
                </label>
                <Select
                  options={Country.getAllCountries()}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.isoCode}
                  value={country}
                  onChange={(val) => setSelectedCountry(val)}
                  className="mt-2"
                />
              </div>

              {/* State */}
              {/* <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  State
                </label>
                <Select
                  options={State.getStatesOfCountry(country?.isoCode || "")}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.isoCode}
                  value={States}
                  onChange={(val) => setSelectedState(val)}
                  className="mt-2"
                />
              </div> */}

              {/* City */}
              {/* <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  City
                </label>
                <Select
                  options={City.getCitiesOfState(
                    country?.isoCode || "",
                    States?.isoCode || ""
                  )}
                  getOptionLabel={(e) => e.name}
                  getOptionValue={(e) => e.name}
                  value={city}
                  onChange={(val) => setSelectedCity(val)}
                  className="mt-2"
                />
              </div> */}

              {/* Contact Person */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Contact Person
                </label>
                <input
                  value={contactperson}
                  onChange={(e) => setcontactPerson(e.target.value)}
                  type="text"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Credit Limit */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium text-gray-700">
                  Credit Limit
                </label>
                <input
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  type="number"
                  className="mt-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end px-6 absolute -bottom-10 w-full py-2 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                className={`px-8 py-1.5 rounded-md text-white font-medium transition ${
                  // !customerreceivable ||
                  !name ||
                  !CNIC ||
                  !status ||
                  !address ||
                  !Site
                    ? "bg-blue-500 opacity-50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
                onClick={addcustomerdetails}
                disabled={
                  // !customerreceivable ||
                  !name ||
                  !CNIC ||
                  !status ||
                  !address ||
                  !Site
                }
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
