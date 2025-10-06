import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SlotsGrid from "../components/SlotsGrid";
import CheckoutPanel from "../components/CheckoutPanel";
import { getAvailability } from "../api/client";

export default function VendorDetailPage() {
  const { id } = useParams(); // vendor id from URL
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null); // lock booked slot
  const [slots, setSlots] = useState<string[]>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const loadSlots = async () => {
    try {
      if (!id) return;
      const data = await getAvailability(Number(id), date);
      setSlots(data);
    } catch (err) {
      console.error("Failed to fetch slots:", err);
    }
  };

  useEffect(() => {
    loadSlots();
    setSelectedSlot(null); 
  }, [id, date]);

  
  const handleSelect = (slot: string) => {
    if (bookedSlot && bookedSlot === slot) return;
    setSelectedSlot(slot);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Vendor {id}</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <SlotsGrid
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={handleSelect}
          bookedSlot={bookedSlot}
        />
      </div>
      <div>
        {id && (
          <CheckoutPanel
            selectedSlot={selectedSlot}
            vendorId={id}
            date={date}
          />
        )}


      </div>
    </div>
  );
}
