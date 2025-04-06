
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, Lightbulb, TrendingUp } from 'lucide-react';

const ValueProposition = () => {
  const benefits = [
    {
      title: "Save on Energy Costs",
      description: "Up to 30% savings with the right renewable energy mix for your needs.",
      icon: <CircleDollarSign className="h-10 w-10 text-eco-green-500" />
    },
    {
      title: "Fast Break-Even",
      description: "See your investment return in as little as 5 years with current incentives.",
      icon: <TrendingUp className="h-10 w-10 text-eco-blue-500" />
    },
    {
      title: "Smart AI Insights",
      description: "Get personalized recommendations powered by our advanced AI algorithms.",
      icon: <Lightbulb className="h-10 w-10 text-eco-teal-500" />
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Renewable Energy?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Investing in green energy isn't just good for the planet—it's a smart financial decision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-hover bg-white">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 p-3 rounded-full bg-gray-50">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
