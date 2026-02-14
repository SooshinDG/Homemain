import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type {
  CheckoutFormInitialValues,
  CheckoutFormValues,
  CustomerDetails,
  ShippingAddress,
} from "../types";

export interface CheckoutFormProps {
  readonly onSubmit: (values: CheckoutFormValues) => Promise<void> | void;
  readonly isSubmitting?: boolean;
  readonly submitLabel?: string;
  readonly initialValues?: CheckoutFormInitialValues;
  readonly className?: string;
}

const DEFAULT_CUSTOMER: CustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const DEFAULT_ADDRESS: ShippingAddress = {
  line1: "",
  line2: "",
  city: "",
  stateOrRegion: "",
  postalCode: "",
  country: "",
};

const resolveFormValues = (
  initialValues?: CheckoutFormInitialValues,
): CheckoutFormValues => ({
  customer: {
    ...DEFAULT_CUSTOMER,
    ...initialValues?.customer,
  },
  shippingAddress: {
    ...DEFAULT_ADDRESS,
    ...initialValues?.shippingAddress,
  },
  notes: initialValues?.notes ?? "",
});

export const CheckoutForm = ({
  onSubmit,
  isSubmitting = false,
  submitLabel = "Place Order",
  initialValues,
  className,
}: CheckoutFormProps): JSX.Element => {
  const [values, setValues] = useState<CheckoutFormValues>(() =>
    resolveFormValues(initialValues),
  );

  useEffect(() => {
    setValues(resolveFormValues(initialValues));
  }, [initialValues]);

  const updateCustomerField =
    (field: keyof CustomerDetails) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const nextValue = event.target.value;
      setValues((previous) => ({
        ...previous,
        customer: {
          ...previous.customer,
          [field]: nextValue,
        },
      }));
    };

  const updateShippingField =
    (field: keyof ShippingAddress) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const nextValue = event.target.value;
      setValues((previous) => ({
        ...previous,
        shippingAddress: {
          ...previous.shippingAddress,
          [field]: nextValue,
        },
      }));
    };

  const updateNotes = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const nextValue = event.target.value;
    setValues((previous) => ({
      ...previous,
      notes: nextValue,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <fieldset disabled={isSubmitting}>
        <legend>Customer information</legend>
        <label>
          First name
          <input
            required
            autoComplete="given-name"
            value={values.customer.firstName}
            onChange={updateCustomerField("firstName")}
          />
        </label>
        <label>
          Last name
          <input
            required
            autoComplete="family-name"
            value={values.customer.lastName}
            onChange={updateCustomerField("lastName")}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={values.customer.email}
            onChange={updateCustomerField("email")}
          />
        </label>
        <label>
          Phone (optional)
          <input
            autoComplete="tel"
            value={values.customer.phone ?? ""}
            onChange={updateCustomerField("phone")}
          />
        </label>
      </fieldset>

      <fieldset disabled={isSubmitting}>
        <legend>Shipping address</legend>
        <label>
          Address line 1
          <input
            required
            autoComplete="address-line1"
            value={values.shippingAddress.line1}
            onChange={updateShippingField("line1")}
          />
        </label>
        <label>
          Address line 2 (optional)
          <input
            autoComplete="address-line2"
            value={values.shippingAddress.line2 ?? ""}
            onChange={updateShippingField("line2")}
          />
        </label>
        <label>
          City
          <input
            required
            autoComplete="address-level2"
            value={values.shippingAddress.city}
            onChange={updateShippingField("city")}
          />
        </label>
        <label>
          State / Region
          <input
            required
            autoComplete="address-level1"
            value={values.shippingAddress.stateOrRegion}
            onChange={updateShippingField("stateOrRegion")}
          />
        </label>
        <label>
          Postal code
          <input
            required
            autoComplete="postal-code"
            value={values.shippingAddress.postalCode}
            onChange={updateShippingField("postalCode")}
          />
        </label>
        <label>
          Country
          <input
            required
            autoComplete="country-name"
            value={values.shippingAddress.country}
            onChange={updateShippingField("country")}
          />
        </label>
      </fieldset>

      <label>
        Order notes (optional)
        <textarea value={values.notes ?? ""} onChange={updateNotes} />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>
    </form>
  );
};
