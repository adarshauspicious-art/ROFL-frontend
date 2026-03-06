"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Sucess() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/ticked.svg" // place image in /public
                        alt="Details Submitted"
                        width={120}
                        height={120}
                    />
                </div>

                {/* Title */}
                <h2 className="login-title text-center text-sm">
                    Details Submitted
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 mt-5 mb-8">
                   You will get an approval mail. Till then you can continue to create items but they won’t be listed.
                </p>

                {/* Button */}
                <button
                    onClick={() => router.push("/seller/dashboard")}
                    className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
                >
                    Okay
                    <span className="text-lg">→</span>
                </button>
            </div>
        </div>
    );
}
