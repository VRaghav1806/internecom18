import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white relative overflow-hidden font-light tracking-wide">
      <div className="w-full px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">

              <div>
                <h3 className="text-2xl font-serif font-bold !text-orange-500 tracking-wide">Ecommerce</h3>
                <p className="text-[var(--secondary)] text-xs uppercase tracking-[0.2em] font-medium">Premium Experience</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm text-sm">
              Discover a curated collection of premium products designed to elevate your lifestyle. Quality, elegance, and timeless style.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                { name: 'Instagram', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12 16.624c-2.563 0-4.624-2.061-4.624-4.624S9.437 7.376 12 7.376s4.624 2.061 4.624 4.624S14.563 16.624 12 16.624z' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[var(--secondary)] hover:border-[var(--secondary)] group text-white/70 hover:text-white"
                >
                  <svg className="w-5 h-5 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-[var(--secondary)]">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Collection', path: '/' },
                { name: 'Shopping Cart', path: '/cart' },
                { name: 'New Arrivals', path: '/addproduct' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[var(--secondary)] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-[var(--secondary)]">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex flex-col">
                <span className="text-white font-medium mb-1">Email Us</span>
                <span>support@ecommerce.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white font-medium mb-1">Headquarters</span>
                <span>123 Fashion Avenue<br />New York, NY 10012</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white font-medium mb-1">Customer Service</span>
                <span>+1 (800) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}