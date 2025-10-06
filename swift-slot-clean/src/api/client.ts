

const API_BASE = "http://localhost:3000/api";


function generateIdempotencyKey(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}


export async function createBooking(data: {
  vendorId: number;
  startISO: string;
  endISO: string;
}) {
  const body = { ...data, buyer_id: 1 }; 
  const idempotencyKey = generateIdempotencyKey();

  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey, 
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Booking failed");
  }

  return res.json();
}
export async function getAvailability(vendorId: number, date: string) {
  const res = await fetch(`${API_BASE}/vendors/${vendorId}/availability?date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch availability");
  return res.json();
}
