//

import { format, isValid } from "date-fns";

export default function formatDate(date: string | Date, hr = false): string {
  const d = date instanceof Date ? date : new Date(date);

  if (!isValid(d)) return "";

  return format(d, hr ? "PPp" : "PP");
}
