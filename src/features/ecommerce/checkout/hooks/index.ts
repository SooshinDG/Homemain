import type {
  CheckoutSession,
  CheckoutSessionId,
  CheckoutSubmitInput,
} from "../types";

export interface UseCheckoutSessionOptions {
  sessionId: CheckoutSessionId;
}

export interface UseCheckoutSessionResult {
  session: CheckoutSession | null;
  isLoading: boolean;
  error: Error | null;
}

export type UseCheckoutSession = (
  options: UseCheckoutSessionOptions,
) => UseCheckoutSessionResult;

export interface UseCheckoutSubmitResult {
  submit: (input: CheckoutSubmitInput) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
}

export type UseCheckoutSubmit = () => UseCheckoutSubmitResult;
