import { MdKingBed, MdBathtub } from "react-icons/md";
import { FaRulerCombined } from "react-icons/fa";
import { Property } from "@/utils/types";
import Default from "@/assets/Default.webp"
import { Link } from "react-router-dom";

export default function Listing({ propertyData }: { propertyData: Property }) {
  const mainImage = propertyData.images && propertyData.images.length > 0
    ? `http://localhost:8000/uploads/properties/${propertyData.id}/${propertyData.images[0]}`
    : Default;

  return (
    <div className="shadow-xl bg-white flex flex-col gap-4 rounded-2xl overflow-hidden h-full">
      <div className="aspect-video">
        <img src={mainImage} className="object-cover w-full h-full" alt={propertyData.title} />
      </div>
      <section className="px-4 space-y-2">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-primaryColor">{propertyData.city}</h4>
          <p className="text-lg text-primaryColor">{propertyData.sale_or_rent}</p>
        </div>
        <p className="text-sm text-gray-500">{propertyData.type}</p>
      </section>
      <div className="flex justify-between items-center px-4 text-gray-700">
        <div className="flex items-center gap-1">
          <MdKingBed className="text-xl text-primaryColor" />
          <span>{propertyData.bedrooms} rooms</span>
        </div>
        <div className="flex items-center gap-1">
          <MdBathtub className="text-xl text-primaryColor" />
          <span>{propertyData.bathrooms} bathrooms</span>
        </div>
      </div>
      <div className="px-4 flex justify-between items-center">
        <h4 className="text-2xl font-semibold text-primaryColor">${propertyData.price}</h4>
        <div className="flex items-center gap-2">
          <FaRulerCombined className="text-xl text-primaryColor" />
          <span>{propertyData.size} sqft</span>
        </div>
      </div>
      <div className="p-3">
      <button className="bg-primaryColor text-white w-full py-3 rounded-lg font-medium hover:opacity-80 transition">
        <Link to={`/listings/${propertyData.id}`} >
            See More Details
        </Link>
      </button>
        
      </div>
    </div>
  );
}