import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { API } from '../utils/api';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item._id === product._id);

    if (existingItem) {
      // Update quantity
      existingItem.quantity = (existingItem.quantity || 1) + quantity;
    } else {
      // Add new item
      existingCart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    setTimeout(() => {
      setIsAddingToCart(false);
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }, 1000);
  };

  const handleBuyNow = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      alert('Please login to continue with your purchase');
      navigate('/login');
      return;
    }

    // Navigate to buy now page
    navigate(`/buynow/${product._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto text-center py-20 animate-fade-in">
        <div className="bg-white border border-gray-100 shadow-lg p-10">
          <div className="text-6xl mb-4">Cannot Find Product</div>
          <h2 className="text-2xl font-serif text-[var(--primary)] mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you\'re looking for doesn\'t exist.'}</p>
          <div className="space-y-3">
            <button
              onClick={fetchProduct}
              className="w-full btn-primary px-6 py-3 rounded-sm font-medium uppercase tracking-wide"
            >
              Try Again
            </button>
            <Link
              to="/"
              className="block w-full text-center text-[var(--primary)] border border-[var(--primary)] px-6 py-3 rounded-sm font-medium uppercase tracking-wide hover:bg-gray-50 transition-colors"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mock additional images for demo
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          to="/"
          className="text-gray-500 hover:text-[var(--primary)] font-medium transition-colors flex items-center gap-2 group text-sm uppercase tracking-wide"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Collection
        </Link>
      </nav>

      <div className="bg-white shadow-xl overflow-hidden border border-gray-100">
        <div className="lg:flex">
          {/* Product Images */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50">
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-square bg-white shadow-sm border border-gray-100 overflow-hidden group">
                <img
                  src={productImages[selectedImage] || `https://source.unsplash.com/random/800x800/?${product.name.split(' ')[0]}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80";
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-4 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 overflow-hidden border transition-all duration-300 ${selectedImage === index
                      ? 'border-[var(--secondary)] ring-1 ring-[var(--secondary)]'
                      : 'border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    <img
                      src={img || `https://source.unsplash.com/random/200x200/?${product.name.split(' ')[0]}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=200&q=80";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 p-8 lg:p-16">
            <div className="max-w-lg">
              {/* Product Title & Rating */}
              <div className="mb-8 border-b border-gray-100 pb-8">
                <h1 className="text-4xl font-serif font-bold text-[var(--primary)] mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-[var(--secondary)]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-500 text-sm font-medium">(4.8) • 2,847 reviews</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg font-light">{product.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-4xl font-serif text-[var(--primary)]">₹{product.price?.toLocaleString()}</span>
                  <span className="text-xl text-gray-400 line-through font-light">₹{Math.floor(product.price * 1.2)?.toLocaleString()}</span>
                </div>
                <p className="text-green-700 text-sm font-medium tracking-wide">Included Taxes & Duties</p>
              </div>

              {/* Features */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Product Highlights</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '💎', text: 'Premium Quality' },
                    { icon: '📦', text: 'Free Shipping' },
                    { icon: '↩️', text: '30-Day Returns' },
                    { icon: '🛡️', text: '1 Year Warranty' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700 text-sm">
                      <span className="opacity-70">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      −
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center font-medium border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleBuyNow}
                  className="w-full btn-secondary text-white px-8 py-4 font-medium text-lg uppercase tracking-widest transition-all hover:bg-[#92400e] shadow-md"
                >
                  Buy Now - ₹{(product.price * quantity)?.toLocaleString()}
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full btn-outline px-8 py-4 font-medium text-lg uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isAddingToCart ? (
                    <span className="animate-pulse">Adding...</span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}