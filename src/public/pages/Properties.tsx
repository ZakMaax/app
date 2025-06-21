import PropertyFilter from "../components/PropertyFilter";
import Listing from "../components/Listing";
import {useLoaderData} from 'react-router-dom'
import { Property } from "@/utils/types";

export default function Properties() {
  const properties = useLoaderData() as Property[];
  return (
    <main className="pt-24">
      <div className="md:max-w-7xl mx-auto flex flex-col md:items-center px-4 py-6">
        <PropertyFilter />
        <div className="grid items-center grid-cols-1 gap-3 md:grid-cols-3">
          {properties.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500 py-12">
              No properties match your filter.
            </div>
          ) : (
            properties.map((property) => (
              <Listing key={property.id} propertyData={property} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
