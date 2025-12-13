"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const colors = [
  "#2563EB",
  "#16A34A",
  "#7C3AED",
  "#DC2626",
  "#F97316",
  "#0D9488",
  "#DB2777",
];

export default function BrandColor() {
  const [color, setColor] = useState(colors[0]);

  const handleColor = (c: string) => {
    if (!c) {
      setColor("");
      return;
    }

    if (color.length >= 7) {
      setColor(color.slice(0, 7));
      return;
    }

    if (c.startsWith("#")) setColor(c);
    else setColor(`#${c}`);
  };

  return (
    <div className="lg:col-span-2">
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            style={{ backgroundColor: c }}
            className="size-8 rounded-full"
            onClick={() => setColor(c)}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Input
          className="w-auto border-foreground/40 h-8 text-xl"
          value={color ?? ""}
          onChange={({ target }) => handleColor(target.value)}
        />
        <button
          style={{ backgroundColor: color }}
          className="size-8 rounded-full"
        />
      </div>
    </div>
  );
}
