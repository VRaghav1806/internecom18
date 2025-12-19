import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddProducts from "./components/AddProducts";
import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if exists
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div className="app-container">
      <Header cartLength={cart.length} user={user} setUser={setUser} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Product cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/addproduct" element={<AddProducts />} />
          <Route
            path="/buynow/:id"
            element={
              <ProtectedRoute>
                <BuyNow />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;