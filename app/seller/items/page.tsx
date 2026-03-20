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
        <aside className="relative text-black flex flex-col h-full">
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
          <ul className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {[
              { label: "Dashboard", icon: "/dashboard.png", route: "/seller/dashboard" },
              { label: "Items", icon: "/items.svg", route: "/seller/items" },
              { label: "Orders & Shipping", icon: "/gift.svg", route: "/seller/order-shipping" },
              { label: "Payouts", icon: "/revenue.svg", route: "/seller/payouts" },
              { label: "Disputes", icon: "/disputes.svg", route: "/seller/disputes" },
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
                <Image src={item.icon} alt={item.label} width={25} height={25} />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"
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
              <Image src="/logout.png" alt="Logout" width={25} height={25} />
              <span
                className={`transition-all duration-300 ${
                  isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                Logout
              </span>
            </li>
          </ul>
        </aside>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="w-full overflow-x-auto p-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl mb-4 flex-wrap gap-4">
            <h1 className="text-3xl login-title">Items</h1>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Notification */}
              <div className="h-15 w-15 flex items-center justify-center rounded-2xl bg-white border border-gray-200 p-2 shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
                <Image src="/bell.png" alt="Notifications" width={70} height={70} />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-10 py-3 flex-wrap">
                <Image src={"/Avatar.png"} alt="Profile Avatar" width={40} height={40} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Arisu Anama</p>
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

          {/* Search + Host Item (Moved below Top Bar) */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
  {/* Filter Buttons */}
  {["All Items", "Live", "Pending", "Completed", "Sold Out", "Expired"].map(
    (label, idx) => {
      const isActive = label === "All Items"; // example active state
      return (
        <button
          key={idx}
          className={`mt-4 px-4 py-3 rounded-xl text-black font-semibold transition
            ${
              isActive
                ? "bg-[#F2482D] text-white border border-black shadow-[3px_3px_0px_gray]"
                : "bg-white text-gray-500 border border-gray-300"
            }
            hover:bg-[#F2482D] hover:text-white hover:shadow-[3px_3px_0px_black]
          `}
        >
          {label}
        </button>
      );
    }
  )}

  {/* Spacer to create gap after filters before search */}
  <div className="flex-grow"></div>

  {/* Search Input */}
  <div className="relative min-w-[200px] max-w-sm">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search Sellers..."
      className="w-full py-3 pl-10 pr-4 rounded-xl border border-gray-300  text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition bg-white text-gray-500 border border-gray-300"
    />
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>

  {/* Host Item Button */}
  <button
    className=" px-6 py-3 bg-black text-white rounded-xl  font-semibold hover:bg-[#F2482D] transition shadow-[3px_3px_0px_gray] hover:shadow-[3px_3px_0px_black]"
    onClick={() => router.push("/seller/items/hostItem")}
  >
    Host Item
  </button>
</div>


          {/* Sellers List Section */}
          <div className="w-full bg-white mt-4 rounded-xl shadow-md p-6 overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-9 bg-[#FFF5F2] px-5 py-3 rounded-lg   bold text-gray-700 min-w-[900px]">
              <p>Item ID</p>
              <p>Item Name</p>
              <p>FMV</p>
              <p>Slots Filled</p>
              <p>Time Left</p>
              <p>Tracking ID / Link</p>
              <p>Status</p>
              <p className="text-center">Action</p>
            </div>

            {/* Table Rows */}
            <div className="mt-3 min-w-[900px]">
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-9 px-5 py-4 text-gray-600 border-b border-gray-200 hover:bg-gray-100 items-center"
                >
                  <p>12345</p>
                  <p>Name of Item</p>
                  <p>$8,900</p>
                  <p>34/100</p>
                  <p>6 days</p>
                  <p>
                    <img src="/link.png" alt="Tracking Link" className="w-18 h-11" />
                  </p>
                  <p className="w-30 flex items-center justify-center py-2 rounded-3xl bg-yellow-200 text-yellow-800">
                    Pending
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md">👁</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
              <p>Page 1 of 10</p>
              <div className="flex gap-3 flex-wrap">
                <button className="border px-4 py-2 rounded-xl shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
                  Previous
                </button>
                <button className="border px-4 py-2 rounded-xl font-semibold shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
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
