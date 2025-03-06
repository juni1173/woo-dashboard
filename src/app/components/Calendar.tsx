import { useState } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface BookingCalendarProps {
  selectedDate: Dayjs | null;
  onSelectDate: (date: Dayjs) => void;
}

export default function Calendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  return (
    <DatePicker
      value={selectedDate || undefined} // Ensures correct type handling
      onChange={(date) => {
        if (date) {
          onSelectDate(date);
        }
      }}
      format="YYYY-MM-DD"
      className="w-full"
    />
  );
}
