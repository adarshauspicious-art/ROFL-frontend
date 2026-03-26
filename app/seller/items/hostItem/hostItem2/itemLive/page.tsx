"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Approve() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-full">
      <div className="bg-white rounded-3xl shadow-lg max-w-4xl w-full p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/live.svg" // place image in /public
            alt="Password Updated"
            width={120}
            height={120}
          />
        </div>

        {/* Title */}
        <h2 className="login-title text-center text-sm">
          Your item is now Live!
        </h2>
        <p className="mt-5 text-gray-600">
          Share it with your friends and followers to sell out faster.
        </p>

        {/* logos */}
        <div className="mt-5 flex justify-center gap-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/adarahmanunadda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 bg-[#F2482D] rounded-full flex items-center justify-center cursor-pointer">
              <Image
                src="/fLogo.svg"
                alt="Logo Facebook"
                width={30}
                height={30}
              />
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/adarshnadda45"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 bg-[#F2482D] rounded-full flex items-center justify-center cursor-pointer">
              <Image
                src="/iLogo.svg"
                alt="Logo Instagram"
                width={30}
                height={30}
              />
            </div>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/adarshnadda45"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 bg-[#F2482D] rounded-full flex items-center justify-center cursor-pointer">
              <Image
                src="/xLogo.svg"
                alt="Logo Twitter"
                width={30}
                height={30}
              />
            </div>
          </a>

          {/* Pinterest */}
          <a
            href="https://www.pinterest.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-12 h-12 bg-[#F2482D] rounded-full flex items-center justify-center cursor-pointer">
              <Image
                src="/pLogo.svg"
                alt="Logo Pinterest"
                width={30}
                height={30}
              />
            </div>
          </a>
        </div>

        {/* Button */}
        <button
          className="mt-5 w-full text-black bg-gray-100 hover:bg-gray-200 py-3 rounded-xl border border-black transition text-lg font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
          onClick={() => {
            router.push("/seller/items/hostItem/hostItem2/itemDetailPage");
          }}
        >
          Close
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
}
