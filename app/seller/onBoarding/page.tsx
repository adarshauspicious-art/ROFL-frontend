"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnBoarding() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleNext = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        router.push("/login");
        return;
      }

      console.log("Submitting data:", formData);

      // Make API call
      const res = await fetch("http://localhost:5000/api/seller/onBoarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response from server:", data);

      if (res.ok) {
        // Redirect to next page on success
        router.push("/seller/onBoarding/Sucess");
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    govtIdFront: "",
    govtIdBack: "",
    selfieWithId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
            <h1 className="text-3xl login-title">Account</h1>

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
          <h2 className="p-3 text-lg font-semibold mb-3 text-black ">
            Basic Details
          </h2>
          <div className="bg-white rounded-xl shadow p-5 shadow text-gray-800 ">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="px-2 py-2">
                <p className="text-gray-600">First Name</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
              <div className="px-2 py-2">
                <p className="text-gray-600">Last Name</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
            </div>
            {/* 2nd Row */}
            <div className="mt-3">
              <div className="px-2 py-2">
                <p className="text-gray-600">Business Name</p>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
            </div>
            {/* 3rd Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="px-2 py-2">
                <p className="text-gray-600">Email</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
              <div className="px-2 py-2">
                <p className="text-gray-600">Phone Number</p>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
            </div>
            {/* 4th Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="px-2 py-2">
                <p className="text-gray-600">Address</p>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
              <div className="px-2 py-2">
                <p className="text-gray-600">State</p>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
              <div className="px-2 py-2">
                <p className="text-gray-600">City</p>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
              <div className="px-2 py-2">
                <p className="text-gray-600">Zip Code</p>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
            </div>
          </div>

          {/* Verification Proof  */}

          {/*First rom */}
          <h2 className="p-3 text-lg font-semibold mb-3 mt-10 text-black  ">
            Verification Proof
          </h2>
          <div className="p-3 bg-white rounded-xl shadow p-5 shadow text-gray-800 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="px-2 py-2">
                <p className="text-gray-600">Govt ID ( Front )</p>
                <input
                  type="text"
                  name="govtIdFront"
                  value={formData.govtIdFront}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
              <div className="px-2 py-2">
                <p className="text-gray-600">Govt ID ( Back )</p>
                <input
                  type="text"
                  name="govtIdBack"
                  value={formData.govtIdBack}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
            </div>

            {/*2nd rom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3  ">
              <div className="px-2 py-2">
                <p className="text-gray-600">Selfie holding ID</p>
                <input
                  type="text"
                  name="selfieWithId"
                  value={formData.selfieWithId}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg pl-2 py-4 w-3/3 focus:outline-none focus:ring-2 focus:ring-[#F2482D] focus:border-transparent ml-2"
                />
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-10 mr-2 mb-20  mr-10">
            <button
              type="button"
              className="bg-[#F2482D] shadow-[3px_3px_0px_black] hover:shadow-[3px_1px_0px_gray] text-white px-6 py-2 rounded-lg"
              onClick={handleNext}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
