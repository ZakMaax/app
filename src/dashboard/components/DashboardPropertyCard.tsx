import { MdKingBed, MdBathtub } from "react-icons/md";
import { FaRulerCombined } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Property } from "@/utils/types";
import Default from "@/assets/Default.webp";
import { useNavigate } from "react-router-dom";

export default function AdminPropertyCard({ property }: { property: Property }) {
  const navigate = useNavigate();
  const mainImage = property.images && property.images.length > 0
    ? `http://localhost:8000/uploads/properties/${property.id}/${property.images[0]}`
    : Default;

  return (
    <Card className="bg-card text-card-foreground shadow-md flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img src={mainImage} className="object-cover w-full h-full" alt={property.title} />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2 p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{property.city}</CardTitle>
          <span className="text-muted-foreground text-sm">{property.sale_or_rent}</span>
        </div>
        <CardDescription className="text-xs">{property.type}</CardDescription>
        <div className="flex justify-between items-center text-muted-foreground text-xs mt-2">
          <div className="flex items-center gap-1">
            <MdKingBed className="text-base" />
            <span>{property.bedrooms} rooms</span>
          </div>
          <div className="flex items-center gap-1">
            <MdBathtub className="text-base" />
            <span>{property.bathrooms} baths</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-base">${property.price}</span>
          <div className="flex items-center gap-1 text-xs">
            <FaRulerCombined className="text-base" />
            <span>{property.size} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/admin-dashboard/properties/${property.id}`)}
        >
          See Property Details
        </Button>
      </CardFooter>
    </Card>
  );
}