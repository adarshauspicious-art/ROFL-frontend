"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HostItem2() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Item state from localStorage
  const [item, setItem] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Auth check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.role !== "admin") router.push("/login");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // ✅ Load draft item saved from page 1
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

  // ✅ calculations shorthand
  const calc = item?.calculations || {};

  // ✅ Thumbnails: use real images or fallback
  const thumbnails = item?.images && item.images.length > 0 ? item.images : [];

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Save current item in localStorage as draft
      if (item) {
        localStorage.setItem("draftItem", JSON.stringify(item));
      }
    };

    router.events?.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [item, router]);

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
                route: "/admin/dashboard",
              },
              {
                label: "Sellers",
                icon: "/user_logo.png",
                route: "/admin/sellers/activeSellers",
              },
              { label: "Items", icon: "/items.svg", route: "/admin/Items" },
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
            ].map((navItem, i) => (
              <li
                key={i}
                onClick={() => {
                  navItem.route && router.push(navItem.route);
                  closeSidebar();
                }}
                className={`mt-2 w-full py-3 rounded-xl text-black text-lg flex items-center cursor-pointer
                  hover:text-white hover:bg-[#F2482D] hover:shadow-[3px_3px_0px_black]
                  ${isOpen ? "gap-2 px-3" : "justify-center px-0"}`}
              >
                <Image
                  src={navItem.icon}
                  alt={navItem.label}
                  width={25}
                  height={25}
                />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"}`}
                >
                  {navItem.label}
                </span>
              </li>
            ))}

            <li
              onClick={() => {
                handleLogout();
                closeSidebar();
              }}
              className={`mt-10 w-full py-3 rounded-xl text-black text-lg flex items-center cursor-pointer
                hover:text-white hover:bg-[#F2482D] hover:shadow-[3px_3px_0px_black]
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
        className={`flex-1 flex justify-center transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="w-full">
          {/* Topbar */}
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl">
            <h1 className="text-3xl login-title">Host Item</h1>
            <div className="flex items-center gap-4">
              <div className="h-15 w-15 flex items-center justify-center rounded-2xl bg-white border border-gray-200 p-2 shadow-[3px_3px_0px_gray] hover:text-gray-800 hover:shadow-[3px_3px_0px_black]">
                <Image
                  src="/bell.png"
                  alt="Notifications"
                  width={70}
                  height={70}
                />
              </div>
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-10 py-3">
                <Image
                  src="/Avatar.png"
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

          {/* ================= ITEM PREVIEW ================= */}
          <div className="bg-white rounded-xl shadow p-5 text-gray-800 mt-6">
            <div className="bg-white rounded-xl shadow text-gray-800 mt-6 max-w-[1070px]">
              <div className="flex gap-8">
                {/* Left: Large main image + thumbnails */}
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

                {/* Right: Text info */}
                <div className="flex-1">
                  {/* ✅ Item Title */}
                  <h2 className="text-lg font-extrabold login-title mb-6">
                    {item?.itemTitle || "—"}
                  </h2>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-sm">

                    {/* ✅ Total Spots */}
                    <div>
                      <p className="text-base text-gray-600">Total Spots</p>
                      <p className="font-semibold text-gray-900">
                        {calc.totalSpots ?? "—"}
                      </p>
                    </div>

                    {/*  Desired Net Payout */}
                    <div>
                      <p className="text-base text-gray-600">Desired Net Payout</p>
                      <p className="font-semibold login-title text-xl">
                        ${calc.desiredNetPayout?.toLocaleString() ?? "—"}
                      </p>
                    </div>

                    {/*  Total Pot */}
                    <div>
                      <p className="text-base text-gray-600">Total Pot</p>
                      <p className="text-gray-900">
                        ${calc.totalPot?.toLocaleString() ?? "—"}
                      </p>
                    </div>

                    {/*  Ticket Price */}
                    <div>
                      <p className="text-base text-gray-600">Ticket Price</p>
                      <p className="font-semibold text-gray-900">
                        ${calc.ticketPrice?.toLocaleString() ?? "—"}
                      </p>
                    </div>

                    {/*  Platform Fee */}
                    <div>
                      <p className="text-base text-gray-600">Platform Fee</p>
                      <p className="font-semibold text-gray-900">
                        ${calc.platformFee?.toLocaleString() ?? "—"}
                      </p>
                    </div>

                    {/*  IRS Withholding */}
                    <div>
                      <p className="text-base text-gray-600">IRS Withholding</p>
                      <p className="font-semibold text-gray-900">
                        ${calc.irsWithholding?.toLocaleString() ?? "—"}
                      </p>
                    </div>

                    {/*  Processing Fee */}
                    <div>
                      <p className="text-base text-gray-600">Processing Fee</p>
                      <p className="font-semibold text-gray-900">
                        ${calc.processingFee?.toLocaleString() ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-10">
                <button className="text-base underline text-gray-600 hover:text-gray-900">
                  Schedule Item
                </button>
                <button
                  className="bg-[#F2482D] hover:bg-[#d13e22] shadow-[3px_3px_0px_black] text-white px-8 py-3 rounded-lg text-lg transition"
                  onClick={() => {
                    router.push(
                      "/admin/Items/hostItem/hostItem2/itemDetailPage",
                    );
                  }}
                >
                  Publish →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
