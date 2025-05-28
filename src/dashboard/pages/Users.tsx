import { Button } from "@/components/ui/button";
import AppPieChart from "../components/charts/AppPieChart";
import UsersTable from "../components/users-table/UsersTable";
import { Plus } from "lucide-react";
import { Link, useLoaderData, useNavigate} from "react-router-dom";
import { UserType } from "@/utils/types";
import { Suspense } from "react";
import TableSkeleton from "@/dashboard/components/skeletons/TableSkeleton"


export default function Users() {
  const users: UserType[] = useLoaderData()
  const navigate = useNavigate(); // Initialize useNavigate
  
  const handleEditUser = (user: UserType) => {
    navigate('/admin-dashboard/users/edit-user', { state: { userToEdit: user } });
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
            <h1 className="text-xl font-medium">Users</h1>
            <Link
                to={'add-user'}
            >
                <Button className="cursor-pointer flex items-center gap-2 hover:opacity-80">
                    <Plus className="font-medium" /> <span>Add User</span>
                </Button>
          
            </Link>
        </div>

        <Suspense fallback={<TableSkeleton/>}>
          <UsersTable data={users} onEdit={handleEditUser} />
        </Suspense>
      </div>

    </div>
  );
}
