import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/api";

export default function Products({ setCart, cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item, event) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      alert('Item already in cart!');
      return;
    }
    setCart([...cart, { ...item, quantity: 1 }]);

    // Show success animation
    const button = event.target;
    button.innerText = "Added";
    setTimeout(() => button.innerText = "Add to Cart", 1000);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/api/deleteProducts/${id}`, {
        method: "DELETE"
      });
      if (res.status === 204) {
        alert("Product deleted successfully");
        setProducts(products.filter((p) => p._id !== id));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
        <button
          onClick={fetchProducts}
          className="btn-primary px-6 py-2 rounded-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl font-serif font-bold text-[var(--primary)] mb-4">
          The Collection
        </h1>

        <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mt-6"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden">
              <img
                src={p.image || `https://source.unsplash.com/random/400x500/?${p.name.split(' ')[0]}`}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mixture-blend-multiply"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&q=80";
                }}
              />

              {/* Quick Action Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                <Link
                  to={`/buynow/${p._id}`}
                  className="bg-white text-[var(--primary)] px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[var(--secondary)] hover:text-white transition-colors shadow-lg"
                >
                  Quick Buy
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="mb-2">
                <p className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider mb-1">
                  Premium
                </p>
                <h3 className="text-lg font-serif font-bold text-[var(--primary)] truncate" title={p.name}>
                  {p.name}
                </h3>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-medium text-gray-900">
                  ₹{p.price?.toLocaleString()}
                </span>
                {p.price > 1000 && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{Math.floor(p.price * 1.2).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10 leading-relaxed">
                {p.description || "Experience typical premium quality with our signature collection product."}
              </p>

              {/* Spacer */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={(e) => addToCart(p, e)}
                  className="w-full btn-primary py-3 rounded-sm font-bold uppercase tracking-wider text-xs shadow-sm hover:shadow-md"
                >
                  Add to Cart
                </button>

                <div className="flex justify-between items-center text-xs font-medium">
                  <Link
                    to={`/product/${p._id}`}
                    className="text-gray-500 hover:text-[var(--primary)] uppercase tracking-wide flex items-center gap-1 group/link"
                  >
                    View Details
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-gray-400 hover:text-red-500 uppercase tracking-wide transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && !loading && (
        <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200">
          <h3 className="text-2xl font-serif text-[var(--primary)] mb-2">No Products Found</h3>
          <p className="text-gray-500 mb-6">Our collection is currently being updated.</p>
          <Link
            to="/addproduct"
            className="btn-secondary px-8 py-3 rounded-sm inline-block"
          >
            Add Product
          </Link>
        </div>
      )}
    </div>
  );
}
