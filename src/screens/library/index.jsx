import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Library.css"; // optional styling

const Library = () => {
  const [orderId, setOrderId] = useState("");

  // Step 1: Get Order ID from backend
  const getOrderId = async () => {
    try {
      const orderData = await axios.post("http://localhost:8080/payment/createOrder");
      console.log("Order response:", orderData.data);
      setOrderId(orderData.data.id); // ✅ take id
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  // Step 2: Update user as premium after success
  const paySuccess = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        const response = await axios.get(
          `http://localhost:8080/payment/paymentSuccess?email=${userEmail}`
        );
        console.log("Payment success:", response.data);
      } else {
        console.error("User email not found in localStorage");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Step 3: Verify payment signature
  const verifyPayment = async (orderId, paymentId, signature) => {
    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("paymentId", paymentId);
      formData.append("signature", signature);

      const { data } = await axios.post("http://localhost:8080/payment/verify", formData);
      if (data) {
        await paySuccess();
        alert("✅ Payment successful, Premium Activated!");
      } else {
        alert("❌ Payment failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Step 4: Load Razorpay script and fetch order id
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpay();
    getOrderId();

    return () => {
      document.body.removeChild(document.body.lastChild);
    };
  }, []);

  // Step 5: Handle failure
  const handlePaymentFailure = (response) => {
    alert("Payment Failed!");
    console.error(response.error);
  };

  // Step 6: Open payment modal
  const openPaymentModal = () => {
    const options = {
      key: "rzp_test_cIPHMs9jCYhJUB", // test key
      amount: "9900",
      currency: "INR",
      name: "Play For You",
      description: "Premium Subscription",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: function (response) {
        verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        );
      },
      prefill: {
        name: "Music Lover",
        email: localStorage.getItem("userEmail") || "guest@example.com",
        contact: "9000090000",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", handlePaymentFailure);
    rzp1.open();
  };

  return (
    <div className="premium-container">
      <h1 className="premium-title">Unlock Premium 🎶</h1>
      <p className="premium-text">Get unlimited music, ad-free listening, and exclusive features.</p>
      <button className="premium-btn" onClick={openPaymentModal}>
        Subscribe ₹99
      </button>
    </div>
  );
};

export default Library;
