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
      const response = await fetch("http://localhost:3000/web/auths/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/dashboard");
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
    <div className="min-h-screen w-full flex bg-black">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 h-screen overflow-hidden rounded-r-[40px]">
        <Image
          src="/webLogImg.svg"
          alt="Mascot"
          width={1200}
          height={1200}
          className="object-cover h-full w-full"
        />
      </div>

      {/* RIGHT SIDE LOGIN PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="absolute top-15 right-10 text-sm text-gray-400">
          Have Issues?{" "}
          <Link href="#" className="underline">
            Contact Support
          </Link>
        </div>

        {/* LOGO */}
        <div className="mb-6 text-center">
          <Image src="/rofl_img.png" alt="ROFL Logo" width={160} height={80} />
        </div>

        {/* LOGIN CARD */}
        <form
          className="space-y-4    border rounded-3xl border-gray-950 shadow-xl login-card"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md  rounded-3xl p-10  border-none">
            <h1 className="login-title text-center text-sm ">
              Login To Your Account
            </h1>

            <p className="mt-3 font-cabinet text-center text-gray-400 text-sm">
              Sign in with email and password to securely access your account.
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
            <div className="mt-4">
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="w-full border border-zinc-500/40 text-gray-200 rounded-xl px-4 py-3 pl-9 bg-zinc-800/70  hover:bg-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] transition duration-300"
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
                <Link
                  href="/web/auths/forget-password"
                  className="text-sm text-gray-400 underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black  flex items-center justify-center gap-2 "
              type="submit"
            >
              Login <span>→</span>
            </button>


            {/* OR DIVIDER */}
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


            {/* CREATE ACCOUNT */}
            <p className="mt-5 text-left  text-gray-400 text-sm  ">
              Don’t have an account?{"  "}
              <Link href="/web/auths/create-account" className="underline font-medium">
                Create One.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
