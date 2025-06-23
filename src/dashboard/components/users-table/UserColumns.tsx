import { ColumnDef } from '@tanstack/react-table'
import { UserType, Role } from '@/utils/types'
import { UserActions } from '@/dashboard/components/UserActions'
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColumnProps {
  onDelete: (userId: string) => void,
  onEdit: (user: UserType) => void,
}

export const userColumns = ({ onDelete, onEdit }: ColumnProps): ColumnDef<UserType>[] => [
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
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           Active
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    }, 
  },
  {
    accessorKey: 'role',
    header:({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const role: Role = row.getValue('role');
      return role.charAt(0).toUpperCase() + role.slice(1);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <UserActions user={user} onDelete={onDelete} onEdit={onEdit} />
      );
    }
  }
]