import React, { useState } from "react";
import {API_BASE_URL} from "../config";

interface PromoCodeProps {
  totalPrice: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
}

const PromoCode: React.FC<PromoCodeProps> = ({ totalPrice, setDiscount }) => {
  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const applyPromo = async () => {
    if (!promoCode.trim()) {
      setMessage("❌ Please enter a promo code.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/promo/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim(), price: totalPrice }),
      });

      const data = await res.json();

      if (data.valid) {
        setDiscount(data.discount); 
        setAppliedCode(promoCode.toUpperCase()); 
        setMessage(`✅ Promo applied! You saved ₹${data.discount}`);
      } else {
        setDiscount(0);
        setAppliedCode(null);
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removePromo = () => {
    setDiscount(0);
    setPromoCode("");
    setAppliedCode(null);
    setMessage("Promo code removed.");
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
          disabled={!!appliedCode}
          className="border px-3 py-2 rounded w-64 focus:outline-none focus:ring focus:border-blue-300"
        />

        {!appliedCode ? (
          <button
            onClick={applyPromo}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Apply"}
          </button>
        ) : (
          <button
            onClick={removePromo}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>

      {appliedCode && (
        <p className="text-green-700 text-sm mt-2">
          ✅ Applied: <span className="font-semibold">{appliedCode}</span>
        </p>
      )}

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default PromoCode;
