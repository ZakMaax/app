import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../Data-Table";
import { propertyColumns } from "./PropertyColumns";
import { Property } from '@/utils/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface PropertiesTableProps {
  data: Property[];
  role: string;
  onEdit: (property: Property) => void;
}

export default function PropertiesTable({ data, role, onEdit }: PropertiesTableProps) {
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const navigate = useNavigate();

  async function handleDelete(propertyId: string) {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/properties/property/${propertyId}`,
        { method: "DELETE" }
      );
      const result = await res.json();
      if (res.ok) {
        setPropertyToDelete(null);
        toast.success(result.detail || 'Property Deleted Successfully');
        navigate('.', { replace: true });
      } else {
        toast.error(result.detail || 'Something happened while deleting property');
      }
    } catch (error) {
      console.log(error)
      toast.error('Network error occurred');
    }
  }

  const getColumns = propertyColumns({
    onDelete: (propertyId: string) => {
      const property = data.find(p => p.id === propertyId);
      if (property) setPropertyToDelete(property);
    },
    onEdit,
  }, role);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getColumns} data={data} message="No Properties" />
      <AlertDialog open={!!propertyToDelete} onOpenChange={open => !open && setPropertyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-bold">{propertyToDelete?.title}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={() => propertyToDelete && handleDelete(propertyToDelete.id)}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}