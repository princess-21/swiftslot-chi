export interface Vendor {
  id: number;
  name: string;
  timezone: string;
}


export interface TimeSlot {
  id: number;           
  startISO: string;     
  lagosTime: Date;      
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
