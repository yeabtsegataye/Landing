import React from "react";

export const Contact = () => {
  return (
    <>
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
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="info-item d-flex">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>Addis Abeba, Bole, Atlas Main Road</p>
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="info-item d-flex">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+2 5192 4384 865</p>
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
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
      <section id="call-to-action" className="call-to-action section accent-background">
        <div className="container">
          <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
            <div className="col-xl-10">
              <div className="text-center">
                <h3>Call To Action</h3>
                <p>
                  We specialize in creating innovative, user-friendly, and
                  scalable software solutions tailored to the unique needs of the
                  hospitality industry. With years of experience and a commitment
                  to excellence, we’re here to help you succeed.
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
