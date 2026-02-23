"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/create-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: showConfirmPassword,
        }),
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

    setEmail("");
    setPassword("");
    setShowPassword(false);
    setConfirmPassword("");
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen w-full flex bg-black">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2 h-screen overflow-hidden rounded-r-[40px]">
        <Image
          src="/webLogImg.svg"
          alt="Mascot"
          width={1200}
          height={1200}
          className="object-cover h-full w-full"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="absolute top-6 right-10 text-sm text-gray-400">
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
             w-[480px] min-h-[620px]  login-card 
             mx-auto flex items-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md rounded-3xl p-10">
            <h1 className="login-title text-center text-sm">
              Create Your <br /> Account
            </h1>

            <p className="mt-3 text-center text-gray-400 text-sm">
              Only U.S. residents can sell.
              <br />
              <span className="mt-3 text-center text-gray-400 text-sm">Identity verification is required.</span>
            </p>

            {/* EMAIL */}
            <div className="mt-5 relative">
              <input
                type="email"
                className=" mt-2 w-full border border-zinc-500/40 pl-9 text-Black rounded-xl px-4 py-3 bg-zinc-800/70 hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] transition duration-300 "
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
            <div className="mt-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full border border-zinc-500/40 text-gray-200 rounded-xl px-4 py-3 pl-9 bg-zinc-800/70 hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] transition duration-300"
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
                alt="password"
                width={18}
                height={10}
                className="absolute top-4 left-3"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mt-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword} // use confirmPassword state
                className="w-full border border-zinc-500/40 text-gray-200 rounded-xl px-4 py-3 pl-9 bg-zinc-800/70 hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] transition duration-300"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)} // update confirmPassword state
              />

              <Image
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3.5 right-3 cursor-pointer"
                src={showConfirmPassword ? "/eyeOff.png" : "/eye.png"}
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
              type="button"
              onClick={()=> router.push("/web/auths/create-account/sucess")}
            >
              Set Password <span>→</span>
            </button>

            <div className="flex items-center text-gray-400 text-sm my-6">
              <hr className="flex-grow border-t border-gray-600" />
              <span className="mx-4">Or</span>
              <hr className="flex-grow border-t border-gray-600" />
            </div>

            {/* Continue with the google */}
            <button
              className="w-full flex items-center justify-center gap-3 
               bg-zinc-800/70 hover:bg-zinc-700/80
               border border-zinc-500/40
               text-white
               py-3 rounded-xl mt-5
               transition duration-300"
            >
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />

              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            {/* LOGIN LINK */}
            <p className="mt-5 text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/web/auths/login" className="underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
