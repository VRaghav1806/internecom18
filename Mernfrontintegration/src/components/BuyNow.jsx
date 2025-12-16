import { useParams, Link ,} from "react-router-dom";
import { useEffect, useState } from "react";

export default function BuyNow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
      fetch("http://localhost:5000/api/products")
        .then(res=>res.json())
        .then(allproducts=>{
          const product=allproducts.find(p=>p._id===id)
          setProduct(product);
        })
  });
  if (!product) return (
    <div className="text-center py-12">
      <p className="text-2xl text-red-500 font-semibold">Product not found</p>
      <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">
        ← Back to Products
      </Link>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h2>
          <p className="text-white/90">Your order has been placed successfully</p>
        </div>

        <div className="p-8">
          <div className="flex items-center space-x-6 mb-8">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description?.substring(0, 80)}...</p>
              <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-gray-800 mb-4">Order Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-semibold">#ORD{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ✅ Processing
                </span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for your purchase! You'll receive a confirmation email shortly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
              >
                Continue Shopping
              </Link>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition duration-300">
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}