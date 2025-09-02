"use client";
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
        className="bg-gray-700 flex items-center gap-2 w-fit self-end text-sm cursor-pointer hover:bg-gray-800 text-white  px-1.5 py-1.5  rounded-full"
      >
        <IoMdAdd />
      </button>
    </>
  );
}
