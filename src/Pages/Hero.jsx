import React from "react";

export const Hero = () => {
  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row gy-4">
          {/* Hero Text Content */}
          <div
            className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
            data-aos="fade-up"
          >
            <h1>Hotel Order and Finance Management System</h1>
            <p>
              Welcome to the future of hotel, café, and restaurant management!
              At REVE IT Solutions
            </p>
            <div className="d-flex">
              <a href="#about" className="btn-get-started">
                Get Started
              </a>
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox btn-watch-video d-flex align-items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <img
              src="assets/img/hero-img.png"
              className="img-fluid animated"
              alt="Hero Section"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
