import { useCallback, useMemo, useState } from "react";

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type AdminProductPayload = Omit<
  AdminProduct,
  "id" | "createdAt" | "updatedAt"
>;

export type AdminProductUpdatePayload = Partial<AdminProductPayload>;

/**
 * Adapter boundary for future Supabase persistence integration.
 * The hook currently defaults to local in-memory state when this is omitted.
 */
export interface ProductPersistenceAdapter {
  create(payload: AdminProductPayload): Promise<AdminProduct>;
  update(id: string, payload: AdminProductUpdatePayload): Promise<AdminProduct>;
  remove(id: string): Promise<void>;
}

export interface UseAdminProductOptions {
  initialProducts?: AdminProduct[];
  persistenceAdapter?: ProductPersistenceAdapter;
  now?: () => Date;
  idGenerator?: () => string;
}

export interface UseAdminProductResult {
  products: AdminProduct[];
  createProduct: (payload: AdminProductPayload) => Promise<AdminProduct>;
  updateProduct: (
    id: string,
    payload: AdminProductUpdatePayload,
  ) => Promise<AdminProduct>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => AdminProduct | undefined;
}

const DEFAULT_NOW = (): Date => new Date();

const defaultIdGenerator = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `product_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
};

const sanitizeCreatePayload = (
  payload: AdminProductPayload,
): AdminProductPayload => {
  const normalizedPrice = Number(payload.price);
  const normalizedName = payload.name.trim();
  const normalizedDescription = payload.description.trim();
  const normalizedImage = payload.image.trim();
  const normalizedCategory = payload.category.trim();

  if (normalizedName.length === 0) {
    throw new Error("Product name is required.");
  }

  if (normalizedDescription.length === 0) {
    throw new Error("Product description is required.");
  }

  if (normalizedImage.length === 0) {
    throw new Error("Product image is required.");
  }

  if (normalizedCategory.length === 0) {
    throw new Error("Product category is required.");
  }

  if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
    throw new Error("Product price must be a valid number greater than or equal to 0.");
  }

  return {
    name: normalizedName,
    description: normalizedDescription,
    price: normalizedPrice,
    image: normalizedImage,
    category: normalizedCategory,
  };
};

const sanitizeUpdatePayload = (
  payload: AdminProductUpdatePayload,
): AdminProductUpdatePayload => {
  const nextPayload: AdminProductUpdatePayload = {};

  if (payload.name !== undefined) {
    const normalizedName = payload.name.trim();
    if (normalizedName.length === 0) {
      throw new Error("Product name is required.");
    }
    nextPayload.name = normalizedName;
  }

  if (payload.description !== undefined) {
    const normalizedDescription = payload.description.trim();
    if (normalizedDescription.length === 0) {
      throw new Error("Product description is required.");
    }
    nextPayload.description = normalizedDescription;
  }

  if (payload.image !== undefined) {
    const normalizedImage = payload.image.trim();
    if (normalizedImage.length === 0) {
      throw new Error("Product image is required.");
    }
    nextPayload.image = normalizedImage;
  }

  if (payload.category !== undefined) {
    const normalizedCategory = payload.category.trim();
    if (normalizedCategory.length === 0) {
      throw new Error("Product category is required.");
    }
    nextPayload.category = normalizedCategory;
  }

  if (payload.price !== undefined) {
    const normalizedPrice = Number(payload.price);
    if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
      throw new Error(
        "Product price must be a valid number greater than or equal to 0.",
      );
    }
    nextPayload.price = normalizedPrice;
  }

  return nextPayload;
};

export const useAdminProduct = (
  options: UseAdminProductOptions = {},
): UseAdminProductResult => {
  const [products, setProducts] = useState<AdminProduct[]>(
    options.initialProducts ?? [],
  );

  const now = useMemo(() => options.now ?? DEFAULT_NOW, [options.now]);
  const idGenerator = useMemo(
    () => options.idGenerator ?? defaultIdGenerator,
    [options.idGenerator],
  );

  const getProductById = useCallback(
    (id: string): AdminProduct | undefined =>
      products.find((product) => product.id === id),
    [products],
  );

  const createProduct = useCallback(
    async (payload: AdminProductPayload): Promise<AdminProduct> => {
      const sanitizedPayload = sanitizeCreatePayload(payload);

      let createdProduct: AdminProduct;

      if (options.persistenceAdapter) {
        createdProduct = await options.persistenceAdapter.create(sanitizedPayload);
      } else {
        const timestamp = now().toISOString();
        createdProduct = {
          ...sanitizedPayload,
          id: idGenerator(),
          createdAt: timestamp,
          updatedAt: timestamp,
        };
      }

      setProducts((previousProducts) => [...previousProducts, createdProduct]);
      return createdProduct;
    },
    [idGenerator, now, options.persistenceAdapter],
  );

  const updateProduct = useCallback(
    async (
      id: string,
      payload: AdminProductUpdatePayload,
    ): Promise<AdminProduct> => {
      const existingProduct = products.find((product) => product.id === id);

      if (!existingProduct) {
        throw new Error(`Unable to update product: id "${id}" was not found.`);
      }

      const sanitizedPayload = sanitizeUpdatePayload(payload);
      let updatedProduct: AdminProduct;

      if (options.persistenceAdapter) {
        updatedProduct = await options.persistenceAdapter.update(id, sanitizedPayload);
      } else {
        updatedProduct = {
          ...existingProduct,
          ...sanitizedPayload,
          updatedAt: now().toISOString(),
        };
      }

      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === id ? updatedProduct : product,
        ),
      );

      return updatedProduct;
    },
    [now, options.persistenceAdapter, products],
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<void> => {
      const existingProduct = products.some((product) => product.id === id);

      if (!existingProduct) {
        throw new Error(`Unable to delete product: id "${id}" was not found.`);
      }

      if (options.persistenceAdapter) {
        await options.persistenceAdapter.remove(id);
      }

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== id),
      );
    },
    [options.persistenceAdapter, products],
  );

  return {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
};
