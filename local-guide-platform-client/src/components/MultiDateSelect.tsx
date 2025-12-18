"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";

interface iProps {
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  dateRange: DateRange | undefined;
  numberOfMonths?: number;
  label: string;
}

export default function MultiDateSelect({
  setDateRange,
  dateRange,
  numberOfMonths,
  label,
}: iProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (range: DateRange | undefined) => {
    setError(null);
    if (!range?.from || !range?.to) {
      setDateRange(range);
      return;
    }

    const diffInDays =
      (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays > 4) {
      setError("You can select maximum 5 days.");
      return;
    }

    setDateRange(range);
  };

  return (
    <div>
      {label && <Label className="mb-1.5">{label}</Label>}
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={handleSelect}
        numberOfMonths={numberOfMonths ?? 1}
        required={false}
        disabled={{ before: new Date() }}
        className="rounded-lg border shadow-sm"
      />
      {error && <p className="text-yellow-500 text-sm mt-0.5">{error}</p>}
    </div>
  );
}
