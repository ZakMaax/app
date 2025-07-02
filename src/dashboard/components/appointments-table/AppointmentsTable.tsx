import { DataTable } from "../Data-Table";
import { appointmentColumns } from "./AppointmentColumns";
import { Appointment, AppointmentStatus } from "@/utils/types";

interface AppointmentsTableProps {
  data: Appointment[];
}

export default function AppointmentsTable({ data }: AppointmentsTableProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={appointmentColumns}
        data={data}
        message="No Appointments"
        filterableColumns={[
          { label: "Customer Name", id: "customer_name" },
          { label: "Agent Name", id: "agent_name" },
          { label: "Property Title", id: "property_title" },
          { label: "Status", id: "appointment_status", options: Object.values(AppointmentStatus) },
        ]}
      />
    </div>
  );
}