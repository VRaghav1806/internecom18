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

function App() {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if exists
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header cartLength={cart.length} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            } 
          />
          <Route path="/addproduct" element={<AddProducts/>}/>
          <Route 
            path="/buynow/:id" 
            element={
              <ProtectedRoute>
                <BuyNow />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;