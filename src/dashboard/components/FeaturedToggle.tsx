import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FeaturedCellProps {
  initialValue: boolean;
  propertyId: string;
}

const FeaturedCell: React.FC<FeaturedCellProps> = ({ initialValue, propertyId }) => {
  const [checked, setChecked] = React.useState<boolean>(initialValue);

  const handleCheckedChange = async (value: boolean) => {
    setChecked(value);
    const url = `http://127.0.0.1:8000/api/v1/properties/property/${propertyId}/featured`
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: value }),
      });
      if (!response.ok) {
        setChecked(!value);
      }
    } catch {
      setChecked(!value);
    }
  };

  return (
    <Checkbox checked={checked} onCheckedChange={handleCheckedChange} className='cursor-pointer' />
  );
};

export default FeaturedCell;