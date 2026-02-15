import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type {
  CheckoutFormInitialValues,
  CheckoutFormValues,
  CustomerDetails,
  ShippingAddress,
} from "../types";

export interface CheckoutFormProps {
  readonly createOrder: (values: CheckoutFormValues) => Promise<void> | void;
  readonly isSubmitting?: boolean;
  readonly submitLabel?: string;
  readonly initialValues?: CheckoutFormInitialValues;
  readonly className?: string;
}

interface CheckoutFormErrors {
  customer: Partial<Record<keyof CustomerDetails, string>>;
  shippingAddress: Partial<Record<keyof ShippingAddress, string>>;
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

const createEmptyErrors = (): CheckoutFormErrors => ({
  customer: {},
  shippingAddress: {},
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasErrors = (errors: CheckoutFormErrors): boolean =>
  Object.keys(errors.customer).length > 0 ||
  Object.keys(errors.shippingAddress).length > 0;

const normalizeFormValues = (values: CheckoutFormValues): CheckoutFormValues => ({
  customer: {
    firstName: values.customer.firstName.trim(),
    lastName: values.customer.lastName.trim(),
    email: values.customer.email.trim(),
    phone: values.customer.phone?.trim() ?? "",
  },
  shippingAddress: {
    line1: values.shippingAddress.line1.trim(),
    line2: values.shippingAddress.line2?.trim() ?? "",
    city: values.shippingAddress.city.trim(),
    stateOrRegion: values.shippingAddress.stateOrRegion.trim(),
    postalCode: values.shippingAddress.postalCode.trim(),
    country: values.shippingAddress.country.trim(),
  },
  notes: values.notes?.trim() ?? "",
});

const validateFormValues = (values: CheckoutFormValues): CheckoutFormErrors => {
  const errors = createEmptyErrors();

  if (values.customer.firstName.length === 0) {
    errors.customer.firstName = "First name is required.";
  }

  if (values.customer.lastName.length === 0) {
    errors.customer.lastName = "Last name is required.";
  }

  if (values.customer.email.length === 0) {
    errors.customer.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(values.customer.email)) {
    errors.customer.email = "Enter a valid email address.";
  }

  if (values.shippingAddress.line1.length === 0) {
    errors.shippingAddress.line1 = "Address line 1 is required.";
  }

  if (values.shippingAddress.city.length === 0) {
    errors.shippingAddress.city = "City is required.";
  }

  if (values.shippingAddress.stateOrRegion.length === 0) {
    errors.shippingAddress.stateOrRegion = "State or region is required.";
  }

  if (values.shippingAddress.postalCode.length === 0) {
    errors.shippingAddress.postalCode = "Postal code is required.";
  }

  if (values.shippingAddress.country.length === 0) {
    errors.shippingAddress.country = "Country is required.";
  }

  return errors;
};

const inputClassName = (hasError: boolean): string =>
  [
    "mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2",
    hasError
      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100"
      : "border-slate-300 focus:border-slate-900 focus:ring-slate-200",
    "disabled:cursor-not-allowed disabled:bg-slate-100",
  ].join(" ");

const textAreaClassName = (hasError: boolean): string =>
  `${inputClassName(hasError)} min-h-24 resize-y`;

export const CheckoutForm = ({
  createOrder,
  isSubmitting = false,
  submitLabel = "Place Order",
  initialValues,
  className,
}: CheckoutFormProps): JSX.Element => {
  const [values, setValues] = useState<CheckoutFormValues>(() =>
    resolveFormValues(initialValues),
  );
  const [errors, setErrors] = useState<CheckoutFormErrors>(createEmptyErrors);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  useEffect(() => {
    setValues(resolveFormValues(initialValues));
    setErrors(createEmptyErrors());
    setHasAttemptedSubmit(false);
  }, [initialValues]);

  const updateCustomerField =
    (field: keyof CustomerDetails) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const nextValue = event.target.value;
      setValues((previous) => {
        const nextValues: CheckoutFormValues = {
          ...previous,
          customer: {
            ...previous.customer,
            [field]: nextValue,
          },
        };

        if (hasAttemptedSubmit) {
          setErrors(validateFormValues(normalizeFormValues(nextValues)));
        }

        return nextValues;
      });
    };

  const updateShippingField =
    (field: keyof ShippingAddress) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const nextValue = event.target.value;
      setValues((previous) => {
        const nextValues: CheckoutFormValues = {
          ...previous,
          shippingAddress: {
            ...previous.shippingAddress,
            [field]: nextValue,
          },
        };

        if (hasAttemptedSubmit) {
          setErrors(validateFormValues(normalizeFormValues(nextValues)));
        }

        return nextValues;
      });
    };

  const updateNotes = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const nextValue = event.target.value;
    setValues((previous) => {
      const nextValues: CheckoutFormValues = {
        ...previous,
        notes: nextValue,
      };

      if (hasAttemptedSubmit) {
        setErrors(validateFormValues(normalizeFormValues(nextValues)));
      }

      return nextValues;
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    setHasAttemptedSubmit(true);

    const normalizedValues = normalizeFormValues(values);
    const nextErrors = validateFormValues(normalizedValues);

    setValues(normalizedValues);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    await createOrder(normalizedValues);
  };

  const customerErrors = errors.customer;
  const shippingErrors = errors.shippingAddress;

  return (
    <form
      className={[
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className ?? "",
      ].join(" ")}
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset disabled={isSubmitting} className="space-y-8">
        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Contact details
            </h2>
            <p className="text-sm text-slate-500">
              We&apos;ll use this information for order updates.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              First name
              <input
                autoComplete="given-name"
                aria-invalid={Boolean(customerErrors.firstName)}
                aria-describedby={
                  customerErrors.firstName
                    ? "checkout-first-name-error"
                    : undefined
                }
                className={inputClassName(Boolean(customerErrors.firstName))}
                value={values.customer.firstName}
                onChange={updateCustomerField("firstName")}
              />
              {customerErrors.firstName ? (
                <p id="checkout-first-name-error" className="mt-1 text-xs text-rose-600">
                  {customerErrors.firstName}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Last name
              <input
                autoComplete="family-name"
                aria-invalid={Boolean(customerErrors.lastName)}
                aria-describedby={
                  customerErrors.lastName
                    ? "checkout-last-name-error"
                    : undefined
                }
                className={inputClassName(Boolean(customerErrors.lastName))}
                value={values.customer.lastName}
                onChange={updateCustomerField("lastName")}
              />
              {customerErrors.lastName ? (
                <p id="checkout-last-name-error" className="mt-1 text-xs text-rose-600">
                  {customerErrors.lastName}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Email
              <input
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(customerErrors.email)}
                aria-describedby={
                  customerErrors.email ? "checkout-email-error" : undefined
                }
                className={inputClassName(Boolean(customerErrors.email))}
                value={values.customer.email}
                onChange={updateCustomerField("email")}
              />
              {customerErrors.email ? (
                <p id="checkout-email-error" className="mt-1 text-xs text-rose-600">
                  {customerErrors.email}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Phone (optional)
              <input
                autoComplete="tel"
                className={inputClassName(false)}
                value={values.customer.phone ?? ""}
                onChange={updateCustomerField("phone")}
              />
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Shipping address
            </h2>
            <p className="text-sm text-slate-500">
              Enter where we should deliver your order.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Address line 1
              <input
                autoComplete="address-line1"
                aria-invalid={Boolean(shippingErrors.line1)}
                aria-describedby={
                  shippingErrors.line1 ? "checkout-address-line1-error" : undefined
                }
                className={inputClassName(Boolean(shippingErrors.line1))}
                value={values.shippingAddress.line1}
                onChange={updateShippingField("line1")}
              />
              {shippingErrors.line1 ? (
                <p
                  id="checkout-address-line1-error"
                  className="mt-1 text-xs text-rose-600"
                >
                  {shippingErrors.line1}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              Address line 2 (optional)
              <input
                autoComplete="address-line2"
                className={inputClassName(false)}
                value={values.shippingAddress.line2 ?? ""}
                onChange={updateShippingField("line2")}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              City
              <input
                autoComplete="address-level2"
                aria-invalid={Boolean(shippingErrors.city)}
                aria-describedby={
                  shippingErrors.city ? "checkout-city-error" : undefined
                }
                className={inputClassName(Boolean(shippingErrors.city))}
                value={values.shippingAddress.city}
                onChange={updateShippingField("city")}
              />
              {shippingErrors.city ? (
                <p id="checkout-city-error" className="mt-1 text-xs text-rose-600">
                  {shippingErrors.city}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              State / Region
              <input
                autoComplete="address-level1"
                aria-invalid={Boolean(shippingErrors.stateOrRegion)}
                aria-describedby={
                  shippingErrors.stateOrRegion
                    ? "checkout-state-or-region-error"
                    : undefined
                }
                className={inputClassName(Boolean(shippingErrors.stateOrRegion))}
                value={values.shippingAddress.stateOrRegion}
                onChange={updateShippingField("stateOrRegion")}
              />
              {shippingErrors.stateOrRegion ? (
                <p
                  id="checkout-state-or-region-error"
                  className="mt-1 text-xs text-rose-600"
                >
                  {shippingErrors.stateOrRegion}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Postal code
              <input
                autoComplete="postal-code"
                aria-invalid={Boolean(shippingErrors.postalCode)}
                aria-describedby={
                  shippingErrors.postalCode
                    ? "checkout-postal-code-error"
                    : undefined
                }
                className={inputClassName(Boolean(shippingErrors.postalCode))}
                value={values.shippingAddress.postalCode}
                onChange={updateShippingField("postalCode")}
              />
              {shippingErrors.postalCode ? (
                <p
                  id="checkout-postal-code-error"
                  className="mt-1 text-xs text-rose-600"
                >
                  {shippingErrors.postalCode}
                </p>
              ) : null}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Country
              <input
                autoComplete="country-name"
                aria-invalid={Boolean(shippingErrors.country)}
                aria-describedby={
                  shippingErrors.country ? "checkout-country-error" : undefined
                }
                className={inputClassName(Boolean(shippingErrors.country))}
                value={values.shippingAddress.country}
                onChange={updateShippingField("country")}
              />
              {shippingErrors.country ? (
                <p id="checkout-country-error" className="mt-1 text-xs text-rose-600">
                  {shippingErrors.country}
                </p>
              ) : null}
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Order notes (optional)
            <textarea
              className={textAreaClassName(false)}
              value={values.notes ?? ""}
              onChange={updateNotes}
            />
          </label>
        </section>
      </fieldset>

      {hasAttemptedSubmit && hasErrors(errors) ? (
        <p className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          Please correct the highlighted fields before placing your order.
        </p>
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Creating order..." : submitLabel}
        </button>
      </div>
    </form>
  );
};
