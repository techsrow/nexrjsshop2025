/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export interface CheckoutItem {
  productId: number;
  quantity: number;
}

export interface CheckoutData {
  items: CheckoutItem[];
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  customerEmail?: string;
  customerName?: string;
  guestPhone?: string;
}

export const checkoutService = {
  createOrder: async (checkoutData: CheckoutData) => {
    // withAuth = true by default in api.post
    const res = await api.post("/Checkout", checkoutData, true);
    return res.data;
  },

  createGuestOrder: async (checkoutData: CheckoutData) => {
    // guest: no auth header
    const res = await api.post("/Checkout/guest", checkoutData, false);
    return res.data;
  },
};
