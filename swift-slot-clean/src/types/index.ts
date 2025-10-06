// export interface Vendor {
//   id: number;
//   name: string;
//   timezone: string;
// }

// export interface TimeSlot {
//   startISO: string; // UTC ISO string
//   endISO: string;   // UTC ISO string
//   lagosTime: string; // Display time like "09:00 AM"
// }

// export interface Booking {
//   id: number;
//   vendorId: number;
//   buyerId: number;
//   startTimeUtc: string;
//   endTimeUtc: string;
//   status: 'pending' | 'paid';
//   createdAt: string;
// }

// export interface PaymentInitResponse {
//   reference: string;
// }

// export interface BookingState {
//   selectedVendor: Vendor | null;
//   selectedSlot: TimeSlot | null;
//   selectedDate: string; // YYYY-MM-DD
//   isCheckoutOpen: boolean;
//   setVendor: (vendor: Vendor) => void;
//   setSlot: (slot: TimeSlot) => void;
//   setDate: (date: string) => void;
//   openCheckout: () => void;
//   closeCheckout: () => void;
//   reset: () => void;
// }

// src/types/index.ts

export interface Vendor {
  id: number;
  name: string;
  timezone: string;
}

// types/index.ts (or wherever TimeSlot is defined)
export interface TimeSlot {
  id: number;           // Add this
  startISO: string;     // original UTC string from backend
  lagosTime: Date;      // must be Date for .toLocaleTimeString()
}


export interface Booking {
  id: number;
  vendorId: number;
  buyerId: number;
  startTimeUtc: string;
  endTimeUtc: string;
  status: 'pending' | 'paid';
  createdAt: string;
}

export interface PaymentInitResponse {
  reference: string;
}

export interface BookingState {
  selectedVendor: Vendor | null;
  selectedSlot: TimeSlot | null;
  selectedDate: string;
  isCheckoutOpen: boolean;

  // New for vendors list
  vendors: Vendor[];
  setVendors: (vendors: Vendor[]) => void;

  availableSlots: TimeSlot[];
  setAvailableSlots: (slots: TimeSlot[]) => void;

  fetchAvailability: () => Promise<void>;

  setVendor: (vendor: Vendor) => void;
  setSlot: (slot: TimeSlot) => void;
  setDate: (date: string) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  reset: () => void;
}
