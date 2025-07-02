import AppointmentsTable from "../components/appointments-table/AppointmentsTable";
import { useLoaderData } from "react-router-dom";
import { Appointment } from "@/utils/types";

export default function DashboardAppointments() {
  const { appointments } = useLoaderData() as { appointments: Appointment[] };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* You can add dashboard widgets here if you want, like AppPieChart */}
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Appointments</h1>
          {/* Add actions here if needed */}
        </div>
        <AppointmentsTable data={appointments} />
      </div>
    </div>
  );
}