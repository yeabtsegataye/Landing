import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../Components/Nav";
import { Footer } from "../Components/Footer";
import hero from "../assets/img/hero-img.png"
import menu from '../assets/img/menu.png'
import dashboard from "../assets/img/dashboard.png"
import {
  QrCodeIcon,
  CreditCardIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export const Home = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 } },
  };


  // Service Data with Heroicons
  const services = [
    {
      icon: <QrCodeIcon className="text-blue-600 h-12 w-12" />,
      title: "QR Code Menu Ordering",
      description:
        "Customers can effortlessly scan a QR code to access your digital menu, browse food options, and place orders directly from their devices.",
    },
    {
      icon: <CreditCardIcon className="text-blue-600 h-12 w-12" />,
      title: "Seamless Payment Options",
      description:
        "Pay via QR code or manually—flexibility that ensures a smooth and convenient experience for every customer.",
    },
    {
      icon: <ClockIcon className="text-blue-600 h-12 w-12" />,
      title: "Faster Service",
      description:
        "Reduce wait times and improve customer satisfaction with a streamlined ordering process.",
    },
    {
      icon: <ChartBarIcon className="text-blue-600 h-12 w-12" />,
      title: "Real-Time Analytics Dashboard",
      description:
        "Gain actionable insights into your business performance with live data on daily revenue, food sales, and customer trends.",
    },
    {
      icon: <CurrencyDollarIcon className="text-blue-600 h-12 w-12" />,
      title: "Financial Management",
      description:
        "Monitor your financial status in real-time, enabling better resource allocation and decision-making.",
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="text-blue-600 h-12 w-12" />,
      title: "Customer Feedback",
      description:
        "Access and analyze customer comments and reviews to continuously improve your services.",
    },
  ];

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
     <Nav />
      <section id="hero" className="mt-16 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Hero Text Content */}
            <div
              className="order-2 lg:order-1 flex flex-col justify-center"
              data-aos="fade-up"
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Hotel Order and Finance Management System
              </h1>
              <p className="text-gray-600 mb-6">
                Welcome to the future of hotel, café, and restaurant management!
                At REVE IT Solutions
              </p>
              <div className="flex space-x-4">
                <a
                  href="#pricing"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="order-1 lg:order-2"
              // data-aos="zoom-out"
              // data-aos-delay="100"
            >
              <img
                src={hero}
                className="w-full h-auto animate-slow-bounce"
                alt="Hero Section"
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes slow-bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-slow-bounce {
            animation: slow-bounce 4s ease-in-out infinite;
          }
        `}</style>
      </section>
<section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Item 1 */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <QrCodeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2 text-gray-800">
              <a
                href="#"
                className="hover:text-blue-600 transition duration-300"
              >
                QR Code Menu Ordering
              </a>
            </h4>
            <p className="text-gray-600">
              Customers can effortlessly scan a QR code to access your digital
              menu, browse food options, and place orders directly from their
              devices.
            </p>
          </div>

          {/* Service Item 2 */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <CreditCardIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2 text-gray-800">
              <a
                href="#"
                className="hover:text-blue-600 transition duration-300"
              >
                Seamless Payment Options
              </a>
            </h4>
            <p className="text-gray-600">
              Pay via QR code or manually—flexibility that ensures a smooth and
              convenient experience for every customer.
            </p>
          </div>

          {/* Service Item 3 */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <ClockIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2 text-gray-800">
              <a
                href="#"
                className="hover:text-blue-600 transition duration-300"
              >
                Faster Service
              </a>
            </h4>
            <p className="text-gray-600">
              Reduce wait times and improve customer satisfaction with a
              streamlined ordering process.
            </p>
          </div>
        </div>
      </div>
    </section>

      <section id="about" className="py-16 bg-white">
        {/* Section Title */}
        <div
          className="container mx-auto px-4 text-center mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-gray-800 mt-2">About</h2>
          <p className="text-gray-600 mt-4">
            Automate and simplify your operations, saving time and reducing
            errors
          </p>
        </div>
        {/* End Section Title */}

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Image */}
            <div
              className="flex justify-center items-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src={menu}
                className="w-80 h-auto rounded-lg shadow-lg"
                alt="Digital Menu System"
              />
            </div>

            {/* About Content */}
            <div
              className="flex flex-col justify-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Revolutionize Your Hotel Management with REVE IT Solutions
              </h3>
              <p className="text-gray-600 italic mb-4">
                We’ve developed a cutting-edge Hotel Order and Finance
                Management System designed to streamline operations, enhance
                customer experience, and empower business owners with real-time
                insights. Our system is the ultimate all-in-one solution for
                modern hospitality businesses.
              </p>
              <ul className="space-y-4 mb-4">
                <li className="flex items-start">
                  <i className="bi bi-check2-all text-blue-600 text-xl mr-2"></i>
                  <span className="text-gray-600">
                    Gain actionable insights into your business performance with
                    live data on daily revenue, food sales, and customer trends.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check2-all text-blue-600 text-xl mr-2"></i>
                  <span className="text-gray-600">
                    Monitor your financial status in real-time, enabling better
                    resource allocation and decision-making.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="bi bi-check2-all text-blue-600 text-xl mr-2"></i>
                  <span className="text-gray-600">
                    Access and analyze customer comments and reviews to
                    continuously improve your services.
                  </span>
                </li>
              </ul>
              <p className="text-gray-600">
                Track sales performance by day, week, or month to identify
                trends and optimize your offerings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 bg-gray-50">
        {/* Section Title */}
        <div
          className="container mx-auto px-4 text-center mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Portfolio</h2>
          <p className="text-gray-600 mt-4">
            Take control of your hotel, café, or restaurant operations with REVE
            IT Solutions.
          </p>
        </div>
        {/* End Section Title */}

        <div className="container mx-auto px-4">
          <div
            className="rounded-lg overflow-hidden shadow-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={dashboard}
              alt="Dashboard Preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
      {/* Section Title */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mt-2">Services</h2>
        <p className="text-gray-600 mt-4">
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      {/* End Section Title */}

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Service Items */}
          {services.map((service, index) => (
            <motion.div
              className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              transition={{ delay: 0.2 * index }}
              key={index}
            >
              <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover="hover"
                  variants={iconVariants}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        {/* Section Title */}
        <div
          className="container mx-auto px-4 text-center mb-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-bold text-gray-800">Pricing</h2>
          <p className="text-gray-600 mt-4">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        {/* End Section Title */}

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center -mx-4">
            {pricingPlans.map((plan, index) => (
              <div
                className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
                data-aos="fade-up"
                data-aos-delay={plan.delay}
                key={index}
              >
                <div
                  className={`relative bg-white rounded-2xl shadow-md p-6 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl ${
                    plan.popular ? "border-4 border-blue-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-bl-2xl">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-gray-800 mb-4">
                    <span className="text-xl align-top">ETB</span>
                    {plan.price}
                    <span className="text-sm text-gray-600">
                      /{plan.sub_date} month
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Featured Included:
                  </h4>
                  <ul className="text-gray-600 mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-start ml-4"
                      >
                        <i className="bi bi-check-circle-fill text-blue-500 mr-3"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/checkout/${plan.id}`}
                    state={{ selectedPlan: plan }}
                  >
                    <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                      Buy Now
                      <i className="bi bi-arrow-right ml-2"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
{/* Contact Section */}
<section id="contact" className="py-16 bg-gray-50">
      {/* Section Title */}
      <div
        className="container mx-auto px-4 text-center mb-12"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          Contact us today
        </h2>
        <p className="text-gray-600 mt-4">
          Schedule a demo or learn more about how we can help you achieve your
          business goals. Let’s build the future of hospitality together.
        </p>
      </div>
      {/* End Section Title */}

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center -mx-4">
          {/* Address */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <motion.div
                className="flex justify-center mb-4"
                whileHover="hover"
                variants={iconVariants}
              >
                <div className="bg-blue-100 rounded-full p-4">
                  <MapPinIcon className="text-blue-500 h-10 w-10" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">
                Addis Abeba, Bole, Atlas Main Road
              </p>
            </div>
          </motion.div>

          {/* Call Us */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <motion.div
                className="flex justify-center mb-4"
                whileHover="hover"
                variants={iconVariants}
              >
                <div className="bg-blue-100 rounded-full p-4">
                  <PhoneIcon className="text-blue-500 h-10 w-10" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">+2 5192 4384 865</p>
            </div>
          </motion.div>

          {/* Email Us */}
          <motion.div
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <motion.div
                className="flex justify-center mb-4"
                whileHover="hover"
                variants={iconVariants}
              >
                <div className="bg-blue-100 rounded-full p-4">
                  <EnvelopeIcon className="text-blue-500 h-10 w-10" />
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">tatitaye0@gmail.com</p>
              <p className="text-gray-600">betelhembelete0@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* Call To Action Section */}
        <Footer />
    </>
  );
};
