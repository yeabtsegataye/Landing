import React from "react";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gradient-to-t from-blue-500 to-gray-50 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* About Section */}
          <div className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8 md:mb-0">
            <a href="index.html" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">REVE</span>
            </a>
            <div className="footer-contact pt-3 text-gray-800">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+1 5589 55488 55</span>
              </p>
              <p>
                <strong>Email:</strong> <span>info@example.com</span>
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="w-full md:w-3/12 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h4 className=" text-gray-800 font-bold mb-4">Useful Links</h4>
            <ul className="text-gray-800 space-y-2">
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Home</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">About us</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Services</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Terms of service</a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="w-full md:w-3/12 lg:w-2/12 px-4 mb-8 md:mb-0">
            <h4 className=" text-gray-800 font-bold mb-4">Our Services</h4>
            <ul className="text-gray-800 space-y-2">
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Web Design</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Web Development</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Product Management</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#" className="hover:text-white">Marketing</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="w-full md:w-12/12 lg:w-4/12 px-4">
            <h4 className=" text-gray-800 font-bold mb-4">Follow Us</h4>
            <p className="text-gray-800 mb-4">
              Stay connected with us through social media and get the latest
              updates.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-gray-800 hover:text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-800 hover:text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-800 hover:text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-800 hover:text-white">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};