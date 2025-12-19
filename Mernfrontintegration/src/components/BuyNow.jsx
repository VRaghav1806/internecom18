import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../utils/api";

export default function BuyNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const allProducts = await response.json();
      const foundProduct = allProducts.find(p => p._id === id);

      if (!foundProduct) {
        throw new Error('Product not found');
      }

      setProduct(foundProduct);

      // Generate order details
      const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
      setOrderDetails({
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        time: new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert(`Order ${orderDetails.orderId} is being processed. You will receive updates via email.`);
      setIsProcessing(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="loading-spinner"></div>
        <span className="ml-4 text-lg text-gray-600">Processing your order...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto text-center py-16 animate-fadeInUp">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || 'Product not found'}</p>
          <div className="space-y-3">
            <button
              onClick={fetchProduct}
              className="w-full btn-primary text-white px-6 py-3 rounded-xl font-semibold"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full px-8 py-12 animate-fade-in">
      <div className="w-full max-w-5xl">
        {/* Success Header */}
        <div className="bg-[var(--primary)] rounded-lg shadow-xl overflow-hidden mb-12 text-center py-16 px-6 relative">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
              <svg className="h-10 w-10 text-[var(--secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold !text-orange-500 mb-4">
              Order Confirmed
            </h1>
            <p className="text-lg text-gray-300 font-light tracking-wide uppercase">
              Thank you for choosing Ecommerce
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Details */}
          <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
                Your Purchase
              </h2>

              <div className="flex items-start gap-6 mb-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-32 object-cover border border-gray-100 bg-gray-50"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=200&q=80";
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[var(--primary)] font-serif mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-[var(--secondary)]">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Paid
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Features */}
              <div className="bg-gray-50 p-6 rounded-md border border-gray-100">
                <h4 className="font-bold text-[var(--primary)] text-xs uppercase tracking-widest mb-4">Included with purchase</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free shipping & handling
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    1 year warranty included
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    30-day return policy
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden flex flex-col">
            <div className="p-8 flex-grow">
              <h2 className="text-2xl font-serif font-bold text-[var(--primary)] mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
                Order Details
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 uppercase tracking-wide font-medium">Order ID</span>
                  <span className="font-mono font-bold text-[var(--primary)]">{orderDetails?.orderId}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 uppercase tracking-wide font-medium">Ordered On</span>
                  <span className="text-gray-800">{orderDetails?.date} at {orderDetails?.time}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 uppercase tracking-wide font-medium">Status</span>
                  <span className="text-[var(--secondary)] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse"></span>
                    Processing
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-50">
                  <span className="text-gray-500 uppercase tracking-wide font-medium">Dimensions</span>
                  <span className="text-gray-800">Standard Shipping</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 uppercase tracking-wide font-medium">Est. Delivery</span>
                  <span className="font-bold text-[var(--primary)]">{orderDetails?.estimatedDelivery}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6 mt-auto">
                <button
                  onClick={handleTrackOrder}
                  disabled={isProcessing}
                  className="w-full btn-primary text-white px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? 'Processing...' : 'Track Order'}
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full btn-outline px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm text-center block hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}