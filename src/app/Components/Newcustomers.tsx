import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { customerreceivables } from "@/Constants/Framerdata";
import { ToastContainer, toast } from "react-toastify";
import { Status } from "@/Constants/Framerdata";
type NewcustomersProps = {
  hidedetailssection: () => void;
  setDetailsSection: () => boolean;
};
export default function Newcustomers({
  hidedetailssection,
  setDetailsSection,
}: NewcustomersProps) {
  const [chevronDown, setchevronDown] = useState(true);
  const [chevronup, setChevronup] = useState(false);
  const [chevronDown2, setchevronDown2] = useState(true);
  const [chevronup2, setChevronup2] = useState(false);
  const [receivablesData, setreceivablesData] = useState(false);
  const [StautsData, setStautsData] = useState(false);
  const [customerreceivable, setData] = useState<string>("");
  const [status, SetStatus] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [CNIC, setCnic] = useState("");
  const [inputsdata, SetinputsData] = useState<{
    customerreceivable: string;
    name: string;
    description: string;
    CNIC: number;
    status: string;
  }>({
    customerreceivable: "",
    name: "",
    description: "",
    CNIC: 0,
    status: "",
  });

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
    SetinputsData({
      customerreceivable: customerreceivable,
      name: name,
      description: description,
      CNIC: 0,
      status: status,
    });
    if (!customerreceivable || !name || !CNIC || !status) {
      toast.error("Please fill in all required fields!");
    } else {
      console.log(
        { customerreceivable, name, description, CNIC },
        "Customer details"
      );
      //  alert("Data Added!");
      setDetailsSection();
    }
  };

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 13) inpvalue = inpvalue.slice(0, 13);
    setCnic(inpvalue);
  };

  const showstatus = () => {
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

  const setstatus = (value: string) => {
    setStautsData(false);
    setChevronup2(false);
    setchevronDown2(true);
    SetStatus(value);
  };

  return (
    <div className="">
      <div className="fixed w-full bg-[#00000063] inset-0  px-10 py-14 flex justify-center">
        <div className="bg-white text-black w-full rounded-md">
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
          <div className="grid grid-cols-3 py-10 gap-4 px-10">
            <div className="border relative w-9/12 h-fit border-gray-400 rounded-sm pb-0">
              <label htmlFor="" className="text-sm pl-1 text-gray-900">
                <span className="text-red-400">*</span> Parent Account
              </label>
              <div
                onClick={showcustomerreceivables}
                className="bg-gray-300  flex justify-between items-center px-1 py-1 mt-1 hover:bg-gray-400 cursor-pointer rounded-sm"
              >
                <p className="px-2 text-sm">
                  {customerreceivable
                    ? customerreceivable
                    : "Cutomer Receivables"}
                </p>
                {chevronDown && (
                  <span>
                    <IoChevronDownOutline />
                  </span>
                )}
                {chevronup && (
                  <span>
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
            <div className="border flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
              <label className="text-sm pl-1 text-gray-900">
                <span className="text-red-400">*</span> Name{" "}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="py-1 pl-3 border-none outline-0"
              />
            </div>
            <div className="border flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
              <label className="text-sm pl-2 text-gray-900">
                <span className="text-red-400"></span> Description{" "}
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="py-1 pl-3 border-none outline-0"
              />
            </div>
            <div className="border flex flex-col h-fit  w-9/12 border-gray-400 rounded-sm pb-0 py-1">
              <label className="text-sm pl-2 text-gray-900">
                <span className="text-red-400">*</span> CNIC/NTN Number{" "}
              </label>
              <input
                value={CNIC}
                onChange={handlechange}
                type="text"
                className="py-1 pl-3 border-none outline-0"
                maxLength={13}
              />
            </div>

            <div className="border relative w-9/12 h-fit border-gray-400 rounded-sm pb-0">
              <label htmlFor="" className="text-sm pl-1 text-gray-900">
                <span className="text-red-400">*</span> E Status
              </label>
              <div
                onClick={showstatus}
                className="bg-gray-300  flex justify-between items-center px-1 py-1 mt-1 hover:bg-gray-400 cursor-pointer rounded-sm"
              >
                <p className="px-2 text-sm">{status ? status : "Status"}</p>
                {chevronDown2 && (
                  <span>
                    <IoChevronDownOutline />
                  </span>
                )}
                {chevronup2 && (
                  <span>
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
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
          </div>
          <div className="flex justify-between px-2">
            <div>1</div>
            <div>
              <button
                onClick={addcustomerdetails}
                className="bg-blue-600 text-white px-4 py-1 rounded-sm hover:bg-blue-800 cursor-pointer"
              >
                {" "}
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
