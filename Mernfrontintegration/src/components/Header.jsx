import { Link } from "react-router-dom";

export default function Header({ cartLength }) {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white hover:text-yellow-300 transition">
              🛍️ MERN E-Commerce
            </h1>
            <p className="text-sm text-indigo-100">
              Premium Shopping Experience
            </p>
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <Link
              to="/addproduct"
              className="bg-white/90 text-indigo-700 
              hover:bg-white 
                px-4 py-2 rounded-xl 
                font-medium transition shadow"
            >
              Add Product
            </Link>
            {/* CART */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 
                         bg-white/90 text-indigo-700 
                         hover:bg-white 
                         px-4 py-2 rounded-xl 
                         font-medium transition shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Cart</span>

              {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 
                                 bg-red-500 text-white 
                                 text-xs font-bold 
                                 h-5 w-5 rounded-full 
                                 flex items-center justify-center">
                  {cartLength}
                </span>
              )}
            </Link>

            {/* LOGIN / LOGOUT */}
            {localStorage.getItem("user") ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 
              bg-red-500 text-black 
              hover:bg-red-600 
                px-4 py-2 rounded-xl 
                font-medium transition shadow"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 
                           border border-indigo-300 
                           text-white 
                           hover:bg-indigo-500 
                           hover:border-indigo-500 
                           px-4 py-2 rounded-xl 
                           font-medium transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
