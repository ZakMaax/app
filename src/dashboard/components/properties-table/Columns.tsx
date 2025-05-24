import { ColumnDef } from '@tanstack/react-table'

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'id',
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue('id') as string;
            // Shorten the UUID for display
            const shortenedId = `${id.substring(0, 2)}...${id.substring(id.length - 2)}`;
            return (
              <span title={id}>
                {shortenedId}
              </span>
            );
          },
    },
    {
        accessorKey: "amount",
        header: "Amount"
    },
    {
        accessorKey: 'status',
        header: "Status"
    },

    {
        accessorKey: "email",
        header: "Email"
    },

]