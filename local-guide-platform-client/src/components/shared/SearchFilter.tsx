"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

export default function SearchFilter({
  placeholder = "Search here...",
  paramName = "search",
}: SearchFilterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(paramName) ?? "");
  const debounceValue = useDebounce(value);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debounceValue === (searchParams.get(paramName) ?? "")) return;

    if (debounceValue) {
      params.set(paramName, debounceValue);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debounceValue, paramName, router, searchParams]);

  //
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        disabled={isPending}
        // onChange={(e) => setValue(e.target.value)}
        onChange={({ target }) => setValue(target.value)}
        value={isPending ? "Loading..." : value}
      />
    </div>
  );
}
