//

/**
 * Returns the initials from a full name.
 * - Single word: first letter (e.g., "John" → "J")
 * - Multiple words: first letter of first word + first letter of last word (e.g., "John Doe" → "JD")
 * Handles extra spaces and empty input gracefully.
 */
export function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return (first + last).toUpperCase();
}
