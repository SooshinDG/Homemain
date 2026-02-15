import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AdminProduct, AdminProductPayload } from "../hooks/useAdminProduct";

type ProductFormValues = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
};

type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

export interface ProductFormProps {
  mode: "create" | "edit";
  initialProduct?: Partial<AdminProduct | AdminProductPayload>;
  onSubmit: (payload: AdminProductPayload) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
}

const toInitialValues = (
  initialProduct?: Partial<AdminProduct | AdminProductPayload>,
): ProductFormValues => ({
  name: initialProduct?.name ?? "",
  description: initialProduct?.description ?? "",
  price:
    initialProduct?.price !== undefined && Number.isFinite(initialProduct.price)
      ? String(initialProduct.price)
      : "",
  image: initialProduct?.image ?? "",
  category: initialProduct?.category ?? "",
});

const isLikelyUrl = (value: string): boolean => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const validateForm = (values: ProductFormValues): ProductFormErrors => {
  const errors: ProductFormErrors = {};

  if (values.name.trim().length === 0) {
    errors.name = "Name is required.";
  }

  if (values.description.trim().length === 0) {
    errors.description = "Description is required.";
  }

  const priceValue = Number(values.price);
  if (!Number.isFinite(priceValue) || priceValue <= 0) {
    errors.price = "Price must be a number greater than 0.";
  }

  if (values.image.trim().length === 0) {
    errors.image = "Image URL is required.";
  } else if (!isLikelyUrl(values.image.trim())) {
    errors.image = "Image must be a valid http(s) URL.";
  }

  if (values.category.trim().length === 0) {
    errors.category = "Category is required.";
  }

  return errors;
};

const hasErrors = (errors: ProductFormErrors): boolean => Object.keys(errors).length > 0;

export const ProductForm = ({
  mode,
  initialProduct,
  onSubmit,
  onCancel,
  submitLabel,
}: ProductFormProps) => {
  const [values, setValues] = useState<ProductFormValues>(toInitialValues(initialProduct));
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(toInitialValues(initialProduct));
    setErrors({});
  }, [initialProduct, mode]);

  const resolvedSubmitLabel = useMemo(() => {
    if (submitLabel) {
      return submitLabel;
    }
    return mode === "edit" ? "Save changes" : "Create product";
  }, [mode, submitLabel]);

  const handleChange =
    (field: keyof ProductFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const nextValue = event.target.value;
      setValues((previousValues) => ({
        ...previousValues,
        [field]: nextValue,
      }));

      setErrors((previousErrors) => {
        if (!previousErrors[field]) {
          return previousErrors;
        }
        const { [field]: removedError, ...restErrors } = previousErrors;
        return removedError ? restErrors : previousErrors;
      });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const validationResult = validateForm(values);
    if (hasErrors(validationResult)) {
      setErrors(validationResult);
      return;
    }

    const payload: AdminProductPayload = {
      name: values.name.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      image: values.image.trim(),
      category: values.category.trim(),
    };

    setIsSubmitting(true);
    try {
      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="product-name">Name</label>
        <input
          id="product-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "product-name-error" : undefined}
        />
        {errors.name && (
          <p id="product-name-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="product-description">Description</label>
        <textarea
          id="product-description"
          name="description"
          value={values.description}
          onChange={handleChange("description")}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "product-description-error" : undefined}
        />
        {errors.description && (
          <p id="product-description-error" role="alert">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="product-price">Price</label>
        <input
          id="product-price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={values.price}
          onChange={handleChange("price")}
          aria-invalid={Boolean(errors.price)}
          aria-describedby={errors.price ? "product-price-error" : undefined}
        />
        {errors.price && (
          <p id="product-price-error" role="alert">
            {errors.price}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="product-image">Image URL</label>
        <input
          id="product-image"
          name="image"
          type="url"
          value={values.image}
          onChange={handleChange("image")}
          aria-invalid={Boolean(errors.image)}
          aria-describedby={errors.image ? "product-image-error" : undefined}
        />
        {errors.image && (
          <p id="product-image-error" role="alert">
            {errors.image}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="product-category">Category</label>
        <input
          id="product-category"
          name="category"
          type="text"
          value={values.category}
          onChange={handleChange("category")}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? "product-category-error" : undefined}
        />
        {errors.category && (
          <p id="product-category-error" role="alert">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : resolvedSubmitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
