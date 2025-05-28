import { ColumnDef } from '@tanstack/react-table'
import {UserType, Role} from '@/utils/types'
import {DropdownMenu, 
        DropdownMenuContent, 
        DropdownMenuLabel, 
        DropdownMenuItem, 
        DropdownMenuSeparator, 
        DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';


interface ColumnProps {
  onDelete: (userId: string) => void,
  onEdit: (user: UserType) => void,
}


export const userColumns = ({onDelete, onEdit}: ColumnProps): ColumnDef<UserType>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const id = row.original.id;
      return (typeof id === 'string' && id.length >= 4) 
        ? `${id.substring(0, 2)}...${id.slice(-2)}` 
        : id;
    },
  },
  {
    accessorKey: 'name',
    header: 'name',
  },
  {
    accessorKey: 'email',
    header: 'email',
  },
  {
    accessorKey: 'is_active',
    header: 'Active',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
          const role: Role = row.getValue('role');
          return role.charAt(0).toUpperCase() + role.slice(1);
        },
  },

  {
    "id": "actions",
    cell: ({row}) => {
        const user = row.original
        return (
          <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Row actions</span>
                        <MoreHorizontal className="w-4 h-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="align-end">
                <DropdownMenuLabel>User actions</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => onDelete(user.id)}>
                        Delete User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> navigator.clipboard.writeText(String(user.id))}>
                        Copy Book ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(user)}>
                        Edit User
                    </DropdownMenuItem>
                </DropdownMenuContent>
          </DropdownMenu>
        )
    }
  }
]
