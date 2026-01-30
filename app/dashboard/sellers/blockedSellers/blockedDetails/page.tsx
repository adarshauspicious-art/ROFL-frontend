"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => isMobile && setIsOpen(false);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white p-2 shadow-lg rounded-r-2xl border border-gray-300 z-50
        transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        ${
          isMobile
            ? isOpen
              ? "translate-x-0 w-[280px]"
              : "-translate-x-full w-[280px]"
            : isOpen
              ? "translate-x-0 w-[300px]"
              : "translate-x-0 w-[80px]"
        }`}
      >
        <aside className="relative text-black">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 mt-2 mr-2">
            <Image
              src="/rofl_img.png"
              alt="ROFL Logo"
              width={isOpen ? 120 : 40}
              height={40}
              className="object-contain cursor-pointer transition-all"
              onClick={toggleSidebar}
            />
            <Image
              src="/sidebar.svg"
              alt="Sidebar Toggle"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>

          {/* Menu */}
          <ul className="mt-4 space-y-2">
            {[
              {
                label: "Dashboard",
                icon: "/dashboard.png",
                route: "/dashboard",
              },
              {
                label: "Sellers",
                icon: "/user_logo.png",
                route: "/dashboard/sellers/activeSellers",
              },
              { label: "Items", icon: "/items.svg" , route: "/dashboard/Items" },
              { label: "Users", icon: "/user_logo.png" },
              { label: "Winners & Fulfillment", icon: "/winners.svg" },
              { label: "Weekly Giveaway", icon: "/gift.svg" },
              { label: "Disputes", icon: "/disputes.svg" },
              { label: "Revenue Overview", icon: "/revenue.svg" },
              { label: "Manage Banners", icon: "/banners.svg" },
            ].map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  item.route && router.push(item.route);
                  closeSidebar();
                }}
                className={`mt-2 w-full py-3 rounded-xl text-black text-lg flex items-center cursor-pointer
                hover:text-white hover:bg-[#F2482D]
                hover:shadow-[3px_3px_0px_black]
                ${isOpen ? "gap-2 px-3" : "justify-center px-0"}`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={25}
                  height={25}
                />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}
                >
                  {item.label}
                </span>
              </li>
            ))}

            <li
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}
              className={`mt-10 w-full py-3 rounded-xl text-black text-lg flex items-center cursor-pointer
              hover:text-white hover:bg-[#F2482D]
              hover:shadow-[3px_3px_0px_black]
              ${isOpen ? "gap-2 px-3" : "justify-center px-0"}`}
            >
              <Image src="/logout.png" alt="Logout" width={25} height={25} />
              <span
                className={`transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}
              >
                Logout
              </span>
            </li>
          </ul>
        </aside>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex  justify-center transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="w-full  ">
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl">
            {/* Left Title */}
            <h1 className="text-3xl login-title">Sellers</h1>

            {/* Right Section */}
            <div className="flex items-center gap-4  ">
              {/* Notification */}
              <div className="h-15 w-15 flex items-center justify-center rounded-2xl bg-white border border-gray-200 p-2">
                <Image
                  src="/bell.png"
                  alt="Notifications"
                  width={70}
                  height={70}
                />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-8 py-3">
                <Image
                  src={"/Avatar.png"}
                  alt="Profile Avatar"
                  width={40}
                  height={40}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    Arisu Anama
                  </p>
                  <p className="text-xs text-gray-500">
                    Administrator
                    <Image
                      src="/down_icon.png"
                      alt="Dropdown Arrow"
                      width={15}
                      height={15}
                      className="cursor-pointer mr-4 inline-block"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*User  Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-15 gap-6 mt-8 px-2 sm:px-6 text-black">
            <div className="lg:col-span-10 bg-white rounded-xl p-4 sm:p-6 shadow">
              <div className="flex flex-col sm:flex-row gap-6">
                <Image
                  src="/userImg.png"
                  alt="User"
                  width={250}
                  height={180}
                  className="rounded-xl object-cover w-full sm:w-[250px]"
                />
                <div className="flex-1">
                  {/* Top section */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
                    <h2 className="text-xl font-bold login-title">
                      Alexander Thompson
                    </h2>

                    <button className="px-6 py-3 text-white bg-black rounded-lg shadow-[3px_3px_0px_#000000]">
                      Seller Blocked
                    </button>
                  </div>

                  {/* Info section */}
                  <div className="mt-5 text-lg space-y-6 leading-relaxed">
                    <p>
                      <span className="block font-bold text-gray-500">
                        Reason to Block:
                      </span>
                      Too many disputes against this seller
                    </p>

                    {/* Email + Phone side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <p>
                        <span className="block font-bold text-gray-500">
                          Email Address:
                        </span>
                        thomas@redmiffl.com
                      </p>

                      <p>
                        <span className="block font-bold text-gray-500">
                          Phone Number:
                        </span>
                        +1547 458 7856
                      </p>
                    </div>

                    {/* Address full width */}
                    <p>
                      <span className="block font-bold text-gray-500">
                        Address:
                      </span>
                      1234 Grandiose Ave, Apt 7, Port Washington NY 10022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold login-title mb-4">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Live Items</p>
                  <p className="font-bold">24</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Items</p>
                  <p className="font-bold">520</p>
                </div>
                <div>
                  <p className="text-gray-500">Revenue</p>
                  <p className="font-bold">$25,482.45</p>
                </div>
                <div>
                  <p className="text-gray-500">Disputes</p>
                  <p className="font-bold">31</p>
                </div>
              </div>
              <h3 className="font-semibold login-title mb-3">
                Identity Proofs
              </h3>

              <div className="flex gap-5 text-gray-700">
                <span className="px-4 py-2 text-sm rounded-lg bg-[#FFF5F2] border border-gray-400">
                  ID Front
                </span>
                <span className="px-4 py-2 text-sm rounded-lg bg-[#FFF5F2] border border-gray-400">
                  ID Back
                </span>
                <span className="px-4 py-2 text-sm rounded-lg bg-[#FFF5F2] border border-gray-400">
                  Selfie
                </span>
              </div>
            </div>
          </div>

          {/* Active Sellers Table */}
          <div className="w-full bg-white mt-10 rounded-xl shadow-md py-6 px-6">
            <p className="login-title ">Items</p>
            {/* Table Header */}
            <div className="grid grid-cols-7 bg-[#FFF5F2] px-5 py-3 rounded-lg  font-semibold text-gray-700 mt-5">
              <p>Sr No.</p>
              <p>Item Name</p>
              <p>FMV</p>
              <p>Ticked Price</p>
              <p>Status</p>
              <p>Time Line</p>
              <p className="text-center">Action</p>
            </div>

            {/* Table Rows */}
            <div className="mt-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 px-5 py-4  text-gray-600 border-b border-gray-200 hover:bg-gray-100 items-center"
                >
                  <p>12345</p>
                  <p>Name of Item</p>
                  <p>$8,900</p>
                  <p>$50</p>
                  <p className="w-30 flex items-center justify-center py-2 rounded-3xl text-gray-800 bg-pink-300">
                    Pending
                  </p>
                  <p>7 days</p>

                  <div className="flex justify-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={() =>
                        router.push("/sellers/activeSellers/activeDetail")
                      }
                    >
                      👁
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6  text-gray-500">
              <p>Page 1 of 10</p>

              <div className="flex gap-3">
                <button className="border px-4 py-2 rounded-md">
                  Previous
                </button>
                <button className="border px-4 py-2 rounded-md font-semibold">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
