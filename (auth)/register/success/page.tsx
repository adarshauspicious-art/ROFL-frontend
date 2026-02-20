"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AccountCreated() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-3xl shadow-lg max-w-md w-full p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/created.svg" // place image in /public
                        alt="Password Updated"
                        width={120}
                        height={120}
                    />
                </div>

                {/* Title */}
                <h2 className="login-title text-center text-sm">
                    Account Created
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 mt-5 mb-8">
                   Congratulations!! <br/> Your Account has been Created successfully!
                </p>

                {/* Button */}
                <button
                    onClick={() => router.push("/login")}
                    className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-semibold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
                >
                    Continue
                    <span className="text-lg">→</span>
                </button>
            </div>
        </div>
    );
}
