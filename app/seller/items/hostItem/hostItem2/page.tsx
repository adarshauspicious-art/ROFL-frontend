"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileImage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleProfileImageUpload = async () => {
    if (!file) return alert("Please select an image");

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/user/profile-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    console.log("BACKEND RESPONSE ", data);

    setProfileImage(data.imageUrl);
    setSelectedImage(data.imageUrl);
    setFile(null);
  };
  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.profileImage?.url) {
          setSelectedImage(data.profileImage.url); // 🔥 permanent image
        }
      } catch (err) {
        console.error("Failed to fetch profile image", err);
      }
    };

    fetchProfileImage();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedImage(data.imageUrl);
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

      {/* Main Content */}
      <div
        className={`flex-1 flex  justify-center transition-all duration-500 ${
          !isMobile ? (isOpen ? "ml-[300px]" : "ml-[80px]") : "ml-0"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between bg-[#FFF5F2] px-6 py-4 rounded-xl">
            {/* Left Title */}
            <h1 className="text-3xl login-title">Host Item</h1>

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
          <div className="bg-white rounded-xl shadow p-5 shadow text-gray-800 mt-6">
            <div className="bg-white rounded-xl shadow text-gray-800 mt-6 max-w-[1070px] mx-">
              <div className="flex gap-8">
                {/* Left: Large main image + thumbnails */}
                <div>
                  <img
                    src="/iphone.png"
                    alt="Main Item"
                    className="w-[300px] h-[300px] object-cover rounded-lg border border-gray-300"
                  />
                  <div className="flex gap-3 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src="/iphone.png"
                        alt={`Thumbnail ${i + 1}`}
                        className="w-[60px] h-[60px] object-cover rounded-md border border-gray-300"
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Text info */}
                <div className="flex-1">
                  <h2 className="text-lg font-extrabold login-title mb-6">
                    iPhone 17 Pro
                  </h2>

                  <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-sm">
                    <div>
                      <p className="text-base text-gray-600">Total Spots</p>
                      <p className="font-semibold text-gray-900">50</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600">
                        Desired Net Payout
                      </p>
                      <p className="font-semibold login-title text-xl">
                        $10,000
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600">Total Pot</p>
                      <p className=" text-gray-900">$14,000</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600">Ticket Price</p>
                      <p className="font-semibold text-gray-900">$50</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600">Platform Fee</p>
                      <p className="font-semibold text-gray-900">$1,440</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600">IRS Withholding</p>
                      <p className="font-semibold text-gray-900">$2,500</p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600">Processing Fee</p>
                      <p className="font-semibold text-gray-900">$504</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-10">
                <button className="text-base underline text-gray-600 hover:text-gray-900">
                  Schedule Item
                </button>
                <button
                  className="bg-[#F2482D] hover:bg-[#d13e22] shadow-[3px_3px_0px_black] text-white px-8 py-3 rounded-lg text-lg transition"
                  onClick={() =>
                    router.push(
                      "/seller/Items/hostItem/hostItem2/itemDetailPage",
                    )
                  }
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
