"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { UseintegrationDetails } from "@/Contexts/integrationcontext";
import { useRouter } from "next/navigation";
export default function Integration() {
  const [display, setDisplay] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [environemnt, setEnvironment] = useState<string>("");
  const [clientid, setClientId] = useState<string>("");
  // const [clientSecret, setClientSecret] = useState<string>("");
  // const [irisUsername, setIrisUsername] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [data, setData] = useState(false);
  const [token, setToken] = useState("");
  const { integrationdetails, setIntegrationdetails } = UseintegrationDetails();
  const router = useRouter();
  const showenvironment = (): void => {
    if (display) {
      setDisplay(false);
      setVisible(true);
      setData(true);
    } else {
      setData(false);
      setVisible(false);
      setDisplay(true);
    }
  };

  const environment = [
    {
      id: 1,
      title: "Sandbox",
      value: "sandbox",
    },
    {
      id: 2,
      title: "Production",
      value: "production",
    },
  ];
  const setenvironmentdata = (value: string): void => {
    setData(false);
    setVisible(false);
    setDisplay(true);
    setEnvironment(value);
  };

  const saveintegrationdetails = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    const details = {
      environemnt,
      token,
      // clientid,
      // clientSecret,
      // irisUsername,
      // password,
    };
    setIntegrationdetails(details);
    router.push("/invoice");
  };

  useEffect(() => {
    console.log(integrationdetails);
    if (integrationdetails) {
      setEnvironment(integrationdetails.environemnt || "");
      setToken(integrationdetails.token || "");
      // setClientId(integrationdetails.clientid || "");
      // setClientSecret(integrationdetails.clientSecret || "");
      // setIrisUsername(integrationdetails.irisUsername || "");
      // setPassword(integrationdetails.password || "");
    }
  }, [integrationdetails]);

  return (
    <div className="flex pt-15 gap-2">
      <Sidebar />
      <div className="px-14 w-full flex  items-center">
        <div className="flex flex-col bg-gray-50  rounded-[6px] w-full ">
          <div className="flex justify-between bg-gray-100 py-1 rounded-[6px] w-full">
            <p className="text-lg pl-2 text-gray-600">
              Fbr integration Settings
            </p>
            <p></p>
          </div>
          <form onSubmit={saveintegrationdetails}>
            <div className="grid grid-cols-1 gap-4 px-8 py-4 pb-10">
              {/* <div className="flex gap-4"> */}
              {/* <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Client Id
                </label>
                <input
                  value={clientid}
                  onChange={(e) => setClientId(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Client Secret
                </label>
                <input
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              {/* </div> */}
              {/* <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Iris Username
                </label>
                <input
                  value={irisUsername}
                  onChange={(e) => setIrisUsername(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Iris password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}  */}
              <div className="flex flex-col h-fit  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Token
                </label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  type="text"
                  className="py-[2px] pl-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 mt-1 rounded-md outline-0"
                />
              </div>{" "}
              <div className="flex flex-col h-fit relative  w-12/12 border-gray-400 rounded-sm pb-0 py-1">
                <label className="text-sm pl-0 font-semibold pb-1  text-gray-600">
                  <span className="text-red-400 font-semibold ">* </span>
                  Environment{" "}
                </label>

                <div
                  onClick={showenvironment}
                  className="bg-gray-100 rounded-[8px] shadow-sm flex justify-between  text-sm text-gray-600  px-3 items-center py-[5.5px] mt-1 border border-gray-200 hover:border-gray-300 cursor-pointer"
                >
                  <p>{environemnt ? environemnt : "Select environment"}</p>
                  {display && (
                    <p className="text-gray-500">
                      <IoChevronDown />
                    </p>
                  )}
                  {visible && (
                    <p className="text-gray-500">
                      <IoChevronUp />
                    </p>
                  )}
                </div>
                {data && (
                  <div className="absolute top-15 w-full border border-gray-200 pt-2 pb-3 rounded-b-sm  bg-gray-100 flex flex-col">
                    {environment.map((data) => (
                      <div
                        onClick={() => setenvironmentdata(data.value)}
                        key={data.id}
                        className="hover:bg-blue-500 hover:text-white cursor-pointer pl-3"
                      >
                        {data.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>{" "}
            </div>
            <div className="flex justify-self-end px-8 pb-3">
              <button
                type="submit"
                className={` text-white px-5 py-1 rounded-sm  transition ${
                  !environemnt || !token
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-[#223f8f] cursor-pointer hover:bg-[#1a3274]"
                } `}
                disabled={!environemnt || !token}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
}
