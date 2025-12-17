"use client";

import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "./ui/calendar";

interface iProps {
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
  dateRange: DateRange | undefined;
  label: string;
}

export default function MultiDateSelect({
  setDateRange,
  dateRange,
  label,
}: iProps) {
  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={1}
      required={false}
      className="rounded-lg border shadow-sm"
    />
  );
}

/*
<DateRangePicker
      className="*:not-first:mt-2"
      onChange={setDateRange}
      value={dateRange}
    >
      <Label className="font-medium text-foreground text-sm">{label}</Label>
      <div className="flex">
        <Group className={cn(dateInputStyle, "pe-9")}>
          <DateInput slot="start" unstyled />
          <span aria-hidden="true" className="px-2 text-muted-foreground/70">
            -
          </span>
          <DateInput slot="end" unstyled />
        </Group>
        <Button className="-ms-9 -me-px z-10 flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground data-focus-visible:border-ring data-focus-visible:ring-[3px] data-focus-visible:ring-ring/50">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:fade-out-0 data-exiting:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2 z-50 rounded-md border bg-background text-popover-foreground shadow-lg outline-hidden data-entering:animate-in data-exiting:animate-out"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <RangeCalendar />
        </Dialog>
      </Popover>
    </DateRangePicker>*/
