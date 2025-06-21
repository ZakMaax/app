import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserType } from "@/utils/types";

interface UserActionsProps {
  user: UserType;
  onDelete: (userId: string) => void;
  onEdit: (user: UserType) => void;
}

export function UserActions({ user, onDelete, onEdit }: UserActionsProps) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate(`/admin-dashboard/users/${user.id}`)}>
          See User Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(user)}>
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(user.id)}>
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}