import { useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import "./App.css";

function App() {
  // useState is only used here in the parent component
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // This function is passed to every ProductCard as a prop.
  // The child calls it and sends the product title back up to App.
  function handleAddToCart(productTitle) {
    setCartCount(cartCount + 1);
    setLastAdded(productTitle);
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
        <div className="product-grid">
          {products.map((product) => {
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
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>CvSU Mini Store - Laboratory Exercise 3 (React Props)</p>
        <p>All prices are in Philippine Peso (₱)</p>
      </footer>
    </div>
  );
}

export default App;
