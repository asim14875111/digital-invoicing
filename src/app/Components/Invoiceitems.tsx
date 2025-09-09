import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useItems } from "@/Contexts/ItemsContext";
import { ToastContainer } from "react-toastify";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { categories } from "@/Constants/Framerdata";
import { codes } from "@/Constants/Framerdata";
import { uomdata } from "@/Constants/Framerdata";
import { revenuedata } from "@/Constants/Framerdata";
import { assestdata } from "@/Constants/Framerdata";
import { cogsdata } from "@/Constants/Framerdata";
import Image from "next/image";
import { servicedata } from "@/Constants/Framerdata";
import { rates } from "@/Constants/Framerdata";
import { sro } from "@/Constants/Framerdata";
import { sroitemno } from "@/Constants/Framerdata";
type itemsProps = {
  setInvoiceSection: React.Dispatch<React.SetStateAction<boolean>>;
  edititems: {
    itemname?: string;
    barcode?: string;
    order?: string;
    maxorder?: string;
    reorderLevel?: string;
    filtereddata?: typeof categories;
    filtereduom?: typeof uomdata;
    filteredrevenue?: typeof revenuedata;
    filteredassest?: typeof assestdata;
    filterhscode?: typeof codes;
    filtercogs?: typeof cogsdata;
    filterservice?: typeof servicedata;
    assestAccount?: string;
    category?: string;
    HsCode?: string;
    revenueAccount?: string;
    cogsAccount?: string;
    serviceAccount?: string;
    Uom?: string;
    quantity?: string;
    rate?: string;
    SRO?: string;
    SroItemNO?: string;
    remarks?: string;
    price?: string;
    file?: File | null;
    taxAmount?: string;
    netAmount?: string;
  } | null;
  deleteitem: (i: number) => void;
  editIndex: number | null;
};

