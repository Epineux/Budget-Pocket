export const parseDueDate = (dueDate: string): number => {
  const dayNumber = parseInt(dueDate.replace(/\D/g, ""));

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
    throw new Error(`Invalid due date format: ${dueDate}`);
  }

  return dayNumber;
};
