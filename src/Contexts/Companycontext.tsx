"use client";
import React, { createContext, JSX, useContext, useEffect, useState } from "react";
import { auth, database } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, child } from "firebase/database";

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
  province:string
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

  // Clear company details when user signs out
  useEffect(() => {
    if (!auth) return;

    // Listen for auth state changes. When a user is authenticated, try to
    // load company details from the realtime database so the context
    // is populated on page refresh or direct navigation to other pages.
    // For backwards compatibility check both `companydetails` and `buyerdetails`.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCompanyDetails(null);
        return;
      }

      try {
        const dbRef = ref(database);
        // Try companydetails first, then fallback to older buyerdetails path
        const snapCompany = await get(child(dbRef, `User_data/${user.uid}/companydetails`));
        let data: unknown = null;

        if (snapCompany.exists()) {
          data = snapCompany.val();
        } else {
          const snapBuyer = await get(child(dbRef, `User_data/${user.uid}/buyerdetails`));
          if (snapBuyer.exists()) data = snapBuyer.val();
        }

        if (data && typeof data === "object") {
          // older code saved an object under `details` when updating from the company page
          // support both shapes: either { details: {...} } or directly the details object
          const d = data as { details?: Record<string, unknown> };
          const details = d.details ? d.details : (data as Record<string, unknown>);
          // cast to InputsData after normalizing shape
          setCompanyDetails((details as unknown) as InputsData ?? null);
        }
      } catch (err) {
        // swallow errors but keep companyDetails as null; caller pages can handle it
        console.error(err, "Error loading company details from firebase in CompanyProvider");
      }
    });

    return () => unsubscribe();
  }, []);

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
