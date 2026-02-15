"use client";

import { create } from "zustand";
import type { CheckoutOrder, CheckoutStatus } from "./types";

type CheckoutStore = {
  status: CheckoutStatus;
  latestOrder: CheckoutOrder | null;
  errorMessage: string | null;
  setSubmitting: () => void;
  setSuccess: (order: CheckoutOrder) => void;
  setError: (message: string) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  status: "idle",
  latestOrder: null,
  errorMessage: null,
  setSubmitting: () => {
    set({
      status: "submitting",
      errorMessage: null,
    });
  },
  setSuccess: (order) => {
    set({
      status: "success",
      latestOrder: order,
      errorMessage: null,
    });
  },
  setError: (message) => {
    set({
      status: "error",
      errorMessage: message,
    });
  },
  reset: () => {
    set({
      status: "idle",
      latestOrder: null,
      errorMessage: null,
    });
  },
}));
