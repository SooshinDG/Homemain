export interface CartItem {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly quantity: number;
  readonly sku?: string;
  readonly imageUrl?: string;
}

export interface CartState {
  readonly items: ReadonlyArray<CartItem>;
  readonly currency: string;
  clearCart: () => void;
}

export type CartSelector<T> = (state: CartState) => T;

export type UseCartStore = <T>(selector: CartSelector<T>) => T;

export type CheckoutStatus = "idle" | "submitting" | "success" | "error";

export interface CustomerDetails {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string;
}

export interface ShippingAddress {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly stateOrRegion: string;
  readonly postalCode: string;
  readonly country: string;
}

export interface CheckoutFormValues {
  readonly customer: CustomerDetails;
  readonly shippingAddress: ShippingAddress;
  readonly notes?: string;
}

export interface CheckoutFormInitialValues {
  readonly customer?: Partial<CustomerDetails>;
  readonly shippingAddress?: Partial<ShippingAddress>;
  readonly notes?: string;
}

export interface OrderTotals {
  readonly subtotal: number;
  readonly shipping: number;
  readonly tax: number;
  readonly grandTotal: number;
}

export interface CreateOrderInput extends CheckoutFormValues {
  readonly id: string;
  readonly createdAt: string;
  readonly items: ReadonlyArray<CartItem>;
  readonly currency: string;
  readonly totals: OrderTotals;
}

export interface Order extends CreateOrderInput {}

export interface OrderRepository {
  createOrder(input: CreateOrderInput): Promise<Order>;
}

export interface UseCheckoutConfig {
  readonly useCartStore: UseCartStore;
  readonly orderRepository: OrderRepository;
  readonly shippingCost?: number;
  readonly taxRate?: number;
  readonly idGenerator?: () => string;
  readonly now?: () => Date;
}

export interface UseCheckoutResult {
  readonly items: ReadonlyArray<CartItem>;
  readonly currency: string;
  readonly totals: OrderTotals;
  readonly status: CheckoutStatus;
  readonly latestOrder: Order | null;
  readonly errorMessage: string | null;
  submitOrder(values: CheckoutFormValues): Promise<Order | null>;
  resetCheckout(): void;
}
