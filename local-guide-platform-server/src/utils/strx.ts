//

export const strx = {
  toWords(input: string): string[] {
    if (!input || typeof input !== "string") return [];
    return input
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);
  },

  toTokens(input: string): string[] {
    if (!input || typeof input !== "string") return [];
    return input
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);
  },

  toUniqueTokens(input: string): string[] {
    return [...new Set(strx.toTokens(input))];
  },
};
