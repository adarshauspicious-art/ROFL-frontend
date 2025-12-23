"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Password submitted");
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
                            Create Password
                        </h1>

                        <p className="mt-3 font-cabinet text-center text-gray-600 text-sm">
                            Create a strong new password and confirm it to secure access.
                        </p>

                        {/* SET NEW PASSWORD */}
                        <div className="mt-5 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                className="w-full border border-gray-300 text-black rounded-xl px-4 py-3 pl-9  focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D]"
                                placeholder="Set New Password"
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
                        {/* CONFIRM PASSWORD */}
                        <div className="mt-5 relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                className="w-full border border-gray-300 text-black rounded-xl px-4 py-3 pl-9  focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D]"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                alt="email_logo"
                                width={18}
                                height={10}
                                className="absolute top-4 left-3"
                            />
                            {/* PASSWORD MATCH ERROR */}
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                        onClick={() => router.push("/forgot-password/success")}
                            className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
                            type="submit"
                        >
                            Set Password <span>→</span>
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
