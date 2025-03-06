import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface BookingCalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export default function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  return (
    <DatePicker
      value={selectedDate ? dayjs(selectedDate) : undefined}
      onChange={(date) => onSelectDate(date ? date.format("YYYY-MM-DD") : null)}
      format="YYYY-MM-DD"
      className="w-full"
    />
  );
}
