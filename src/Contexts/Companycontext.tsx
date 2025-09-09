"use client";
import React, { createContext, JSX, useContext, useState } from "react";

export type InputsData = {
  companyName: string;
  ntn: string;
  address: string;
  gst: string;
  phonenum: string;
  email: string;
  bankname: string;
  branch: string;
  account: string;
  iban: string;
  businessType: string;
};

type ItemContextType = {
  companyDetails: InputsData | null;
  setCompanyDetails: React.Dispatch<React.SetStateAction<InputsData| null>>;
};

const ItemsContext = createContext<ItemContextType | null>(null);

type ItemsProviderProps = {
  children: React.ReactNode;
};

export const CompanyProvider = ({
  children,
}: ItemsProviderProps): JSX.Element => {
  const [companyDetails, setCompanyDetails] = useState<InputsData | null>(null);

  return (
    <ItemsContext.Provider value={{ companyDetails, setCompanyDetails }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useCompanyDetails = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useCompanyDetails must be used within CompanyProvider");
  }
  return context;
};
