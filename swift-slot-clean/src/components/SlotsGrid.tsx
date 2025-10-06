import React from "react";

export type SlotsGridProps = {
  slots: string[];
  selectedSlot: string | null;
  bookedSlot?: string | null;
  onSelect: (slot: string) => void;
};

export default function SlotsGrid({
  slots,
  selectedSlot,
  bookedSlot,
  onSelect,
}: SlotsGridProps) {
  if (!slots || slots.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No slots available.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {slots.map((slot) => {
        const isBooked = bookedSlot === slot;
        return (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            disabled={isBooked}
            className={`p-3 rounded border text-sm font-medium cursor-pointer ${
              isBooked
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : selectedSlot === slot
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
            }`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
