import { ColumnDef } from '@tanstack/react-table'
import { UserType, Role } from '@/utils/types'
import { UserActions } from '@/dashboard/components/UserActions'

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
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <UserActions user={user} onDelete={onDelete} onEdit={onEdit} />
      );
    }
  }
]