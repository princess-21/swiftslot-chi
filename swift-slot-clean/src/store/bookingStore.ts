import { create } from 'zustand';
import { BookingState, Vendor, TimeSlot } from '../types';
import { api } from '../api/client';
import { toZonedTime } from 'date-fns-tz';

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedVendor: null,
  selectedSlot: null,
  selectedDate: new Date().toISOString().split('T')[0],
  availableSlots: [],
  vendors: [] as Vendor[],
  isCheckoutOpen: false,

  setVendor: (vendor: Vendor) => set({ selectedVendor: vendor }),
  setVendors: (vendors: Vendor[]) => set({ vendors }),

  setSlot: (slot: TimeSlot) =>
    set({ selectedSlot: slot, isCheckoutOpen: true }),
  setDate: (date: string) => set({ selectedDate: date }),
  setAvailableSlots: (slots: TimeSlot[]) => set({ availableSlots: slots }),

  fetchAvailability: async () => {
    const vendor = get().selectedVendor;
    const date = get().selectedDate;
    if (!vendor) return;

    try {
      const slots = await api.getAvailability(vendor.id, date);

     const lagosSlots = slots.map((slot) => {
  return {
    ...slot,
    lagosTime: toZonedTime(new Date(slot.startISO), 'Africa/Lagos'), 
  };
});


      set({ availableSlots: lagosSlots });
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      set({ availableSlots: [] });
    }
  },

  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  reset: () =>
    set({
      selectedVendor: null,
      selectedSlot: null,
      selectedDate: new Date().toISOString().split('T')[0],
      availableSlots: [],
      vendors: [],
      isCheckoutOpen: false,
    }),
}));
