import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Property } from "@/utils/types";

interface PropertyActionsProps {
  property: Property;
  onDelete: (propertyId: string) => void;
  onEdit: (property: Property) => void;
}

export function PropertyActions({ property, onDelete, onEdit }: PropertyActionsProps) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Row actions</span>
          {/* You can add an icon here if you want */}
          ⋮
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Property actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(`/dashboard/properties/${property.id}`)}>
          See Property Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(property)}>
          Edit Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(property.id)}>
          Delete Property
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(property.id))}>
          Copy Property ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}