export default function Invoiceitems({
  setInvoiceSection,
  edititems,
  // deleteitem,
  editIndex,
}: itemsProps) {
  const [itemname, setItemName] = useState<string>("");
  const [barcode, setBarCode] = useState<string>("");
  const [order, setOrderLevel] = useState<string>("");
  const [maxorder, setmaxorder] = useState<string>("");
  const [reorderLevel, setreorderLevel] = useState<string>("");
  const [chevrondwn, setChevronDown] = useState<boolean>(true);
  const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevrondwn2, setChevronDown2] = useState<boolean>(true);
  const [chevronup2, setChevronup2] = useState<boolean>(false);
  const [chevrondwn3, setChevronDown3] = useState<boolean>(true);
  const [chevrondwn4, setChevronDown4] = useState<boolean>(true);
  const [chevronup3, setChevronup3] = useState<boolean>(false);
  const [chevrondwn5, setChevronDown5] = useState<boolean>(true);
  const [chevronup5, setChevronup5] = useState<boolean>(false);
  const [chevrondwn6, setChevronDown6] = useState<boolean>(true);
  const [chevronup6, setChevronup6] = useState<boolean>(false);
  const [chevrondwn7, setChevronDown7] = useState<boolean>(true);
  const [chevronup7, setChevronup7] = useState<boolean>(false);
  const [chevrondwn8, setChevronDown8] = useState<boolean>(true);
  const [chevronup8, setChevronup8] = useState<boolean>(false);
  const [chevrondwn9, setChevronDown9] = useState<boolean>(true);
  const [chevronup9, setChevronup9] = useState<boolean>(false);
  const [chevrondwn10, setChevronDown10] = useState<boolean>(true);
  const [chevronup10, setChevronup10] = useState<boolean>(false);
  const [chevronup4, setChevronup4] = useState<boolean>(false);
  const [data, setData] = useState<boolean>(false);
  const [hsCode, sethsCode] = useState<boolean>(false);
  const [UOMdata, setUOMData] = useState<boolean>(false);
  const [RevenueData, setRevenuedata] = useState<boolean>(false);
  const [AssestData, setAssestData] = useState<boolean>(false);
  const [cogsData, setcogsData] = useState<boolean>(false);
  const [serviceData, setserviceData] = useState<boolean>(false);
  const [taxdata, setTaxData] = useState<boolean>(false);
  const [sroData, setSroData] = useState<boolean>(false);
  const [sroitemnoData, setsroitemnoData] = useState<boolean>(false);
  const [filtereddata, setFilteredData] = useState(categories);
  const [filtereduom, setFilteredUom] = useState(uomdata);
  const [filteredrevenue, setfilteredrevenue] = useState(revenuedata);
  const [filteredassest, setfilteredassest] = useState(assestdata);
  const [filterhscode, setFilterhscode] = useState(codes);
  const [filtercogs, setfiltercogs] = useState(cogsdata);
  const [filterservice, setfiltersevice] = useState(servicedata);
  const [assestAccount, setassestAccount] = useState<string>("");
  const [category, setCategoroies] = useState<string>("");
  const [HsCode, setHsCode] = useState<string>("");
  const [revenueAccount, setrevenueAccount] = useState<string>("");
  const [cogsAccount, setcogsAccount] = useState<string>("");
  const [serviceAccount, setserviceAccount] = useState<string>("");
  const [taxAmount, setTaxAmount] = useState<string>("");
  const [netAmount, setNetAmount] = useState<string>("");
  const [Uom, setUom] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [SRO, setSRO] = useState<string>("");
  const [SroItemNO, setSroItemNO] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [price, setprice] = useState<string>("");
  const { setItemsData } = useItems();
  const closeitemssection = () => {
    document.body.style.overflow = "auto";
    setInvoiceSection(false);
  };
  useEffect(() => {
    if (edititems) {
      setNetAmount(edititems.netAmount || "");
      setTaxAmount(edititems.taxAmount || "");
      setItemName(edititems.itemname || "");
      setBarCode(edititems.barcode || "");
      setOrderLevel(edititems.order || "");
      setmaxorder(edititems.maxorder || "");
      setreorderLevel(edititems.reorderLevel || "");
      setFilteredData(edititems.filtereddata || categories);
      setFilteredUom(edititems.filtereduom || uomdata);
      setfilteredrevenue(edititems.filteredrevenue || revenuedata);
      setfilteredassest(edititems.filteredassest || assestdata);
      setFilterhscode(edititems.filterhscode || codes);
      setfiltercogs(edititems.filtercogs || cogsdata);
      setfiltersevice(edititems.filterservice || servicedata);
      setassestAccount(edititems.assestAccount || "");
      setCategoroies(edititems.category || "");
      setHsCode(typeof edititems.HsCode === "string" ? edititems.HsCode : "");
      setrevenueAccount(edititems.revenueAccount || "");
      setcogsAccount(edititems.cogsAccount || "");
      setserviceAccount(edititems.serviceAccount || "");
      setUom(edititems.Uom || "");
      setQuantity(edititems.quantity || "");
      setRate(edititems.rate || "");
      setSRO(edititems.SRO || "");
      setSroItemNO(edititems.SroItemNO || "");
      setRemarks(edititems.remarks || "");
      setprice(edititems.price || "");
    }
  }, [edititems]);

  const showcategories = (): void => {
    if (chevrondwn) {
      setChevronDown(false);
      setChevronup(true);
      setData(true);
    } else {
      setChevronup(false);
      setData(false);
      setChevronDown(true);
    }
  };

  const filterdata = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inptvalue = e.target.value;
    const data = categories.filter((category) =>
      category.title.toLowerCase().includes(inptvalue.toLowerCase())
    );
    setFilteredData(data);
  };

  const filtercodes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const code = codes.filter((code) =>
      code.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilterhscode(code);
  };
  const filteruom = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const uomvalue = e.target.value;
    const filterduomdata = uomdata.filter((data) =>
      data.title.toLowerCase().includes(uomvalue.toLowerCase())
    );
    setFilteredUom(filterduomdata);
  };

  const filterrevenue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const revenuevalue = e.target.value;
    const filterdrevenue = revenuedata.filter((revenue) =>
      revenue.title.toLowerCase().includes(revenuevalue.toLowerCase())
    );
    setfilteredrevenue(filterdrevenue);
  };

  const selectcategory = (value: string): void => {
    setChevronup(false);
    setData(false);
    setChevronDown(true);
    setCategoroies(value);
  };

  const showhscodes = (): void => {
    if (chevrondwn2) {
      setChevronDown2(false);
      setChevronup2(true);
      sethsCode(true);
    } else {
      sethsCode(false);
      setChevronDown2(true);
      setChevronup2(false);
    }
  };

  const selectuomvalue = (value: string): void => {
    setUom(value);
    setUOMData(false);
    setChevronDown3(true);
    setChevronup3(false);
  };

  const showuomdetails = (): void => {
    if (chevrondwn3) {
      setChevronDown3(false);
      setChevronup3(true);
      setUOMData(true);
    } else {
      setUOMData(false);
      setChevronDown3(true);
      setChevronup3(false);
    }
  };

  const selecthscode = (value: string): void => {
    setHsCode(value);
    sethsCode(false);
    setChevronDown2(true);
    setChevronup2(false);
  };

  const displayrevenue = (): void => {
    if (chevrondwn4) {
      setChevronDown4(false);
      setChevronup4(true);
      setRevenuedata(true);
    } else {
      setRevenuedata(false);
      setChevronup4(false);
      setChevronDown4(true);
    }
  };

  const selectrevenuevalue = (value: string): void => {
    setRevenuedata(false);
    setChevronup4(false);
    setChevronDown4(true);
    setrevenueAccount(value);
  };

  const displayassest = (): void => {
    if (chevrondwn5) {
      setChevronDown5(false);
      setChevronup5(true);
      setAssestData(true);
    } else {
      setAssestData(false);
      setChevronDown5(true);
      setChevronup5(false);
    }
  };

  const selectassestvalue = (value: string): void => {
    setassestAccount(value);
    setAssestData(false);
    setChevronDown5(true);
    setChevronup5(false);
  };

  const filterassests = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const assestvalue = e.target.value;
    const filteredassest = assestdata.filter((assest) =>
      assest.title.toLowerCase().includes(assestvalue.toLowerCase())
    );
    setfilteredassest(filteredassest);
  };

  const displaycogs = (): void => {
    if (chevrondwn6) {
      setChevronDown6(false);
      setChevronup6(true);
      setcogsData(true);
    } else {
      setcogsData(false);
      setChevronDown6(true);
      setChevronup6(false);
    }
  };

  const selectcogsvalue = (value: string): void => {
    setcogsAccount(value);
    setcogsData(false);
    setChevronDown6(true);
    setChevronup6(false);
  };

  const filtercogsdata = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inpvalue = e.target.value;
    const filter = cogsdata.filter((data) =>
      data.title.toLowerCase().includes(inpvalue.toLowerCase())
    );
    setfiltercogs(filter);
  };

  const displayserviceacc = (): void => {
    if (chevrondwn7) {
      setChevronDown7(false);
      setChevronup7(true);
      setserviceData(true);
    } else {
      setserviceData(false);
      setChevronDown7(true);
      setChevronup7(false);
    }
  };

  const selectservicevalue = (value: string): void => {
    setserviceAccount(value);
    setserviceData(false);
    setChevronDown7(true);
    setChevronup7(false);
  };

  const filterservicedata = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inpvalue = e.target.value;
    const filtered = servicedata.filter((data) =>
      data.title.toLowerCase().includes(inpvalue.toLowerCase())
    );
    setfiltersevice(filtered);
  };

  const handlefileupload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const showrates = (): void => {
    if (chevrondwn8) {
      setChevronDown8(false);
      setChevronup8(true);
      setTaxData(true);
    } else {
      setTaxData(false);
      setChevronDown8(true);
      setChevronup8(false);
    }
  };

  const selectrate = (value: string): void => {
    setTaxData(false);
    setChevronDown8(true);
    setChevronup8(false);
    setRate(value);
  };

  const showsros = (): void => {
    if (chevrondwn9) {
      setChevronDown9(false);
      setChevronup9(true);
      setSroData(true);
    } else {
      setSroData(false);
      setChevronDown9(true);
      setChevronup9(false);
    }
  };

  const selectsro = (value: string): void => {
    setSroData(false);
    setChevronDown9(true);
    setChevronup9(false);
    setSRO(value);
  };

  const showsroitemno = (): void => {
    if (chevrondwn10) {
      setChevronDown10(false);
      setChevronup10(true);
      setsroitemnoData(true);
    } else {
      setsroitemnoData(false);
      setChevronDown10(true);
      setChevronup10(false);
    }
  };

  const selectsroitemno = (value: string): void => {
    setsroitemnoData(false);
    setChevronDown10(true);
    setChevronup10(false);
    setSroItemNO(value);
  };

  const showscrollbar = (): void => {
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (price && rate) {
      const amount = (parseFloat(price) * parseFloat(rate)) / 100;
      setTaxAmount(amount.toFixed(2));

      const net = parseFloat(price) + amount;
      setNetAmount(net.toFixed(2));
    }
  }, [price, rate]);

  return (
    <div className="fixed w-full bg-[#00000063] inset-0  px-2 z-60 py-2 flex justify-center">
      <div className="bg-white w-full rounded-md relative">
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center px-4 py-2 rounded-t-md bg-gray-50">
              <div>
                <p className="text-xl">Item & Tax information </p>
              </div>
              <div>
                <button
                  className="text-2xl cursor-pointer text-red-600 hover:scale-106"
                  onClick={closeitemssection}
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="flex flex-col h-[90vh] overflow-auto py-4 px-2">
              <div className="px-2">
                <div className="flex justify-between px-8">
                  <label>Items Details</label>
                  <div>
                    <div className="flex gap-1">
                      {file && (
                        <Image
                          width={30}
                          height={30}
                          src={URL.createObjectURL(file)}
                          alt="uploaded-img"
                        />
                      )}
                      <label className="text-sm text-gray-700">
                        Upload image
                      </label>
                    </div>
                    <div className="bg-gray-50 w-fit px-2 py-1 rounded-md cu hover:bg-gray-200">
                      <input
                        onChange={handlefileupload}
                        type="file"
                        placeholder="choose image"
                        className="w-22 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3  gap-8 px-8  py-6 my-4 pt-4">
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Item name{" "}
                    </label>
                    <input
                      value={itemname}
                      onChange={(e) => setItemName(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Bar Code{" "}
                    </label>
                    <input
                      value={barcode}
                      onChange={(e) => setBarCode(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Category{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={showcategories}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {category ? category : "Select Category"}
                        </span>
                        {chevrondwn && (
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

                      {data && (
                        <div className="absolute top-8 bg-gray-50 z-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filterdata}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {filtereddata.map((category) => (
                              <div
                                onClick={() => selectcategory(category.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={category.id}
                              >
                                <p className="text-sm">{category.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  col-span-2 h-fit  w-full border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Hs Code{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={showhscodes}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {HsCode ? HsCode : "Select Hs Code"}
                        </span>
                        {chevrondwn2 && (
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

                      {hsCode && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filtercodes}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[100px] overflow-auto">
                            {filterhscode.map((code) => (
                              <div
                                onClick={() => selecthscode(code.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={code.id}
                              >
                                <div className="flex flex-row gap-1">
                                  <p className="text-xs">{code.value}</p>

                                  <p className="text-xs">{code.title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      UOM{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={showuomdetails}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {Uom ? Uom : "Select UOM"}
                        </span>
                        {chevrondwn3 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup3 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {UOMdata && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filteruom}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {filtereduom.map((uom) => (
                              <div
                                onClick={() => selectuomvalue(uom.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={uom.id}
                              >
                                <p className="text-sm">{uom.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Min Order Level{" "}
                    </label>
                    <input
                      value={order}
                      onChange={(e) => setOrderLevel(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Max Order Level{" "}
                    </label>
                    <input
                      value={maxorder}
                      onChange={(e) => setmaxorder(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Reorder Level{" "}
                    </label>
                    <input
                      value={reorderLevel}
                      onChange={(e) => setreorderLevel(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Revenue Account{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={displayrevenue}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {revenueAccount
                            ? revenueAccount
                            : "Select Revenue Account"}
                        </span>
                        {chevrondwn4 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup4 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {RevenueData && (
                        <div className="absolute z-50 top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filterrevenue}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {filteredrevenue.map((revenue) => (
                              <div
                                onClick={() =>
                                  selectrevenuevalue(revenue.value)
                                }
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={revenue.id}
                              >
                                <p className="text-sm">{revenue.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Assest Account{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={displayassest}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {assestAccount
                            ? assestAccount
                            : "Select assest Account"}
                        </span>
                        {chevrondwn5 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup5 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {AssestData && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filterassests}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {filteredassest.map((assest) => (
                              <div
                                onClick={() => selectassestvalue(assest.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={assest.id}
                              >
                                <p className="text-sm">{assest.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      COGS Account{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={displaycogs}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {cogsAccount ? cogsAccount : "Select COGS Account"}
                        </span>
                        {chevrondwn6 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup6 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {cogsData && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filtercogsdata}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {filtercogs.map((cogs) => (
                              <div
                                onClick={() => selectcogsvalue(cogs.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={cogs.id}
                              >
                                <p className="text-sm">{cogs.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Service Account{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={displayserviceacc}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {serviceAccount
                            ? serviceAccount
                            : "Select Service Account"}
                        </span>
                        {chevrondwn7 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup7 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {serviceData && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex justify-between border items-center my-1 mx-1 rounded-md border-gray-300 px-2">
                            <input
                              type="text"
                              onChange={filterservicedata}
                              className="w-full outline-0"
                            />
                            <p className="text-gray-600">
                              <IoSearchSharp />
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {filterservice.map((service) => (
                              <div
                                onClick={() =>
                                  selectservicevalue(service.value)
                                }
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={service.id}
                              >
                                <p className="text-sm">{service.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                </div>
              </div>
              <div className="px-2 pt-0">
                <div className="flex justify-between px-8 pb-4">
                  <div>
                    <label>Rate & Tax</label>
                  </div>
                  <div></div>
                </div>
                <div className="grid grid-cols-3 gap-8 px-8 overflow-auto pb-6">
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Quantity
                    </label>
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Price
                    </label>
                    <input
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "> </span>
                      Sub Amount
                    </label>
                    <input
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-200 mt-1 rounded-md outline-0"
                      readOnly
                    />
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Rate{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={showrates}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {rate ? rate + "%" : "Select Rate"}
                        </span>
                        {chevrondwn8 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup8 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {taxdata && (
                        <div className="absolute top-8 bg-gray-50  w-full rounded-b-md ">
                          <div className="flex flex-col gap-2 px-2 h-[100px] overflow-auto">
                            {rates.map((category) => (
                              <div
                                onClick={() => selectrate(category.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={category.id}
                              >
                                <p className="text-sm">{category.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Select SRO{" "}
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={showsros}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {SRO ? SRO : "Select Rate"}
                        </span>
                        {chevrondwn9 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}
                        {chevronup9 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {sroData && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {sro.map((category) => (
                              <div
                                onClick={() => selectsro(category.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={category.id}
                              >
                                <p className="text-sm">{category.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col  h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold "></span>
                      Select SRO Item NO
                    </label>
                    <div className="flex relative flex-col">
                      <div
                        onClick={showsroitemno}
                        className="bg-gray-100  flex border  border-gray-200 justify-between items-center px-2 py-[4px] mt-1 hover:border-gray-300 cursor-pointer rounded-md"
                      >
                        <span className="text-sm text-gray-600 pl-1">
                          {SroItemNO ? SroItemNO : "Select Sro Item No"}
                        </span>
                        {chevrondwn10 && (
                          <span className="text-gray-500">
                            <IoChevronDownOutline />
                          </span>
                        )}

                        {chevronup10 && (
                          <span className="text-gray-500">
                            <IoChevronUp />
                          </span>
                        )}
                      </div>

                      {sroitemnoData && (
                        <div className="absolute top-8 bg-gray-50 w-full rounded-b-md ">
                          <div className="flex flex-col gap-2 px-2 h-[80px] overflow-auto">
                            {sroitemno.map((category) => (
                              <div
                                onClick={() => selectsroitemno(category.value)}
                                className="hover:bg-blue-500 cursor-pointer  text-gray-600 hover:text-white"
                                key={category.id}
                              >
                                <p className="text-sm">{category.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Tax amount
                    </label>
                    <input
                      value={taxAmount}
                      type="text"
                      onChange={(e) => setTaxAmount(e.target.value)}
                      readOnly
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Net amount
                    </label>
                    <input
                      value={netAmount}
                      readOnly
                      onChange={(e) => setNetAmount(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                  <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                    <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                      <span className="text-red-400 font-semibold ">* </span>
                      Remarks
                    </label>
                    <input
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      type="text"
                      className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                    />
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="self-end py-4 px-4 absolute bottom-0">
            <button
              onClick={() => {
                const inputsdata = {
                  itemname,
                  barcode,
                  order,
                  maxorder,
                  reorderLevel,
                  category,
                  HsCode,
                  Uom,
                  revenueAccount,
                  assestAccount,
                  cogsAccount,
                  serviceAccount,
                  file,
                  quantity,
                  price,
                  rate,
                  SRO,
                  SroItemNO,
                  remarks,
                  taxAmount,
                  netAmount,
                };
                if (edititems && editIndex !== null) {
                  setItemsData((prev) => {
                    const updated = [...prev];
                    updated[editIndex] = inputsdata;
                    return updated;
                  });
                  setInvoiceSection(false);
                } else {
                  setItemsData((prev) => [...prev, inputsdata]);
                  setInvoiceSection(false);
                }
                showscrollbar();
              }}
              className={`bg-blue-600 text-white px-6 py-1 rounded-md ${
                !itemname ||
                !category ||
                !HsCode ||
                !Uom ||
                !revenueAccount ||
                !assestAccount ||
                !cogsAccount ||
                !serviceAccount ||
                !quantity ||
                !price
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-blue-800"
              }`}
              disabled={
                !itemname ||
                !category ||
                !HsCode ||
                !Uom ||
                !revenueAccount ||
                !assestAccount ||
                !cogsAccount ||
                !serviceAccount ||
                !quantity ||
                !price
              }
            >
              {edititems ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
