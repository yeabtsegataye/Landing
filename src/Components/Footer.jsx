import React from "react";
import logo from "../assets/img/logo-dark-transparent.png";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* About Section */}
          <div className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8 md:mb-0">
            <a href="/" className="flex items-center space-x-3">
              <img
                className="side-nav-hide-on-closed w-auto h-8"
                src={logo}
                alt="Logo"
              />
              <span className="text-xl font-bold text-white">REVE IT</span>
            </a>
            <div className="footer-contact pt-4 text-slate-400">
              <p>Bole atlas Street</p>
              <p>Ethiopia Addis abeba, Bole</p>
              <p className="mt-4">
                <strong className="text-white">Phone:</strong>{" "}
                <span className="text-slate-300">+2519 2438 4865</span>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{" "}
                <span className="text-slate-300">revesupportgroup@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="w-full md:w-3/12 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h4 className="text-white font-bold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-slate-300 transition hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-300 transition hover:text-white">
                  About us
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 transition hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-300 transition hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="w-full md:w-3/12 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h4 className="text-white font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 transition hover:text-white">
                  Web Design
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 transition hover:text-white">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 transition hover:text-white">
                  Product Management
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 transition hover:text-white">
                  Marketing
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="w-full md:w-12/12 lg:w-4/12 px-4">
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <p className="text-slate-400 mb-4">
              Stay connected with us through social media and get the latest updates.
            </p>
            <div className="flex space-x-4 text-slate-300">
              <a href="#" aria-label="Twitter" className="transition hover:text-white">
                <i className="bi bi-twitter" />
              </a>
              <a href="#" aria-label="Facebook" className="transition hover:text-white">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" aria-label="Instagram" className="transition hover:text-white">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition hover:text-white">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};