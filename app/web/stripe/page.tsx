"use client";

function App() {
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
      });
      const data = await response.json();

      // Redirect to Stripe test checkout page
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎟️ Buy Test Ticket</h1>
      <p>Price: $5.00</p>
      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#6772e5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buy Ticket
      </button>
    </div>
  );
}

export default App;