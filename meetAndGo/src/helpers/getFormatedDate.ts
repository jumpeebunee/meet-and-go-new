import { format } from "date-fns"

export const getFormatedDate = (eventDate: string) => {
  return format(new Date(eventDate), 'dd/MM/yyyy. Время: k:m')
}