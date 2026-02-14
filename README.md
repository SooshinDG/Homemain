# Homemain
홈페이지 본격 제작

## Order success page

This repository now includes a standalone order success page:

- `order-success.html`
- `order-success.css`
- `order-success.js`

### Behavior

- Shows a confirmation message.
- Displays order summary details and item lines.
- Reads order data from storage keys:
  - `latestOrder`
  - `lastOrder`
  - `checkoutOrder`
  - `orderSuccessPayload`
- Falls back to query params (`orderId`, `subtotal`, `shipping`, `tax`, `total`, `items`).
- Clears cart storage keys on load:
  - `cart`
  - `cartItems`
  - `shoppingCart`
  - `basket`
  - `checkoutCart`
  - `cartCount`
  - `cartTotal`
