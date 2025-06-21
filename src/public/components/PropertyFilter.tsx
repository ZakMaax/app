import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropertyTypeButton from "./PropertyTypeButton";

interface PropertyFilterProps {
  redirectOnSubmit?: boolean;
}

export default function PropertyFilter({ redirectOnSubmit = false }: PropertyFilterProps) {
  const [transactionType, setTransactionType] = useState<"sale" | "rent">("sale");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let min_price = "", max_price = "";
    const priceRange = formData.get("price-range") as string;
    if (priceRange) {
      [min_price, max_price] = priceRange.split("-").map(s => s.trim());
    }

    const params: Record<string, string> = {};
    const city = formData.get("city") as string;
    const type = formData.get("type") as string;
    if (city) params.city = city;
    if (type) params.type = type;
    if (min_price) params.min_price = min_price;
    if (max_price) params.max_price = max_price;
    params.transaction = transactionType;

    if (redirectOnSubmit) {
      navigate(`/listings/?${new URLSearchParams(params).toString()}`);
    } else {
      setSearchParams(params);
    }
  }

  // Define price ranges for sale and rent
  const salePriceRanges = [
    { value: "", label: "Price" },
    { value: "10000-50000", label: "$10,000 - $50,000" },
    { value: "50000-100000", label: "$50,000 - $100,000" },
    { value: "100000-200000", label: "$100,000 - $200,000" },
    { value: "200000-1000000", label: "$200,000+" },
  ];
  const rentPriceRanges = [
    { value: "", label: "Price" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-2000", label: "$1,000 - $2,000" },
    { value: "2000-10000", label: "$2,000+" },
  ];

  const priceRanges = transactionType === "sale" ? salePriceRanges : rentPriceRanges;

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <PropertyTypeButton
          onSelect={() => setTransactionType("sale")}
          isSelected={transactionType === "sale"}
        >
          Buy
        </PropertyTypeButton>
        <PropertyTypeButton
          onSelect={() => setTransactionType("rent")}
          isSelected={transactionType === "rent"}
        >
          Rent
        </PropertyTypeButton>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-4 py-6 md:p-8 rounded-b-lg shadow-lg flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {/* City */}
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="text-left">City</label>
            <select
              name="city"
              id="city"
              className="w-full bg-gray-100 p-3 rounded-md text-gray-700 focus:outline-none"
              defaultValue={searchParams.get("city") || ""}
            >
              <option value="">City</option>
              <option value="Hargeisa">Hargeisa</option>
              <option value="Burco">Burco</option>
              <option value="Borama">Borama</option>
              <option value="Jigjiga">Jigjiga</option>
            </select>
          </div>
          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price-range" className="text-left">Price range</label>
            <select
              name="price-range"
              id="price-range"
              className="w-full bg-gray-100 p-3 rounded-md text-gray-700 focus:outline-none"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          {/* Property Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-left">Property Type</label>
            <select
              name="type"
              id="type"
              className="w-full bg-gray-100 p-3 rounded-md text-gray-700 focus:outline-none"
              defaultValue={searchParams.get("type") || ""}
            >
              <option value="">Property Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="w-full bg-primaryColor text-white text-lg px-6 py-3 rounded-lg font-medium hover:opacity-80 transition"
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
}