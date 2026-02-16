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

      {/* Main Content */}
      <div
        className={`flex-1 flex  justify-center transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl">
            {/* Left Title */}
            <h1 className="text-3xl login-title">Items</h1>

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

          {/* Filter and Search Section */}

          <div className="w-full inline-flex gap-6">
            <div className="inline-flex w-fit gap-6 ml-5 h-20">
              <button className="mt-4 px-6 text-gray-700 bg-white hover:bg-[#F2482D] py-2 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]">
                All Items
              </button>

              <button className="mt-4 px-6 text-gray-700 bg-white hover:bg-[#F2482D] py-2 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]">
                Live
              </button>

              <button className="mt-4 px-6 text-gray-700 bg-white hover:bg-[#F2482D] py-2 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]">
                Pending
              </button>

              <button className="mt-4 px-6 text-gray-700 bg-white hover:bg-[#F2482D] py-2 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]">
                Completed
              </button>

              <button className="mt-4 px-6 text-gray-700 bg-white hover:bg-[#F2482D] py-2 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]">
                Sold Out
              </button>

              <button className="mt-4 px-6 text-gray-700 bg-white hover:bg-[#F2482D] py-2 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]">
                Expired
              </button>
            </div>

            <div className=" mt-4 mr-1 w-max-full ">
              {/* Search Icon */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Sellers..."
                className=" rounded-xl border border-gray-300 ml-105 
               py-3 pl-12 text-lg text-black
               focus:outline-none focus:ring-2 focus:ring-gray-300
               transition"
              />
            </div>
            <button className="mt-4 mb-2 px-6 text-white bg-gray-900 hover:bg-[#F2482D]  rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]" onClick={()=>router.push('/dashboard/Items/hostItem')}>
              Host Item
            </button>
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
                    route: "/dashboard",
                  },
                  {
                    label: "Sellers",
                    icon: "/user_logo.png",
                    route: "/dashboard/sellers/activeSellers",
                  },
                  {
                    label: "Items",
                    icon: "/items.svg",
                    route: "/dashboard/Items",
                  },
                  { label: "Users", icon: "/user_logo.png",route:"/dashboard/users"  },
                  { label: "Winners & Fulfillment", icon: "/winners.svg",route:"/dashboard/winners" },
                  { label: "Weekly Giveaway", icon: "/gift.svg",route:"/dashboard/giveaway" },
                  { label: "Disputes", icon: "/disputes.svg" , route: "/dashboard/disputes"},
                  { label: "Revenue Overview", icon: "/revenue.svg" , route: "/dashboard/overview"},
                  { label: "Manage Banners", icon: "/banners.svg" , route: "/dashboard/banners" },
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
                  <Image
                    src="/logout.png"
                    alt="Logout"
                    width={25}
                    height={25}
                  />
                  <span
                    className={`transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </aside>
          </div>

          {/* Sellers List Section */}

          <div className="w-full px-6 bg-white mt-10 rounded-xl shadow-md p-6">
            {/* Table Header */}
            <div className="grid grid-cols-9 bg-[#FFF5F2] px-5 py-3 rounded-lg text-sm font-semibold text-gray-700">
              <p>Item ID</p>
              <p>Item Name</p>
              <p>Seller Name</p>
              <p>FMV</p>
              <p>Ticket Price</p>
              <p>Slots Filled</p>
              <p>Time Left</p>
              <p>Status</p>
              <p className="text-center">Action</p>
            </div>

            {/* Table Rows */}
            <div className="mt-3">
              {[
                { id: 1, status: "Pending" },
                { id: 2, status: "Live" },
                { id: 3, status: "Sold Out" },
                { id: 4, status: "Pending" },
                { id: 5, status: "Completed" },
                { id: 6, status: "Live" },
                { id: 7, status: "Expired" },
                { id: 5, status: "Sold Out" },
                { id: 6, status: "Live" },
                { id: 7, status: "Expired" },
              ].map((item, index) => {
                // Map status to Tailwind CSS classes
                const statusStyles = {
                  Pending: "bg-yellow-200 text-yellow-800",
                  Live: "bg-green-200 text-green-800",
                  "Sold Out": "bg-red-200 text-red-800",
                  Completed: "bg-[#E6F1FE] text-red-600",
                  Expired: "bg-[#F3E8FF] text-gray-800",
                };

                return (
                  <div
                    key={index}
                    className="grid grid-cols-9 px-5 py-4  text-gray-600 border-b border-gray-200 hover:bg-gray-100 items-center"
                  >
                    <p>12345</p>
                    <p>Name of Item</p>
                    <p>Kaeal Smith</p>
                    <p>$5,220</p>
                    <p>$34</p>
                    <p>12/20</p>
                    <p>6 days</p>
                    <p
                      className={`w-30 flex items-center justify-center py-2 rounded-3xl ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </p>

                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        onClick={() =>
                          router.push("activeSellers/activeDetail")
                        }
                      >
                        👁
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              action="http://localhost:5000/upload"
              method="post"
              encType="multipart/form-data"
              className="flex items-center justify-between gap-4 bg-gray-200 p-3 rounded-lg w-full max-w-md"
            >
              <input
                type="file"
                name="image"
                className="flex-1 text-sm text-gray-700
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-gray-300 file:text-gray-800
               hover:file:bg-gray-400"
              />

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                Upload
              </button>
            </form>

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
