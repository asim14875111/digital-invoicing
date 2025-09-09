"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { customerreceivables } from "@/Constants/Framerdata";
import { ToastContainer, toast } from "react-toastify";
import { Status } from "@/Constants/Framerdata";
import { useCustomer } from "@/Contexts/MyContext";
import { Sites } from "@/Constants/Framerdata";
import Select from "react-select";
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from "country-state-city";
type NewcustomersProps = {
  hidedetailssection: () => void;
  setDetailsSection: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Newcustomers({
  hidedetailssection,
  setDetailsSection,
}: NewcustomersProps) {
  const [chevronDown, setchevronDown] = useState<boolean>(true);
  const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevronDown2, setchevronDown2] = useState<boolean>(true);
  const [chevronup2, setChevronup2] = useState<boolean>(false);
  const [receivablesData, setreceivablesData] = useState<boolean>(false);
  const [StautsData, setStautsData] = useState<boolean>(false);
  const [SitesData, setSitesData] = useState<boolean>(false);
  const [customerreceivable, setData] = useState<string>("");
  const [status, SetStatus] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [shippingaddress, setShippingAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [CNIC, setCnic] = useState<string>("");
  const [creditLimit, setCreditLimit] = useState<string>("");
  const [contactperson, setcontactPerson] = useState<string>("");
  const [Phonenumber, setPhonenumber] = useState<string>("");
  const [mobileNumber, setmobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [sitechvrnup, setSitechvrnup] = useState<boolean>(false);
  const [sitechvrndwn, setSitechvrndwn] = useState<boolean>(true);
  const [country, setSelectedCountry] = useState<ICountry | null>(null);
  const [States, setSelectedState] = useState<IState | null>(null);
  const [city, setSelectedCity] = useState<ICity | null>(null);
  const [Site, SetSite] = useState<string>("");
  const { Customerdetails, setInputsdata } = useCustomer();
  const showcustomerreceivables = (): void => {
    if (chevronDown) {
      setchevronDown(false);
      setreceivablesData(true);
    } else {
      setchevronDown(true);
    }
    if (chevronup) {
      setChevronup(false);
      setreceivablesData(false);
    } else {
      setChevronup(true);
    }
  };

  const setreceivable = (value: string): void => {
    console.log(value, "Value of customerreceivables");
    setData(value);
    setreceivablesData(false);
    setChevronup(false);
    setchevronDown(true);
  };

  const addcustomerdetails = (): void => {
    document.body.style.overflow = "auto";
    const inputsData = {
      customerreceivable,
      name,
      description,
      CNIC,
      status,
      address,
      shippingaddress,
      Phonenumber,
      mobileNumber,
      email,
      website,
      country,
      States,
      city,
      contactperson,
      creditLimit,
      Site,
    };

    if (!customerreceivable || !name || !CNIC || !status || !country || !Site) {
      toast.error("Please fill in all required fields!");
    } else {
      setDetailsSection(false);
      setInputsdata(inputsData);
    }
  };
  useEffect(() => {
    console.log(Customerdetails, "-All inputs data");
  }, [Customerdetails]);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 13) inpvalue = inpvalue.slice(0, 13);
    setCnic(inpvalue);
  };
  const handlephonenumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 10) inpvalue = inpvalue.slice(0, 10);
    setPhonenumber(inpvalue);
  };
  const handlemobilenumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 11) inpvalue = inpvalue.slice(0, 11);
    setmobileNumber(inpvalue);
  };

  const showstatus = (): void => {
    if (StautsData) {
      setStautsData(false);
      setchevronDown2(true);
      setChevronup2(false);
    } else {
      setStautsData(true);
      setchevronDown2(false);
      setChevronup2(true);
    }
  };

  const showsites = (): void => {
    if (SitesData) {
      setSitechvrndwn(true);
      setSitechvrnup(false);
      setSitesData(false);
    } else {
      setSitechvrndwn(false);
      setSitesData(true);
      setSitechvrnup(true);
    }
  };

  const slectsites = (value: string): void => {
    setSitechvrndwn(true);
    setSitechvrnup(false);
    setSitesData(false);
    SetSite(value);
  };

  const setstatus = (value: string): void => {
    setStautsData(false);
    setChevronup2(false);
    setchevronDown2(true);
    SetStatus(value);
  };

  return (
    <div className="">
      <div className="fixed w-full bg-[#00000063] inset-0 z-60 px-10 py-14 flex justify-center">
        <div className=" text-black w-full rounded-md">
          <div className="flex justify-between bg-gray-200 rounded-t-md px-4 py-2">
            <div>
              <p className="text-2xl">Customer Details</p>
            </div>
            <div>
              <p
                onClick={hidedetailssection}
                className="text-3xl hover:scale-110 transition cursor-pointer text-red-600 font-semibold"
              >
                <RxCross2 />
              </p>
            </div>
          </div>
          <div className="bg-white">
            <div className="grid grid-cols-3 py-10 pb-0 gap-4 px-10">
              <div className=" relative w-9/12 h-fit border-gray-400 rounded-sm pb-0">
                <label htmlFor="" className="text-sm pt-1 text-[#4a5565]">
                  <span className="text-red-400">* </span> Parent Account
                </label>
                <div
                  onClick={showcustomerreceivables}
                  className="bg-gray-100  flex border border-gray-200 justify-between items-center px-1 py-[4px] mt-[7px] hover:border-gray-300 cursor-pointer rounded-md"
                >
                  <p className="px-2 text-sm text-gray-600">
                    {customerreceivable
                      ? customerreceivable
                      : "Cutomer Receivables"}
                  </p>
                  {chevronDown && (
                    <span className="text-gray-500">
                      <IoChevronDownOutline />
                    </span>
                  )}
                  {chevronup && (
                    <span className="text-gray-500">
                      <IoChevronUp />
                    </span>
                  )}
                </div>
                {receivablesData && (
                  <div className="absolute flex flex-col gap-1 pt-2 w-full h-[90px] overflow-auto text-black bg-white">
                    {customerreceivables.map((data) => (
                      <div
                        onClick={() => setreceivable(data.value)}
                        className="pl-2 hover:bg-blue-600 cursor-pointer hover:text-white"
                        key={data.id}
                      >
                        <p>{data.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">*</span> Name{" "}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>
              <div className="  flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span> Description{" "}
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>
              <div className=" flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400">*</span> CNIC/NTN Number{" "}
                </label>
                <input
                  value={CNIC}
                  onChange={handlechange}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                  maxLength={13}
                />
              </div>
              <div className="relative w-9/12 h-fit border-gray-400 rounded-sm pb-0">
                <label
                  htmlFor=""
                  className="text-sm pt-1 text-[#4a5565] font-semibold"
                >
                  <span className="text-red-400">*</span> E Status
                </label>
                <div
                  onClick={showstatus}
                  className="bg-gray-100  flex border border-gray-200 justify-between items-center px-1 py-[4px] mt-[7px] hover:border-gray-300 cursor-pointer rounded-md"
                >
                  <p className="px-2 text-sm text-gray-600">
                    {status ? status : "Status"}
                  </p>
                  {chevronDown2 && (
                    <span className="text-gray-500">
                      <IoChevronDownOutline />
                    </span>
                  )}
                  {chevronup2 && (
                    <span className="text-gray-500">
                      <IoChevronUp />
                    </span>
                  )}
                </div>
                {StautsData && (
                  <div className="absolute flex flex-col gap-1 pt-2 w-full h-[90px] overflow-auto text-black bg-white">
                    {Status.map((data) => (
                      <div
                        onClick={() => setstatus(data.value)}
                        className="pl-2 hover:bg-blue-600 cursor-pointer hover:text-white"
                        key={data.id}
                      >
                        <p>{data.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative w-9/12 h-fit border-gray-400 rounded-sm pb-0">
                <label
                  htmlFor=""
                  className="text-sm pt-1 text-[#4a5565] font-semibold"
                >
                  <span className="text-red-400">* </span>Site
                </label>
                <div
                  onClick={showsites}
                  className="bg-gray-100  flex border border-gray-200 justify-between items-center px-1 py-[4px] mt-[7px] hover:border-gray-300 cursor-pointer rounded-md"
                >
                  <p className="px-2 text-sm text-gray-600">
                    {Site ? Site : "Select Site"}
                  </p>
                  {sitechvrndwn && (
                    <span className="text-gray-500">
                      <IoChevronDownOutline />
                    </span>
                  )}
                  {sitechvrnup && (
                    <span className="text-gray-500">
                      <IoChevronUp />
                    </span>
                  )}
                </div>
                {SitesData && (
                  <div className="absolute flex flex-col gap-1 pt-2 w-full h-[90px] overflow-auto text-black bg-white">
                    {Sites.map((data) => (
                      <div
                        onClick={() => slectsites(data.value)}
                        className="pl-2 hover:bg-blue-600 cursor-pointer hover:text-white"
                        key={data.id}
                      >
                        <p>{data.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span> Address{" "}
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span>Shipping Address{" "}
                </label>
                <input
                  value={shippingaddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className=" flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span>Phone Number{" "}
                </label>
                <input
                  value={Phonenumber}
                  onChange={handlephonenumber}
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span>Mobile Number{" "}
                </label>
                <input
                  value={mobileNumber}
                  onChange={handlemobilenumber}
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span>Email{" "}
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span>Website{" "}
                </label>
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label
                  htmlFor=""
                  className="text-sm pb-1 flex gap-1 text-[#4a5565] font-semibold"
                >
                  <span className="text-red-400">*</span>Country
                </label>{" "}
                <div>
                  <Select
                    options={Country.getAllCountries()}
                    getOptionLabel={(options) => {
                      return options["name"];
                    }}
                    value={country}
                    onChange={(item) => {
                      setSelectedCountry(item);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label
                  htmlFor=""
                  className="text-sm pb-1 flex gap-1 text-[#4a5565] font-semibold"
                >
                  <span className="text-red-400"></span>State/Province
                </label>{" "}
                <div>
                  <Select
                    options={State?.getStatesOfCountry(country?.isoCode)}
                    getOptionLabel={(options) => {
                      return options["name"];
                    }}
                    value={States}
                    onChange={(item) => {
                      setSelectedState(item);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label
                  htmlFor=""
                  className="text-sm  flex gap-1 pb-1 text-[#4a5565] font-semibold"
                >
                  <span className="text-red-400"></span>City
                </label>{" "}
                <div>
                  <Select
                    options={City.getCitiesOfState(
                      States?.countryCode || "",
                      States?.isoCode || ""
                    )}
                    getOptionLabel={(options) => {
                      return options["name"];
                    }}
                    getOptionValue={(options) => {
                      return options["name"];
                    }}
                    value={city}
                    onChange={(item) => {
                      setSelectedCity(item);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span> Contact Person{" "}
                </label>
                <input
                  value={contactperson}
                  onChange={(e) => setcontactPerson(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pb-1 text-[#4a5565] font-semibold">
                  <span className="text-red-400"></span> Credit Limit (Days)
                </label>
                <input
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
            </div>
            <div className="flex justify-between px-4 py-4">
              <div></div>
              <div>
                <button
                  onClick={addcustomerdetails}
                  className={`bg-blue-600 text-white px-6 py-1 rounded-md  ${
                    !customerreceivable ||
                    !name ||
                    !CNIC ||
                    !status ||
                    !country ||
                    !Site
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-blue-800"
                  } `}
                  disabled={
                    !customerreceivable ||
                    !name ||
                    !CNIC ||
                    !status ||
                    !country ||
                    !Site
                  }
                >
                  {" "}
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
