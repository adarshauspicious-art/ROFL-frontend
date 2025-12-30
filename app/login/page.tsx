"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Successful:", data);
        // Optionally save token in localStorage if your backend returns JWT
        localStorage.setItem("token", data.token);
        
        // Redirect user or update state
        // alert("Login successful!");
        router.push("/dashboard");
      } else {
        console.error("Login Failed:", data.message);
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }

    // Optionally reset form
    setEmail("");
    setPassword("");
    
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 h-screen overflow-hidden rounded-r-[40px]">
        <Image
          src="/rofl emoji.svg" 
          alt="Mascot"
          width={1200}
          height={1200}
          className="object-cover h-full w-full"
        />
      </div>

      {/* RIGHT SIDE LOGIN PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
       
        <div className="absolute top-6 right-10 text-sm text-gray-500">
          Have Issues?{" "}
          <Link href="#" className="underline">
            Contact Support
          </Link>
        </div>

        {/* LOGO */}
        <div className="mb-6 text-center">
          <Image
            src="/rofl_img.png" 
            alt="ROFL Logo"
            width={160}
            height={80}
          />
        </div>

        {/* LOGIN CARD */}
        <form
          className="space-y-4 border rounded-3xl border-gray-200 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md  rounded-3xl p-10">
            <h1 className="login-title text-center text-sm ">
              Login To Your <br /> Account
            </h1>

            <p className="mt-3 font-cabinet text-center text-gray-600 text-sm">
              Sign in with email and password to securely access your account.
            </p>

            {/* EMAIL */}
            <div className="mt-5 relative">
              <input
                type="email"
                className=" mt-2 w-full border border-gray-300 pl-9 text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] "
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Image
                src="/mail.png"
                alt="email_logo"
                width={15}
                height={10}
                className="absolute top-6 left-3"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-4">
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="w-full border border-gray-300 text-black rounded-xl px-4 py-3 pl-9  focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D]"
                  placeholder="Password"
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
                  alt="email_logo"
                  width={18}
                  height={10}
                  className="absolute top-4 left-3"
                />
              </div>

              <div className="text-right mt-2">
                <Link href="/forgot-password" className="text-sm text-gray-600 underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
              type="submit"
            >
              Login <span>→</span>
            </button>

            {/* CREATE ACCOUNT */}
            <p className="mt-5 text-center text-gray-700 text-sm">
              Don’t have an account?{" "}
              <Link href="/register" className="underline font-medium">
                Create One.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}