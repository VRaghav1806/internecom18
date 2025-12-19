import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ cartLength, user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-[var(--primary)] text-white shadow-md sticky top-0 z-50">
      <div className="w-full px-8 py-10">
        <div className="flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-4 group">

            <span className="text-2xl font-serif font-bold tracking-wide text-white group-hover:text-[var(--secondary)] transition-colors">
              Ecommerce
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/addproduct" className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">
              Add Product
            </Link>

            <Link to="/cart" className="relative group text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide uppercase flex items-center gap-2">
              <span>Cart</span>
              {cartLength > 0 && (
                <span className="bg-[var(--secondary)] text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartLength > 99 ? '99+' : cartLength}
                </span>
              )}
            </Link>

            {/* LOGIN / LOGOUT */}
            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-gray-400 text-sm font-serif italic">
                  Hello, {user?.name || 'User'}
                </span>
                <button
                  onClick={logout}
                  className="bg-[var(--secondary)] hover:bg-[#92400e] text-white px-5 py-2 rounded-sm text-sm uppercase tracking-wider transition-all shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[var(--secondary)] hover:bg-[#92400e] text-white px-6 py-2 rounded-sm text-sm uppercase tracking-wider transition-all shadow-sm"
              >
                Login
              </Link>
            )}
          </div>


          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* MOBILE SIDEBAR DRAWER */}
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[var(--primary)] shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full bg-[var(--primary)] border-l border-white/10">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-xl font-serif font-bold text-white tracking-wide">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex-1 overflow-y-auto py-6 px-6 space-y-6">
              <Link
                to="/addproduct"
                className="text-gray-300 hover:text-[var(--secondary)] block text-sm uppercase tracking-widest font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Product
              </Link>

              <Link
                to="/cart"
                className="text-gray-300 hover:text-[var(--secondary)] block text-sm uppercase tracking-widest font-medium transition-colors flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {cartLength > 0 && (
                  <span className="bg-[var(--secondary)] text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {cartLength}
                  </span>
                )}
              </Link>

              <div className="pt-6 border-t border-white/10">
                {user ? (
                  <div className="space-y-4">
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Logged in as</p>
                    <p className="text-white font-serif italic mb-4">{user.name}</p>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="w-full bg-[var(--secondary)] hover:bg-[#92400e] text-white px-4 py-3 rounded-sm text-sm uppercase tracking-wider transition-all text-center"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="w-full bg-[var(--secondary)] hover:bg-[#92400e] text-white px-4 py-3 rounded-sm text-sm uppercase tracking-wider transition-all block text-center shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
