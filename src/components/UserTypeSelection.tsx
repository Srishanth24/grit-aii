
import React from 'react';
import { Building2, Home, Trees } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  
  const userTypes = [
    {
      title: "Business Owner",
      description: "Optimize commercial energy costs and boost sustainability credentials",
      icon: <Building2 className="h-12 w-12 text-eco-blue-600" />,
      type: "commercial"
    },
    {
      title: "Agricultural",
      description: "Power farms and agricultural operations with renewable solutions",
      icon: <Trees className="h-12 w-12 text-eco-green-600" />,
      type: "agricultural"
    },
    {
      title: "Homeowner",
      description: "Reduce home energy bills and increase property value",
      icon: <Home className="h-12 w-12 text-eco-teal-600" />,
      type: "residential"
    }
  ];

  const handleUserTypeSelect = (type: string) => {
    // Navigate to calculator with user type parameter
    navigate(`/calculator?userType=${type}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Start Your Green Investment Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us who you are, and we'll tailor our recommendations to your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {userTypes.map((userType, index) => (
            <Card 
              key={index} 
              className="card-hover cursor-pointer border-2 hover:border-eco-teal-400 bg-white"
              onClick={() => handleUserTypeSelect(userType.type)}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 p-3 rounded-full bg-gray-50">
                  {userType.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{userType.title}</h3>
                <p className="text-gray-600">{userType.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelection;
