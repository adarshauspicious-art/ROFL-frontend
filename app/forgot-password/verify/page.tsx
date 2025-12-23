"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("OTP submitted:", otp);
    };
    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* LEFT SIDE IMAGE */}
            <div className="hidden md:block w-1/2 h-screen overflow-hidden rounded-r-[40px]">
                <Image
                    src="/rofl emoji.svg" // <— Place your image in /public/login.png
                    alt="Mascot"
                    width={1200}
                    height={1200}
                    className="object-cover h-full w-full"
                />
            </div>

            {/* RIGHT SIDE LOGIN PANEL */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                {/* Top right support link */}
                <div className="absolute top-6 right-10 text-sm text-gray-500">
                    Have Issues?{" "}
                    <Link href="#" className="underline">
                        Contact Support
                    </Link>
                </div>

                {/* LOGO */}
                <div className="mb-6 text-center">
                    <Image
                        src="/rofl_img.png" // Place your ROFL logo at /public/rofl-logo.png
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
                            Enter OTP
                        </h1>

                        <p className="mt-3 font-cabinet text-center text-gray-600 text-sm">
                            Enter the one-time code sent to your registered email address
                        </p>

                        {/* EMAIL */}
                        <div className="mt-5 relative">
                            <input
                                type="otp"
                                className=" mt-2 w-full border border-gray-300 pl-9 text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] "
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                        onClick={() => router.push("/forgot-password/reset")}
                            className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
                            type="submit"
                        >
                            Verify <span>→</span>
                        </button>

                        {/* CREATE ACCOUNT */}
                        <p className="mt-5 text-center text-gray-700 text-sm">
                            Remember Password?{" "}
                            <Link href="/login" className="underline font-medium">
                                Login.
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
