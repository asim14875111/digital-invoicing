import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useItems } from "@/Contexts/ItemsContext";
import { ToastContainer } from "react-toastify";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
// import { categories } from "@/Constants/Framerdata";
// import { codes } from "@/Constants/Framerdata";
import { uomdata } from "@/Constants/Framerdata";
import { paymentmethod } from "@/Constants/Framerdata";
import { assestdata } from "@/Constants/Framerdata";
import { cogsdata } from "@/Constants/Framerdata";
import Image from "next/image";
import { invoicetype } from "@/Constants/Framerdata";
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
    // filtereddata?: typeof categories;
    filtereduom?: typeof uomdata;
    filteredrevenue?: typeof paymentmethod;
    filteredassest?: typeof assestdata;
    // filterhscode?: typeof codes;
    filtercogs?: typeof cogsdata;
    filterservice?: typeof invoicetype;
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
    description?: string;
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
  // const [chevronup, setChevronup] = useState<boolean>(false);
  const [chevrondwn2, setChevronDown2] = useState<boolean>(true);
  const [chevronup2, setChevronup2] = useState<boolean>(false);
  const [chevrondwn3, setChevronDown3] = useState<boolean>(true);
  const [chevrondwn4, setChevronDown4] = useState<boolean>(true);
  const [chevronup3, setChevronup3] = useState<boolean>(false);
  const [chevrondwn5, setChevronDown5] = useState<boolean>(true);
  const [chevronup5, setChevronup5] = useState<boolean>(false);
  const [chevrondwn6, setChevronDown6] = useState<boolean>(true);
  const [chevronup6, setChevronup6] = useState<boolean>(false);
  // Just comment
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
  // const [filtereddata, setFilteredData] = useState(categories);
  const [filtereduom, setFilteredUom] = useState(uomdata);
  const [filteredrevenue, setfilteredrevenue] = useState(paymentmethod);
  const [filteredassest, setfilteredassest] = useState(assestdata);
  // const [filterhscode, setFilterhscode] = useState(codes);
  const [filtercogs, setfiltercogs] = useState(cogsdata);
  const [filterservice, setfiltersevice] = useState(invoicetype);
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
  const [description, setDescription] = useState<string>("");
  const [price, setprice] = useState<string>("");
  // New states for extra tax fields
  const [extraTax, setExtraTax] = useState<string>("");
  const [furtherTax, setFurtherTax] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [fedPayable, setFedPayable] = useState<string>("");
  const [fixedNotifiedValueOrRetailPrice, setFixedNotifiedValueOrRetailPrice] =
    useState<string>("");
  const [salesTaxWithheldAtSource, setSalesTaxWithheldAtSource] =
    useState<string>("");
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
      // setFilteredData(edititems.filtereddata || categories);
      setFilteredUom(edititems.filtereduom || uomdata);
      setfilteredrevenue(edititems.filteredrevenue || paymentmethod);
      setfilteredassest(edititems.filteredassest || assestdata);
      // setFilterhscode(edititems.filterhscode || codes);
      setfiltercogs(edititems.filtercogs || cogsdata);
      setfiltersevice(edititems.filterservice || invoicetype);
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
      setDescription(edititems.description || "");
    }
  }, [edititems]);

  // const showcategories = (): void => {
  //   if (chevrondwn) {
  //     setChevronDown(false);
  //     setChevronup(true);
  //     setData(true);
  //   } else {
  //     setChevronup(false);
  //     setData(false);
  //     setChevronDown(true);
  //   }
  // };

  // const filterdata = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const inptvalue = e.target.value;
  //   const data = categories.filter((category) =>
  //     category.title.toLowerCase().includes(inptvalue.toLowerCase())
  //   );
  //   setFilteredData(data);
  // };

  // const filtercodes = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const value = e.target.value;
  //   const code = codes.filter((code) =>
  //     code.value.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilterhscode(code);
  // };
  const filteruom = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const uomvalue = e.target.value;
    const filterduomdata = uomdata.filter((data) =>
      data.title.toLowerCase().includes(uomvalue.toLowerCase())
    );
    setFilteredUom(filterduomdata);
  };

  const filterrevenue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const revenuevalue = e.target.value;
    const filterdrevenue = paymentmethod.filter((revenue) =>
      revenue.title.toLowerCase().includes(revenuevalue.toLowerCase())
    );
    setfilteredrevenue(filterdrevenue);
  };

  // const selectcategory = (value: string): void => {
  //   setChevronup(false);
  //   setData(false);
  //   setChevronDown(true);
  //   setCategoroies(value);
  // };

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
    const filtered = invoicetype.filter((data) =>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000063]">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-4 rounded-t-xl border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800">
            Item & Tax Information
          </h2>
          <button
            className="text-2xl text-red-600 hover:scale-110 transition"
            onClick={closeitemssection}
          >
            <RxCross2 />
          </button>
        </div>
        {/* Form */}
        <div className="px-8 py-6 max-h-[80vh] overflow-y-auto">
          {/* Item Details */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold text-gray-700">
                Item Details
              </label>
              <div className="flex items-center gap-2">
                {file && (
                  <Image
                    width={36}
                    height={36}
                    src={URL.createObjectURL(file)}
                    alt="uploaded-img"
                    className="rounded border"
                  />
                )}
                <label className="text-sm text-gray-700">Upload image</label>
                <input
                  onChange={handlefileupload}
                  type="file"
                  className="w-24 cursor-pointer bg-gray-100 rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Item Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Item name
                </label>
                <input
                  value={itemname}
                  onChange={(e) => setItemName(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Bar Code */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Bar Code
                </label>
                <input
                  value={barcode}
                  onChange={(e) => setBarCode(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Hs Code */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Hs Code
                </label>
                <input
                  value={order}
                  onChange={(e) => setOrderLevel(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* UOM */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> UOM
                </label>
                <div className="relative">
                  <div
                    onClick={showuomdetails}
                    className="h-11 px-3 rounded border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{Uom ? Uom : "Select UOM"}</span>
                    {chevrondwn3 ? <IoChevronDownOutline /> : <IoChevronUp />}
                  </div>
                  {UOMdata && (
                    <div className="absolute top-12 left-0 bg-white border rounded shadow w-full z-50">
                      <div className="flex items-center border-b px-2 py-1">
                        <input
                          type="text"
                          onChange={filteruom}
                          className="w-full outline-none text-sm"
                          placeholder="Search UOM"
                        />
                        <IoSearchSharp className="text-gray-500 ml-2" />
                      </div>
                      <div className="max-h-32 overflow-auto">
                        {filtereduom.map((uom) => (
                          <div
                            key={uom.id}
                            onClick={() => selectuomvalue(uom.value)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {uom.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Payment Method */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Payment Method
                </label>
                <div className="relative">
                  <div
                    onClick={displayrevenue}
                    className="h-11 px-3 rounded border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>
                      {revenueAccount
                        ? revenueAccount
                        : "Select payment method"}
                    </span>
                    {chevrondwn4 ? <IoChevronDownOutline /> : <IoChevronUp />}
                  </div>
                  {RevenueData && (
                    <div className="absolute top-12 left-0 bg-white border rounded shadow w-full z-50">
                      <div className="flex items-center border-b px-2 py-1">
                        <input
                          type="text"
                          onChange={filterrevenue}
                          className="w-full outline-none text-sm"
                          placeholder="Search Payment Method"
                        />
                        <IoSearchSharp className="text-gray-500 ml-2" />
                      </div>
                      <div className="max-h-32 overflow-auto">
                        {filteredrevenue.map((revenue) => (
                          <div
                            key={revenue.id}
                            onClick={() => selectrevenuevalue(revenue.value)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {revenue.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Invoice Type */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Invoice Type
                </label>
                <div className="relative">
                  <div
                    onClick={displayserviceacc}
                    className="h-11 px-3 rounded border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>
                      {serviceAccount ? serviceAccount : "Select Invoice Type"}
                    </span>
                    {chevrondwn7 ? <IoChevronDownOutline /> : <IoChevronUp />}
                  </div>
                  {serviceData && (
                    <div className="absolute top-12 left-0 bg-white border rounded shadow w-full z-50">
                      <div className="flex items-center border-b px-2 py-1">
                        <input
                          type="text"
                          onChange={filterservicedata}
                          className="w-full outline-none text-sm"
                          placeholder="Search Invoice Type"
                        />
                        <IoSearchSharp className="text-gray-500 ml-2" />
                      </div>
                      <div className="max-h-32 overflow-auto">
                        {filterservice.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => selectservicevalue(service.value)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {service.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Product Description */}
              <div className="flex flex-col col-span-3">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Product Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
            </div>
          </div>
          {/* Rate & Tax */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-4 block">
              Rate & Tax
            </label>
            <div className="grid grid-cols-3 gap-6">
              {/* Quantity */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Quantity
                </label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Extra Tax */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Extra Tax
                </label>
                <input
                  value={extraTax}
                  onChange={(e) => setExtraTax(e.target.value)}
                  type="number"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Further Tax */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Further Tax
                </label>
                <input
                  value={furtherTax}
                  onChange={(e) => setFurtherTax(e.target.value)}
                  type="number"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Discount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Discount
                </label>
                <input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  type="number"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Fed Payable */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Fed Payable
                </label>
                <input
                  value={fedPayable}
                  onChange={(e) => setFedPayable(e.target.value)}
                  type="number"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Fixed Notified Value / Retail Price */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Fixed Notified Value /
                  Retail Price
                </label>
                <input
                  value={fixedNotifiedValueOrRetailPrice}
                  onChange={(e) =>
                    setFixedNotifiedValueOrRetailPrice(e.target.value)
                  }
                  type="number"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Price */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Sub Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Sub Amount
                </label>
                <input
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
              {/* Rate */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Rate
                </label>
                <div className="relative">
                  <div
                    onClick={showrates}
                    className="h-11 px-3 rounded border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{rate ? rate + "%" : "Select Rate"}</span>
                    {chevrondwn8 ? <IoChevronDownOutline /> : <IoChevronUp />}
                  </div>
                  {taxdata && (
                    <div className="absolute top-12 left-0 bg-white border rounded shadow w-full z-50">
                      <div className="max-h-40 overflow-auto">
                        {rates.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => selectrate(category.value)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {category.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Select SRO */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Select SRO
                </label>
                <div className="relative">
                  <div
                    onClick={showsros}
                    className="h-11 px-3 rounded border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{SRO ? SRO : "Select Rate"}</span>
                    {chevrondwn9 ? <IoChevronDownOutline /> : <IoChevronUp />}
                  </div>
                  {sroData && (
                    <div className="absolute top-12 left-0 bg-white border rounded shadow w-full z-50">
                      <div className="max-h-32 overflow-auto">
                        {sro.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => selectsro(category.value)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {category.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Select SRO Item NO */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Select SRO Item NO
                </label>
                <div className="relative">
                  <div
                    onClick={showsroitemno}
                    className="h-11 px-3 rounded border border-gray-200 bg-gray-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>{SroItemNO ? SroItemNO : "Select Sro Item No"}</span>
                    {chevrondwn10 ? <IoChevronDownOutline /> : <IoChevronUp />}
                  </div>
                  {sroitemnoData && (
                    <div className="absolute top-12 left-0 bg-white border rounded shadow w-full z-50">
                      <div className="max-h-32 overflow-auto">
                        {sroitemno.map((category) => (
                          <div
                            key={category.id}
                            onClick={() => selectsroitemno(category.value)}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                          >
                            {category.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Tax Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Tax amount
                </label>
                <input
                  value={taxAmount}
                  type="text"
                  onChange={(e) => setTaxAmount(e.target.value)}
                  readOnly
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-100 cursor-not-allowed"
                />
              </div>
              {/* Net Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Net amount
                </label>
                <input
                  value={netAmount}
                  readOnly
                  onChange={(e) => setNetAmount(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-100 cursor-not-allowed"
                />
              </div>
              {/* Fixed Notified Value or Retail Price */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Fixed Notified Value
                  or Retail Price
                </label>
                <input
                  value={fixedNotifiedValueOrRetailPrice}
                  onChange={(e) =>
                    setFixedNotifiedValueOrRetailPrice(e.target.value)
                  }
                  type="number"
                  min="0"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Sales Tax Withheld At Source */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-400">*</span> Sales Tax Withheld At
                  Source
                </label>
                <input
                  value={salesTaxWithheldAtSource}
                  onChange={(e) => setSalesTaxWithheldAtSource(e.target.value)}
                  type="number"
                  min="0"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
              {/* Remarks */}
              <div className="flex flex-col col-span-3">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <input
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  type="text"
                  className="h-11 px-3 rounded border border-gray-200 bg-gray-50 focus:outline-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Footer Button */}
        <div className="flex justify-end px-8 py-2 bg-gray-50 rounded-b-xl border-t border-gray-200">
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
                quantity: Number(quantity),
                price: Number(price),
                rate: Number(rate),
                SRO,
                SroItemNO,
                remarks,
                taxAmount: Number(taxAmount),
                netAmount: Number(netAmount),
                description,
                extraTax: Number(extraTax),
                furtherTax: Number(furtherTax),
                discount: Number(discount),
                fedPayable: Number(fedPayable),
                fixedNotifiedValueOrRetailPrice: Number(
                  fixedNotifiedValueOrRetailPrice
                ),
                salesTaxWithheldAtSource: Number(salesTaxWithheldAtSource),
              };
              if (edititems && editIndex !== null) {
                setItemsData((prev) => {
                  const updated = [...prev];
                  updated[editIndex] = {
                    ...inputsdata,
                    totalValues: 0,
                  };
                  return updated;
                });
                setInvoiceSection(false);
              } else {
                setItemsData((prev) => [
                  ...prev,
                  {
                    ...inputsdata,
                    totalValues: 0,
                  },
                ]);
                setInvoiceSection(false);
              }
              showscrollbar();
            }}
            className={`py-1 px-8 text-lg font-semibold text-white rounded transition ${
              !itemname || !order || !Uom || !quantity || !price || !description
                ? "opacity-50 cursor-not-allowed bg-[#155dfd]"
                : "cursor-pointer bg-blue-800"
            }`}
            disabled={
              !itemname || !order || !Uom || !quantity || !price || !description
            }
          >
            {edititems ? "Update" : "Add"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
