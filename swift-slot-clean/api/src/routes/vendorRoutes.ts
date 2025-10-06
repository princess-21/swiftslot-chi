import { Router } from "express";
import { BookingSlot } from "../models/bookingSlot";
import moment from "moment-timezone";

const router = Router();


router.get("/:id/availability", async (req, res) => {
  try {
    const vendorId = parseInt(req.params.id, 10);
    const date = req.query.date as string; 

    if (!date) return res.status(400).json({ error: "Date is required" });

    
    const startHour = 9;
    const endHour = 17;
    const slots: string[] = [];

    let current = moment.tz(`${date} ${startHour}:00`, "YYYY-MM-DD HH:mm", "Africa/Lagos");
    const end = moment.tz(`${date} ${endHour}:00`, "YYYY-MM-DD HH:mm", "Africa/Lagos");

    while (current.isBefore(end)) {
      slots.push(current.utc().toISOString()); 
      current.add(30, "minutes");
    }

    
    const booked = await BookingSlot.findAll({
      where: { vendor_id: vendorId },
      attributes: ["slot_start_utc"],
    });

    const bookedUTC = booked.map((b) => b.slot_start_utc.toISOString());

    
    const availableSlots = slots.filter((slot) => !bookedUTC.includes(slot));

    res.json(availableSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

export default router;
