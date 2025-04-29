import PropertyFilter from "../components/PropertyFilter";
import Listing from "../components/Listing";
export default function Properties() {
  return (
    <>
      <main className="pt-24">
        <div className="md:max-w-7xl  mx-auto flex flex-col md:items-center px-4 py-6">
          <PropertyFilter />
          <div className="grid items-center grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
          </div>
        </div>
      </main>
    </>
  );
}
