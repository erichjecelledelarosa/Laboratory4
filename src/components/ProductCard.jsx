import "./ProductCard.css";

function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  // Show the price like this: ₱1,299.00
  const formattedPrice =
    "₱" +
    price.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // When the button is clicked, we call the function given by the parent
  // and pass the product title to it.
  function handleAddToCart() {
    onAddToCart(title);
  }

  return (
    <div className={inStock ? "product-card" : "product-card out-of-stock"}>
      {children && <div className="badges">{children}</div>}

      <div className="product-image">Product Image</div>

      <div className="product-info">
        <p className="product-category">{category}</p>
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{formattedPrice}</p>

        {inStock ? (
          <p className="stock in-stock">In Stock</p>
        ) : (
          <p className="stock out-of-stock">Out of Stock</p>
        )}

        <button
          className="add-button"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
