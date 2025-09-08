"use client";
import React, { createContext, useContext, useState } from "react";

export type InputsData = {
  itemname: string;
  barcode: string;
  order: string;
  maxorder: string;
  reorderLevel: string;
  category: string;
  HsCode: string;
  Uom: string;
  revenueAccount: string;
  assestAccount: string;
  cogsAccount: string;
  serviceAccount: string;
  file: File | null;
  quantity: string;
  price: string;
  rate: string;
  SRO: string;
  SroItemNO: string;
  remarks: string;
  taxAmount?: string;
  netAmount?:string
};



type ItemsContextType = {
  Itemdetails: InputsData[];
  setItemsData: React.Dispatch<React.SetStateAction<InputsData[]>>;
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

type ItemsProviderProps = {
  children: React.ReactNode;
};

export const ItemsProvider = ({ children }: ItemsProviderProps) => {
  const [Itemdetails, setItemsData] = useState<InputsData[]>([]);

  return (
    <ItemsContext.Provider value={{ Itemdetails, setItemsData }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within ItemsProvider");
  }
  return context;
};
