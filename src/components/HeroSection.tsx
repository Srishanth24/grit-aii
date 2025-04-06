
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Wind, Battery } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-green-50 to-white">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-1/4 animate-float">
          <Sun size={80} className="text-eco-green-500" />
        </div>
        <div className="absolute top-40 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Wind size={70} className="text-eco-blue-500" />
        </div>
        <div className="absolute bottom-20 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Battery size={60} className="text-eco-teal-500" />
        </div>
      </div>
      
      <div className="eco-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">Your Gateway to</span> <br />
            Sustainable Energy Investments
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Calculate Savings, Discover ROI, and Go Green with Confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="bg-eco-green-600 hover:bg-eco-green-700 text-white font-medium px-8 py-6 text-lg"
              onClick={() => navigate('/calculator')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-eco-teal-400 text-eco-teal-700 hover:bg-eco-teal-50 font-medium px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
