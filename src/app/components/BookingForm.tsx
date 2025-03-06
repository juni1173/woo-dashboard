import { useState } from "react";
import { Button, Select } from "antd";

interface BookingFormProps {
  boats: string[];
  selectedDate: string;
  onBook: (boat: string, slot: string) => void;
  onUnbook: (boat: string, slot: string) => void;
}

export default function BookingForm({ boats, selectedDate, onBook, onUnbook }: BookingFormProps) {
  const [selectedBoat, setSelectedBoat] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const slots = ["Day", "Sunset", "Night"];

  return (
    <div className="p-4 border rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Booking for {selectedDate}</h3>

      <Select
        placeholder="Select Boat"
        className="w-full mb-2"
        onChange={setSelectedBoat}
        value={selectedBoat}
      >
        {boats.map((boat) => (
          <Select.Option key={boat} value={boat}>
            {boat}
          </Select.Option>
        ))}
      </Select>

      <Select
        placeholder="Select Slot"
        className="w-full mb-2"
        onChange={setSelectedSlot}
        value={selectedSlot}
      >
        {slots.map((slot) => (
          <Select.Option key={slot} value={slot}>
            {slot}
          </Select.Option>
        ))}
      </Select>

      <div className="flex gap-2 mt-2">
        <Button
          type="primary"
          onClick={() => selectedBoat && selectedSlot && onBook(selectedBoat, selectedSlot)}
          disabled={!selectedBoat || !selectedSlot}
        >
          Book
        </Button>
        <Button
          type="default"
          onClick={() => selectedBoat && selectedSlot && onUnbook(selectedBoat, selectedSlot)}
          disabled={!selectedBoat || !selectedSlot}
        >
          Unbook
        </Button>
      </div>
    </div>
  );
}
