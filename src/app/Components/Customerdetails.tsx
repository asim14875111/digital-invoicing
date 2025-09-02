"use client";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { transactiondata } from "../../Constants/Framerdata";
import { useContext, useEffect, useState } from "react";
import Newcustomers from "./Newcustomers";
import { useCustomer } from "@/Contexts/MyContext";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineAdd } from "react-icons/md";
import Invoiceitems from "./Invoiceitems";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useItems } from "@/Contexts/ItemsContext";
import { FaRegEdit } from "react-icons/fa";
import { Datacontext } from "@/Contexts/DataContext";
type InvoicingdataProps = {
  hidedetailsection: () => void;
};
export default function Customerdetails({
  hidedetailsection,
}: InvoicingdataProps) {
  const [date, setDate] = useState("");
  const [types, setTypes] = useState("");
  const [transactionTypes, setTransactionTypes] = useState<boolean>(false);
  const [customerdetails, setCustomerDetails] = useState<boolean>(false);
  const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevrondown, setChevrondown] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState(transactiondata);
  const [visible, setIsVisible] = useState<boolean>(true);
  const [unvisible, setIsUnvisible] = useState<boolean>(false);
  const [detailssection, setDetailsSection] = useState<boolean>(false);
  const { Customerdetails } = useCustomer();
  const { Itemdetails, setItemsData } = useItems();
  type ItemType = {
    itemname: string;
  };

  console.log(Customerdetails.name);

  const [edititems, setEditItems] = useState<ItemType | null>(null);
  const [alldata] = useState({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [invoiceSection, setInvoiceSection] = useState<boolean>(false);
  const [remarks, setRemarks] = useState("");
  const context = useContext(Datacontext);
  const setAllUsersData = context?.setAllUsersData;

  const savevalue = (value: string): void => {
    setTransactionTypes(false);
    setTypes(value);
    setChevronup(false);
    setChevrondown(true);
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
    const Transactiondatendtype = { date, types, remarks };
    if (!date || !types || !customerdetails) {
      toast.error("Please make sure all mandatory fields are filled in.");
    } else {
      const postbtn = document.getElementById("posting-data");
      if (postbtn) {
        postbtn.innerHTML = "Posting...";
      }
      setTimeout(() => {
        hidedetailsection();
      }, 1000);
      if (setAllUsersData) {
        setAllUsersData(
          (prev: import("@/Contexts/DataContext").AllUsersDataType[]) => [
            ...prev,
            { Transactiondatendtype, Customerdetails, Itemdetails },
          ]
        );
      }
      toast.success("Data Added");
      // clearInterval(interval);
    }
  };
  // useEffect(() => {
  // }, [allusersData])/;
  useEffect(() => {
    console.log(alldata, "Data of all forms");
    // setAllUsersData(alldata);
  }, [alldata]);
  const showdetailssection = (): void => {
    setEditItems(null);
    setInvoiceSection(true);
  };

  const deleteitem = (i: number): void => {
    const updatedItems = Itemdetails.filter((_, idx) => idx !== i);
    setItemsData(updatedItems);
  };

  const edititem = (item: ItemType, i: number): void => {
    setInvoiceSection(true);
    setEditItems(item);
    setEditIndex(i);
  };

  return (
    <>
      <div className="flex gap-2">
        <div className="  flex flex-col  rounded-sm px-3 py-1 w-fit">
          <label className="text-sm text-gray-700">
            <span className="text-red-400">* </span>Transaction Date
          </label>
          <input
            value={date}
            className="py-[5px] px-3 w-[200px]  text-gray-500 text-sm  shadow-md ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-2 rounded-md outline-0"
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </div>
        <div className=" flex flex-col  rounded-sm px-3 py-1 w-fit">
          <div>
            <p className="text-sm text-[#364153]">
              {" "}
              <span className="text-red-400">* </span>Transaction Type
            </p>
          </div>
          <div className="relative">
            <p
              onClick={() => showtransactiontypes()}
              className="py-[1px] flex justify-between items-center cursor-pointer px-3 w-[300px]  shadow-md border border-gray-200 focus:border-gray-400 bg-gray-100 mt-2 rounded-md outline-0"
            >
              <span className="line-clamp-1 text-gray-600 text-sm py-1">
                {types ? types : "Select Transaction Type"}
              </span>

              {chevrondown && (
                <span className="text-gray-500">
                  <IoChevronDownOutline />
                </span>
              )}
              {chevronup && (
                <span className="text-gray-500">
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
                    className="outline-none -mr-3 w-full"
                  />
                  <p className="bg-white pr-2">
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
        <div className="flex flex-col rounded-sm px-3 py-1  w-fit">
          <div>
            <p className="text-sm text-[#364153]">
              <span className="text-red-400">* </span>
              Customer Details
            </p>
          </div>
          <div className="relative">
            <p
              onClick={() => showcustomerdetails()}
              className="py-[1px] flex justify-between items-center cursor-pointer px-3 w-[300px]  shadow-md border border-gray-200 focus:border-gray-400 bg-gray-100 mt-2 rounded-md outline-0"
            >
              <span className="line-clamp-1 text-gray-600 py-1 text-sm">
                {Customerdetails ? Customerdetails.name :  "Select Customer"}
              </span>
              {visible && (
                <span className="text-gray-500">
                  <IoChevronDownOutline />
                </span>
              )}
              {unvisible && (
                <span className="text-gray-500">
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
        <div className="flex flex-col rounded-sm px-3 py-1  w-fit">
          <div>
            <p className="text-sm text-[#364153]">
              <span className="text-red-400"></span> Remarks
            </p>
          </div>
          <div>
            <input
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              type="text"
              className="py-[4px] pl-3  shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-2 rounded-md outline-0"
            />
          </div>
        </div>
      </div>
      <div className="pt-5">
        {Itemdetails.map((item, i) => (
          <div className="bg-gray  px-2 py-2 rounded-md" key={i}>
            <div className="w-full bg-gray-100 mt-2 flex justify-between border rounded-md px-2 border-gray-300">
              <div>
                <p className="text-gray-600">{item.itemname}</p>
              </div>
              <div className="flex gap-2 items-center">
                <div
                  className="text-gray-600 cursor-pointer hover:scale-105 transition"
                  onClick={() => edititem(item, i)}
                >
                  <FaRegEdit />
                </div>
                <div
                  className="text-red-500  cursor-pointer hover:scale-105 transition"
                  onClick={() => deleteitem(i)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      <div className="flex justify-between pt-10">
        <div>
          <button
            onClick={showdetailssection}
            className="bg-blue-800 flex gap-2 items-center px-4 py-1.5 cursor-pointer hover:bg-blue-900 rounded-md text-white "
          >
            <span className="text-red-600">*</span> Add Invoice item{" "}
            <span className="text-white">
              <MdOutlineAdd />
            </span>{" "}
          </button>
          <div></div>
        </div>
        <button
          id="posting-data"
          onClick={submitdata}
          className="bg-blue-800 py-1 rounded-md cursor-pointer hover:bg-blue-900 text-white px-6"
        >
          Post
        </button>
      </div>
      {invoiceSection && (
        <Invoiceitems
          editIndex={editIndex}
          edititems={edititems}
          deleteitem={deleteitem}
          setInvoiceSection={setInvoiceSection}
        />
      )}
      {detailssection && (
        <Newcustomers
          hidedetailssection={hidedetailssection}
          setDetailsSection={setDetailsSection}
        />
      )}
    </>
  );
}
