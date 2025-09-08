"use client";
import Navbarlogo from "../../../assests/images/ChatGPT Image Sep 2, 2025, 06_29_14 PM.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  AuthError,
  createUserWithEmailAndPassword,
  // getAuth,
  // onAuthStateChanged,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
// import app from "../../../firebaseConfig";
export default function Navbar() {
  const router = useRouter();

  const [visible, setIsVisible] = useState<boolean>(false);
  const [display, setIsDisplay] = useState<boolean>(false);
  const mydivref = useRef<HTMLDivElement>(null);
  const divref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginemail, setLoginEmail] = useState("");
  const [loginpswrd, setLoginpswrd] = useState("");
  const showloginform = (): void => {
    setIsVisible(true);
  };

  // useEffect(() => {
  //   const auth = getAuth(app);
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       try {
  //         const idToken = await user.getIdToken();
  //         console.log(idToken, "firebase token");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else {
  //       console.log("no user signed in");
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  const closeloginsection = (): void => {
    setIsVisible(false);
  };

  const handleclickoutside = (event: MouseEvent): void => {
    if (mydivref.current && !mydivref.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };
  const handleclickingoutside = (event: MouseEvent): void => {
    if (divref.current && !divref.current.contains(event.target as Node)) {
      setIsDisplay(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleclickoutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, [visible]);
  useEffect(() => {
    if (display) {
      document.addEventListener("mousedown", handleclickingoutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleclickingoutside);
    };
  }, [display]);

  const displaysignupsection = (): void => {
    setIsDisplay(true);
    setIsVisible(false);
  };

  const hidesignupsection = (): void => {
    setIsDisplay(false);
  };

  const showloginsection = (): void => {
    setIsDisplay(false);
    setIsVisible(true);
  };

  const handlesignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!auth) {
        toast.error("Authentication server not initiliazed");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);

      console.log("sign up successfully");
      toast.success("Account created!");
      router.push("/company");
      setTimeout(() => {
        setIsDisplay(false);
      }, 1000);
    } catch (err) {
      console.log(err, "Error");
      type FirebaseError = { code: string };
      if (
        typeof err === "object" &&
        err !== null &&
        typeof (err as FirebaseError).code === "string"
      ) {
        const code = (err as FirebaseError).code;
        if (code === "auth/email-already-in-use") {
          toast.error("This email is already registered!");
        } else if (code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else if (code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!auth) {
        toast.error("Authentication service not initialized.");
        return;
      }
      await signInWithEmailAndPassword(auth, loginemail, loginpswrd);
      console.log("Sign in successfully");
      toast.success("Sign in successfully!");
      router.push("/company");
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } catch (err) {
      console.log(err, "Error");
      if (
        typeof err === "object" &&
        err !== null &&
        typeof (err as AuthError).code === "string"
      ) {
        const code = (err as AuthError).code;
        if (code === "auth/wrong-password") {
          toast.error("Wrong password");
        } else if (code === "auth/user-not-found") {
          toast.error(
            "Could not find any account with this email, kindly sign up"
          );
        } else if (code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else {
          toast.error(
            "Could not find any account with this email and password"
          );
        }
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <>
      <div className="bg-gray-50 border-b fixed w-full z-50 border-gray-200 justify-self-center shadow-md shadow-gray-200">
        <div className="hidden lg:flex py-2 justify-between container justify-self-center w-full px-10 items-center  ">
          <div className="flex items-center h-[40px] pt-2">
            <Image
              src={Navbarlogo}
              alt="navbar-logo"
              width={150}
              height={150}
            />
          </div>
          {/* <div className="flex gap-6 items-center pr-6.5">
            {/* <Link href="/">
              <p className="text-[15px] font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition">
                Home
              </p>
            </Link>
            <Link href="/pricing">
              <p className="text-[15px] font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition">
                Pricing
              </p>
            </Link> */}
          {/* </div> */}
          <div className="flex gap-5 items-center">
            <Link href="/aboutus">
              <p className="text-[15px] font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition">
                About Us
              </p>
            </Link>
            <div
              className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer bg-blue-100 hover:bg-blue-200 px-4 py-1 rounded-md"
              onClick={showloginform}
            >
              Login
            </div>
          </div>
        </div>
      </div>
      {visible && (
        <div className="fixed bg-[#00000078] z-50 flex justify-center items-center  inset-0">
          <div
            ref={mydivref}
            className="flex flex-col bg-white  w-[400px] text-black px-2 py-2 rounded-md"
          >
            <div className="flex justify-between px-3 pt-2 items-center">
              <div>
                <h1 className="font-semibold text-lg  text-gray-800">
                  Login in to Invox
                </h1>
              </div>
              <div
                className="cursor-pointer hover:scale-110  transition"
                onClick={closeloginsection}
              >
                <RxCross2 />
              </div>
            </div>
            <div className="px-3 pt-4">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col">
                  <label className="font-semibold text-gray-800">Email</label>
                  <input
                    value={loginemail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    type="email"
                    placeholder="Enter you email"
                    className="border pl-4 border-gray-300 py-1 rounded-lg mt-1 placeholder:text-sm focus:border-gray-400"
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <label className="font-semibold text-gray-800">
                    Password
                  </label>
                  <input
                    value={loginpswrd}
                    onChange={(e) => setLoginpswrd(e.target.value)}
                    type="password"
                    placeholder="Enter you password"
                    className="border pl-4 border-gray-300 py-1 rounded-lg mt-1 placeholder:text-sm focus:border-gray-400"
                  />
                </div>
                <div className="pt-6">
                  <button
                    type="submit"
                    className="font-semibold bg-[#2d8eb8] text-white w-full py-2 text-center text-sm rounded-md cursor-pointer hover:bg-[#206482]"
                  >
                    Sign in
                  </button>
                </div>
                <div className="pt-4 pb-6">
                  <p className="text-sm text-gray-600 text-center">
                    Dont have an account?{" "}
                    <span
                      className="text-[#2d8eb8] font-semibold hover:underline cursor-pointer"
                      onClick={displaysignupsection}
                    >
                      Sign up
                    </span>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {display && (
        <div className="fixed bg-[#00000078] z-50 flex justify-center items-center  inset-0">
          <form onSubmit={handlesignin}>
            <div
              ref={divref}
              className="flex flex-col bg-white  w-[500px] text-black px-2 py-2 rounded-md"
            >
              <div className="flex justify-between px-3 pt-2 items-center">
                <div>
                  <h1 className="font-semibold text-lg  text-gray-800">
                    Create new Account
                  </h1>
                </div>
                <div
                  onClick={hidesignupsection}
                  className="cursor-pointer hover:scale-110  transition"
                >
                  <RxCross2 />
                </div>
              </div>
              <div className="px-3 pt-4">
                <div className="flex flex-col gap-3">
                  <div className="w-full flex flex-col">
                    <div className="flex flex-col w-full">
                      <label className="font-semibold text-gray-800">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First name"
                        className="border pl-4 border-gray-300 py-1 rounded-lg mt-1 placeholder:text-sm focus:border-gray-400"
                      />
                    </div>
                    <div className="flex flex-col pt-3">
                      <label className="font-semibold text-gray-800">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last name (optional)"
                        className="border pl-4 border-gray-300 py-1 rounded-lg mt-1 placeholder:text-sm focus:border-gray-400"
                      />
                    </div>
                  </div>
                  <div className="w-full pt-2">
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-800">
                        Email
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter you email"
                        className="border pl-4 border-gray-300 py-1 rounded-lg mt-1 placeholder:text-sm focus:border-gray-400"
                      />
                    </div>
                    <div className="flex flex-col pt-3">
                      <label className="font-semibold text-gray-800">
                        Password
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter you password"
                        className="border pl-4 border-gray-300 py-1 rounded-lg mt-1 placeholder:text-sm focus:border-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button
                    type="submit"
                    className="font-semibold w-full bg-[#2d8eb8] text-white py-2 text-center text-sm rounded-md cursor-pointer hover:bg-[#206482]"
                  >
                    Sign up
                  </button>
                </div>
                <div className="pt-4 pb-6">
                  <p className="text-sm text-gray-600 text-center">
                    Already have an account{" "}
                    <span
                      onClick={showloginsection}
                      className="text-[#2d8eb8] font-semibold hover:underline cursor-pointer"
                    >
                      Sign in
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
