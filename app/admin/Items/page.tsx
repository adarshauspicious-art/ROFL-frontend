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
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, []);

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
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg rounded-r-2xl border border-gray-300 z-50
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
                route: "/admin/dashboard",
              },
              {
                label: "Sellers",
                icon: "/user_logo.png",
                route: "/admin/sellers/activeSellers",
              },
              {
                label: "Items",
                icon: "/Items.svg",
                route: "/admin/Items",
              },
              { label: "Users", icon: "/user_logo.png", route: "/admin/users" },
              {
                label: "Winners & Fulfillment",
                icon: "/winners.svg",
                route: "/admin/winners",
              },
              {
                label: "Weekly Giveaway",
                icon: "/gift.svg",
                route: "/admin/giveaway",
              },
              {
                label: "Disputes",
                icon: "/disputes.svg",
                route: "/admin/disputes",
              },
              {
                label: "Revenue Overview",
                icon: "/revenue.svg",
                route: "/admin/overview",
              },
              {
                label: "Manage Banners",
                icon: "/banners.svg",
                route: "/admin/banners",
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
        className={`flex-1 transition-all duration-500 ${
          isMobile
            ? "ml-0" // no margin on mobile, sidebar overlays
            : isOpen
              ? "ml-[300px]" // margin equal to sidebar open width
              : "ml-[80px]" // margin equal to sidebar closed width
        }`}
      >
        <div className="{`w-full px-4 md:px-8 ${isMobile ? '' : 'pl-[300px]'}`}">
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl mb-6">
            {/* Left Title */}
            <h1 className="text-3xl login-title ">Items</h1>

            {/* Right Section */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Notification */}
              <div className="h-15 w-15 flex items-center justify-center rounded-2xl bg-white border border-gray-200 p-2 shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
                <Image
                  src="/bell.png"
                  alt="Notifications"
                  width={70}
                  height={70}
                />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-10 py-3 whitespace-nowrap">
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

          {/* Filter + Search + Host Item in single responsive row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              {[
                "All Items",
                "Live",
                "Pending",
                "Completed",
                "Sold Out",
                "Expired",
              ].map((label, idx) => {
                const isActive = label === "All Items"; // example active state
                return (
                  <button
                    key={idx}
                    className={` px-6 py-3 rounded-xl font-semibold  transition
                    ${
                      isActive
                        ? "bg-[#F2482D] text-white border border-black shadow-[3px_3px_0px_gray]"
                        : "bg-white text-gray-700 border border-black"
                    }
                    hover:bg-[#F2482D] hover:text-white hover:shadow-[3px_3px_0px_black]
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Search Input */}
            <div className="relative min-w-[200px] max-w-sm flex-shrink-0">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Sellers..."
                className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition bg-white"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
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
              className=" py-3 px-5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-[#F2482D] transition shadow-[3px_3px_0px_gray] hover:shadow-[3px_3px_0px_black]"
              onClick={() => router.push("/admin/Items/hostItem")}
            >
              Host Item
            </button>
          </div>

          {/* Table container with horizontal scroll on small screens */}
          <div className="overflow-auto rounded-xl shadow-md bg-white p-6">
            {/* Table Header */}
            <div className="grid grid-cols-9 bg-[#FFF5F2] px-5 py-3 rounded-t-lg text-sm font-semibold text-gray-700 whitespace-nowrap">
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
                    className="grid grid-cols-9 px-5 py-4 text-gray-600 border-b border-gray-200 hover:bg-gray-100 items-center whitespace-nowrap"
                  >
                    <p>12345</p>
                    <p>Name of Item</p>
                    <p>Kaeal Smith</p>
                    <p>$5,220</p>
                    <p>$34</p>
                    <p>12/20</p>
                    <p>6 days</p>
                    <p
                      className={`w-30 flex items-center justify-center py-2 rounded-3xl ${
                        statusStyles[item.status]
                      }`}
                    >
                      {item.status}
                    </p>

                    <div className="flex justify-center">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        onClick={() =>
                          router.push(
                            "/admin/sellers/activeSellers/activeDetail",
                          )
                        }
                      >
                        👁
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upload form */}
            <form
              action="http://localhost:5000/upload"
              method="post"
              encType="multipart/form-data"
              className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-200 p-3 rounded-lg w-full max-w-md mt-6"
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
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition w-full sm:w-auto"
              >
                Upload
              </button>
            </form>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500 gap-4 sm:gap-0">
              <p>Page 1 of 10</p>
              <div className="flex gap-3">
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
