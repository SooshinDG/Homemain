export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export type AddToCartProduct = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  currency: string;
  isDrawerOpen: boolean;
}

export interface CartActions {
  addToCart: (product: AddToCartProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  setCurrency: (currency: string) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
}

export type CartStore = CartState & CartActions;
