"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false); // To show loading state
    const [error, setError] = useState(""); // To capture any errors

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const email = localStorage.getItem("resetEmail");

  if (!email) {
    setError("Session expired. Please restart password recovery.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (response.ok) {
      router.push("/forgot-password/reset");
    } else {
      setError(data.message || "Invalid OTP. Please try again.");
    }
  } catch (err) {
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
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
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 ">
                {/* Top right support link */}
                <div className="absolute top-6 right-10 text-sm text-gray-400">
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
                    className="space-y-4 border rounded-3xl border-gray-200 shadow-xl login-card"
                    onSubmit={handleSubmit}
                >
                    <div className="w-full max-w-md  rounded-3xl p-10">
                        <h1 className="login-title text-center text-sm ">Enter OTP</h1>

                        <p className="mt-3 font-cabinet text-center text-gray-400 text-sm">
                            Enter the one-time code sent to your registered email address
                        </p>

                        {/* OTP INPUT */}
                        <div className="mt-5 relative">
                            <input
                                type="text" // Changed from otp to text to ensure correct input type
                                className="mt-2 w-full border border-gray-400 pl-9 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D] bg-zinc-800/70"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>

                        {/* Error Message */}
                        {/* {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>} */}

                        {/* VERIFY BUTTON */}
                        <button
                            className={`mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 ${
                                loading ? "cursor-not-allowed opacity-50" : ""
                            }`}
                            type="submit"
                            onClick={()=>router.push("/web/auths/forget-password/reset")}
                            // disabled={loading} // Disable button when loading
                        >
                            {/* {loading ? "Verifying..." : "Verify"} <span>→</span> */}
                            Verify →
                        </button>

                        {/* CREATE ACCOUNT */}
                        <p className="mt-5 text-center text-gray-400 text-sm">
                            Remember Password?{" "}
                            <Link href="/web/auths/login" className="underline font-medium">
                                Login.
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}