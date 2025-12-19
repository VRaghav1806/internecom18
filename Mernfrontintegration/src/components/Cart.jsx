import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create order summary
      const itemsList = cart.map(item => `- ${item.name} (₹${item.price.toLocaleString()})`).join('\n');
      const total = calculateTotal();

      // Show confirmation with all items
      alert(`✅ Order Confirmed!\n\nYou have successfully purchased:\n\n${itemsList}\n\nTotal Amount: ₹${total.toLocaleString()}\n\nThank you for shopping with Ecommerce!`);

      // Clear cart after checkout
      setCart([]);

      // Navigate to home page
      navigate('/');

      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center w-full px-8 py-12 animate-fade-in">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-serif font-bold text-[var(--primary)] mb-8 tracking-wide text-center">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-white border border-gray-100 shadow-sm rounded-lg">
            <div className="text-gray-300 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-xl font-serif text-[var(--primary)] mb-2">Your cart is empty</p>
            <p className="text-gray-500 mb-8 font-light">Looks like you haven't added anything yet.</p>
            <Link to="/" className="btn-primary px-8 py-3 rounded-sm font-medium uppercase tracking-widest text-sm inline-block shadow-lg hover:shadow-xl transition-all">
              Start Shopping
            </Link>
          </div>
        ) : <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {cart.map(item => (
              <div key={item._id} className="flex flex-col md:flex-row items-center justify-between px-8 py-6 hover:bg-gray-50 transition-colors duration-200 group">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative overflow-hidden rounded-md border border-gray-200 w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image || `https://source.unsplash.com/random/200x200/?${item.name.split(' ')[0]}`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=200&q=80";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold text-lg text-[var(--primary)] mb-1 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                      Qty: <span className="text-gray-900">{item.quantity || 1}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                  <span className="text-lg font-bold text-[var(--secondary)] font-serif">₹{item.price?.toLocaleString()}</span>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                    title="Remove Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 px-8 py-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center md:text-left">
              <div className="flex items-center gap-4">
                <p className="text-gray-500 text-sm uppercase tracking-wide">Subtotal:</p>
                <p className="text-3xl font-serif font-bold text-[var(--primary)]">₹{calculateTotal().toLocaleString()}</p>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="btn-secondary px-12 py-3 rounded-sm font-bold uppercase tracking-widest text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}