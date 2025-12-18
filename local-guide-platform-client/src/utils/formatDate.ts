//

import { format, isValid } from "date-fns";

export default function formatDate(date: string | Date, hr = false): string {
  const d = date instanceof Date ? date : new Date(date);

  if (!isValid(d)) return "";

  return format(d, hr ? "PPp" : "PP");
}

export function mergeDateAndTime(date: Date | undefined, time: string): string {
  if (!date || !time) return "";

  const [hours, minutes, seconds] = time.split(":").map(Number);

  const merged = new Date(date);
  merged.setHours(hours, minutes, seconds || 0, 0);

  return merged.toISOString();
}
