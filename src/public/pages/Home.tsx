import Hero from "../components/Hero";
import Features from "../components/Features";
import Contact from "../components/Contact";
import { FaArrowRight } from "react-icons/fa";
import Listing from "../components/Listing";
import { useEffect, useState } from "react";
import { Property } from "@/utils/types";

export default function Home() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/v1/properties/featured")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch featured properties");
        return res.json();
      })
      .then(setFeatured)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <main className="pt-24">
        <Hero />
        <div className="px-4 py-8 bg-primaryBg">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-4xl md:text-5xl mt-8 text-[#1F2744] font-medium text-center md:text-left">
                Featured Listings
              </h3>
              <button className="hidden w-full md:w-auto px-7 text-center py-3 rounded-md bg-primaryColor text-white text-md font-medium md:flex items-center justify-center gap-2 hover:opacity-75">
                <span>See More</span>
                <FaArrowRight />
              </button>
            </div>
            <div className="grid items-center grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {loading ? (
                <div className="col-span-full text-center py-12">Loading...</div>
              ) : error ? (
                <div className="col-span-full text-center text-red-600 py-12">{error}</div>
              ) : featured.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-12">
                  No featured properties found.
                </div>
              ) : (
                featured.map((property) => (
                  <Listing key={property.id} propertyData={property} />
                ))
              )}
            </div>
            <button className="w-full md:hidden md:w-auto px-3 py-3 rounded-md bg-slate-800 text-white text-md font-medium flex items-center justify-center gap-2 hover:opacity-75">
              <span>See more</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </main>
      <Features />
      <Contact />
    </div>
  );
}