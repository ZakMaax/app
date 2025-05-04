import {
  MdKingBed,
  MdBathtub,
  MdLocationOn,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { MapPinHouse } from 'lucide-react'

import { FaRulerCombined, FaArrowRight } from "react-icons/fa";
import Carousel from "@/public/components/Carousel";
import Guri from "@/assets/Guri.jpg";
import Guri1 from "@/assets/Guri.jpg";
import Guri2 from "@/assets/Contact.png";
import Guri3 from "@/assets/Hero.png";
import Guri4 from "@/assets/bangalo.jpg";
import Map from "../components/Map";
import { useState } from "react";
import Appointment from "../components/Appointment";

const images = [Guri1, Guri2, Guri3, Guri4];

export default function Details() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScheduleSubmit = (formData) => {
    console.log("Viewing scheduled:", formData);
    // Here you would typically send the data to your backend
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
                <span className="text-lg font-medium">7 rooms</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <MdBathtub className="text-2xl text-primaryColor" />
                <span className="text-lg font-medium">5 bathrooms</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <FaRulerCombined className="text-2xl text-primaryColor" />
                <span className="text-lg font-medium">24x18m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Property details */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              Bangalo
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 text-lg text-gray-600">
                <MdLocationOn className="text-primaryColor" />
                <span>Jigjiga yar</span>
              </div>
              <p className="text-3xl font-bold text-primaryColor">$24,000</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi ullam
            porro facere voluptas earum rem aut reprehenderit nemo illum
            laboriosam temporibus dolores, quaerat perspiciatis dolorem nostrum
            non! Maxime, facilis cum? Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>

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
          />

          {/* Agent contact card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={Guri}
                alt="Agent"
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-gray-600">Real Estate Agent</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <MdPhone className="text-primaryColor" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MdEmail className="text-primaryColor" />
                <span>john.doe@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="mt-8">
        <div className="flex items-center gap-3 text-primaryColor text-2xl font-bold mb-4">
          <h2>Location</h2>
          <MapPinHouse/>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg h-[450px]">
          <Map location={[9.561944, 44.089833]} />
        </div>
      </div>
    </div>
  );
}
