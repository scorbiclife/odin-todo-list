import { format } from "date-fns";

export function formattedDueDate(dueDate) {
  return format(dueDate, "yyyy-MM-dd");
}
