"use client"
import { createContext, Dispatch, SetStateAction } from "react";
import type { InputsData as CustomerInputsData } from "./MyContext";
import type { InputsData as ItemInputsData } from "./ItemsContext";

export type AllUsersDataType = {
	Transactiondatendtype: {
		date: string;
		types: string;
		remarks: string;
	};
	Customerdetails: CustomerInputsData;
	Itemdetails: ItemInputsData[];
};

export type DataContextType = {
	allusersData: AllUsersDataType[];
	setAllUsersData: Dispatch<SetStateAction<AllUsersDataType[]>>;
};

export const Datacontext = createContext<DataContextType | undefined>(undefined);
