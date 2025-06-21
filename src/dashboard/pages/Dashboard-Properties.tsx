import { Button } from "@/components/ui/button";
import AppPieChart from "../components/charts/AppPieChart";
import PropertiesTable from "../components/properties-table/PropertiesTable";
import { Plus } from "lucide-react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {Property} from '@/utils/types'

export default function DashboardProperties() {
  const { properties, role } = useLoaderData() as { properties: Property[], role: string };
  const navigate = useNavigate()

  const handleEditProperty = (property: Property) => {
    navigate('/admin-dashboard/properties/edit-property', { state: { propertyToEdit: property } });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3">
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Properties</h1>
            {role === "admin" && (
              <Link to={'add-property'}>
                <Button className="cursor-pointer flex items-center gap-2 hover:opacity-80">
                  <Plus className="font-medium" /> <span>Add Property</span>
                </Button>
              </Link>
            )}
        </div>

        <PropertiesTable data={properties} role={role} onEdit={handleEditProperty} />
      </div>

    </div>
  );
}