"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SelectFilterProps {
  paramName?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export default function SelectFilter({
  paramName = "specialty",
  placeholder = "Select a specialty",
  options,
}: SelectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentValue = searchParams.get(paramName) ?? "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") params.delete(paramName);
    else if (value) params.set(paramName, value);
    else params.delete(paramName);

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Select value={currentValue} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-auto min-w-52">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter Items</SelectLabel>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
