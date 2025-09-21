"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { UseintegrationDetails } from "@/Contexts/integrationcontext";
import { useRouter } from "next/navigation";

export default function Integration() {
  const [environmentDropdownOpen, setEnvironmentDropdownOpen] = useState(false);
  const [environment, setEnvironment] = useState<string>("");
  const [token, setToken] = useState("");
  const { integrationdetails, setIntegrationdetails } = UseintegrationDetails();
  const router = useRouter();

  const environments = [
    { id: 1, title: "Sandbox", value: "sandbox" },
    { id: 2, title: "Production", value: "production" },
  ];

  useEffect(() => {
    if (integrationdetails) {
      setEnvironment(integrationdetails.environemnt || "");
      setToken(integrationdetails.token || "");
    }
  }, [integrationdetails]);

  const handleEnvironmentSelect = (value: string) => {
    setEnvironment(value);
    setEnvironmentDropdownOpen(false);
  };

  const saveIntegrationDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const details = { environemnt: environment, token };
    setIntegrationdetails(details);
    router.push("/invoice");
  };

  return (
    <div className="flex pt-15 gap-2">
      <Sidebar />
      <div className="px-14 w-full flex items-center">
        <div className="flex flex-col bg-white rounded-lg shadow-lg w-full">
          {/* Header */}
          <div className="flex justify-between bg-gradient-to-r from-blue-200 to-blue-300 py-4 px-6 rounded-t-lg">
            <p className="text-lg text-gray-700 font-semibold">
              FBR Integration Settings
            </p>
            <p></p>
          </div>

          {/* Form */}
          <form onSubmit={saveIntegrationDetails}>
            <div className="grid grid-cols-1 gap-4 px-8 py-6">
              {/* Token */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  <span className="text-red-400">*</span> Token
                </label>
                <input
                  value={token}
                  onChange={(e) => setToken(e.target.value.replace(/\s/g, ""))} // remove spaces immediately
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // block spacebar
                  }}
                  type="text"
                  className="mt-1 py-2 px-3 shadow-sm ring-1 ring-gray-200 focus:ring-gray-300 bg-gray-100 rounded-md outline-none"
                />
              </div>

              {/* Environment Dropdown */}
              <div className="flex flex-col relative">
                <label className="text-sm font-semibold text-gray-600">
                  <span className="text-red-400">*</span> Environment
                </label>
                <div
                  onClick={() =>
                    setEnvironmentDropdownOpen(!environmentDropdownOpen)
                  }
                  className="mt-1 bg-gray-100 rounded-md shadow-sm flex justify-between items-center py-2 px-3 border border-gray-200 text-sm text-gray-700 hover:border-gray-300 cursor-pointer"
                >
                  <span>{environment || "Select environment"}</span>
                  {environmentDropdownOpen ? (
                    <IoChevronUp />
                  ) : (
                    <IoChevronDown />
                  )}
                </div>

                {environmentDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-gray-100 z-10">
                    {environments.map((env) => (
                      <div
                        key={env.id}
                        onClick={() => handleEnvironmentSelect(env.value)}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer"
                      >
                        {env.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end px-8 pb-5">
              <button
                type="submit"
                disabled={!environment || !token}
                className={`text-white px-5 py-2 rounded-sm transition ${
                  !environment || !token
                    ? "bg-[#4b9efe] cursor-not-allowed"
                    : "bg-[#2d81fe] cursor-pointer hover:bg-[#1f67d2]"
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
