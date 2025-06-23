import {
  MdKingBed,
  MdBathtub,
  MdLocationOn,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { FaRulerCombined } from "react-icons/fa";
import { MapPinHouse } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import Default from "@/assets/Default.webp";
import Map from "@/public/components/Map";
import Carousel from "@/components/Carousel";
import { PropertyWithAgent } from "@/utils/types";


export default function DashboardPropertyDetails() {
  const { propertyId } = useParams();
  const [data, setData] = useState<PropertyWithAgent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProperty() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/properties/property/${propertyId}`
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
  }, [propertyId]);

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
      <div className="flex items-center justify-center min-h-screen text-destructive text-xl">
        {error}
      </div>
    );

  if (!data) return null;

  // Build images array
  const images =
    data.images && data.images.length > 0
      ? data.images.map(
          (img: string) =>
            `http://localhost:8000/uploads/properties/${data.id}/${img}`
        )
      : [Default];

  // Fallback location if missing
  const latitude = data.latitude ?? 0;
  const longitude = data.longitude ?? 0;

  console.log(data)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-3xl">{data.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <MdLocationOn className="text-primary" />
                <span>{data.address}</span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
            <Badge className="bg-blue-500 text-white">{data.type}</Badge>
            <Badge className="bg-green-500 text-white">{data.sale_or_rent}</Badge>
            <Badge className={data.status === "available" ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
              {data.status}
            </Badge>
            {data.featured && <Badge className="bg-yellow-500 text-white">Featured</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Images + Details Side by Side */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Carousel/Images */}
            <div className="rounded-xl overflow-hidden shadow border bg-muted h-80 md:h-96">
                <Carousel slides={images} autoSlide={true} />
            </div>
            {/* Details, Price, Description */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded shadow-sm border">
                  <MdKingBed className="text-xl text-muted-foreground" />
                  <span className="font-medium">{data.bedrooms} rooms</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded shadow-sm border">
                  <MdBathtub className="text-xl text-muted-foreground" />
                  <span className="font-medium">{data.bathrooms} baths</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded shadow-sm border">
                  <FaRulerCombined className="text-xl text-muted-foreground" />
                  <span className="font-medium">{data.size} sqft</span>
                </div>
                {data.floor && (
                  <div className="flex items-center gap-2 bg-card px-4 py-2 rounded shadow-sm border">
                    <span className="font-medium">Floor: {data.floor}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold text-primary">${data.price}</span>
              </div>
              {/* Description under price */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{data.description}</p>
              </div>
            </div>
          </div>
          {/* Agent Info */}
          {data.agent && (
            <Link
              to={`/admin-dashboard/users/${data.agent.id}`}
              className="block"
              tabIndex={0}
              aria-label="See agent details"
            >
              <div className="bg-muted p-6 rounded-xl shadow-sm border flex flex-col md:flex-row gap-6 items-center mb-8 hover:bg-accent transition-colors cursor-pointer">
                <img
                  src={data.agent?.avatar_url ? `http://localhost:8000${data.agent.avatar_url}` : `http://localhost:8000/uploads/default_avatar.png`}
                  alt="Agent"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold text-lg">{data.agent?.name || "Agent"}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MdPhone />
                    <span>{data.agent?.phone_number || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MdEmail />
                    <span>{data.agent?.email || "N/A"}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
          {/* Map */}
          <div>
            <div className="flex items-center gap-3 text-primary text-xl font-bold mb-4">
              <span>Location</span>
              <MapPinHouse />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg h-[350px] bg-muted">
              <Map location={[latitude, longitude]} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}