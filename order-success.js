(() => {
  "use strict";

  const CART_STORAGE_KEYS = [
    "cart",
    "cartItems",
    "shoppingCart",
    "basket",
    "checkoutCart",
    "cartCount",
    "cartTotal",
  ];

  const ORDER_STORAGE_KEYS = [
    "latestOrder",
    "lastOrder",
    "checkoutOrder",
    "orderSuccessPayload",
  ];

  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function toNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function formatCurrency(amount) {
    return CURRENCY_FORMATTER.format(toNumber(amount));
  }

  function safeParseJSON(value) {
    if (typeof value !== "string") {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function tryStorageGet(storage, key) {
    try {
      return storage.getItem(key);
    } catch {
      return null;
    }
  }

  function tryStorageRemove(storage, key) {
    try {
      storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  function getOrderFromStorage() {
    const storages = [window.localStorage, window.sessionStorage];

    for (const storage of storages) {
      for (const key of ORDER_STORAGE_KEYS) {
        const raw = tryStorageGet(storage, key);
        const parsed = safeParseJSON(raw);

        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          return parsed;
        }
      }
    }

    return null;
  }

  function parseItemsFromQuery(rawItems) {
    if (!rawItems) {
      return [];
    }

    const directParsed = safeParseJSON(rawItems);
    if (Array.isArray(directParsed)) {
      return directParsed;
    }

    try {
      const decoded = decodeURIComponent(rawItems);
      const decodedParsed = safeParseJSON(decoded);
      return Array.isArray(decodedParsed) ? decodedParsed : [];
    } catch {
      return [];
    }
  }

  function getOrderFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const hasOrderContext =
      params.has("orderId") ||
      params.has("order_id") ||
      params.has("id") ||
      params.has("total") ||
      params.has("subtotal") ||
      params.has("items");

    if (!hasOrderContext) {
      return null;
    }

    return {
      orderId: params.get("orderId") || params.get("order_id") || params.get("id"),
      orderDate: params.get("orderDate") || params.get("date"),
      subtotal: params.get("subtotal"),
      shipping: params.get("shipping"),
      tax: params.get("tax"),
      total: params.get("total"),
      items: parseItemsFromQuery(params.get("items")),
    };
  }

  function normalizeItems(rawItems) {
    if (!Array.isArray(rawItems)) {
      return [];
    }

    return rawItems
      .map((item, index) => {
        const quantity = Math.max(1, Math.floor(toNumber(item?.quantity, 1)));
        const unitPrice = toNumber(item?.unitPrice ?? item?.price ?? item?.amount, 0);
        const lineTotal = toNumber(item?.lineTotal ?? item?.total, unitPrice * quantity);

        return {
          name: String(item?.name ?? item?.title ?? `Item ${index + 1}`),
          quantity,
          unitPrice,
          lineTotal,
        };
      })
      .filter((item) => item.lineTotal >= 0);
  }

  function normalizeOrder(rawOrder) {
    const items = normalizeItems(rawOrder?.items);
    const subtotalFromItems = items.reduce((sum, item) => sum + item.lineTotal, 0);

    const subtotal = toNumber(rawOrder?.subtotal, subtotalFromItems);
    const shipping = toNumber(rawOrder?.shipping, 0);
    const tax = toNumber(rawOrder?.tax, 0);
    const total = toNumber(rawOrder?.total, subtotal + shipping + tax);

    const providedDate = rawOrder?.orderDate ?? rawOrder?.date;
    let formattedDate = new Date().toLocaleString();

    if (providedDate) {
      const parsedDate = new Date(providedDate);
      formattedDate = Number.isNaN(parsedDate.getTime())
        ? String(providedDate)
        : parsedDate.toLocaleString();
    }

    const fallbackOrderId = `ORD-${Date.now().toString().slice(-6)}`;
    const orderId = String(rawOrder?.orderId ?? rawOrder?.id ?? fallbackOrderId);

    return {
      orderId,
      orderDate: formattedDate,
      items,
      subtotal,
      shipping,
      tax,
      total,
    };
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function renderItems(items) {
    const list = document.getElementById("order-items");
    if (!list) {
      return;
    }

    list.innerHTML = "";

    if (items.length === 0) {
      const emptyRow = document.createElement("li");
      emptyRow.className = "empty-items";
      emptyRow.textContent = "No line items were found for this order.";
      list.appendChild(emptyRow);
      return;
    }

    for (const item of items) {
      const row = document.createElement("li");
      row.className = "item-row";

      const left = document.createElement("div");

      const name = document.createElement("div");
      name.className = "item-name";
      name.textContent = item.name;

      const meta = document.createElement("div");
      meta.className = "item-meta";
      meta.textContent = `Qty ${item.quantity} x ${formatCurrency(item.unitPrice)}`;

      left.append(name, meta);

      const price = document.createElement("div");
      price.className = "item-price";
      price.textContent = formatCurrency(item.lineTotal);

      row.append(left, price);
      list.appendChild(row);
    }
  }

  function renderOrder(order) {
    setText("order-id", order.orderId);
    setText("order-date", order.orderDate);
    setText("subtotal", formatCurrency(order.subtotal));
    setText("shipping", formatCurrency(order.shipping));
    setText("tax", formatCurrency(order.tax));
    setText("total", formatCurrency(order.total));

    renderItems(order.items);
  }

  function clearCart() {
    const storages = [window.localStorage, window.sessionStorage];
    let didRemoveAnyValue = false;

    for (const storage of storages) {
      for (const key of CART_STORAGE_KEYS) {
        const existingValue = tryStorageGet(storage, key);
        if (existingValue !== null) {
          const removed = tryStorageRemove(storage, key);
          didRemoveAnyValue = didRemoveAnyValue || removed;
        }
      }
    }

    const statusNode = document.getElementById("clear-cart-status");
    if (statusNode) {
      statusNode.textContent = didRemoveAnyValue
        ? "Cart has been cleared."
        : "Cart is already empty.";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const storedOrder = getOrderFromStorage();
    const queryOrder = getOrderFromQuery();
    const normalizedOrder = normalizeOrder(storedOrder || queryOrder || {});

    renderOrder(normalizedOrder);
    clearCart();
  });
})();
