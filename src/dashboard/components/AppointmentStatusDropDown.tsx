import { AppointmentStatus } from "@/utils/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authFetch } from "@/utils/auth";
import toast from "react-hot-toast";

export function StatusDropdownAppointment({
  appointmentId,
  initialStatus,
}: {
  appointmentId: string;
  initialStatus: AppointmentStatus;
}) {
  const [status, setStatus] = useState<AppointmentStatus>(initialStatus);

  const handleChange = async (newStatus: AppointmentStatus) => {
    try {
      console.log(appointmentId)
      const res = await authFetch(
        `http://localhost:8000/api/v1/appointments/appointment/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (res.ok) {
        setStatus(newStatus);
        toast.success("Status updated");
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">{status.replace(/_/g, " ")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(AppointmentStatus).map((s) => (
          <DropdownMenuItem key={s} onClick={() => handleChange(s as AppointmentStatus)}>
            {s.replace(/_/g, " ")}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}