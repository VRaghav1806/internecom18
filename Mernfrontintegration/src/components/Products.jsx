import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {API} from "../utils/api";
export default function Products({ setCart, cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if(!confirmDelete) return;
    const res= await fetch(`${API}/api/deleteProducts/${id}`,{
      method:"DELETE"
    });
    if(res.status === 204){
      alert("Product deleted successfully");
      setProducts(products.filter((p) => p._id !== id));
    }
    else{
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
          >
            {/* IMAGE + CONTENT */}
            <div className="p-4 flex-1">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {p.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {p.description}
              </p>
            </div>

            {/* PRICE + BUTTONS */}
            <div className="px-4 pb-4">
              <span className="block text-xl font-bold text-indigo-600 mb-3">
                ₹{p.price}
              </span>

              <div className="grid grid-cols-3 gap-2">
                {/* View Details */}
                <Link
                  to={`/product/${p._id}`}
                  className="text-center bg-indigo-100 text-indigo-700
                             hover:bg-indigo-200 px-3 py-2 rounded-lg
                             font-medium transition"
                >
                  View
                </Link>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(p)}
                  className="flex items-center justify-center gap-1
                             bg-green-100 text-green-700
                             hover:bg-green-200 px-3 py-2 rounded-lg
                             font-medium transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-100 text-red-700
                             hover:bg-red-200 px-3 py-2 rounded-lg
                             font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
