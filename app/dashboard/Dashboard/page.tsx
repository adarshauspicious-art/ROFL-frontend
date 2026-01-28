"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
              { label: "Dashboard", icon: "/dashboard.png", route: "/dashboard/Dashboard" },
              { label: "Sellers", icon: "/user_logo.png", route: "/dashboard/activeSellers" },
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
        className={`flex-1 flex items-center justify-center transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="bg-white p-20 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h1 className="text-xl font-bold mb-4 login-title">Welcome to Dashboard 🎉</h1>
          <p className=" text-gray-600">You are successfully logged in.</p>
        </div>
      </div>
    </div>
  );
}
