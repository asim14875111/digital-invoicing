import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/firebaseConfig";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close modal if click outside
  useEffect(() => {
    if (!showLogoutModal) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowLogoutModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoutModal]);

  const handleLogout = async () => {
    if (!auth) {
      setShowLogoutModal(false);
      return;
    }
    try {
      await signOut(auth);
      setShowLogoutModal(false);
      router.push("/"); // redirect to login page
    } catch {
      setShowLogoutModal(false);
    }
  };

  const navItems = [
    {
      href: "/company",
      label: "Company details",
      icon: <BuildingOffice2Icon className="w-5 h-5" />,
    },
    {
      href: "/invoice",
      label: "Invoicing",
      icon: <DocumentTextIcon className="w-5 h-5" />,
    },
    {
      href: "/integration",
      label: "Integration settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="sidebar w-82 h-screen bg-gradient-to-b  from-blue-50 via-blue-100 to-blue-200 text-gray-800 flex flex-col p-6 shadow-xl">
      <h2 className="text-lg font-semibold tracking-wide mb-10 text-gray-600 uppercase">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-300
              ${
                pathname === item.href
                  ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg scale-[1.02]"
                  : "text-gray-700 hover:bg-blue-200 hover:text-black"
              }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        <div
          className={`flex items-center gap-3 mt-8 cursor-pointer rounded-xl px-4 py-3 font-medium transition-all duration-300
            ${
              showLogoutModal
                ? "bg-red-600 text-white shadow-lg scale-[1.02]"
                : "text-gray-700 hover:bg-red-600 hover:text-white"
            }`}
          onClick={() => setShowLogoutModal(true)}
          tabIndex={0}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </div>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadein">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl p-8 w-[380px] flex flex-col items-center border border-blue-100 relative animate-pop"
            style={{
              boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.25)",
            }}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors text-2xl"
              onClick={() => setShowLogoutModal(false)}
            >
              &times;
            </button>

            <div className="mb-4 flex items-center justify-center rounded-full bg-blue-100 w-16 h-16">
              <ArrowRightOnRectangleIcon className="text-blue-600 w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">
              Logout Confirmation
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-4 w-full justify-center">
              <button
                className="px-6 py-2 rounded-xl border cursor-pointer border-gray-300 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all"
                onClick={() => setShowLogoutModal(false)}
                type="button"
              >
                No
              </button>
              <button
                className="px-6 py-2 rounded-xl bg-red-600 cursor-pointer text-white font-medium hover:bg-red-700 shadow-md transition-all"
                onClick={handleLogout}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
