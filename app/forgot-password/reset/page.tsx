"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // inline error messages
  const [loading, setLoading] = useState(false); // loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // reset previous errors

    // Check passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Get email from localStorage (set during OTP verification)
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setError("Session expired. Please restart password reset.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        // success → clear email and redirect
        localStorage.removeItem("resetEmail");
        router.push("/forgot-password/success");
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password API error:", err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
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

      {/* RIGHT SIDE PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        {/* Support link */}
        <div className="absolute top-6 right-10 text-sm text-gray-500">
          Have Issues? <Link href="#" className="underline">Contact Support</Link>
        </div>

        {/* Logo */}
        <div className="mb-6 text-center">
          <Image src="/rofl_img.png" alt="ROFL Logo" width={160} height={80} />
        </div>

        {/* Reset password form */}
        <form
          className="space-y-4 border rounded-3xl border-gray-200 shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md rounded-3xl p-10">
            <h1 className="login-title text-center text-sm">Create Password</h1>

            <p className="mt-3 font-cabinet text-center text-gray-600 text-sm">
              Create a strong new password and confirm it to secure access.
            </p>

            {/* New password */}
            <div className="mt-5 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full border border-gray-300 text-black rounded-xl px-4 py-3 pl-9 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D]"
                placeholder="Set New Password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
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
                alt="password_icon"
                width={18}
                height={10}
                className="absolute top-4 left-3"
              />
            </div>

            {/* Confirm password */}
            <div className="mt-5 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                className="w-full border border-gray-300 text-black rounded-xl px-4 py-3 pl-9 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-[#F2482D]"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
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
                alt="password_icon"
                width={18}
                height={10}
                className="absolute top-4 left-3"
              />
            </div>

            {/* Inline error */}
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              disabled={!password || password !== confirmPassword || loading}
              className={`mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Saving..." : "Set Password"} <span>→</span>
            </button>

            {/* Login link */}
            <p className="mt-5 text-center text-gray-700 text-sm">
              Remember Password?{" "}
              <Link href="/login" className="underline font-medium">Login.</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
