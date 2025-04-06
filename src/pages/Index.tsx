
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import UserTypeSelection from '@/components/UserTypeSelection';
import ValueProposition from '@/components/ValueProposition';
import QuickEstimator from '@/components/QuickEstimator';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <UserTypeSelection />
        <ValueProposition />
        <QuickEstimator />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
