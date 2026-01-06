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

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => isMobile && setIsOpen(false);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", { method: "POST", credentials: "include" });
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
        ${isMobile
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
              { label: "Dashboard", icon: "/dashboard.png", route: "/dashboard" },
              { label: "Sellers", icon: "/user_logo.png", route: "/dashboard/sellers" },
              { label: "Items", icon: "/items.svg" },
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
                <Image src={item.icon} alt={item.label} width={25} height={25} />
                <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}>
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
              <span className={`transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}>
                Logout
              </span>
            </li>
          </ul>

        </aside>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex  justify-center transition-all duration-500 ${!isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
          }`}
      >
        <div className="w-full  ">
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl">
            {/* Left Title */}
            <h1 className="text-3xl login-title">
              Sellers
            </h1>

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
 
        {/* Filter and Search Section */}

          <div className="w-full w-full inline-flex   gap-6">
            <div className="w-full inline-flex   gap-6">
            <button className="mt-4 w-50 text-gray-700 bg-white hover:bg-[#F2482D] py-3 rounded-xl border border-black transition font-semibold flex    items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]"
              onClick={() => { console.log("button clicked") }}>
              Active Sellers
            </button>

            <button className="mt-4 w-50 text-gray-700 bg-white hover:bg-[#F2482D] py-3 rounded-xl border border-black transition font-semibold flex    items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]"
              onClick={() => { console.log("button clicked") }}>
              Pending Approval
            </button>

            <button className="mt-4 w-50 text-gray-700 bg-white hover:bg-[#F2482D] py-3 rounded-xl border border-black transition font-semibold flex    items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]"
              onClick={() => { console.log("button clicked") }}>
              Blocked Sellers
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-4 w-50 px-5 border rounded-xl   border-gray-400 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <Image
              src="/search.png"
              alt="Search Icon"
              width={50}
              height={50}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}
