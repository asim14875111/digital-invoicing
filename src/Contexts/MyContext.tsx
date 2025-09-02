"use client";
import { ICity, ICountry, IState } from "country-state-city";
import React, { createContext, useContext, useState } from "react";

export type InputsData = {
  customerreceivable: string;
  name: string;
  description: string;
  CNIC: string;
  status: string;
  address: string;
  shippingaddress: string;
  Phonenumber: string;
  mobileNumber: string;
  email: string;
  website: string;
  country: ICountry | null;
  States: IState | null;
  city: ICity | null;
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
    customerreceivable: "",
    name: "",
    description: "",
    CNIC: "",
    status: "",
    address: "",
    shippingaddress: "",
    Phonenumber: "",
    mobileNumber: "",
    email: "",
    website: "",
    country: null,
    States: null,
    city: null,
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
