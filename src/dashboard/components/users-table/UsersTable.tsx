import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { DataTable } from "../Data-Table";
import { userColumns } from "./UserColumns";
import { UserType } from '@/utils/types';
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

interface UsersTableProps {
  data: UserType[];
  onEdit: (user: UserType) => void;
}

const filterableColumns = [
  { label: "Name", id: "name" },
  { label: "Email", id: "email" },
]

export default function UsersTable({ data, onEdit }: UsersTableProps) {
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const navigate = useNavigate()

  async function handleDelete(userId: string) {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/users/${userId}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        setUserToDelete(null);
        toast.success(data.detail || 'User Deleted Successfully');
        navigate('.');
      } else {
        toast.error(data.detail || 'Something happened while deleting user');
      }
    } catch (error) {
      console.log(error);
      toast.error('Network error occurred');
    }
  }

  // Columns with delete/edit actions
  const getColumns = userColumns({
    onDelete: (userId: string) => {
      const user = data.find(u => u.id === userId);
      if (user) setUserToDelete(user);
    },
    onEdit,
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getColumns} data={data} filterableColumns={filterableColumns} message="No Users" />
      <AlertDialog open={!!userToDelete} onOpenChange={open => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-bold">{userToDelete?.name}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={() => userToDelete && handleDelete(userToDelete.id)}
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