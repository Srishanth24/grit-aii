
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Sun, Wind, Battery } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FormState {
  location: string;
  energyUsage: number;
  budget: number;
  systemType: string;
  userType: string;
}

interface Props {
  onCalculate: (results: any) => void;
}

const CalculatorForm = ({ onCalculate }: Props) => {
  const [searchParams] = useSearchParams();
  const userTypeParam = searchParams.get('userType') || 'residential';
  
  const [formState, setFormState] = useState<FormState>({
    location: '',
    energyUsage: 800, // Default monthly kWh
    budget: 20000, // Default budget in dollars
    systemType: 'solar',
    userType: userTypeParam,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormState(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.location) {
      toast({
        title: "Location Required",
        description: "Please enter your location to calculate accurate results.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call and calculation
    setTimeout(() => {
      // Generate realistic results based on inputs
      const baseProduction = {
        solar: 1200, // kWh per kW per year
        wind: 2000,
        battery: 0,
        hybrid: 1500
      };
      
      const systemSizes = {
        solar: formState.budget / 2500, // $2500 per kW
        wind: formState.budget / 5000, // $5000 per kW
        battery: formState.budget / 800, // $800 per kWh
        hybrid: formState.budget / 3500 // Blended rate
      };
      
      const systemSize = systemSizes[formState.systemType as keyof typeof systemSizes];
      const annualProduction = baseProduction[formState.systemType as keyof typeof baseProduction] * systemSize;
      
      // Adjust for user type
      const userTypeMultiplier = {
        commercial: 1.2,
        agricultural: 1.1, 
        residential: 1.0
      };
      
      const adjustedProduction = annualProduction * userTypeMultiplier[formState.userType as keyof typeof userTypeMultiplier];
      
      // Calculate savings
      const electricityRate = 0.15; // $ per kWh
      const annualSavings = adjustedProduction * electricityRate;
      const monthlyBill = formState.energyUsage * electricityRate;
      const monthlySavings = annualSavings / 12;
      const savingsPercentage = Math.min(100, (monthlySavings / monthlyBill) * 100);
      
      // Calculate ROI
      const breakEvenYears = formState.budget / annualSavings;
      const roi10Year = ((annualSavings * 10) - formState.budget) / formState.budget * 100;
      
      // Calculate CO2 reduction
      const co2PerKwh = 0.7; // kg CO2 per kWh
      const annualCO2Reduction = adjustedProduction * co2PerKwh / 1000; // Convert to tons
      
      const results = {
        systemType: formState.systemType,
        systemSize: Math.round(systemSize * 10) / 10, // Round to 1 decimal
        initialCost: formState.budget,
        annualProduction: Math.round(adjustedProduction),
        monthlySavings: Math.round(monthlySavings),
        annualSavings: Math.round(annualSavings),
        savingsPercentage: Math.round(savingsPercentage),
        breakEvenYears: Math.round(breakEvenYears * 10) / 10,
        roi10Year: Math.round(roi10Year),
        co2Reduction: Math.round(annualCO2Reduction * 10) / 10,
        // Add data for charts
        monthlyData: Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2025, i).toLocaleString('default', { month: 'short' }),
          production: Math.round(adjustedProduction / 12 * (0.9 + Math.random() * 0.2)),
          consumption: Math.round(formState.energyUsage * (0.9 + Math.random() * 0.2))
        })),
        yearlyData: Array.from({ length: 25 }, (_, i) => ({
          year: 2025 + i,
          savings: Math.round(annualSavings * (i === 0 ? 1 : 1 + i * 0.02)),
          cumulativeSavings: Math.round(annualSavings * (i === 0 ? 1 : (i * (1 + (i-1) * 0.02) / 2) + i))
        }))
      };
      
      onCalculate(results);
      setIsLoading(false);
    }, 2000);
  };

  // Custom label formatter for the budget slider
  const formatBudgetLabel = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const userTypeLabels = {
    commercial: "Business",
    agricultural: "Agricultural",
    residential: "Residential"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy Investment Calculator</CardTitle>
        <CardDescription>
          Enter your details to calculate potential savings and ROI for renewable energy systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">I am a...</label>
            <Select 
              value={formState.userType} 
              onValueChange={(value) => handleSelectChange('userType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial">{userTypeLabels.commercial} Owner</SelectItem>
                <SelectItem value="agricultural">{userTypeLabels.agricultural} Operation</SelectItem>
                <SelectItem value="residential">{userTypeLabels.residential} Homeowner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                name="location"
                value={formState.location}
                onChange={handleInputChange}
                placeholder="Enter your city or ZIP code"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Energy Usage (kWh)</label>
            <Input 
              name="energyUsage"
              type="number"
              value={formState.energyUsage}
              onChange={handleInputChange}
              placeholder="Enter your monthly energy usage in kWh"
            />
            <p className="text-xs text-gray-500 mt-1">
              Typical {formState.userType} usage: {
                formState.userType === 'commercial' ? '10,000-50,000 kWh' : 
                formState.userType === 'agricultural' ? '5,000-20,000 kWh' : 
                '500-1,500 kWh'
              }
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Investment Budget</label>
            <div className="space-y-4">
              <Slider
                defaultValue={[formState.budget]}
                max={formState.userType === 'commercial' ? 500000 : 
                      formState.userType === 'agricultural' ? 200000 : 50000}
                min={formState.userType === 'commercial' ? 20000 : 
                     formState.userType === 'agricultural' ? 10000 : 5000}
                step={1000}
                onValueChange={(value) => handleSliderChange('budget', value)}
              />
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {formatBudgetLabel(formState.userType === 'commercial' ? 20000 : 
                                    formState.userType === 'agricultural' ? 10000 : 5000)}
                </span>
                <span className="text-sm font-medium">{formatBudgetLabel(formState.budget)}</span>
                <span className="text-sm text-gray-500">
                  {formatBudgetLabel(formState.userType === 'commercial' ? 500000 : 
                                    formState.userType === 'agricultural' ? 200000 : 50000)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">System Type</label>
            <Tabs defaultValue={formState.systemType} onValueChange={(value) => handleSelectChange('systemType', value)}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="solar" className="flex items-center">
                  <Sun className="mr-2 h-4 w-4" /> Solar
                </TabsTrigger>
                <TabsTrigger value="wind" className="flex items-center">
                  <Wind className="mr-2 h-4 w-4" /> Wind
                </TabsTrigger>
                <TabsTrigger value="battery" className="flex items-center">
                  <Battery className="mr-2 h-4 w-4" /> Battery
                </TabsTrigger>
                <TabsTrigger value="hybrid" className="flex items-center">
                  <Sun className="mr-1 h-3 w-3" />
                  <Battery className="h-3 w-3" /> Hybrid
                </TabsTrigger>
              </TabsList>
              <TabsContent value="solar" className="mt-2">
                <p className="text-sm text-gray-500">
                  Solar panels convert sunlight into electricity, ideal for areas with good sun exposure.
                </p>
              </TabsContent>
              <TabsContent value="wind" className="mt-2">
                <p className="text-sm text-gray-500">
                  Wind turbines harness wind energy, perfect for open areas with consistent wind patterns.
                </p>
              </TabsContent>
              <TabsContent value="battery" className="mt-2">
                <p className="text-sm text-gray-500">
                  Battery storage systems store excess energy for use during peak times or outages.
                </p>
              </TabsContent>
              <TabsContent value="hybrid" className="mt-2">
                <p className="text-sm text-gray-500">
                  Combines solar panels with battery storage for optimized energy generation and usage.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-eco-green-600 hover:bg-eco-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2">⟳</span> Calculating...
              </span>
            ) : 'Calculate Investment Potential'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;
