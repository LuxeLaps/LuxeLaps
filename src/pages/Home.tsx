import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Curate Your Closet",
    description: "Upload, organize, and manage your wardrobe with ease.",
    icon: "👗",
  },
  {
    title: "Discover & Shop",
    description: "Explore trending styles and shop exclusive items.",
    icon: "🛍️",
  },
  {
    title: "Earn Rewards",
    description: "Get rewarded for your activity and loyalty.",
    icon: "🎁",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
          Welcome to LuxeLaps
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl">
          Your personalized fashion hub. Curate your closet, discover new trends, and earn rewards for your style journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/closet"
            className="px-8 py-3 rounded-full bg-black text-white font-semibold shadow hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 rounded-full bg-white text-black border border-black font-semibold shadow hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
            Why LuxeLaps?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm bg-gray-50 border-t">
        &copy; {new Date().getFullYear()} LuxeLaps. All rights reserved.
      </footer>
    </main>
  );
}