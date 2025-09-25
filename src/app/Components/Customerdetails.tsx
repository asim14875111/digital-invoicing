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
import { auth } from "../../firebaseConfig";
// import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { push, ref, onValue } from "firebase/database";
// import { set } from "firebase/database";
// import { timeStamp } from "console";
type InvoicingdataProps = {
  hidedetailsection: () => void;
};

export default function Customerdetails({
  hidedetailsection,
}: InvoicingdataProps) {
  const [date, setDate] = useState("");
  const [types, setTypes] = useState<{ value: string; title: string } | null>(
    null
  );
  const [transactionTypes, setTransactionTypes] = useState<boolean>(false);
  const [customerdetails, setCustomerDetails] = useState<boolean>(false);
  const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevrondown, setChevrondown] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState(transactiondata);
  const [visible, setIsVisible] = useState<boolean>(true);
  const [unvisible, setIsUnvisible] = useState<boolean>(false);
  const [detailssection, setDetailsSection] = useState<boolean>(false);
  const { Customerdetails } = useCustomer();
  const { setInputsdata } = useCustomer();
  type Customer = {
    id: string;
    name?: string;
    description?: string;
    CNIC?: string;
    ntn?: string;
    status?: string;
    address?: string;
    Phonenumber?: string;
    mobileNumber?: string;
    email?: string;
    website?: string;
    contactperson?: string;
    creditLimit?: string;
    Site?: string;
    [key: string]: unknown;
  };

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerSearchTerm, setCustomerSearchTerm] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const { Itemdetails, setItemsData } = useItems();
  type ItemType = { itemname: string };

  console.log(Customerdetails.name);

  const [edititems, setEditItems] = useState<ItemType | null>(null);
  const [alldata] = useState({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [invoiceSection, setInvoiceSection] = useState<boolean>(false);
  const [remarks, setRemarks] = useState("");
  const context = useContext(Datacontext);
  const [invoiceNo, setRandomNumbers] = useState<number[]>([]);

  const setAllUsersData = context?.setAllUsersData;

  const savevalue = (item: {
    value: string;
    title: string;
    scenarioCode: string;
  }): void => {
    setTransactionTypes(false);
    setTypes({
      value: item.scenarioCode,

      title: item.value,
    });
    setChevronup(false);
    setChevrondown(true);
  };

  const showcustomerdetails = () => {
    setCustomerDetails(!customerdetails);
    setIsVisible(!visible);
    setIsUnvisible(!unvisible);
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
    document.body.style.overflow = "hidden";
    setDetailsSection(true);
    setCustomerDetails(false);
    setIsUnvisible(false);
    setIsVisible(true);
  };

  // load saved customers from firebase on auth state change
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCustomers([]);
        return;
      }
      try {
        const dbRef = ref(database, `User_data/${user.uid}/customers`);
        onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            const arr = Object.entries(val).map(
              ([id, v]) => ({ ...(v as Omit<Customer, "id">), id })
            );
            setCustomers(arr as Customer[]);
            setFilteredCustomers(arr as Customer[]);
          } else {
            setCustomers([]);
              setFilteredCustomers([]);
          }
        });
      } catch (err) {
        console.error(err, "Error loading customers");
      }
    });
    return () => unsubscribe();
  }, []);

  // Debounced search: filter customers by name or CNIC/NTN
  useEffect(() => {
    const term = customerSearchTerm.trim().toLowerCase();
    const normalizedTerm = term.replace(/-/g, "");
    const timer = setTimeout(() => {
      if (!term) {
        setFilteredCustomers(customers);
        return;
      }

      const filtered = customers.filter((c) => {
        const name = (c.name || "").toString().toLowerCase();
        const cnic = (c.CNIC || c.ntn || "").toString().toLowerCase();
        const normalizedCnic = cnic.replace(/-/g, "");

        return (
          name.includes(term) ||
          cnic.includes(term) ||
          normalizedCnic.includes(normalizedTerm)
        );
      });

      setFilteredCustomers(filtered);
    }, 180);

    return () => clearTimeout(timer);
  }, [customerSearchTerm, customers]);

  const selectCustomer = (c: Customer) => {
    // set in context so the main form picks it up
    setInputsdata({
      name: c.name || "",
      description: c.description || "",
      CNIC: c.CNIC || "",
      status: c.status || "",
      address: c.address || "",
      Phonenumber: c.Phonenumber || "",
      mobileNumber: c.mobileNumber || "",
      email: c.email || "",
      website: c.website || "",
      contactperson: c.contactperson || "",
      creditLimit: c.creditLimit || "",
      Site: c.Site || "",
    });
    // close dropdown and reset chevron icons
    setCustomerDetails(false);
    setIsVisible(true);
    setIsUnvisible(false);
    // clear any active search
    setCustomerSearchTerm("");
  };

  const hidedetailssection = () => {
    document.body.style.overflow = "auto";
    setDetailsSection(false);
  };

  const generateRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const submitdata = async () => {
    const Transactiondatendtype = {
      date,
      types: types
        ? { value: types.value, title: types.title }
        : { value: "", title: "" },
      remarks,
    };

    if (
      !date ||
      !types ||
      !Customerdetails?.name ||
      !Itemdetails[0]?.itemname
    ) {
      toast.error("Please make sure all mandatory fields are filled in.");
    } else {
      const newNumber: number = generateRandomInt(1000000000, 9999999999);
      setRandomNumbers([newNumber]);
      const postbtn = document.getElementById("posting-data");
      if (postbtn) postbtn.innerHTML = "Posting...";
      setTimeout(() => {
        hidedetailsection();
      }, 1000);
      if (setAllUsersData) {
        setAllUsersData(
          (prev: import("@/Contexts/DataContext").AllUsersDataType[]) => [
            ...prev,
            {
              Transactiondatendtype,
              Customerdetails,
              Itemdetails,
              invoiceNo: newNumber,
            },
          ]
        );
      }

      console.log(database, "Database of firebase");

      toast.success("Data Added");

      const user = auth?.currentUser;
      if (!user) {
        toast.error("User not authenticated");
        return;
      }
      try {
        const dbRef = ref(database, `User_data/${user.uid}/invoices`);
        await push(dbRef, {
          customer: Customerdetails,
          items: Itemdetails,
          Invoicenum: newNumber,
          types,
          date,
          remarks,
          timeStamp: new Date().toISOString(),
        });
        console.log("Data saved to firebase realtime database");
      } catch (err) {
        console.error(err, "error from firebase realtime database");
      }
    }
  };

  useEffect(() => {
    console.log(alldata, "Data of all forms");
  }, [alldata]);

  const showdetailssection = (): void => {
    document.body.style.overflow = "hidden";
    setEditItems(null);
    setInvoiceSection(true);
  };


  const deleteitem = (i: number): void => {
    const updatedItems = Itemdetails.filter((_, idx) => idx !== i);
    setItemsData(updatedItems);
  };

  const edititem = (item: ItemType, i: number): void => {
    document.body.style.overflow = "hidden";
    setInvoiceSection(true);
    setEditItems(item);
    setEditIndex(i);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm">
        {/* Transaction Date */}
        <div className="flex flex-col w-fit">
          <label className="text-sm font-medium text-gray-700">
            <span className="text-red-500">* </span>Transaction Date
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="mt-2 w-[200px] rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
          />
        </div>
         <div className="flex flex-col w-fit">
          <p className="text-sm font-medium text-gray-700">
            <span className="text-red-500">* </span>Transaction Type
          </p>
          <div className="relative mt-2 w-[280px]">
            <p
              onClick={showtransactiontypes}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-blue-400"
            >
              <span className="truncate">
                {types ? types.title : "Select Transaction Type"}
              </span>
              {chevrondown && (
                <IoChevronDownOutline className="text-gray-500" />
              )}
              {chevronup && <IoChevronUp className="text-gray-500" />}
            </p>
            {transactionTypes && (
              <div className="absolute top-full left-0 mt-1 w-full rounded-lg border bg-white shadow-lg z-10">
                <div className="flex items-center border-b px-2 py-2">
                  <input
                    type="text"
                    onChange={handlefilterdata}
                    placeholder="Search..."
                    className="w-full border-none outline-none text-sm px-2"
                  />
                  <IoIosSearch className="text-gray-500" />
                </div>
                <div className="max-h-40 overflow-y-auto px-2 py-1">
                  {filteredData.map((data) => (
                    <div
                      key={data.id}
                      onClick={() => savevalue(data)}
                      className="cursor-pointer rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      {data.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Customer Details */}
        <div className="flex flex-col w-fit">
          <p className="text-sm font-medium text-gray-700">
            <span className="text-red-500">* </span>Buyer Details
          </p>
          <div className="relative mt-2 w-[280px]">
            <p
              onClick={showcustomerdetails}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-blue-400"
            >
              <span className="truncate">
                {Customerdetails && Customerdetails.name
                  ? Customerdetails.name
                  : "Select Customer"}
              </span>
              {visible && <IoChevronDownOutline className="text-gray-500" />}
              {unvisible && <IoChevronUp className="text-gray-500" />}
            </p>
            {customerdetails && (
              <div className="absolute top-full left-0 mt-1 w-full rounded-lg border bg-white shadow-lg z-10">
                  <div className="flex flex-col">
                    <div
                      onClick={addcustomerdetails}
                      className="cursor-pointer px-3 py-2 text-sm text-gray-600 border-b hover:text-blue-600"
                    >
                      + Add New Customer
                    </div>

                    <div className="flex items-center px-2 py-2 border-b">
                      <input
                        type="text"
                        value={customerSearchTerm}
                        onChange={(e) => setCustomerSearchTerm(e.target.value)}
                        placeholder="Search name or CNIC/NTN"
                        className="w-full border-none outline-none text-sm px-2"
                      />
                      <IoIosSearch className="text-gray-500" />
                    </div>

                    <div className="max-h-40 overflow-y-auto">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              selectCustomer(c);
                              setCustomerSearchTerm("");
                            }}
                            className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white"
                          >
                            {c.name} - {c.CNIC || c.ntn}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">No customers found</div>
                      )}
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* Remarks */}
        <div className="hidden flex-col w-fit">
          <p className="text-sm font-medium text-gray-700">Remarks</p>
          <input
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            type="text"
            className="mt-2 w-[250px] rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="pt-6 space-y-3">
        {Itemdetails.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-700 font-medium">{item.itemname}</p>
            <div className="flex gap-3 text-gray-600">
              <FaRegEdit
                onClick={() => edititem(item, i)}
                className="cursor-pointer hover:text-blue-500 hover:scale-110 transition"
              />
              <RiDeleteBin6Line
                onClick={() => deleteitem(i)}
                className="cursor-pointer hover:text-red-500 hover:scale-110 transition"
              />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      <div className="flex justify-between items-center pt-8">
        <button
          onClick={showdetailssection}
          className="flex items-center gap-2 rounded-lg cursor-pointer bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition"
        >
          <span className="text-red-400">*</span> Add New Item{" "}
          <MdOutlineAdd />
        </button>
        <button
          id="posting-data"
          onClick={submitdata}
          className="rounded-lg bg-green-600 cursor-pointer px-6 py-2 text-sm font-medium text-white shadow-md hover:bg-green-700 hover:shadow-lg transition"
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
