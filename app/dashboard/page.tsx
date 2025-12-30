"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Agar token nahi hai → login
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include", // IMPORTANT
      });

      localStorage.removeItem("token");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-4 login-title">
          Welcome to Dashboard 🎉
        </h1>

        <p className="text-gray-600 mb-6">You are successfully logged in.</p>

        <button
          onClick={handleLogout}
          className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
        >
          Logout
        </button>
      </div>
    </div>
  );
}