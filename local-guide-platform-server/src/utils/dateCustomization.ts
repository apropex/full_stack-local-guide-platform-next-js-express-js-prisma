//

export const isValidDateString = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
};

export const parseValidDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) ? d : null;
};

export const getValidDateOrFalse = (dateStr?: string): Date | false => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) ? d : false;
};
