import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "@/utils/schemas";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";
import { DateTimePickerForm } from "./DateTimePicker";
import { useState } from "react";
import { PhoneInput } from "@/components/Phone-input";
import { Loader2 } from "lucide-react";

export type AppointmentFormData = z.infer<typeof appointmentSchema> & {
  property_id: string;
  agent_id?: string;
};

type AppointmentProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AppointmentFormData) => Promise<void>;
  propertyId: string;
  agentId?: string;
};

export default function Appointment({ isOpen, onClose, onSubmit, propertyId, agentId }: AppointmentProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      appointment_datetime: undefined,
    },
  });

  async function handleSubmit(values: z.infer<typeof appointmentSchema>) {
    setSubmitting(true);
    try {
      // Compose the payload for backend
      const payload = {
        ...values,
        property_id: propertyId,
        agent_id: agentId,
      };
      await onSubmit(payload);
      onClose();
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl text-slate-800 font-semibold">
            Schedule an Appointment
          </h3>
          <button onClick={onClose}>
            <MdClose className="text-3xl text-red-400 hover:text-red-700" />
          </button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="p-4 space-y-4">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="customer_phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Enter phone number" international defaultCountry="SO" {...field} />
              </FormControl>
              <FormDescription>
                E.g. (63-444-4444)-Telesom<br />
                &emsp;&emsp;(65-999-9999)-Somtel<br />
                &emsp;&emsp;(67-777-7777)-Soltelco
              </FormDescription>
              <FormMessage />
            </FormItem>
          )} />
            <FormField
              control={form.control}
              name="appointment_datetime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date & Time</FormLabel>
                  <FormControl>
                    <DateTimePickerForm
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           <Button type="submit" disabled={submitting} className="cursor-pointer w-full place-self-center rounded-lg py-4 hover:opacity-80">
            {submitting ? (
            <>
              <Loader2 className="animate-spin" />
              Scheduling...
            </>
          ) : (
            'Schedule'
          )}
        </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}