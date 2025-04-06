
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import ResultsDashboard from '@/components/calculator/ResultsDashboard';
import SystemComparison from '@/components/calculator/SystemComparison';

const Calculator = () => {
  const [results, setResults] = useState<any>(null);
  
  const handleCalculate = (calculatedResults: any) => {
    setResults(calculatedResults);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-gray-50">
        <div className="eco-container">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Renewable Energy Investment Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Calculate potential savings, break-even periods, and ROI for different renewable energy systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <CalculatorForm onCalculate={handleCalculate} />
            </div>
            <div className="lg:col-span-2" id="results">
              {results ? (
                <ResultsDashboard results={results} />
              ) : (
                <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm text-center">
                  <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
                  <p className="text-gray-600">
                    Fill out the form to see your personalized renewable energy investment analysis.
                  </p>
                  <div className="mt-6">
                    <img 
                      src="https://placehold.co/600x400?text=Renewable+Energy+Calculator" 
                      alt="Renewable Energy Calculator" 
                      className="w-full h-auto rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {results && (
            <div className="mt-8">
              <SystemComparison budget={results.initialCost} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;
