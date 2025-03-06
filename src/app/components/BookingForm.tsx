"use client";

import { useState } from "react";
import { Select, Button } from "antd";

interface BookingFormProps {
  boats: string[];
  selectedDate: string;
  onBook: (boat: string, slot: string) => void;
  onUnbook: (boat: string, slot: string) => void;
}

export default function BookingForm({ boats, selectedDate, onBook, onUnbook }: BookingFormProps) {
  const [selectedBoat, setSelectedBoat] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  return (
    <div>
      <Select
        placeholder="Select a Boat"
        className="w-full mb-2"
        onChange={setSelectedBoat}
      >
        {boats.map((boat) => (
          <Select.Option key={boat} value={boat}>{boat}</Select.Option>
        ))}
      </Select>

      <Select
        placeholder="Select Time Slot"
        className="w-full mb-2"
        onChange={setSelectedSlot}
      >
        <Select.Option value="Day">Day</Select.Option>
        <Select.Option value="Sunset">Sunset</Select.Option>
      </Select>

      <Button type="primary" className="w-full" onClick={() => onBook(selectedBoat, selectedSlot)}>
        Mark as Unavailable
      </Button>
      <Button className="w-full mt-2" onClick={() => onUnbook(selectedBoat, selectedSlot)}>
        Make Available Again
      </Button>
    </div>
  );
}