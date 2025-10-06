import React, { useState } from "react";
import { createBooking } from "../api/client";

interface CheckoutPanelProps {
  selectedSlot: string | null;
  vendorId: string | number;
  date: string;
}

export default function CheckoutPanel({ selectedSlot, vendorId, date }: CheckoutPanelProps) {
  const [success, setSuccess] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBooking = async () => {
    if (!selectedSlot) return;
    setLoading(true);
    setError(null);

    try {
      // compute ISO UTC for start/end
      const start = new Date(`${date}T${selectedSlot}Z`).toISOString(); // assuming Lagos time
      const endDate = new Date(new Date(start).getTime() + 30 * 60 * 1000); // 30-min slot
      const end = endDate.toISOString();

      // call the backend API
      const booking = await createBooking({
        vendorId: Number(vendorId),
        startISO: start,
        endISO: end,
      });

      setBookedSlot(selectedSlot); // lock the booked slot
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  // No slot selected
  if (!selectedSlot) {
    return (
      <div className="bg-gray-50 p-4 rounded text-center text-gray-500">
        Select a slot to continue
      </div>
    );
  }

  // Booking completed
  if (success && bookedSlot) {
    return (
      <div className="bg-green-50 p-4 rounded text-center">
        <h3 className="text-lg font-semibold text-green-700">Booking Confirmed 🎉</h3>
        <p className="text-gray-600">Your slot at {bookedSlot} has been booked.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Review Booking</h3>
      <p className="mb-2">
        Selected Slot: <span className="font-bold">{selectedSlot}</span>
      </p>
      <p className="mb-4">
        Price: <span className="font-bold">₦5,000</span>
      </p>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleBooking}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Booking..." : "Book & Pay"}
      </button>
    </div>
  );
}
