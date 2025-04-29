import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import PropertyTypeButton from "./PropertyTypeButton";

export default function PropertyFilter() {
  const [selectedButton, setSelectedButton] = useState("Buy");

  const locationRef = useRef(null);

  function handleClick(buttonType) {
    setSelectedButton(buttonType);
  }

  return (
    <div className="p-4">
      {/* Buttons */}
      <div className="flex gap-4">
        <PropertyTypeButton
          onSelect={() => handleClick("Buy")}
          isSelected={selectedButton === "Buy"}
        >
          Buy
        </PropertyTypeButton>
        <PropertyTypeButton
          onSelect={() => handleClick("Rent")}
          isSelected={selectedButton === "Rent"}
        >
          Rent
        </PropertyTypeButton>
      </div>

      {/* Filters */}
      {selectedButton && (
        <div className="bg-white px-4 py-6 md:p-8 rounded-b-lg shadow-lg flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Location */}
            <div className="flex flex-col gap-2">
              <h4 className="text-left">Location</h4>
              <div className="relative">
                <select
                  ref={locationRef}
                  name="location"
                  id="location"
                  className="w-full appearance-none bg-gray-100 p-3 pr-10 rounded-md text-gray-700 focus:outline-none"
                >
                  <option value="Hargeisa">Hargeisa</option>
                  <option value="Burco">Burco</option>
                  <option value="Borama">Borama</option>
                  <option value="Jigjiga">Jigjiga</option>
                </select>

                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-2">
              <h4 className="text-left">Price range</h4>
              <div className="relative">
                <select
                  name="price-range"
                  id="price-range"
                  className="w-full appearance-none bg-gray-100 p-3 pr-10 rounded-md text-gray-700 focus:outline-none"
                >
                  <option value="1000-5000">$1000 - $5000</option>
                  <option value="5000-10000">$5000 - $10000</option>
                  <option value="10000-20000">$10000 - $20000</option>
                  <option value="20000-50000">$20000 - $50000</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-2">
              <h4 className="text-left">Property type</h4>
              <div className="relative">
                <select
                  name="property-type"
                  id="property-type"
                  className="w-full appearance-none bg-gray-100 p-3 pr-10 rounded-md text-gray-700 focus:outline-none"
                >
                  <option value="Residential">Residential</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Land">Land</option>
                  <option value="Apartment">Apartment</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full flex justify-center">
            <button className="w-full bg-primaryColor text-white text-lg px-6 py-3 rounded-lg font-medium hover:opacity-80 transition">
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
