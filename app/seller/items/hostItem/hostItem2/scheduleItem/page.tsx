"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Approve() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/schdule.svg" // place image in /public
            alt="Password Updated"
            width={120}
            height={120}
          />
        </div>

        {/* Title */}
        <h2 className="login-title text-center text-sm">Schedule Item</h2>
        <p className="text-gray-600">
          Select desired date & time to schedule this item.
        </p>

        <div className="mt-15 text-left text-gray-600">
          <p className="text-semibold ">Select Time </p>
          <input
            type="datetime-local"
            className="mt-2 w-full px-4 py-3 text-black rounded-xl border-2 border-black  focus:outline-none  font-medium"
          />
        </div>
        {/* Button */}
        <div className="flex gap-4">
          <button className="mt-4 px-6 text-black bg-white hover:bg-gray-100 py-3 rounded-xl border border-black transition font-bold flex items-center justify-center shadow-[3px_3px_0px_black]"
          onClick={()=>{
            router.push("/seller/items/hostItem/hostItem2")
          }}>
            Cancel
          </button>

          <button
            className="mt-4 flex-1 text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
            onClick={() => {
              router.push("/seller/items/hostItem/hostItem2/itemLive");
            }}
          >
            Schedule
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
