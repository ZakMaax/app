import { ColumnDef } from '@tanstack/react-table';
import { Appointment } from '@/utils/types';
import { StatusDropdownAppointment } from '@/dashboard/components/AppointmentStatusDropDown';
import { Link } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";

export const appointmentColumns: ColumnDef<Appointment>[] = [
  { 
    accessorKey: 'id', 
    header: 'ID',
    cell: ({ row }) => {
      const id = row.original.id;
      return (typeof id === 'string' && id.length >= 4)
        ? `${id.substring(0, 2)}..${id.slice(-2)}`
        : id;
    }, 
  },
  { accessorKey: 'customer_name', header: 'Customer Name' },
  { accessorKey: 'customer_phone', header: 'Customer Phone' },
  {
    accessorKey: 'agent_name',
    header: 'Agent Name',
    cell: ({ row }) => (
      <Link
        to={`/dashboard/users/${row.original.agent_id}`}
        className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition"
      >
        {row.original.agent_name}
      </Link>
    ),
  },
  {
    accessorKey: "appointment_datetime",
    header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: ({ row }) => {
        const dateString = row.original.appointment_datetime;
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid Date";
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(date);
      },
    },
  {
    accessorKey: 'property_title',
    header: 'Property Title',
    cell: ({ row }) => (
      <Link
        to={`/dashboard/properties/${row.original.property_id}`}
        className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition"
      >
        {row.original.property_title}
      </Link>
    ),
  },
  {
    accessorKey: 'appointment_status',
    header: 'Status',
    cell: ({ row }) => {
      console.log("Appointment row:", row.original); // <--- Add this for debugging
      return (
        <StatusDropdownAppointment
          appointmentId={row.original.id}
          initialStatus={row.original.appointment_status}
        />
      );
    },
  },
];