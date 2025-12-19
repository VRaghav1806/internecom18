// API Configuration for both development and production
export const API = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://internecom18.onrender.com' 
    : 'http://localhost:5000');

// Fallback products for development
export const products = [
  {
    _id: "1",
    name: "Premium Laptop",
    price: 85000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    description: "High-performance laptop with latest Intel processor, 16GB RAM, and 512GB SSD"
  },
  {
    _id: "2",
    name: "Smartphone Pro",
    price: 45000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    description: "Latest flagship smartphone with advanced camera system and 5G connectivity"
  },
  {
    _id: "3",
    name: "Wireless Headphones",
    price: 8000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life"
  },
  {
    _id: "4",
    name: "Smart Watch",
    price: 25000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    description: "Advanced fitness tracking smartwatch with health monitoring features"
  },
  {
    _id: "5",
    name: "Gaming Console",
    price: 55000,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    description: "Next-generation gaming console with 4K gaming and ray tracing support"
  },
  {
    _id: "6",
    name: "Tablet Pro",
    price: 65000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    description: "Professional tablet with desktop-class performance and stylus support"
  }
];
