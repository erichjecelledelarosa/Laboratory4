import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import products from "./data/products";
import "./App.css";

function App() {
  // Cart state from Lab 3
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Lab 4 states for the live search and filter
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Debounce effect: wait 300ms after the user stops typing before
  // updating debouncedSearch. The cleanup cancels the previous timer.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // This function is passed to every ProductCard as a prop.
  // The child calls it and sends the product title back up to App.
  function handleAddToCart(productTitle) {
    setCartCount(cartCount + 1);
    setLastAdded(productTitle);
  }

  // Filter by search text and by category.
  // The original products array is not changed, filter() returns a new array.
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort by price. We make a copy with the spread operator [...filteredProducts]
  // so the original products array stays the same.
  const displayedProducts = [...filteredProducts];

  if (sortOrder === "low-to-high") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  // Clear Filters puts the search text, category, and sort order back to default
  function handleClearFilters() {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <h1 className="store-name">CvSU Mini Store</h1>
          <div className="cart-box">Cart: {cartCount}</div>
        </div>
      </header>

      {/* Hero section */}
      <section className="hero">
        <div className="container">
          <h2>Welcome to CvSU Mini Store!</h2>
          <p>
            Affordable school supplies, gadgets, and CvSU merchandise for every
            student. Browse our products and add them to your cart.
          </p>
        </div>
      </section>

      {/* Cart message */}
      <section className="container">
        <div className="cart-message">
          {cartCount === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <p>
              Items added to cart: {cartCount} (Last added: {lastAdded})
            </p>
          )}
        </div>
      </section>

      {/* Product list */}
      <main className="container">
        <h2 className="section-title">Our Products</h2>

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <p className="result-count">
          Showing {displayedProducts.length} of {products.length} products
        </p>

        {displayedProducts.length === 0 ? (
          <p className="empty-state">
            No products found. Try a different keyword or category.
          </p>
        ) : (
          <div className="product-grid">
            {displayedProducts.map((product) => {
              // Some products have a special badge passed using the children prop
              let badge = null;
              if (product.id === 2) {
                badge = <span className="badge best-seller">Best Seller</span>;
              } else if (product.id === 6) {
                badge = <span className="badge new-arrival">New Arrival</span>;
              }

              return (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  inStock={product.inStock}
                  onAddToCart={handleAddToCart}
                >
                  {badge}
                </ProductCard>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>CvSU Mini Store - Laboratory Exercise 4 (useState and useEffect)</p>
        <p>All prices are in Philippine Peso (₱)</p>
      </footer>
    </div>
  );
}

export default App;
