import { Router } from "express";
import { BookingSlot } from "../models/bookingSlot";
import { Sequelize } from "sequelize";

const router = Router();


router.get("/:id/availability", async (req, res) => {
  try {
    const vendorId = parseInt(req.params.id);
    const date = req.query.date as string; 

    
    const slots: string[] = [];
    const startHour = 9;
    const endHour = 17;

    const tzOffset = -3 * 60; 

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30:00`);
    }

    // Filter out booked slots
    const booked = await BookingSlot.findAll({
      where: { vendor_id: vendorId },
    });

    const bookedTimes = booked.map((b) => b.slot_start_utc.toISOString().substr(11, 8));
    const freeSlots = slots.filter((s) => !bookedTimes.includes(s));

    res.json(freeSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

export default router;
