
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "We've reduced our energy costs by 35% since implementing solar panels with the guidance from this calculator.",
      name: "Sarah Johnson",
      company: "GreenTech Solutions",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "The ROI projections were spot-on. Our wind installation broke even in just under the predicted 6 years.",
      name: "Michael Chen",
      company: "Riverside Farms",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "The AI recommended a hybrid system for our factory that's paying dividends in both cost savings and carbon credits.",
      name: "Jessica Williams",
      company: "EcoManufacturing Inc.",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how others have transformed their energy strategy with our calculator
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover bg-white">
              <CardContent className="flex flex-col p-6">
                <div className="mb-4">
                  <svg className="h-8 w-8 text-eco-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
