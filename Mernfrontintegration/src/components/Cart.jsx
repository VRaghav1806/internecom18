import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            {cart.map(item => (
              <div key={item._id} className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description?.substring(0, 60)}...</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="text-xl font-bold text-indigo-600">₹{item.price}</span>
                  <button 
                    onClick={() => removeItem(item._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Total Items: <span className="font-semibold">{cart.length}</span></p>
                <p className="text-2xl font-bold text-gray-800">Total: ₹{calculateTotal()}</p>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}