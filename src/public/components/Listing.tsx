import { MdKingBed, MdBathtub } from "react-icons/md";
import { FaRulerCombined } from "react-icons/fa";
import Guri from "@/assets/Guri.jpg";

export default function Listing() {
  return (
    <div className="shadow-xl bg-white flex flex-col gap-4 rounded-2xl overflow-hidden h-full">
      <div className="aspect-video">
        <img src={Guri} className="object-cover w-full h-full" alt="Property" />
      </div>
      <section className="px-4 space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-primaryColor">Jigjiga Yar</h4>
          <p className="text-lg text-primaryColor">Rent</p>
        </div>
        <p className="text-sm text-gray-500">Residential</p>
      </section>

      <div className="flex justify-between items-center px-4 text-gray-700">
        <div className="flex items-center gap-1">
          <MdKingBed className="text-xl text-primaryColor" />
          <span>7 rooms</span>
        </div>
        <div className="flex items-center gap-1">
          <MdBathtub className="text-xl text-primaryColor" />
          <span>5 bathrooms</span>
        </div>
      </div>
      <div className="px-4 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-primaryColor">$20000</h4>
        <div className="flex items-center gap-2">
          <FaRulerCombined className="text-xl text-primaryColor" />
          <span>24x18m</span>
        </div>
      </div>
      <div className="p-3">
        <button className="bg-primaryColor text-white w-full py-3 rounded-lg font-medium hover:opacity-80 transition">
          See more details
        </button>
      </div>
    </div>
  );
}
