import type { AdminProduct } from "../hooks/useAdminProduct";

export interface AdminProductTableProps {
  products: AdminProduct[];
  onAddNewProduct: () => void;
  onEditProduct: (product: AdminProduct) => void;
  onDeleteProduct: (product: AdminProduct) => Promise<void> | void;
  deletingProductId?: string | null;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const AdminProductTable = ({
  products,
  onAddNewProduct,
  onEditProduct,
  onDeleteProduct,
  deletingProductId = null,
}: AdminProductTableProps) => (
  <section aria-label="Admin product management">
    <header>
      <h2>Products</h2>
      <button type="button" onClick={onAddNewProduct}>
        Add new product
      </button>
    </header>

    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
          <th scope="col">Category</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={6}>No products yet. Add your first product.</td>
          </tr>
        ) : (
          products.map((product) => {
            const isDeleting = deletingProductId === product.id;

            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{currencyFormatter.format(product.price)}</td>
                <td>
                  <a href={product.image} target="_blank" rel="noreferrer">
                    View image
                  </a>
                </td>
                <td>{product.category}</td>
                <td>
                  <button type="button" onClick={() => onEditProduct(product)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(product)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </section>
);

export default AdminProductTable;
