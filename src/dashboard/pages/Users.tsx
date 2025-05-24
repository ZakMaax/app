import { Button } from "@/components/ui/button";
import AppPieChart from "../components/charts/AppPieChart";
import PropertiesTable from "../components/properties-table/PropertiesTable";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Users() {

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
            <h1 className="text-xl font-medium">Users</h1>
            <Link
                to={'add-user'}
            >
                <Button className="cursor-pointer flex items-center gap-2 hover:opacity-80">
                    <Plus className="font-medium" /> <span>Add User</span>
                </Button>
          
            </Link>
        </div>

        <PropertiesTable />
      </div>

    </div>
  );
}
