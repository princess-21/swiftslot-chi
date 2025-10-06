import { Router } from "express";

const router = Router();


const vendors = [
  { id: 1, name: "Vendor 1" },
  { id: 2, name: "Vendor 2" },
];


const slots: Record<number, string[]> = {
  1: ["09:00", "09:30", "10:00"],
  2: ["10:00", "10:30", "11:00"],
};


router.get("/", (req, res) => {
  res.json(vendors);
});


router.get("/:vendorId/availability", (req, res) => {
  const vendorIdNum = Number(req.params.vendorId); 
  const { date } = req.query;

  if (!date || typeof date !== "string") {
    return res.status(400).json({ error: "Missing or invalid date query param" });
  }

  
  const vendor = vendors.find(v => v.id === vendorIdNum);
  if (!vendor) {
    return res.status(404).json({ error: "Vendor not found" });
  }

  
  const vendorSlots = slots[vendorIdNum] || [];
  res.json(vendorSlots);
});

export default router;
