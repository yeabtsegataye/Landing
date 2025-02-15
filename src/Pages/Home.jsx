import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPricingPlans = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/packeage/get`
      );
      setPricingPlans(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load pricing plans. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingPlans();
  }, []);
  return (
    <>
      <section id="hero" className="hero section mt-16">
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
      <section id="services" className="featured-services section">
        <div className="container">
          <div className="row gy-4">
            {/* Service Item 1 */}
            <div
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-activity icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    QR Code Menu Ordering
                  </a>
                </h4>
                <p>
                  Customers can effortlessly scan a QR code to access your
                  digital menu, browse food options, and place orders directly
                  from their devices.
                </p>
              </div>
            </div>
            {/* End Service Item */}

            {/* Service Item 2 */}
            <div
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-bounding-box-circles icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    Seamless Payment Options
                  </a>
                </h4>
                <p>
                  Pay via QR code or manually—flexibility that ensures a smooth
                  and convenient experience for every customer.
                </p>
              </div>
            </div>
            {/* End Service Item */}

            {/* Service Item 3 */}
            <div
              className="col-lg-4 d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-calendar4-week icon"></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    Faster Service
                  </a>
                </h4>
                <p>
                  Reduce wait times and improve customer satisfaction with a
                  streamlined ordering process.
                </p>
              </div>
            </div>
            {/* End Service Item */}
          </div>
        </div>
      </section>
      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <span>
            About Us
            <br />
          </span>
          <h2>About</h2>
          <p>
            Automate and simplify your operations, saving time and reducing
            errors
          </p>
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
            <div
              className="col-lg-6 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3>
                Revolutionize Your Hotel Management with REVE IT Solutions
              </h3>
              <p className="fst-italic">
                We’ve developed a cutting-edge Hotel Order and Finance
                Management System designed to streamline operations, enhance
                customer experience, and empower business owners with real-time
                insights. Our system is the ultimate all-in-one solution for
                modern hospitality businesses.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check2-all"></i>{" "}
                  <span>
                    Gain actionable insights into your business performance with
                    live data on daily revenue, food sales, and customer trends.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check2-all"></i>{" "}
                  <span>
                    Monitor your financial status in real-time, enabling better
                    resource allocation and decision-making.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check2-all"></i>{" "}
                  <span>
                    Access and analyze customer comments and reviews to
                    continuously improve your services.
                  </span>
                </li>
              </ul>
              <p>
                Track sales performance by day, week, or month to identify
                trends and optimize your offerings.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="portfolio" className="portfolio section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <span>Portfolio</span>
          <h2>Portfolio</h2>
          <p>
            Take control of your hotel, café, or restaurant operations with REVE
            IT Solutions.
          </p>
        </div>

        <div className="container">
          <img
            src="/assets/img/dashboard.png"
            alt="Dashboard Preview"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="services section light-background">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <span>Services</span>
          <h2>Services</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {/* Service Items */}
            {[
              {
                icon: "bi bi-activity",
                title: "QR Code Menu Ordering",
                description:
                  "Customers can effortlessly scan a QR code to access your digital menu, browse food options, and place orders directly from their devices.",
              },
              {
                icon: "bi bi-broadcast",
                title: "Seamless Payment Options",
                description:
                  "Pay via QR code or manually—flexibility that ensures a smooth and convenient experience for every customer.",
              },
              {
                icon: "bi bi-easel",
                title: "Faster Service",
                description:
                  "Reduce wait times and improve customer satisfaction with a streamlined ordering process.",
              },
              {
                icon: "bi bi-bounding-box-circles",
                title: "Real-Time Analytics Dashboard",
                description:
                  "Gain actionable insights into your business performance with live data on daily revenue, food sales, and customer trends.",
              },
              {
                icon: "bi bi-calendar4-week",
                title: "Financial Management",
                description:
                  "Monitor your financial status in real-time, enabling better resource allocation and decision-making.",
              },
              {
                icon: "bi bi-chat-square-text",
                title: "Customer Feedback",
                description:
                  "Access and analyze customer comments and reviews to continuously improve your services.",
              },
            ].map((service, index) => (
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                key={index}
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className={service.icon}></i>
                  </div>
                  <a href="#" className="stretched-link">
                    <h3>{service.title}</h3>
                  </a>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="pricing section light-background">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Pricing</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-4 justify-content-center">
            {pricingPlans.map((plan, index) => (
              <div
                className="col-lg-4"
                data-aos="fade-up"
                data-aos-delay={plan.delay}
                key={index}
              >
                <div
                  className={`pricing-card ${plan.popular ? "popular" : ""}`}
                >
                  {plan.popular && (
                    <div className="popular-badge">Most Popular</div>
                  )}
                  <h3>{plan.name}</h3>
                  <div className="price">
                    <span className="currency">ETB</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/{plan.sub_date} month</span>
                  </div>
                  <p className="description">{plan.description}</p>

                  <h4>Featured Included:</h4>
                  <ul className="features-list">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <i className="bi bi-check-circle-fill"></i> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/checkout/${plan.id}`}
                    state={{ selectedPlan: plan }}
                  >
                    <button className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      Buy Now
                      <i className="bi bi-arrow-right ml-1"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="contact section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <span>Contact Us</span>
          <h2>Contact us today</h2>
          <p>
            Schedule a demo or learn more about how we can help you achieve your
            business goals. Let’s build the future of hospitality together.
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {/* Address */}
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>Addis Abeba, Bole, Atlas Main Road</p>
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="info-item d-flex">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+2 5192 4384 865</p>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="info-item d-flex">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>tatitaye0@gmail.com</p>
                  <p>betelhembelete0@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section
        id="call-to-action"
        className="call-to-action section accent-background"
      >
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="col-xl-10">
              <div className="text-center">
                <h3>Call To Action</h3>
                <p>
                  We specialize in creating innovative, user-friendly, and
                  scalable software solutions tailored to the unique needs of
                  the hospitality industry. With years of experience and a
                  commitment to excellence, we’re here to help you succeed.
                </p>
                <a className="cta-btn" href="#">
                  Call To Action
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
