"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration Successful:", data);
        alert("Account created successfully!");
      } else {
        console.error("Registration Failed:", data.message);
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Something went wrong. Please try again.");
    }

    setFirstName("");
    setLastName("");

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2 h-screen overflow-hidden rounded-r-[40px]">
        <Image
          src="/rofl emoji.svg"
          alt="Mascot"
          width={1200}
          height={1200}
          className="object-cover h-full w-full"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="absolute top-6 right-10 text-sm text-gray-500">
          Have Issues?{" "}
          <Link href="#" className="underline">
            Contact Support
          </Link>
        </div>

        {/* LOGO */}
        <div className="mb-6 text-center">
          <Image src="/rofl_img.png" alt="ROFL Logo" width={160} height={80} />
        </div>

        {/* REGISTER CARD */}
        <form
          className="border border-gray-200 shadow-xl rounded-3xl 
             w-[480px] min-h-[620px] 
             mx-auto flex items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md rounded-3xl p-10">
            <h1 className="login-title text-center text-sm">
              Create Your <br /> Account
            </h1>

            <p className="mt-3 text-center text-gray-600 text-sm">
              Sign up with your details to get started.
            </p>

            {/* FIRST NAME */}
            <div className="mt-5 relative">
              <input
                type="text"
                className="w-full border border-gray-300 pl-9 text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2482D]"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
                <Image
                src="/user_logo.png"
                alt="email"
                width={15}
                height={10}
                className="absolute top-4.5 left-3"
              />
            </div>
            {/* LAST NAME */}
            <div className="mt-5 relative">
              <input
                type="text"
                className="w-full border border-gray-300 pl-9 text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2482D]"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
               <Image
                src="/user_logo.png"
                alt="email"
                width={15}
                height={10}
                className="absolute top-4.5 left-3"
              />
            </div>

            {/* EMAIL */}
            <div className="mt-4 relative">
              <input
                type="email"
                className="w-full border border-gray-300 pl-9 text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2482D]"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Image
                src="/mail.png"
                alt="email"
                width={15}
                height={10}
                className="absolute top-4 left-3"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 text-black rounded-xl px-4 py-3 pl-9 focus:outline-none focus:ring-2 focus:ring-[#F2482D]"
                placeholder="Set Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Image
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3.5 right-3 cursor-pointer"
                src={showPassword ? "/eyeOff.png" : "/eye.png"}
                alt="eye"
                width={20}
                height={20}
              />

              <Image
                src="/password_icon.png"
                alt="password"
                width={18}
                height={10}
                className="absolute top-4 left-3"
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              className="mt-5 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
              type="submit"
            >
              Register <span>→</span>
            </button>

            {/* LOGIN LINK */}
            <p className="mt-5 text-center text-gray-700 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}