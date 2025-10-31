import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PromoCode from "../components/Promocode";
import {API_BASE_URL} from "../config";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const experience = state?.experience;
  const selectedDate = state?.selectedDate;

  if (!experience?._id) {
    alert("Invalid experience data.");
    return null;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!name || !email || !phone) {
      alert("Please fill all required fields: Name, Email, and Phone.");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }

    const bookingPayload = {
      experienceId: experience._id,
      date: selectedDate,
      time: "09:00-11:00", 
      name,
      email,
      phone,
      promoUsed: discount > 0 ? "APPLIED" : null,
      pricePaid: experience.price - discount,
    };

    console.log("📦 Booking payload being sent:", bookingPayload);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();
      console.log("📨 Backend response:", data);

      if (data.success) {
        navigate("/result", {
          state: {
            success: true,
            bookingId: data.bookingId,
            experience,
            selectedDate,
            name,
            email,
            phone,
            total: experience.price - discount,
          },
        });
      } else {
        alert("Booking failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Server error while booking:", err);
      alert("Server error while booking. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">{experience.title}</h2>
        <p className="text-gray-500">{experience.location}</p>
        <p className="text-sm text-gray-400 mt-1">
          Date: <span className="font-medium">{selectedDate || "Not selected"}</span>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border w-full px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Promo Code</label>
          <PromoCode totalPrice={experience.price} setDiscount={setDiscount} />
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>
            ₹{experience.price - discount}
            {discount > 0 && (
              <span className="text-sm text-green-600 ml-2">
                (−₹{discount} applied)
              </span>
            )}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
