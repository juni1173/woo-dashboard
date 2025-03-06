"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Typography } from "antd";
import BookingCalendar from "@/app/components/Calendar";
import BookingForm from "@/app/components/BookingForm";
import { fetchBookings, updateBooking } from "@/app/lib/api";

const { Title } = Typography;

interface PageParams {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageParams) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [boats] = useState<string[]>(["Lady Roula", "Sea Star", "Ocean Dream"]);

  useEffect(() => {
    fetchBookings(Number(params.id));
  }, [params.id]);

  const handleBook = (boat: string, slot: string) => {
    if (!selectedDate) return;
    updateBooking(Number(params.id), selectedDate, boat, slot, false);
  };

  const handleUnbook = (boat: string, slot: string) => {
    if (!selectedDate) return;
    updateBooking(Number(params.id), selectedDate, boat, slot, true);
  };

  return (
    <div className="container mx-auto p-4">
      <Title level={2}>Booking for Product {params.id}</Title>
      <BookingCalendar
        selectedDate={selectedDate ? dayjs(selectedDate) : null}
        onSelectDate={(date) => setSelectedDate(date?.format("YYYY-MM-DD") || null)}
      />
      {selectedDate && <BookingForm boats={boats} selectedDate={selectedDate} onBook={handleBook} onUnbook={handleUnbook} />}
    </div>
  );
}