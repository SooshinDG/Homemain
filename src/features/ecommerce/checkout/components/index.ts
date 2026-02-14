import type {
  CheckoutAddress,
  CheckoutSession,
  CheckoutSessionId,
} from "../types";

export interface CheckoutReviewProps {
  session: CheckoutSession;
  onSubmit?: (sessionId: CheckoutSessionId) => void;
}

export interface CheckoutAddressFormProps {
  address?: CheckoutAddress | null;
  onChange?: (address: CheckoutAddress) => void;
}
