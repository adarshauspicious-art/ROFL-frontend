"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // To track the loading state
  const [error, setError] = useState(""); // To store error messages (if any)
  const [success, setSuccess] = useState(false); // To track success state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting the form
    setError(""); // Clear any previous error messages
    setSuccess(false); // Reset success state

    try {
      const response = await fetch("http://localhost:5000/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email in the request body
      });

      if (response.ok) {
        setSuccess(true); // If successful, set success to true
        router.push("/forgot-password/verify"); // Navigate to verify page on success
      } else {
        const data = await response.json();
        setError(data.message || "Something went wrong"); // Show error if response is not ok
      }
    } catch (err) {
      setError("An error occurred while submitting the request.");
    } finally {
      setLoading(false); // Reset loading state
    }
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
            <h1 className="login-title text-center text-sm ">Forgot Password?</h1>

            <p className="mt-3 font-cabinet text-center text-gray-600 text-sm">
              Reset your password by email link and set a new one securely
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

            {/* LOGIN BUTTON */}
            <button
              disabled={loading} // Disable button when loading
              className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
              type="submit"
            >
              {loading ? "Sending..." : "Verify Email"} <span>→</span>
            </button>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-center mt-3">{error}</div>
            )}

            {/* Success message */}
            {success && (
              <div className="text-green-500 text-center mt-3">
                Success! Check your email for the verification link.
              </div>
            )}

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
