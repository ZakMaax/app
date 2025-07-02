import {
  MdKingBed,
  MdBathtub,
  MdLocationOn,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { MapPinHouse } from "lucide-react";
import { FaRulerCombined, FaArrowRight } from "react-icons/fa";
import Carousel from "@/components/Carousel";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appointment from "../components/Appointment";
import Default from "@/assets/Default.webp";
import { PropertyWithAgent } from "@/utils/types";
import {toast} from 'react-hot-toast'
import type { AppointmentFormData } from "@/public/components/Appointment";

export default function Details() {
  const { listingID } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<PropertyWithAgent | null>(null);

  useEffect(() => {
    async function getProperty() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/properties/property/${listingID}`
        );
        if (!res.ok) {
          setError("Property Not Found");
          setData(null);
        } else {
          const data = await res.json();
          setData(data);
        }
      } catch (error) {
        console.log(error)
        setError("Failed to fetch property");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    getProperty();
  }, [listingID]);


  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen" role="status">
        <svg
          aria-hidden="true"
          className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-primaryColor"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-xl">
        {error}
      </div>
    );

  if (!data) return null;

  const latitude = data.latitude ?? 0;
  const longitude = data.longitude ?? 0;

  // Build images array
  const images =
    data.images && data.images.length > 0
      ? data.images.map(
          (img: string) =>
            `http://localhost:8000/uploads/properties/${data.id}/${img}`
        )
      : [Default];


  const handleScheduleSubmit = async (formData: AppointmentFormData) => {
        try {
          const res = await fetch("http://localhost:8000/api/v1/appointments/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            toast.error(data?.message || "Failed to schedule appointment", {duration: 5000});
            return;
          }
          toast.success(data?.message || "Appointment scheduled successfully!", {duration: 5000});
        } catch (err) {
          console.error(err)
          toast.error("Network error. Please try again.");
        }
      };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-30 pb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column - Images and features */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-lg mb-6">
            <Carousel slides={images} autoSlide={true} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap gap-4 justify-center md:justify-between">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <MdKingBed className="text-2xl text-primaryColor" />
                <span className="text-lg font-medium">{data.bedrooms} rooms</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <MdBathtub className="text-2xl text-primaryColor" />
                <span className="text-lg font-medium">{data.bathrooms} bathrooms</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaRulerCombined className="text-2xl text-primaryColor" />
                <span className="text-lg font-medium">{data.size} sqft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Property details */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              {data.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <MdLocationOn className="text-primaryColor" />
                <span>{data.address}</span>
              </div>
              <p className="text-3xl font-bold text-primaryColor">${data.price}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{data.description}</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-primaryColor hover:bg-primary-dark text-white font-medium flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <span>Schedule a Viewing</span>
            <FaArrowRight />
          </button>

          <Appointment
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleScheduleSubmit}
            propertyId={data.id}
            agentId={data.agent?.id}
          />

          {/* Agent contact card (replace with real agent data if available) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={data.agent?.avatar_url ? `http://localhost:8000${data.agent?.avatar_url}` : `http://localhost:8000/uploads/default_avatar.png`}
                alt="Agent"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="font-bold text-lg">{data.agent?.name || "Agent"}</h3>
                <p className="text-gray-600">Real Estate Agent</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <MdPhone className="text-primaryColor" />
                <span>{data.agent?.phone_number || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MdEmail className="text-primaryColor" />
                <span>{data.agent?.email || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="mt-8">
        <div className="flex items-center gap-3 text-primaryColor text-2xl font-bold mb-4">
          <h2>Location</h2>
          <MapPinHouse />
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg h-[450px]">
          <Map location={[latitude, longitude]} />
        </div>
      </div>
    </div>
  );
}