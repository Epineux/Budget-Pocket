export const parseDueDate = (dueDate: string): number => {
  const dayNumber = parseInt(dueDate.replace(/\D/g, ""));

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
    throw new Error(`Invalid due date format: ${dueDate}`);
  }

  return dayNumber;
};

export const formatDateToMonthYear = (inputDate: string): string => {
  const date = new Date(inputDate);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

export function formatDateToReadable(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}
