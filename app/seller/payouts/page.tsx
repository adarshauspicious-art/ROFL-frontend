"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || !user || user.role !== "seller") {
    router.push("/login");
  }
}, []);

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
    <div className="min-h-screen bg-gray-100 flex relative overflow-x-hidden">
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}

      {/* Main Content */}
      <div
        className={`flex-1 flex  justify-center transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl">
            {/* Left Title */}
            <h1 className="text-3xl login-title">Payouts</h1>

            {/* Right Section */}
            <div className="flex items-center gap-4  ">
              {/* Notification */}
              <div className="h-15 w-15  flex items-center justify-center rounded-2xl bg-white border border-gray-200 p-2 shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
                <Image
                  src="/bell.png"
                  alt="Notifications"
                  width={70}
                  height={70}
                />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl  px-10 py-3 ">
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

          <div className="flex flex-row justify-between items-center mt-5  ">
            <p className="login-title  px-6  ">Key Stats</p>
            <select className="text-black border border-gray-400 rounded-3xl px-4 py-3 mt-2 ml-6 focus:outline-none focus:ring-2 focus:ring-gray-300 w-45  ">
              <option value="last">Last 7 Days</option>
              <option value="last">Last 30 Days</option>
              <option value="last">Last 90 Days</option>
              <option value="last">Last 1 Year</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-30 mt-10 px-6">
            <div className="w-full sm:w-86 h-32 px-6 bg-white rounded-xl shadow-md p-6">
              <h4 className="text-black font-bold text-lg">Pending Payouts</h4>
              <h6 className="text-orange-600 font-bold text-lg mt-5">$2,223</h6>
            </div>
            <div className="w-full sm:w-92 h-32 px-6 bg-white rounded-xl shadow-md p-6">
              <h4 className="text-black font-bold text-lg">
                Released Last 30 days
              </h4>
              <h6 className="text-orange-600 font-bold text-lg mt-5">
                $15,223
              </h6>
            </div>
            <div className="w-full sm:w-92 h-32 px-6 bg-white rounded-xl shadow-md p-6">
              <h4 className="text-black font-bold text-lg">Lifetime Earning</h4>
              <h6 className="text-orange-600 font-bold text-lg mt-5">
                $122,405
              </h6>
            </div>
          </div>
          <div className="flex justify-end mt-8 px-4">
            <div className="w-full max-w-xs">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Sellers..."
                className="rounded-xl border border-gray-300 py-3 px-4 text-lg text-black
                 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
              />
            </div>
          </div>

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
                    route: "/seller/dashboard",
                  },

                  {
                    label: "Items",
                    icon: "/items.svg",
                    route: "/seller/items",
                  },
                  {
                    label: "Orders & Shipping",
                    icon: "/gift.svg",
                    route: "/seller/order-shipping",
                  },
                  {
                    label: "Payouts ",
                    icon: "/revenue.svg",
                    route: "/seller/payouts",
                  },

                  {
                    label: "Disputes",
                    icon: "/disputes.svg",
                    route: "/seller/disputes",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
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
                      className={`whitespace-nowrap transition-all duration-300 ${
                        isOpen
                          ? "opacity-100 ml-2"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
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
                  <Image
                    src="/logout.png"
                    alt="Logout"
                    width={25}
                    height={25}
                  />
                  <span
                    className={`transition-all duration-300 ${
                      isOpen
                        ? "opacity-100 ml-2"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </aside>
          </div>

          {/* Sellers List Section */}

          <div className="w-full  px-6 bg-white mt-10 rounded-xl shadow-md p-6">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-[#FFF5F2] px-5 py-3 rounded-lg text-sm font-semibold text-gray-700">
              <p>Date</p>
              <p>Item</p>
              <p>Desired Net</p>
              <p>Seller Net</p>
              <p>Payout Status</p>
            </div>

            {/* Table Rows */}
            <div className="mt-3">
              {[
                { id: 1, status: "Completed" },
                { id: 2, status: "Pending" },
                { id: 3, status: "Completed" },
                { id: 4, status: "Refunded" },
                { id: 5, status: "Completed" },
                { id: 6, status: "Pending" },
                { id: 7, status: "Completed" },
                { id: 8, status: "Refunded" },
              ].map((item, index) => {
                // Map status to Tailwind CSS classes
                const statusStyles = {
                  Pending: "bg-gray-400 text-white hover:bg-[#AFAFAF]",
                  Completed: "bg-green-700 text-white hover:bg-[#4FA662]",
                  Refunded: "bg-[#4F85A6] text-white hover:bg-[#AFAFAF]",
                };

                return (
                  <div
                    key={index}
                    className="grid grid-cols-5 px-5 py-4  text-gray-600 border-b border-gray-200 hover:bg-gray-100 items-center"
                  >
                    <p>10/12/2024</p>
                    <p>Name of the Item</p>
                    <p>$14,220</p>
                    <p>$22,220</p>
                    <p
                      className={`w-30 flex items-center justify-center py-2 rounded-3xl ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
              <p>Page 1 of 10</p>
              <div className="flex gap-3">
                <button className="border px-4 py-2 border rounded-xl shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
                  Previous
                </button>
                <button className="border px-4 py-2 border rounded-xl font-semibold shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
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
