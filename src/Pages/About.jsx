import React from "react";

export const About = () => {
  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <span>About Us<br /></span>
        <h2>About</h2>
        <p>Automate and simplify your operations, saving time and reducing errors</p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="row gy-4">
          {/* About Image */}
          <div
            className="col-lg-6 position-relative align-self-start text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="assets/img/menu.png"
              className="img-fluid"
              alt="Digital Menu System"
              style={{ width: "300px", height: "auto" }}
            />
          </div>

          {/* About Content */}
          <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
            <h3>Revolutionize Your Hotel Management with REVE IT Solutions</h3>
            <p className="fst-italic">
              We’ve developed a cutting-edge Hotel Order and Finance Management System designed to streamline operations, enhance customer experience, and empower business owners with real-time insights. Our system is the ultimate all-in-one solution for modern hospitality businesses.
            </p>
            <ul>
              <li>
                <i className="bi bi-check2-all"></i>{" "}
                <span>
                  Gain actionable insights into your business performance with live data on daily revenue, food sales, and customer trends.
                </span>
              </li>
              <li>
                <i className="bi bi-check2-all"></i>{" "}
                <span>
                  Monitor your financial status in real-time, enabling better resource allocation and decision-making.
                </span>
              </li>
              <li>
                <i className="bi bi-check2-all"></i>{" "}
                <span>
                  Access and analyze customer comments and reviews to continuously improve your services.
                </span>
              </li>
            </ul>
            <p>
              Track sales performance by day, week, or month to identify trends and optimize your offerings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
