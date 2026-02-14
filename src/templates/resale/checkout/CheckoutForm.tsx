import type { CSSProperties, FormEvent } from "react";

export interface CheckoutFormProps {
  title?: string;
  submitLabel?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const cardStyle: CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: "1rem",
  backgroundColor: "#ffffff",
  padding: "1.25rem",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
};

const titleStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontSize: "1.125rem",
  lineHeight: 1.2,
  fontWeight: 700,
  color: "#0f172a",
};

const formStyle: CSSProperties = {
  display: "grid",
  gap: "1rem",
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: "0.75rem",
};

const sectionHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.875rem",
  fontWeight: 700,
  color: "#334155",
  textTransform: "uppercase",
  letterSpacing: "0.03em",
};

const inputGridStyle: CSSProperties = {
  display: "grid",
  gap: "0.75rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
};

const fieldStyle: CSSProperties = {
  display: "grid",
  gap: "0.375rem",
};

const labelStyle: CSSProperties = {
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "#334155",
};

const inputStyle: CSSProperties = {
  width: "100%",
  minHeight: "2.5rem",
  border: "1px solid #cbd5e1",
  borderRadius: "0.625rem",
  padding: "0.625rem 0.75rem",
  fontSize: "0.9375rem",
  color: "#0f172a",
  backgroundColor: "#ffffff",
};

const buttonStyle: CSSProperties = {
  marginTop: "0.25rem",
  minHeight: "2.75rem",
  border: "none",
  borderRadius: "0.75rem",
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  fontSize: "0.9375rem",
  fontWeight: 700,
  cursor: "pointer",
};

export function CheckoutForm({
  title = "Checkout details",
  submitLabel = "Complete purchase",
  onSubmit,
}: CheckoutFormProps) {
  return (
    <section aria-labelledby="checkout-form-title" style={cardStyle}>
      <h2 id="checkout-form-title" style={titleStyle}>
        {title}
      </h2>
      <form style={formStyle} onSubmit={onSubmit}>
        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Contact</p>
          <label style={fieldStyle}>
            <span style={labelStyle}>Email</span>
            <input type="email" name="email" autoComplete="email" required style={inputStyle} />
          </label>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Shipping</p>
          <div style={inputGridStyle}>
            <label style={fieldStyle}>
              <span style={labelStyle}>First name</span>
              <input type="text" name="firstName" autoComplete="given-name" required style={inputStyle} />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>Last name</span>
              <input type="text" name="lastName" autoComplete="family-name" required style={inputStyle} />
            </label>
          </div>
          <label style={fieldStyle}>
            <span style={labelStyle}>Address</span>
            <input type="text" name="address" autoComplete="street-address" required style={inputStyle} />
          </label>
          <div style={inputGridStyle}>
            <label style={fieldStyle}>
              <span style={labelStyle}>City</span>
              <input type="text" name="city" autoComplete="address-level2" required style={inputStyle} />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>Postal code</span>
              <input type="text" name="postalCode" autoComplete="postal-code" required style={inputStyle} />
            </label>
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadingStyle}>Payment</p>
          <label style={fieldStyle}>
            <span style={labelStyle}>Card number</span>
            <input type="text" name="cardNumber" autoComplete="cc-number" required style={inputStyle} />
          </label>
          <div style={inputGridStyle}>
            <label style={fieldStyle}>
              <span style={labelStyle}>Expiry</span>
              <input type="text" name="cardExpiry" autoComplete="cc-exp" required style={inputStyle} />
            </label>
            <label style={fieldStyle}>
              <span style={labelStyle}>CVC</span>
              <input type="text" name="cardCvc" autoComplete="cc-csc" required style={inputStyle} />
            </label>
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          {submitLabel}
        </button>
      </form>
    </section>
  );
}
