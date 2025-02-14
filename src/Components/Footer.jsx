import React from "react";

export const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="index.html" className="d-flex align-items-center">
              <span className="sitename">REVE</span>
            </a>
            <div className="footer-contact pt-3">
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
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">Home</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">About us</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> <a href="#">Services</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Terms of service</a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Web Design</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Web Development</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Product Management</a>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <a href="#">Marketing</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="col-lg-4 col-md-12">
            <h4>Follow Us</h4>
            <p>
              Stay connected with us through social media and get the latest
              updates.
            </p>
            <div className="social-links d-flex">
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div
        className="container text-center mt-4"
        style={{
          fontSize: "8px",
          lineHeight: "1",
          margin: "0",
          padding: "0",
          color: "white",
        }}
      >
        <p style={{ margin: "0", padding: "0" }}>
          © <span>Copyright</span>{" "}
          <strong className="px-1 sitename">eNno</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div
          className="credits"
          style={{
            fontSize: "6px",
            lineHeight: "1",
            margin: "0",
            padding: "0",
          }}
        >
          Designed by{" "}
          <a
            href="https://bootstrapmade.com/"
            style={{ fontSize: "6px", textDecoration: "none", color: "inherit" }}
          >
            BootstrapMade
          </a>{" "}
          Distributed by{" "}
          <a
            href="https://themewagon.com"
            style={{ fontSize: "6px", textDecoration: "none", color: "inherit" }}
          >
            ThemeWagon
          </a>
        </div>
      </div>
    </footer>
  );
};
