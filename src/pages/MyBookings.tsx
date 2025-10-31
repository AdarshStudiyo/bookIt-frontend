import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

interface Booking {
  _id: string;
  experienceTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  pricePaid: number;
  promoUsed?: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <ul className="space-y-4">
        {bookings.map((b) => (
          <li
            key={b._id}
            className="border p-4 rounded-lg shadow-sm flex justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="font-semibold">
                {b.experienceTitle || "Unknown Experience"}
              </h2>
              <p className="text-gray-500 text-sm">
                {b.date || "Unknown date"} | {b.time || "Unknown time"}
              </p>
              <p className="text-sm text-green-600">₹{b.pricePaid ?? 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-700">{b.name || "No name"}</p>
              <p className="text-sm text-gray-400">{b.email || "No email"}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
