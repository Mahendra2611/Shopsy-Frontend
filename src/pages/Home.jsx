import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
   
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-5xl font-bold text-heading-light dark:text-heading-dark">
          Welcome to ShopEase
        </h1>
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
            <h2 className="text-2xl font-semibold text-heading-light dark:text-heading-dark">
              Seamless Management
            </h2>
            <p className="mt-2 text-paragraph-light dark:text-paragraph-dark">
              Organize your shops and items effortlessly with our intuitive dashboard.
            </p>
          </div>
          {/* Card 2: Attract More Customers */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 dark:from-indigo-700 dark:via-blue-700 dark:to-cyan-700">
            <h2 className="text-2xl font-semibold text-heading-light dark:text-heading-dark">
              Attract More Customers
            </h2>
            <p className="mt-2 text-paragraph-light dark:text-paragraph-dark">
              Showcase your unique offerings and boost your shop's visibility.
            </p>
          </div>
          {/* Card 3: Boost Your Sales */}
          <div className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 dark:from-green-700 dark:via-teal-700 dark:to-blue-700">
            <h2 className="text-2xl font-semibold text-heading-light dark:text-heading-dark">
              Boost Your Sales
            </h2>
            <p className="mt-2 text-paragraph-light dark:text-paragraph-dark">
              Increase revenue with easy order management and detailed analytics.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-paragraph-light dark:text-paragraph-dark">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
