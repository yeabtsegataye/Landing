import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import Lottie from "lottie-react"; // Import Lottie
import burgerChefAnimation from "../assets/delivery-team.json"; // Import the animation JSON file
import testAnimation from "../assets/test-animation.json"; // Fallback animation

export const Pricing = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [packeage] = useLoginMutation();

  const fetchPricingPlans = async () => {
    try {
      const response = await packeage();
      setPricingPlans(response.data);
      console.log(pricingPlans, "ress");
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

  // Loading Animation
  if (loading) {
    console.log("Animation Data:", burgerChefAnimation); // Debugging log
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-64 h-64 border border-red-500">
          <Lottie
            animationData={burgerChefAnimation || testAnimation} // Fallback to test animation
            loop={true}
          />
        </div>
        <p className="mt-4 text-lg text-gray-700">Loading pricing plans...</p>
      </div>
    );
  }

  // Error Message
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
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
              <div className={`pricing-card ${plan.popular ? "popular" : ""}`}>
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
                <Link to={`/checkout/${plan.id}`} state={{ selectedPlan: plan }}>
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
  );
};