"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <>

      <div className="ml-3 mt-1 fixed h-screen bg-white p-3 shadow-lg rounded-2xl border border-gray-300 w-[300px]">
  <aside className="sidebar relative text-black">

    {/* Header Row */}
    <div className="flex items-center justify-between mb-6 mt-2">
      <Image
        src="/rofl_img.png"
        alt="ROFL Logo"
        width={120}
        height={40}
        className="object-contain"
      />

      <Image
        src="/sidebar.svg"
        alt="Sidebar Toggle"
        width={25}
        height={25}
        className="cursor-pointer"
      />
    </div>
          <ul>
            <li
              className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/Dashboard.svg"
                alt="Dashboard Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />
              Dashboard</li>


            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/user_logo.png"
                alt="user Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Sellers</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/items.svg"
                alt="items Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Items</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/user_logo.png"
                alt="user Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Users</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/winners.svg"
                alt="winners & Fulfillment Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />winners & Fulfillment</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/gift.svg"
                alt="giveaway Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Weekly Giveaway</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/disputes.svg"
                alt="Disputes Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Disputes</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg 
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/revenue.svg"
                alt="Revenue Overview Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Revenue Overview</li>

            <li className="mt-4 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]">
              <Image
                src="/banners.svg"
                alt="Manage Banners Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Manage Banners </li>
            
            <li className="mt-20 ml-2 w-full bg-white py-3 rounded-xl border-none 
             font-normal text-black text-lg
             flex items-center  gap-2
             hover:text-white hover:bg-[#F2482D]
             hover:shadow-[3px_3px_0px_black]" onClick={handleLogout}>
              <Image
                src="/logout.png"
                alt="Logout Icon"
                width={25}
                height={25}
                className=" top-6 left-3"
              />Logout </li>

          </ul>
        </aside>
      </div>


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
    </>
  );
}