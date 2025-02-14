import React from "react";

export const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <span>Portfolio</span>
        <h2>Portfolio</h2>
        <p>Take control of your hotel, café, or restaurant operations with REVE IT Solutions.</p>
      </div>

      <div className="container">
        <img
          src="/assets/img/dashboard.png"
          alt="Dashboard Preview"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
};
