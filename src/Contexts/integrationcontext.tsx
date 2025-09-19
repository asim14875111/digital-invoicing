"use client";
import React, { createContext, JSX, useContext, useState } from "react";
export type InputsData = {
  environemnt: string;
  // clientid: string;
  // clientSecret: string;
  // irisUsername: string;
  // password: string;
  token:string
};

type ItemContextType = {
  integrationdetails: InputsData | null;
  setIntegrationdetails: React.Dispatch<React.SetStateAction<InputsData | null>>;
};


const IntegrationContext = createContext<ItemContextType | null>(null);


type ItemsProviderProps = {
  children: React.ReactNode;
};

export const IntegrationProvider = ({
  children,
}: ItemsProviderProps): JSX.Element => {
  const [integrationdetails, setIntegrationdetails] = useState<InputsData | null>(null);

  return (
    <IntegrationContext.Provider value={{ integrationdetails, setIntegrationdetails }}>
      {children}
    </IntegrationContext.Provider>
  );
};


export const UseintegrationDetails = () => {
  const context = useContext(IntegrationContext);
  if (!context) {
    throw new Error("UseintegrationDetails must be used within CompanyProvider");
  }
  return context;
};
