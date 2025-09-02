"use client"
import React from "react";
import { IoMdAdd } from "react-icons/io";
type AddnewdataProps = {
  showhiddendiv: () => void;
};
export default function Addnewdata({ showhiddendiv }: AddnewdataProps) {

  return (
    <>
      <button
        onClick={() => showhiddendiv()}
        className="bg-green-700 flex items-center gap-2 cursor-pointer hover:bg-green-800 text-white  px-4 py-1 rounded-sm"
      >
        Add New
        <IoMdAdd />
      </button>
    </>
  );
}
