import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import PropertyTypeButton from "./PropertyTypeButton";
import { useSearchParams } from 'react-router-dom';

export default function PropertyFilter() {
  const [transactionType, setTransactionType] = useState<"buy" | "rent">("buy");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSubmit(formData: FormData) {
    const filters = {
      transaction: transactionType,
      location: formData.get("location") as string,
      priceRange: formData.get("price-range") as string,
      propertyType: formData.get("type") as string
    };

   
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
    });
    
    setSearchParams(params);
    const getParams = Object.fromEntries(searchParams.entries())
    console.log(getParams)
  }

  function handleTransactionType(type: "buy" | "rent") {
    setTransactionType(type);
  }

  return (
    <div className="p-4">
      {/* Transaction Type Toggle */}
      <div className="flex gap-4">
        <PropertyTypeButton
          onSelect={() => handleTransactionType("buy")}
          isSelected={transactionType === "buy"}
        >
          Buy
        </PropertyTypeButton>
        <PropertyTypeButton
          onSelect={() => handleTransactionType("rent")}
          isSelected={transactionType === "rent"}
        >
          Rent
        </PropertyTypeButton>
      </div>

      {/* Search Filters */}
      {transactionType && (
        <form 
          action={handleSubmit} 
          className="bg-white px-4 py-6 md:p-8 rounded-b-lg shadow-lg flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
            {/* Location Filter */}
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-left">Location</label>
              <div className="relative">
                <select
                  name="location"
                  id="location"
                  className="w-full appearance-none bg-gray-100 p-3 pr-10 rounded-md text-gray-700 focus:outline-none"
                >
                  <option value="">City</option>
                  <option value="Hargeisa">Hargeisa</option>
                  <option value="Burco">Burco</option>
                  <option value="Borama">Borama</option>
                  <option value="Jigjiga">Jigjiga</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price-range" className="text-left">Price range</label>
              <div className="relative">
                <select
                  name="price-range"
                  id="price-range"
                  className="w-full appearance-none bg-gray-100 p-3 pr-10 rounded-md text-gray-700 focus:outline-none"
                >
                  <option value="">Price</option>
                  <option value="1000-5000">$1000 - $5000</option>
                  <option value="5000-10000">$5000 - $10000</option>
                  <option value="10000-20000">$10000 - $20000</option>
                  <option value="20000-50000">$20000 - $50000</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="text-left">Property Type</label>
              <div className="relative">
                <select
                  name="type"
                  id="type"
                  className="w-full appearance-none bg-gray-100 p-3 pr-10 rounded-md text-gray-700 focus:outline-none"
                >
                  <option value="">Property Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                  <option value="apartment">Apartment</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button 
              type="submit"
              className="w-full bg-primaryColor text-white text-lg px-6 py-3 rounded-lg font-medium hover:opacity-80 transition"
            >
              Filter
            </button>
          </div>
        </form>
      )}
    </div>
  );
}