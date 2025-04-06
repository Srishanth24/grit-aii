
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const QuickEstimator = () => {
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<null | {
    monthlySavings: number;
    yearlyProduction: number;
    co2Reduction: number;
  }>(null);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode || zipCode.length < 5) {
      toast({
        title: "Invalid ZIP code",
        description: "Please enter a valid ZIP code to get an estimate.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      // Generate realistic-looking estimates
      const randomFactor = Math.random() * 0.5 + 0.75; // 0.75 to 1.25
      setEstimate({
        monthlySavings: Math.round(120 * randomFactor),
        yearlyProduction: Math.round(7800 * randomFactor),
        co2Reduction: Math.round(5.2 * randomFactor * 10) / 10
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-white">
      <div className="eco-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Get a Quick Estimate</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your ZIP code to see potential savings in your area
            </p>
          </div>
          
          <div className="bg-gradient-eco rounded-xl p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center mb-6">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Enter ZIP Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-10 py-6 text-lg bg-white"
                  maxLength={5}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full md:w-auto py-6 px-8 bg-eco-teal-600 hover:bg-eco-teal-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">⟳</span> Calculating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search className="mr-2 h-5 w-5" /> Get Estimate
                  </span>
                )}
              </Button>
            </form>
            
            {estimate && (
              <div className="bg-white/90 rounded-lg p-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 text-center">Estimated Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="bg-eco-green-50 border-eco-green-100">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-eco-green-700 font-medium">Monthly Savings</p>
                      <p className="text-3xl font-bold text-eco-green-800">${estimate.monthlySavings}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-eco-blue-50 border-eco-blue-100">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-eco-blue-700 font-medium">Yearly Production</p>
                      <p className="text-3xl font-bold text-eco-blue-800">{estimate.yearlyProduction} kWh</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-eco-teal-50 border-eco-teal-100">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-eco-teal-700 font-medium">CO2 Reduction</p>
                      <p className="text-3xl font-bold text-eco-teal-800">{estimate.co2Reduction} tons</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickEstimator;
