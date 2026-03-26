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
                        src="/reject.svg" // place image in /public
                        alt="Password Updated"
                        width={120}
                        height={120}
                    />
                </div>

                {/* Title */}
                <h2 className="login-title text-center text-sm">
                    Reject ?
                </h2>
                <p className="text-gray-600">Are you sure you want to reject this seller ?</p>

                

                {/* Button */}
                <button
                    onClick={() => router.push("/admin/sellers/pendingApprovels")}
                    className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
                >
                    Yes
                    <span className="text-lg">→</span>
                </button>
                <button
                    onClick={() => router.push("/admin/sellers/pendingApprovels")}
                    className="mt-4 w-full text-white bg-[#F2482D] hover:bg-[#d33c25] py-3 rounded-xl border border-black transition font-bold flex items-center justify-center gap-2 shadow-[3px_3px_0px_black]"
                >
                    No
                    <span className="text-lg">→</span>
                </button>
            </div>
        </div>
    );
}
