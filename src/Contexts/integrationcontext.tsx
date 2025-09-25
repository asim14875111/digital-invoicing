"use client";
import React, { createContext, JSX, useContext, useEffect, useState } from "react";
import { auth, database } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";
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

  // Clear integration details when user signs out
  useEffect(() => {
    if (!auth) return;

    // Load integration settings from realtime db when user is authenticated
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIntegrationdetails(null);
        return;
      }

      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `User_data/${user.uid}/integration`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          // saved shape uses keys 'environment' and 'token' in integration page
          const details =
            data?.environemnt || data?.environment || data?.token
              ? { environemnt: data.environemnt ?? data.environment ?? "", token: data.token ?? "" }
              : data;
          setIntegrationdetails(details ?? null);
        }
      } catch (err) {
        console.error(err, "Error loading integration details from firebase in IntegrationProvider");
      }
    });

    return () => unsubscribe();
  }, []);

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
