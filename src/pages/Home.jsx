import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaQuoteLeft, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  { name: "John Doe", review: "ShopEase transformed my business. Highly recommended!" },
  { name: "Jane Smith", review: "A seamless experience from listing to sales!" },
  { name: "David Lee", review: "Best platform for local market exposure." },
];

const faqs = [
  { question: "How do I register my shop?", answer: "Simply sign up, go to your dashboard, and click on 'Add Shop' to get started." },
  { question: "Is there a fee to list my shop?", answer: "No, listing your shop is completely free! Premium features are available for advanced analytics." },
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-5xl font-bold font-heading text-heading-light dark:text-heading-dark">Welcome to ShopEase</h1>
        <p className="mt-4 text-xl text-paragraph-light dark:text-paragraph-dark max-w-2xl">
          Empower your business with a platform designed to showcase your shops and items,
          attract customers, and grow your sales effortlessly.
        </p>
      </header>

      {/* Feature Cards */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* Card 1: Seamless Management */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-700 dark:to-red-700">
            <h2 className="text-2xl font-sub-heading font-semibold text-white">Seamless Management</h2>
            <p className="mt-2 text-white">Organize your shops and items effortlessly with our intuitive dashboard.</p>
          </div>
          {/* Card 2: Attract More Customers */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 dark:from-indigo-700 dark:via-blue-700 dark:to-cyan-700">
            <h2 className="text-2xl font-sub-heading font-semibold text-white">Attract More Customers</h2>
            <p className="mt-2 text-white">Showcase your unique offerings and boost your shop's visibility.</p>
          </div>
          {/* Card 3: Boost Your Sales */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 dark:from-green-700 dark:via-teal-700 dark:to-blue-700">
            <h2 className="text-2xl font-sub-heading font-semibold text-white">Boost Your Sales</h2>
            <p className="mt-2 text-white">Increase revenue with easy order management and detailed analytics.</p>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="mt-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-center text-heading-light dark:text-heading-dark">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg">
              <button
                className="flex justify-between items-center w-full text-lg font-medium text-heading-light dark:text-heading-dark transition-all"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex items-center space-x-2">
                  <FaQuestionCircle className="text-blue-500 dark:text-blue-400" />
                  <span>{faq.question}</span>
                </span>
                {openFAQ === index ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown className="text-blue-500" />}
              </button>
              <div className={`mt-2 text-paragraph-light dark:text-paragraph-dark transition-all duration-300 ${openFAQ === index ? "block" : "hidden"}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="mt-12 px-4">
        <h2 className="text-3xl font-heading font-semibold text-center text-heading-light dark:text-heading-dark">What Our Users Say</h2>
        <div className="relative max-w-2xl mx-auto mt-6 p-6 rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 dark:from-indigo-700 dark:via-blue-700 dark:to-cyan-700 text-white">
          <FaQuoteLeft className="text-3xl opacity-70" />
          <p className="text-lg italic mt-2">"{testimonials[currentTestimonial].review}"</p>
          <h4 className="mt-4 font-semibold text-right">- {testimonials[currentTestimonial].name}</h4>
          <div className="flex justify-between mt-4">
            <button onClick={prevTestimonial} className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaArrowLeft />
            </button>
            <button onClick={nextTestimonial} className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="mt-12 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-heading font-semibold text-heading-light dark:text-heading-dark">Contact Us</h2>
        <div className="mt-6 p-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-purple-700 dark:via-pink-700 dark:to-red-700 text-white">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <FaPhoneAlt className="text-xl" />
              <p>+123 456 7890</p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FaEnvelope className="text-xl" />
              <p>support@shopease.com</p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FaMapMarkerAlt className="text-xl" />
              <p>123 ShopEase St, Market City, USA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-paragraph-light dark:text-paragraph-dark">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
