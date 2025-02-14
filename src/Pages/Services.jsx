import React from "react";

export const Services = () => {
  return (
    <section id="services" className="featured-services section">
      <div className="container">
        <div className="row gy-4">
          {/* Service Item 1 */}
          <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="100">
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
                Customers can effortlessly scan a QR code to access your digital
                menu, browse food options, and place orders directly from their
                devices.
              </p>
            </div>
          </div>
          {/* End Service Item */}

          {/* Service Item 2 */}
          <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="200">
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
          <div className="col-lg-4 d-flex" data-aos="fade-up" data-aos-delay="300">
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
  );
};
