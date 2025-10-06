import { Router } from "express";
import { Booking } from "../models/booking";
import { BookingSlot } from "../models/bookingSlot";
import { IdempotencyKey } from "../models/idempotencyKey";

const router = Router();

// POST /api/bookings
router.post("/", async (req, res) => {
  const idempotencyKey = req.header("Idempotency-Key");

  if (!idempotencyKey) {
    return res.status(400).json({ error: "Missing Idempotency-Key header" });
  }

  try {

    const existingKey = await IdempotencyKey.findByPk(idempotencyKey);
    if (existingKey) {
      return res.status(200).json(JSON.parse(existingKey.response_json));
    }

    const { vendorId, startISO, endISO, buyer_id } = req.body;

    if (!vendorId || !startISO || !endISO || !buyer_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if slot is already booked
    const conflict = await Booking.findOne({
      where: { vendor_id: vendorId, start_time_utc: startISO },
    });
    if (conflict) {
      return res.status(409).json({ error: "Slot already booked" });
    }

    // Create booking
    const booking = await Booking.create({
      vendor_id: vendorId,
      buyer_id,
      start_time_utc: startISO,
      end_time_utc: endISO,
      status: "paid", 
    });

    
    // await BookingSlot.create({
    //   booking_id: booking.id,
    //   vendor_id: vendorId,
    //   slot_start_utc: startISO,
    // });

    // Save idempotency response
    await IdempotencyKey.create({
      key: idempotencyKey,
      scope: "booking",
      response_json: JSON.stringify(booking),
      created_at: new Date(),
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
