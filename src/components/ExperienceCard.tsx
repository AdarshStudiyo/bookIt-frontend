import { Link } from "react-router-dom";

interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={experience.images?.[0] || "https://via.placeholder.com/400"}
        alt={experience.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{experience.title}</h3>
        <p className="text-gray-500 text-sm">{experience.location}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-600 font-semibold">₹{experience.price}</span>
          <Link
            to={`/details/${experience._id}`}
            className="text-white bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
