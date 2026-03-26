"use client";

import { ReactNode, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAttachment, setOpenAttachment] = useState(null);
  interface Seller {
    email: ReactNode;
    name: ReactNode;
    id: string;
    _id: string;
    userId: {
      name: string;
      email: string;
      role: string;
    };
    createdAt: string;
    attachment?: {
      govtIdFront?: string;
      govtIdBack?: string;
      selfieWithId?: string;
    };
  }
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

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/sellers/pending-approvals",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          },
        );

        const data = await res.json();
        setSellers(data.sellers); // adjust based on your API response
      } catch (err) {
        console.error("Error fetching sellers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    router.push("/login");
  };
  const handleOpen = (attachment: string | SetStateAction<null> | undefined) => {
    setOpenAttachment(attachment);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!id) {
      console.error("Seller ID is missing!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/sellers/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setSellers(prev => prev.filter(s => s.id !== id)); // remove from UI
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
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
                route: "/admin/dashboard",
              },
              {
                label: "Sellers",
                icon: "/user_logo.png",
                route: "/admin/sellers/activeSellers",
              },
              { label: "Items", icon: "/Items.svg", route: "/admin/Items" },
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

          {/* Filter and Search Section */}

          <div className="w-full w-full inline-flex gap-6">
            <div className="w-full inline-flex gap-6 ml-5 h-20 ">
              <button
                className="mt-4 w-50 text-gray-700 bg-white hover:bg-[#F2482D] py-3 rounded-xl border border-black transition font-semibold flex    items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]"
                onClick={() => router.push("/admin/sellers/activeSellers")}
              >
                Active Sellers
              </button>

              <button
                className="mt-4 w-50 text-gray-700 bg-white hover:bg-[#F2482D] py-3 rounded-xl border border-black transition font-semibold flex    items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]"
                onClick={() => router.push("/admin/sellers/pendingApprovels")}
              >
                Pending Approval
              </button>

              <button
                className="mt-4 w-50 text-gray-700 bg-white hover:bg-[#F2482D] py-3 rounded-xl border border-black transition font-semibold flex    items-center justify-center gap-2 shadow-[3px_3px_0px_gray] hover:text-white hover:shadow-[3px_3px_0px_black]"
                onClick={() => router.push("/admin/sellers/blockedSellers")}
              >
                Blocked Sellers
              </button>
            </div>

            <div className="relative mt-4 mr-5 w-max-full ">
              {/* Search Icon */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Sellers..."
                className="w-full rounded-xl border border-gray-300 
               py-3 pl-12 pr- text-sm text-black
               focus:outline-none focus:ring-2 focus:ring-gray-300
               transition"
              />
              <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center">
                <Image
                  src="/search.png"
                  alt="Search Icon"
                  width={40}
                  height={28}
                  className=""
                />
              </div>
            </div>
          </div>

          {/* Sellers List Section */}

          <div className="w-full bg-white mt-10 rounded-xl shadow-md p-6">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-[#FFF5F2] px-5 py-3 rounded-lg text-sm font-semibold text-gray-700">
              <p>Seller Name</p>
              <p>Email</p>
              <p>Submitted</p>
              <p>Attachments</p>
              <p className="text-center">Action</p>
            </div>

            {/* Table Rows */}
            <div className="mt-3">
              {sellers.map((seller, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 px-5 py-4 text-sm text-gray-600 border-b border-gray-200 hover:bg-gray-100 items-center"
                >
                  <p>{seller.name}</p>
                  <p>{seller.email}</p>
                  <p>{new Date(seller.createdAt).toLocaleDateString()}</p>

                  <div className="flex gap-2">
                    {seller.attachment?.govtIdFront && (
                      <button
                        onClick={() =>
                          handleOpen(seller.attachment?.govtIdFront)
                        }
                        className="px-3 py-1 text-xs rounded-lg bg-[#FFF5F2] border border-gray-300 hover:bg-gray-200"
                      >
                        ID Front
                      </button>
                    )}

                    {seller.attachment?.govtIdBack && (
                      <button
                        onClick={() => handleOpen(seller.attachment?.govtIdBack)}
                        className="px-3 py-1 text-xs rounded-lg bg-[#FFF5F2] border border-gray-300 hover:bg-gray-200"
                      >
                        ID Back
                      </button>
                    )}

                    {seller.attachment?.selfieWithId && (
                      <button
                        onClick={() =>
                          handleOpen(seller.attachment?.selfieWithId)
                        }
                        className="px-3 py-1 text-xs rounded-lg bg-[#FFF5F2] border border-gray-300 hover:bg-gray-200"
                      >
                        Selfie
                      </button>
                    )}
                  </div>

                  {/* Modal */}
                  {openAttachment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
                        <button
                          onClick={() => setOpenAttachment(null)}
                          className="absolute top-2 right-2 text-gray-500"
                        >
                          ✕
                        </button>

                        {/* Display image if URL ends with image extension */}
                        {/\.(jpg|jpeg|png|gif|webp)$/i.test(openAttachment) ? (
                          <img
                            src={openAttachment}
                            alt="attachment"
                            className="max-h-96 mx-auto"
                          />
                        ) : (
                          <pre className="whitespace-pre-wrap break-all">
                            {openAttachment}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}

                  {/*Actions*/}
                  <div className="flex justify-center gap-3">
                    <button
                      className="w-9 h-9 flex items-center justify-center  rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                      title="Approve"
                      onClick={() => handleStatusChange(seller.id, "Approved")}
                    >
                      ✓
                    </button>

                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F2482D] text-white hover:bg-red-600"
                      title="Delete"
                      onClick={() => handleStatusChange(seller.id, "Rejected")}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
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