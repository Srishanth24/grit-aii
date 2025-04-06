
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Wind, Battery } from 'lucide-react';

interface SystemComparisonProps {
  budget: number;
}

const SystemComparison = ({ budget }: SystemComparisonProps) => {
  // Generate comparison data based on budget
  const calculateData = (budget: number) => {
    // Cost per unit for different systems
    const costPerUnit = {
      solar: 2500, // $ per kW
      wind: 5000, // $ per kW
      battery: 800, // $ per kWh
      hybrid: 3500 // $ per kW
    };
    
    // Base production values
    const baseProduction = {
      solar: 1200, // kWh per kW per year
      wind: 2000, // kWh per kW per year
      battery: 0, // Battery doesn't produce energy
      hybrid: 1500 // kWh per kW per year (blended)
    };
    
    // Calculate system sizes
    const systemSizes = {
      solar: budget / costPerUnit.solar,
      wind: budget / costPerUnit.wind,
      battery: budget / costPerUnit.battery,
      hybrid: budget / costPerUnit.hybrid
    };
    
    // Calculate annual production
    const annualProduction = {
      solar: baseProduction.solar * systemSizes.solar,
      wind: baseProduction.wind * systemSizes.wind,
      battery: 0, // Battery doesn't generate
      hybrid: baseProduction.hybrid * systemSizes.hybrid
    };
    
    // Calculate annual savings (assuming $0.15 per kWh)
    const rate = 0.15;
    const annualSavings = {
      solar: annualProduction.solar * rate,
      wind: annualProduction.wind * rate,
      battery: budget / costPerUnit.battery * 100, // Rough estimate for battery savings
      hybrid: annualProduction.hybrid * rate * 1.1 // Hybrid gets a bonus for optimization
    };
    
    // Calculate break-even years
    const breakEven = {
      solar: budget / annualSavings.solar,
      wind: budget / annualSavings.wind,
      battery: budget / annualSavings.battery,
      hybrid: budget / annualSavings.hybrid
    };
    
    // Calculate 10-year ROI
    const roi10Year = {
      solar: (annualSavings.solar * 10 - budget) / budget * 100,
      wind: (annualSavings.wind * 10 - budget) / budget * 100,
      battery: (annualSavings.battery * 10 - budget) / budget * 100,
      hybrid: (annualSavings.hybrid * 10 - budget) / budget * 100
    };
    
    return {
      systemSizes,
      annualProduction,
      annualSavings,
      breakEven,
      roi10Year
    };
  };
  
  const data = calculateData(budget);
  
  // Format numbers for display
  const formatCurrency = (value: number) => {
    return `$${Math.round(value).toLocaleString()}`;
  };
  
  const formatDecimal = (value: number) => {
    return Math.round(value * 10) / 10;
  };
  
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`;
  };
  
  // Define system benefits
  const systemBenefits = {
    solar: [
      "No moving parts, low maintenance",
      "Works in most climates",
      "Scalable for future expansion"
    ],
    wind: [
      "Highly efficient in windy areas",
      "Works day and night",
      "Lower space requirements"
    ],
    battery: [
      "Energy independence during outages",
      "Maximize self-consumption",
      "Reduce demand charges"
    ],
    hybrid: [
      "Most reliable energy production",
      "Optimized for all conditions",
      "Best long-term value"
    ]
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Comparison of different renewable energy systems for your budget of {formatCurrency(budget)}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">System Type</TableHead>
              <TableHead>System Size</TableHead>
              <TableHead>Annual Savings</TableHead>
              <TableHead>Break-Even</TableHead>
              <TableHead>ROI (10 yrs)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Sun className="mr-2 h-5 w-5 text-eco-green-500" />
                  Solar Panels
                </div>
              </TableCell>
              <TableCell>{formatDecimal(data.systemSizes.solar)} kW</TableCell>
              <TableCell>{formatCurrency(data.annualSavings.solar)}</TableCell>
              <TableCell>{formatDecimal(data.breakEven.solar)} years</TableCell>
              <TableCell>{formatPercentage(data.roi10Year.solar)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Wind className="mr-2 h-5 w-5 text-eco-blue-500" />
                  Wind Turbines
                </div>
              </TableCell>
              <TableCell>{formatDecimal(data.systemSizes.wind)} kW</TableCell>
              <TableCell>{formatCurrency(data.annualSavings.wind)}</TableCell>
              <TableCell>{formatDecimal(data.breakEven.wind)} years</TableCell>
              <TableCell>{formatPercentage(data.roi10Year.wind)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Battery className="mr-2 h-5 w-5 text-eco-teal-500" />
                  Battery Storage
                </div>
              </TableCell>
              <TableCell>{formatDecimal(data.systemSizes.battery)} kWh</TableCell>
              <TableCell>{formatCurrency(data.annualSavings.battery)}</TableCell>
              <TableCell>{formatDecimal(data.breakEven.battery)} years</TableCell>
              <TableCell>{formatPercentage(data.roi10Year.battery)}</TableCell>
            </TableRow>
            <TableRow className="bg-eco-green-50">
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Sun className="mr-1 h-4 w-4 text-eco-green-500" />
                  <Battery className="h-4 w-4 text-eco-teal-500" />
                  <span className="ml-1">Hybrid System</span>
                </div>
              </TableCell>
              <TableCell>{formatDecimal(data.systemSizes.hybrid)} kW</TableCell>
              <TableCell>{formatCurrency(data.annualSavings.hybrid)}</TableCell>
              <TableCell>{formatDecimal(data.breakEven.hybrid)} years</TableCell>
              <TableCell>{formatPercentage(data.roi10Year.hybrid)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {Object.entries(systemBenefits).map(([system, benefits]) => (
            <div key={system} className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-lg mb-2">
                {system === 'solar' ? 'Solar Benefits' : 
                 system === 'wind' ? 'Wind Benefits' :
                 system === 'battery' ? 'Battery Benefits' :
                 'Hybrid Benefits'}
              </h3>
              <ul className="space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-600 flex">
                    <span className="mr-2">•</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemComparison;
