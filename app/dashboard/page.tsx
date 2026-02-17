"use client";
import { FiUsers, FiShoppingBag, FiClock, FiAward } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  // Dummy Chart Data
  const chartData = [
    { name: "Jan", value: 45 },
    { name: "Feb", value: 150 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 220 },
    { name: "May", value: 250 },
    { name: "Jun", value: 440 },
    { name: "Jul", value: 450 },
    { name: "Aug", value: 570 },
    { name: "Sep", value: 600 },
    { name: "Oct", value: 510 },
    { name: "Nov", value: 490 },
    { name: "Dec", value: 830 },
  ];

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
              { label: "Items", icon: "/items.svg", route: "/dashboard/Items" },
              {
                label: "Users",
                icon: "/user_logo.png",
                route: "/dashboard/users",
              },
              {
                label: "Winners & Fulfillment",
                icon: "/winners.svg",
                route: "/dashboard/winners",
              },
              {
                label: "Weekly Giveaway",
                icon: "/gift.svg",
                route: "/dashboard/giveaway",
              },
              {
                label: "Disputes",
                icon: "/disputes.svg",
                route: "/dashboard/disputes",
              },
              {
                label: "Revenue Overview",
                icon: "/revenue.svg",
                route: "/dashboard/overview",
              },
              {
                label: "Manage Banners",
                icon: "/banners.svg",
                route: "/dashboard/banners",
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
        className={`flex-1 p-6 transition-margin duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        ${isMobile ? "mt-0" : isOpen ? "ml-[300px]" : "ml-[80px]"}`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between bg-[#FFF5F2] px-4 py-4 rounded-xl">
            {/* Left Title */}
            <h1 className="text-3xl login-title">Overview</h1>

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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Total Sellers",
                value: "124",
                subtitle: "Total verified sellers on the platform.",
                icon: <FiUsers />,
              },
              {
                title: "Live Items",
                value: "38",
                subtitle: "Items currently active and selling tickets.",
                icon: <FiShoppingBag />,
              },
              {
                title: "Pending Approval",
                value: "50",
                subtitle: "Sellers waiting for identity verification.",
                icon: <FiClock />,
              },
              {
                title: "Winners This Month",
                value: "48",
                subtitle: "Number of users who won this month.",
                icon: <FiAward />,
              },
            ].map((card, i) => (
              <div key={i} className="relative bg-white p-5 rounded-xl border">
                {/* Blue Icon Box */}
                <div className="absolute top-4 right-4 bg-[#497BC6] p-2 rounded-lg">
                  <div className="text-white text-lg">{card.icon}</div>
                </div>

                <p className="text-black text-xl text-bold">{card.title}</p>
                <h2 className="text-2xl mt-6 font-bold text-[#F2482D]">
                  {card.value}
                </h2>
                <p className="text-sm mt-3 text-gray-500">{card.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Table + Winners */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold text-[#F2482D] text-lg mb-4 login-title">
                Active Items
              </h2>

              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-lg ">
                  <thead className="text-black">
                    <tr className="">
                      <th className="text-left py-2">Sr No.</th>
                      <th className="text-left py-2">Items</th>
                      <th className="text-left py-2">Start Date</th>
                      <th className="text-left py-2">Time Left</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                      <tr
                        key={i}
                        className="border-t text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <td className="py-3">{i + 1}</td>
                        <td>Name of Item</td>
                        <td>Jan 24, 2025</td>
                        <td>7 days</td>
                        <td className="flex justify-center gap-3 py-3">
                          <button
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#497BC6] text-white hover:bg-blue-600"
                            title="View"
                          >
                            <Image
                              src="/eyeC.png"
                              alt="View"
                              width={21}
                              height={21}
                            />
                          </button>

                          <button
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#4FA662] text-white hover:bg-green-600"
                            title="Delete"
                          >
                            <Image
                              src="/icon.png"
                              alt="Delete"
                              width={21}
                              height={21}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold text-[#F2482D] text-lg mb-4 login-title">
                Recent Winners
              </h2>

              <div className="max-h-96 overflow-y-auto bg-gray-50 ">
                <ul className="text-black text-lg grid gap-y-3">
                  {[
                    "Alex Thompson",
                    "Jordan Mitchell",
                    "Taylor Johnson",
                    "Jordan Smith",
                    "Alexandra Brown",
                    "Chris Williams",
                    "Morgas Devis",
                    "Chris Bottom",
                    "Roman Reings",
                    "Brock Lesnar",
                  ].map((name, i) => {
                    const getOrdinal = (n) => {
                      const s = ["th", "st", "nd", "rd"],
                        v = n % 100;
                      return n + (s[(v - 20) % 10] || s[v] || s[0]);
                    };

                    return (
                      <li
                        key={i}
                        className="grid grid-cols-[50px_1fr_50px] items-center gap-3 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                      >
                        {/* Column 1: Number */}
                        <span className="font-lg  ">{getOrdinal(i + 1)}</span>

                        {/* Column 2: Name */}
                        <span>{name}</span>

                        {/* Column 3: Action */}
                        <button
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#497BC6] text-white hover:bg-blue-600"
                          title="Approve"
                        >
                          <Image
                            src="/eyeC.png"
                            alt="View"
                            width={21}
                            height={21}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
              <h2 className="font-bold text-gray-300 text-lg mb-4 login-title">
                Items Sold
              </h2>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F2482D"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded-xl shadow ">
              <h2 className="font-bold text-lg text-[#F2482D] login-title  ">
                Last 5 Gift Winners
              </h2>

              <ul className="space-y-2  text-gray-700 mt-5  ">
                <li className="flex justify-between hover:bg-gray-100 transition-colors ">
                  <span className="text-black text-sm mt-5">Jordan Smith</span>
                  <span>Jan 24,2025</span>
                </li>
                <li className="flex justify-between hover:bg-gray-100 transition-colors">
                  <span className="text-black text-sm mt-5">
                    Chris Williams
                  </span>
                  <span>Mar 5,2025</span>
                </li>
                <li className="flex justify-between hover:bg-gray-100 transition-colors">
                  <span className="text-black text-sm mt-5">Zane Floyd</span>
                  <span>Jan 24,2025</span>
                </li>
                <li className="flex justify-between hover:bg-gray-100 transition-colors">
                  <span className="text-black text-sm mt-5">Zane Floyd</span>
                  <span>Jan 24,2025</span>
                </li>
                <li className="flex justify-between hover:bg-gray-100 transition-colors">
                  <span className="text-black text-sm mt-5">Zane Floyd</span>
                  <span>Jan 24,2025</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
