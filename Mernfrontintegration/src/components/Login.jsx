import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const userData = { name: email.split('@')[0], email };
        setUser(userData);
        navigate("/");
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="flex justify-center w-full px-8 py-16 animate-fade-in min-h-[60vh] items-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">

          {/* Header */}
          <div className="bg-[var(--primary)] px-8 py-8 text-center">
            <h2 className="text-3xl font-serif font-bold !text-orange-500 mb-2">Welcome Back</h2>
            <p className="text-[var(--secondary)] text-sm uppercase tracking-widest font-medium">Please login to continue</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[var(--secondary)] focus:ring-1 focus:ring-[var(--secondary)] transition-colors bg-gray-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-4 rounded-sm font-bold uppercase tracking-widest text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-4">
                Don't have an account?{" "}
                <button className="text-[var(--secondary)] font-bold hover:underline">
                  Sign up
                </button>
              </p>

              <Link to="/" className="text-gray-400 hover:text-[var(--primary)] text-xs uppercase tracking-wider font-medium transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}