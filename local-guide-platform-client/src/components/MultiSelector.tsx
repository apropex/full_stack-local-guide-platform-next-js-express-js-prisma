"use client";
import { Label } from "@/components/ui/label";
import MultipleSelector, {
  type MultiSElectOption,
} from "@/components/ui/multiselect";
import { join } from "@/utils";
import { Dispatch, SetStateAction } from "react";

/*
const frameworks: MultiSElectOption[] = [
  {
    label: "SvelteKit",
    value: "sveltekit",
  },
  {
    disable: true,
    label: "Nuxt.js",
    value: "nuxt.js",
  },
];
*/

interface iProps {
  setValue: Dispatch<SetStateAction<MultiSElectOption[] | undefined>>;
  value: MultiSElectOption[] | undefined;
  defaultOptions: MultiSElectOption[];
  label: string;
  max?: number;
}

export default function MultiSelector({
  setValue,
  value,
  defaultOptions,
  label,
  max,
}: iProps) {
  const text = join("Select ", label);

  return (
    <div className="*:not-first:mt-2">
      <Label>{label}</Label>
      <MultipleSelector
        maxSelected={max}
        commandProps={{
          label: text,
        }}
        emptyIndicator={
          <p className="text-center text-sm ">No results found</p>
        }
        defaultOptions={defaultOptions}
        hidePlaceholderWhenSelected
        placeholder={text}
        onChange={setValue}
        value={value}
      />
    </div>
  );
}
