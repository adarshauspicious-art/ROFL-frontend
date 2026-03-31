// app/web/stripe/success/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  const handleGoHome = () => router.push("http://localhost:3000/web/stripe");
  const handleViewOrder = () => router.push("/orders"); // replace with your orders page

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f7fa",
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "60px 40px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          animation: "fadeIn 0.8s ease",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "#4BB543",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="48"
            height="48"
          >
            <path d="M20.285 6.709l-11.025 11.025-5.546-5.546 1.414-1.414 4.132 4.132 9.611-9.611z" />
          </svg>
        </div>

        {/* Headings */}
        <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#111827" }}>
          Payment Successful!
        </h1>
        <p style={{ fontSize: "1rem", color: "#6B7280", marginBottom: "30px" }}>
          Thank you for your purchase. Your ticket has been booked successfully. You will
          receive a confirmation email shortly.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <button
            onClick={handleGoHome}
            style={{
              padding: "12px 28px",
              backgroundColor: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
          >
            Go to Home
          </button>
          <button
            onClick={handleViewOrder}
            style={{
              padding: "12px 28px",
              backgroundColor: "#E5E7EB",
              color: "#111827",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#D1D5DB")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E5E7EB")}
          >
            View Order
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}