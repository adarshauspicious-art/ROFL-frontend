"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HostItem() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [desiredNetPayout, setDesiredNetPayout] = useState("");
  const [selectTimeline, setSelectTimeline] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemImages, setItemImages] = useState([]); // URLs for item images
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // for frontend preview
  const [imageUrl, setImageUrl] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const handleNext = async () => {
    if (!itemTitle || !selectCategory || !desiredNetPayout || !selectTimeline) {
      return alert("Please fill all required fields");
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/host-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemTitle,
        selectCategory,
        desiredNetPayout: Number(desiredNetPayout),
        selectTimeline,
        description,
        images: itemImages,
      }),
    });

    const data = await res.json();

    if (!data.success) return alert(data.message || "Failed to create item");

    // data.data has _id + calculations — save for page 2
    localStorage.setItem("draftItem", JSON.stringify(data.data));

    router.push("/admin/Items/hostItem/hostItem2");
  };

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
    if (!selectedFile) return;

    setFile(selectedFile);

    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleItemImageUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  setUploading(true);

  try {
    for (const file of files) {

      // show preview
      const previewUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => [...prev, previewUrl]);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "host_items_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/du4y3qam1/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setItemImages((prev) => [...prev, data.secure_url]);
      }
    }
  } catch (err) {
    console.error("Upload failed", err);
  }

  setUploading(false);
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
          <div className="bg-white rounded-xl shadow p-5 shadow text-gray-800 mt-6">
            <h2 className="text-lg font-semibold mb-4">Basic Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
              <input
                placeholder="Item Title"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="border rounded-lg p-3 border border-gray-300"
              />

              <select
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                className="border rounded-lg p-4 border border-gray-300"
              >
                <option value="">Select Category</option>
                <option>Tech & Electronics</option>
                <option>Luxury Goods</option>
                <option>Vechiles & Transportation</option>
                <option>Fashion & Apparel</option>
                <option>Home & Appliances</option>
                <option>Sports & Outdoors</option>
                <option>Collecteibles & Hobbies</option>
                <option>Beauty & Health</option>
                <option>Experiences & Services</option>
                <option>Gift Cards</option>
              </select>

              <input
                placeholder="Desired Net Payout"
                value={desiredNetPayout}
                onChange={(e) => setDesiredNetPayout(e.target.value)}
                type="number"
                className="border rounded-lg p-4 border border-gray-300"
              />

              <select
                value={selectTimeline}
                onChange={(e) => setSelectTimeline(e.target.value)}
                className="border rounded-lg p-3 border border-gray-300"
              >
                <option value="">Select Timeline</option>
                <option>7 Days</option>
                <option>15 Days</option>
                <option>21 Days</option>
                <option>30 Days</option>
              </select>
            </div>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg p-3 w-full mt-4 border border-gray-300"
              rows={4}
            />

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Item Images
              </label>

              <div className="flex items-center gap-4 flex-wrap">
                {itemImages.map((url, index) => (
                  <div key={index} className="relative w-[120px] h-[120px]">
                    <img
                      src={url}
                      alt={`Item ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setItemImages((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                <label className="w-[120px] h-[120px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-red-500 text-sm font-semibold hover:bg-gray-100 hover:text-red-600 cursor-pointer">
                  {uploading ? "Uploading..." : "+ Add More"}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleItemImageUpload}
                  />
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-col items-center gap-4">
              <form
                onSubmit={handleProfileImageUpload}
                className="flex items-center justify-between gap-4 bg-gray-200 p-3 rounded-lg w-full max-w-md"
              >
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange} // preview handler
                  className="flex-1 text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4  
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-gray-300 file:text-gray-800
                     hover:file:bg-gray-400"
                />

                <button
                  type="button"
                  onClick={handleProfileImageUpload}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                >
                  Upload
                </button>
              </form>

              {/* Image preview */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="max-w-xs max-h-60 object-contain rounded-md"
                />
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="bg-[#F2482D] shadow-[3px_3px_0px_black] hover:shadow-[3px_1px_0px_gray] text-white px-6 py-2 rounded-lg"
                onClick={handleNext}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
