// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-fire-line text-2xl text-amber-400"></i>
              </div>
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "Pacifico, serif" }}
              >
                <img src="/logo.png" className="logo-width"></img>
              </span>
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              Experience the finest hookah culture in a luxurious atmosphere.
              Premium flavors, exceptional service, and unforgettable moments
              await you.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              >
                <i className="ri-facebook-fill text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              >
                <i className="ri-instagram-line text-white"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              >
                <i className="ri-twitter-fill text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/reservations"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Reservations
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">
              Contact
            </h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <i className="ri-map-pin-line mr-2 text-amber-400"></i>
                Jogeshwari, Mumbai
              </p>
              
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} alsaifsheesha. All rights reserved.
          </p>
          <a
            href="https://readdy.ai/?origin=logo"
            className="text-gray-400 hover:text-amber-400 transition-colors text-sm mt-2 md:mt-0"
          >
            
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
