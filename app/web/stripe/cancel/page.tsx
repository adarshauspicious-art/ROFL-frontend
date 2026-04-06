"use client";
import { useRouter } from "next/navigation";

export default function Cancel() {

  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>❌</div>
        <h1 style={styles.title}>Payment Canceled</h1>
        <p style={styles.text}>
          Your payment was not completed. No charges were made.
        </p>
        <p style={styles.subText}>
          You can try again or return to the homepage.
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryBtn}
            onClick={() => router.push("/web/stripe")}
          >
            Try Again
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/web/auths/login")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    maxWidth: "400px",
    width: "90%",
  },
  icon: {
    fontSize: "50px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#dc2626",
  },
  text: {
    fontSize: "16px",
    color: "#374151",
    marginBottom: "5px",
  },
  subText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  primaryBtn: {
    padding: "10px 16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 16px",
    backgroundColor: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};