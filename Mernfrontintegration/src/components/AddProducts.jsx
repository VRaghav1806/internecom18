import React, { useState } from 'react';
import { API } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AddProducts() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/api/postProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          image
        })
      });
      if (res.ok) {
        alert("Product Added Successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        navigate('/'); // Redirect to home/collection
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center w-full px-8 py-12 animate-fade-in">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">

        {/* Header Section */}
        <div className="bg-[var(--primary)] px-8 py-6 text-center">
          <h1 className="text-3xl font-serif font-bold !text-orange-500 mb-2">Add New Product</h1>
          <p className="text-[var(--secondary)] text-sm uppercase tracking-widest font-medium">Expand your collection</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wider">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Classic Leather Watch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors bg-gray-50"
              required
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wider">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 4500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors bg-gray-50 font-mono"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Detailed description of the product..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors bg-gray-50"
              required
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wider">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors bg-gray-50 text-sm"
              required
            />
            <p className="text-gray-400 text-xs mt-2 italic">
              Tip: Use a direct image link from Unsplash or similar sources.
            </p>
          </div>

          {/* Image Preview (Optional) */}
          {image && (
            <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-sm bg-gray-50 text-center">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Preview</p>
              <img
                src={image}
                alt="Preview"
                className="h-48 mx-auto object-contain shadow-sm"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 rounded-sm font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Adding...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}