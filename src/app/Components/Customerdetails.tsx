import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { transactiondata } from "../../Constants/Framerdata";
import { useState } from "react";
import Newcustomers from "./Newcustomers";
export default function Customerdetails() {
  const [date, setDate] = useState("");
  const [types, setTypes] = useState("");
  const [transactionTypes, setTransactionTypes] = useState<boolean>(false);
  const [customerdetails, setCustomerDetails] = useState<boolean>(false);
  const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevrondown, setChevrondown] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState(transactiondata);
  const [visible, setIsVisible] = useState(true);
  const [unvisible, setIsUnvisible] = useState(false);
  const [detailssection, setDetailsSection] = useState(false);
  const [data, setData] = useState<{ date: string; types: string }>({
    date: "",
    types,
  });
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
    if (visible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    if (unvisible) {
      setIsUnvisible(false);
    } else {
      setIsUnvisible(true);
    }
  };

  const handlefilterdata = (e: React.ChangeEvent<HTMLInputElement>) => {
    const SearchTerm = e.target.value;
    const filteritems = transactiondata.filter((data) =>
      data.title.toLowerCase().includes(SearchTerm.toLowerCase())
    );
    setFilteredData(filteritems);
  };

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
  const addcustomerdetails = () => {
    setDetailsSection(true);
  };

  const hidedetailssection = () => {
    setDetailsSection(false);
  };

  const submitdata = () => {
    setData({
      date: date,
      types: types,
    });
    console.log({ date, types }, "Complete Data");
  };

  return (
    <>
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
              <span className="line-clamp-1">Select Customer</span>
              {visible && (
                <span>
                  <IoChevronDownOutline />
                </span>
              )}
              {unvisible && (
                <span>
                  <IoChevronUp />
                </span>
              )}
            </p>
            {customerdetails && (
              <div className="absolute w-full bg-white px-1 py-2">
                <div
                  onClick={() => addcustomerdetails()}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Add Customers +
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="self-end">
        <button
          onClick={submitdata}
          className="bg-blue-800 py-1 rounded-md cursor-pointer hover:bg-blue-900 text-white px-6"
        >
          Post
        </button>
      </div>
      {detailssection && (
        <Newcustomers hidedetailssection={hidedetailssection} setDetailsSection={setDetailsSection} />
      )}
    </>
  );
}
