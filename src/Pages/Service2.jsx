import React from "react";

export const Service2 = () => {
  return (
    <>
  
      {/* Services Section */}
      <section id="services" className="services section light-background">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <span>Services</span>
          <h2>Services</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
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
                description: "Reduce wait times and improve customer satisfaction with a streamlined ordering process.",
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
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)} key={index}>
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
    </>
  );
};
