import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../config";

interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  slotsByDate?: { date: string; slots: { time: string; capacity: number; booked: number }[] }[];
}

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/api/experiences/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch experience");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched single experience:", data);
        setExperience(data);

        
        if (data.slotsByDate && Array.isArray(data.slotsByDate)) {
          const dates = data.slotsByDate.map((slot: any) => slot.date);
          setAvailableDates(dates);
        }
      })
      .catch((err) => {
        console.error("Error fetching experience details:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a date before proceeding.");
      return;
    }
    navigate("/checkout", { state: { experience, selectedDate } });
  };

  if (loading)
    return <p className="text-center mt-10">Loading experience details...</p>;

  if (!experience)
    return (
      <p className="text-center mt-10 text-red-600">
        Experience not found.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={experience.images?.[0]}
        alt={experience.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
      <p className="text-gray-600 mb-4">{experience.location}</p>
      <p className="text-gray-700 mb-6">{experience.description}</p>
      <p className="text-xl font-semibold mb-6">₹{experience.price}</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Select Available Date
        </label>
        {availableDates.length > 0 ? (
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="">-- Choose a date --</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-sm text-gray-500">
            No available dates for this experience.
          </p>
        )}
      </div>

      <button
        onClick={handleBookNow}
        disabled={!selectedDate}
        className={`w-full py-3 rounded-lg text-white font-semibold ${
          selectedDate
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {selectedDate ? "Book Now" : "Select a Date to Continue"}
      </button>
    </div>
  );
}
