import { useEffect,useState } from 'react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../utils/api';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
  fetch(`${API}/api/products`)
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
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="text-indigo-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-indigo-600">₹{product.price}</span>
              <span className="ml-2 text-sm text-gray-500">(Inclusive of all taxes)</span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Features:</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>High Quality Material</li>
                <li>1 Year Warranty</li>
                <li>Free Shipping</li>
                <li>30-Day Return Policy</li>
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                to={`/buynow/${product._id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 flex-1 text-center"
              >
                Buy Now
              </Link>
              
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 flex-1">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}