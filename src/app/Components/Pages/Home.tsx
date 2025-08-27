"use client";
import React, { useState } from "react";
import Addnewdata from "../Addnewdata";
import Invoicingdata from "../Invoicingdata";
export default function Home() {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(true);

  const showhiddendiv = (): void => {
    setIsVisible(true);
    setDisplay(false);
  };
  const hidedetailsection = (): void => {
    setIsVisible(false);
    setDisplay(true);
  };

  return (
    <div>
      <div className="flex justify-end px-10">
        {display && <Addnewdata showhiddendiv={showhiddendiv} />}
      </div>
      {visible && <Invoicingdata hidedetailsection={hidedetailsection}/>}
    </div>
  );
}
