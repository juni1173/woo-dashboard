"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Typography } from "antd";
import BookingCalendar from "@/app/components/Calendar";
import BookingForm from "@/app/components/BookingForm";
import { fetchBookings, updateBooking } from "@/app/lib/api";

const { Title } = Typography;

export default async function ProductPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) { //use intersection type.
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [boats] = useState<string[]>(["Lady Roula", "Sea Star", "Ocean Dream"]);
  const { id } = await params
  useEffect(() => {
    fetchBookings(Number(id));
  }, [id]);

  const handleBook = (boat: string, slot: string) => {
    if (!selectedDate) return;
    updateBooking(Number(id), selectedDate, boat, slot, false);
  };

  const handleUnbook = (boat: string, slot: string) => {
    if (!selectedDate) return;
    updateBooking(Number(id), selectedDate, boat, slot, true);
  };
  
  return (
    <div className="container mx-auto p-4">
      <Title level={2}>Booking for Product {id}</Title>
      <BookingCalendar
        selectedDate={selectedDate ? dayjs(selectedDate) : null}
        onSelectDate={(date) => setSelectedDate(date?.format("YYYY-MM-DD") || null)}
      />
      {selectedDate && <BookingForm boats={boats} selectedDate={selectedDate} onBook={handleBook} onUnbook={handleUnbook} />}
    </div>
  );
}