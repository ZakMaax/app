import { Calendar as CalendarIcon } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCallback } from "react";

type DateTimePickerFormProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  description?: string;
  error?: string;
};

// Months are 0-indexed in JS Date: Jan=0, May=4, June=5
const DISABLED_DATES = [
  new Date(new Date().getFullYear(), 0, 1),   // Jan 1
  new Date(new Date().getFullYear(), 4, 1),   // May 1
  new Date(new Date().getFullYear(), 4, 18),  // May 18
  new Date(new Date().getFullYear(), 5, 26),  // June 26
];

// Allowed hours: 7-12 (AM), 16-20 (4pm-8pm)
const ALLOWED_HOURS = [
  7, 8, 9, 10, 11, 12, // 7am-12pm
  16, 17, 18, 19, 20   // 4pm-8pm (24h format)
];

function getDisplayHour(hour24: number) {
  if (hour24 === 0) return 12;
  if (hour24 > 12) return hour24 - 12;
  return hour24;
}
function getAMPM(hour24: number) {
  return hour24 < 12 ? "AM" : "PM";
}

export function DateTimePickerForm({
  value,
  onChange,
  label = '',
  description = "Please select your preferred date and time.",
  error,
}: DateTimePickerFormProps) {
  // Disable Fridays and specific dates
  const disabled = useCallback((date: Date) => {
    if (date.getDay() === 5) return true; // Friday
    return DISABLED_DATES.some((d) => isSameDay(d, date));
  }, []);

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      // Keep the time part if already selected
      if (value) {
        const newDate = new Date(date);
        newDate.setHours(value.getHours());
        newDate.setMinutes(value.getMinutes());
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        onChange?.(newDate);
      } else {
        onChange?.(date);
      }
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", val: string) {
    const currentDate = value || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      let hour = parseInt(val, 10);
      // If hour is in PM range, keep as is; if in AM, adjust for 24h
      if (hour >= 7 && hour <= 12) {
        // AM
        if (getAMPM(newDate.getHours()) === "PM" && hour !== 12) {
          hour += 12;
        }
        if (getAMPM(newDate.getHours()) === "AM" && hour === 12) {
          hour = 0;
        }
      } else if (hour >= 16 && hour <= 20) {
        // PM
        // already in 24h format
      }
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(val, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (val === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (val === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
      // Clamp to allowed hours if needed
      if (!ALLOWED_HOURS.includes(newDate.getHours())) {
        // Set to first allowed hour in that period
        if (val === "AM") newDate.setHours(7);
        else newDate.setHours(16);
      }
    }
    onChange?.(newDate);
  }

  // Only show AM if any allowed hour is in AM, same for PM
  const showAM = ALLOWED_HOURS.some((h) => h < 12);
  const showPM = ALLOWED_HOURS.some((h) => h >= 12);

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={
                "w-full pl-3 text-left font-normal" +
                (!value ? " text-muted-foreground" : "")
              }
              type="button"
            >
              {value ? (
                format(value, "MM/dd/yyyy hh:mm aa")
              ) : (
                <span>MM/DD/YYYY hh:mm aa</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              autoFocus
              disabled={disabled}
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              {/* Hour Picker */}
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {ALLOWED_HOURS.map((hour24) => {
                    const isSelected = value && value.getHours() === hour24;
                    return (
                      <Button
                        key={hour24}
                        size="icon"
                        variant={isSelected ? "default" : "ghost"}
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() => handleTimeChange("hour", hour24.toString())}
                        type="button"
                      >
                        {getDisplayHour(hour24)}
                      </Button>
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              {/* Minute Picker */}
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        value && value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("minute", minute.toString())}
                      type="button"
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              {/* AM/PM Picker */}
              <ScrollArea>
                <div className="flex sm:flex-col p-2">
                  {["AM", "PM"].map((ampm) => {
                    if ((ampm === "AM" && !showAM) || (ampm === "PM" && !showPM)) return null;
                    return (
                      <Button
                        key={ampm}
                        size="icon"
                        variant={
                          value &&
                          ((ampm === "AM" && value.getHours() < 12) ||
                            (ampm === "PM" && value.getHours() >= 12))
                            ? "default"
                            : "ghost"
                        }
                        className="sm:w-full shrink-0 aspect-square"
                        onClick={() => handleTimeChange("ampm", ampm)}
                        type="button"
                      >
                        {ampm}
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
        </Popover>
      <FormDescription>{description}</FormDescription>
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
}