"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileImage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [preview, setPreview] = useState(null);
  const [item, setItem] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const images = [];
  const calc = item?.calculations || {};
  //  AUTH CHECK
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

  //  Detect mobile screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  //  LOAD ITEM FROM LOCALSTORAGE
  useEffect(() => {
    const draft = localStorage.getItem("draftItem");

    if (draft) {
      const parsed = JSON.parse(draft);
      setItem(parsed);

      if (parsed.images && parsed.images.length > 0) {
        setActiveImage(parsed.images[0]);
      }
    }
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

  const thumbnails = item?.images && item.images.length > 0 ? item.images : [];
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
            <h1 className="text-3xl login-title">Item</h1>

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
                    route: "/admin/dashboard",
                  },
                  {
                    label: "Sellers",
                    icon: "/user_logo.png",
                    route: "/admin/sellers/activeSellers",
                  },
                  {
                    label: "Items",
                    icon: "/items.svg",
                    route: "/admin/Items",
                  },
                  {
                    label: "Users",
                    icon: "/user_logo.png",
                    route: "/admin/users",
                  },
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

          {/* ================= FORM ================= */}
          <div className="w-full bg-white p-6 rounded-xl shadow-md max-w-9xl mx-auto flex gap-8">
            {/* Left side: Main image and thumbnails */}
            <div>
              <img
                src={activeImage}
                alt="Main Item"
                className="w-[300px] h-[300px] object-cover rounded-lg border border-gray-300"
              />
              <div className="flex gap-3 mt-3">
                {thumbnails.slice(0, 5).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => setActiveImage(img)}
                    className={`w-[60px] h-[60px] object-cover rounded-md border cursor-pointer transition-all
                          ${activeImage === img ? "border-[#F2482D]" : "border-gray-300 hover:border-[#F2482D]"}`}
                  />
                ))}
              </div>
            </div>

            {/* Right side: Item details */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between  mb-4">
                <h2 className="text-2xl font-bold text-[#F2482D] login-title">
                  {item?.itemTitle || "—"}
                </h2>
                <p className="w-20 py-2 flex justify-center border rounded-lg border-black text-black bg-[#E5F9EE] shadow-[3px_3px_0px_black] hover:text-black hover:shadow-[3px_3px_0px_gray]">
                  Live
                </p>
              </div>
              <div className="bg-[#FEEDE7] rounded-xl px-6 py-4 mb-6 grid grid-cols-4 text-gray-600 text-lg font-medium">
                <div>
                  <p className="mt-1 font-bold text-black">
                    Desired Net Payout
                  </p>
                  <p className="text-[#F2482D] text-xl font-extrabold drop-shadow-md">
                    ${calc.desiredNetPayout?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
  <p className="mt-1 font-bold text-black">Created</p>
  <p>
    {item?.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—"}
  </p>
</div>

<div>
  <p className="mt-1 font-bold text-black">Ends</p>
  <p>
    {item?.endDate
      ? new Date(item.endDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—"}
  </p>
</div>


                <div>
                  <p className="mt-1 font-bold text-black">Listed By</p>
                  <p className="mt-1 text-bold">Seller</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-10 text-gray-700 text-lg mb-4">
                <div>
                  <p className="text-gray-400 mt-1">Ticket Price</p>
                  <p className="font-semibold">
                    ${calc.ticketPrice?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mt-1">Total Tickets</p>
                  <p className="font-semibold">
                    {calc.totalTickets?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mt-1">Tickets Sold</p>
                  <p className="font-semibold">
                    {calc.ticketsSold?.toLocaleString() ?? "—"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-10 text-gray-700 text-lg mb-4">
                <div>
                  <p className="text-gray-400 mt-1">Total Pot</p>
                  <p className="font-semibold">
                    ${calc.totalPot?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mt-1">IRS Withholding</p>
                  <p className="font-semibold">
                    ${calc.irsWithholding?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mt-1">Platform Fee</p>
                  <p className="font-semibold">
                    ${calc.platformFee?.toLocaleString() ?? "—"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-x-10 text-gray-700 text-lg">
                <div>
                  <p className="text-gray-400 mt-1">Processing Fee</p>
                  <p className="font-semibold">
                    ${calc.processingFee?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mt-1">Seller Receives</p>
                  <p className="font-semibold">
                    ${calc.sellerReceives?.toLocaleString() ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mt-1">Proof With Prize</p>
                  <p className="bg-gray-200 rounded-md px-2 py-1 text-xs inline-block">
                    image.jpg
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="grid grid-cols-2 gap-6 mt-5 max-w-9xl mx-auto">
            {/* User info */}
            <div className="bg-white rounded-xl shadow p-6 text-gray-900">
              <h3 className="text-2xl font-bold text-[#F2482D] mb-4"></h3>
              <div className="flex gap-6">
                <img
                  src="/userImg.png"
                  alt="preview"
                  width={150}
                  height={150}
                  className="w-28 h-28 rounded-lg object-cover"
                />
                <div className="text-lg space-y-4">
                  <div className="login-title">
                    <p>Alexander Thompson</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-500 mb-1">Email Address</p>
                    <p className="text-black">Thomalex@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-500 mb-1">Phone Number</p>
                    <p className="text-black">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-500 mb-1">Address</p>
                    <p className="text-black">123 Main Street, Anytown, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Winner Card */}
            <div className="bg-[#F2482D] rounded-2xl overflow-hidden shadow-lg w-full max-w-3xl flex flex-col min-h-[220px]">
              {/* Banner Image - top half */}
              <div className="relative w-full h-44">
                <Image
                  src="/winner.png"
                  alt="Winner Banner"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Winner Name Row - dark pill overlapping the image */}
              <div className="relative px-3 -mt-8 z-10">
                <div className="flex items-center justify-between bg-[#1a1a1a] rounded-2xl px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white">
                      <Image
                        src="/avatar.png"
                        alt="Winner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white font-bold text-lg text-center     ">
                      No Winner Yet
                    </span>
                  </div>
                  <button className="bg-[#3a3a3a] text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-[#4a4a4a] transition-colors">
                    View Details
                  </button>
                </div>
              </div>

              {/* Tracking & Phone Info - pinned to bottom */}
              <div className="flex justify-between px-5 pt-4 pb-5 text-white mt-auto">
                <div>
                  <p className="text-lg opacity-70 mb-0.5">Tracking Id</p>
                  <p className="text-2xl font-semibold">
                    thomalex@radiffmail.com
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg opacity-70 mb-0.5">Phone Number</p>
                  <p className="text-2xl font-semibold">+1 547 458 7856</p>
                </div>
              </div>
            </div>
          </section>

          {/* Disputes */}
          <div className="grid grid-cols-2 gap-6 mt-5">
            {/* Disputes */}
            <div className="bg-white rounded-xl shadow p-6 text-gray-900">
              <h3 className="text-2xl font-bold text-[#F2482D] mb-4">
                Disputes
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/avatar.png"
                      alt="User 1"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span>Alexander Thompson</span>
                  </div>
                  <button className="bg-gray-700 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-900">
                    Manage Dispute
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/avatar.png"
                      alt="User 2"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span>Sarah Johnson</span>
                  </div>
                  <button className="bg-gray-700 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-900">
                    Manage Dispute
                  </button>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/avatar.png"
                      alt="User 3"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <span>Michael Davis</span>
                  </div>
                  <button className="bg-gray-700 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-900">
                    Manage Dispute
                  </button>
                </li>
              </ul>
            </div>

            {/* Payouts */}
            <div className="bg-white rounded-xl shadow p-6 text-gray-900">
              <h3 className="text-2xl font-bold text-[#F2482D] mb-4">
                Payouts
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border border-gray-200 rounded-xl px-5 py-4 bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">20% Payment</p>
                    <p className="text-gray-500 text-sm mt-0.5">Paid $2,000</p>
                  </div>
                  <button
                    disabled
                    className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-lg border border-red-200 cursor-not-allowed text-sm font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Paid Already
                  </button>
                </div>
                <div className="flex justify-between items-center border border-gray-200 rounded-xl px-5 py-4 bg-white">
                  <div>
                    <p className="font-semibold text-gray-900">80% Payment</p>
                    <p className="text-gray-500 text-sm mt-0.5">
                      To Pay $8,000
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-1.5 rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Release Funds
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
