import { useEffect, useState } from "react";
import ExperienceCard from "../components/ExperienceCard";
import { API_BASE_URL } from "../config";


interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  images: string[];
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/experiences`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched experiences:", data);
        setExperiences(data);
      })
      .catch((err) => console.error("Error fetching experiences:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading experiences...</p>;
  if (!experiences.length) return <p className="text-center text-gray-500">No experiences found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Discover Experiences</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((exp) => (
          <ExperienceCard key={exp._id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
