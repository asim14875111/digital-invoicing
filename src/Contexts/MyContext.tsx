"use client";
import React, { createContext, useContext, useState } from "react";

export type InputsData = {
  // customerreceivable: string;
  name: string;
  description: string;
  CNIC: string;
  status: string;
  address: string;
  Phonenumber: string;
  mobileNumber: string;
  email: string;
  website: string;
  contactperson: string;
  creditLimit: string;
  Site: string;

};

type CustomercontextType = {
  Customerdetails: InputsData;
  setInputsdata: React.Dispatch<React.SetStateAction<InputsData>>;
};

const CustomerContext = createContext<CustomercontextType | undefined>(
  undefined
);

type CustomerProviderProps = {
  children: React.ReactNode;
};

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [Customerdetails, setInputsdata] = useState<InputsData>({
    // customerreceivable: "",
    name: "",
    description: "",
    CNIC: "",
    status: "",
    address: "",
    Phonenumber: "",
    mobileNumber: "",
    email: "",
    website: "",
    contactperson: "",
    creditLimit: "",
    Site: "",

  });

  return (
    <CustomerContext.Provider value={{ Customerdetails, setInputsdata }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within CustomerProvider");
  }
  return context;
};
