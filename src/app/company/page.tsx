"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { businesstypes } from "@/Constants/Framerdata";
import { useCompanyDetails } from "@/Contexts/Companycontext";
import { ref, update, get, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, database } from "../../firebaseConfig";
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
  const [province, setProvince] = useState<string>("");
  const { companyDetails, setCompanyDetails } = useCompanyDetails();
  const router = useRouter();

  const savecompanydetails = async (e: React.FormEvent<HTMLFormElement>) => {
    const btn = document.getElementById("save-btn");

    if (btn) {
      btn.innerHTML = "saving...";
    }
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
      province,
    };
    setCompanyDetails(details);

    const user = auth?.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const dbRef = ref(database, `User_data/${user.uid}/companydetails`);
      // store fields directly so other readers can consume a flat object
      await update(dbRef, {
        ...details,
        timeStamp: new Date().toISOString(),
      });
      // Navigate only after update succeeds so data is persisted
      console.log("data saved");
      router.push("/invoice");
    } catch (err) {
      console.error(err, "error from firebae buyerdetails database");
    }
  };
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.error("User is not registered");
        return;
      }
      try {
        const dbRef = ref(database);
        get(child(dbRef, `User_data/${user.uid}/companydetails`)).then(
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // support both { details: {...} } and flat object
              const details = data?.details ? data.details : data;
              setCompanyDetails(details ?? null);
            }
          }
        );
      } catch (err) {
        console.error(err, "Error on getting data from firebase ");
      }
    });
    return () => unsubscribe();
  }, [setCompanyDetails]);

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
      setProvince(companyDetails.province || "");
    }
    console.log(companyDetails, "Company details");
  }, [companyDetails]);

  const setntnvalues = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 13) inpvalue = inpvalue.slice(0, 13);
    setNtnNumber(inpvalue);
  };

  const setphonnodigits = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputvalue = e.target.value.replace(/\D/g, "");
    if (inputvalue.length > 10) inputvalue = inputvalue.slice(0, 10);
    setPhonenumber(inputvalue);
  };

  // const setAccountdigits = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const inpvalue = e.target.value.replace(/\D/g, "");
  //   setAccount(inpvalue);
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectvalue = (value: string): void => {
    setBusinessData(false);
    setIsVisible(true);
    setDisplay(false);
    setBusinessType(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setgstnum = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inpvalue = e.target.value.replace(/\D/g, "");
    if (inpvalue.length > 12) inpvalue = inpvalue.slice(0, 12);
    setGst(inpvalue);
  };

  // const setIbanregex = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const inputvalue = e.target.value
  //     .replace(/[^a-zA-Z0-9]/g, "")
  //     .replace(/(.{4})/g, "$1 ")
  //     .trim();
  //   setIban(inputvalue);
  // };

  return (
    <div className="flex gap-5 mt-15">
      <Sidebar />
      <div className="px-14 w-full flex pr-17 py-4 items-center">
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-full">
          <div className="flex justify-between bg-gradient-to-r from-blue-200 to-blue-300 py-4 px-6 rounded-t-lg">
            <p className="text-lg text-black font-semibold">
              Company / Seller details
            </p>
            <p></p>
          </div>
          <form onSubmit={savecompanydetails}>
            <div className="grid grid-cols-1 gap-4 px-8 py-6">
              <div className="flex flex-col  gap-4">
                <div className="flex flex-col h-fit w-2/2">
                  <label className="text-sm font-semibold text-gray-600">
                    <span className="text-red-400 font-semibold">*</span> Name
                  </label>
                  <input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col h-fit w-2/2">
                  <label className="text-sm font-semibold text-gray-600">
                    <span className="text-red-400 font-semibold">*</span> NTN /
                    CNIC
                  </label>
                  <input
                    value={ntn}
                    onChange={setntnvalues}
                    type="text"
                    className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col h-fit w-2/2">
                  <label className="text-sm font-semibold text-gray-600">
                    <span className="text-red-400 font-semibold">*</span>{" "}
                    Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col h-fit w-2/2">
                  <label className="text-sm font-semibold text-gray-600">
                    <span className="text-red-400 font-semibold">*</span>{" "}
                    Province
                  </label>
                  <input
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    type="text"
                    className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col relative h-fit w-full">
                <label className="text-sm font-semibold text-gray-600">
                  <span className="text-red-400 font-semibold">*</span>{" "}
                  Registration type
                </label>
                <div
                  onClick={hidechvrndwn}
                  className="text-sm bg-gray-100 py-2 px-3 rounded-md border border-gray-200 text-gray-700 hover:border-gray-300 cursor-pointer flex justify-between items-center"
                >
                  <p>{businessType || "Select registration type"}</p>
                  {visible ? <IoChevronDown /> : <IoChevronUp />}
                </div>
                {businessdata && (
                  <div className="absolute top-12 left-0 right-0 rounded-b-sm border border-gray-200 bg-gray-100">
                    <div className="flex flex-col">
                      {businesstypes.map((type) => (
                        <div
                          onClick={() => selectvalue(type.value)}
                          className="text-sm hover:bg-blue-500 cursor-pointer hover:text-white pl-3 py-2"
                          key={type.id}
                        >
                          <p>{type.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col h-fit w-full">
                <label className="text-sm font-semibold text-gray-600">
                  <span className="text-red-400 font-semibold">*</span> GST/STRN
                </label>
                <input
                  value={gst}
                  onChange={setgstnum}
                  type="text"
                  className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                />
              </div> */}
              <div className="flex   gap-4">
                <div className="flex flex-col h-fit w-2/2">
                  <label className="text-sm font-semibold text-gray-600">
                    Phone
                  </label>
                  <input
                    value={phonenum}
                    onChange={setphonnodigits}
                    type="text"
                    className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                  />
                </div>
                <div className="flex flex-col h-fit w-2/2">
                  <label className="text-sm font-semibold text-gray-600">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-1 py-2 pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end px-8 pb-3">
              <button
                id="save-btn"
                disabled={!companyName || !ntn || !address}
                type="submit"
                className={`text-white px-5 py-2 rounded-sm transition ${
                  !companyName || !ntn || !address
                    ? "bg-[#4b9efe] cursor-not-allowed"
                    : "bg-[#2d81fe] cursor-pointer hover:bg-[#1972f7]"
                }`}
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
