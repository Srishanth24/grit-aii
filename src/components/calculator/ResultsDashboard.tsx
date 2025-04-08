import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { CircleDollarSign, Leaf, Timer } from 'lucide-react';

interface ResultsProps {
  results: {
    systemType: string;
    systemSize: number;
    initialCost: number;
    annualProduction: number;
    monthlySavings: number;
    annualSavings: number;
    savingsPercentage: number;
    breakEvenYears: number;
    co2Reduction: number;
    monthlyData: Array<{
      month: string;
      production: number;
      consumption: number;
    }>;
    yearlyData: Array<{
      year: number;
      savings: number;
      cumulativeSavings: number;
    }>;
    totalCost: number;
  };
}

const ResultsDashboard = ({ results }: ResultsProps) => {
  const systemTypeLabel = {
    solar: "Solar Panel System",
    wind: "Wind Turbine System"
  };

  const systemSizeUnits = {
    solar: "kW",
    wind: "kW"
  };

  // Example costs per unit (adjust based on actual data)
  const costPerUnit = {
    solar: 50000, // Cost per solar panel in ₹
    wind: 150000 // Cost per wind turbine in ₹
  };

  // Function to calculate the number of units needed within the budget
  const calculateUnits = (budget: number, systemType: string) => {
    const unitCost = costPerUnit[systemType as keyof typeof costPerUnit];
    return Math.floor(budget / unitCost); // Return the number of units that fit within the budget
  };

  // Use the budget from results
  const userBudget = results.totalCost;
  const unitsNeeded = calculateUnits(userBudget, results.systemType);

  // Calculate payback point for the chart
  const paybackYear = Math.ceil(results.breakEvenYears);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Investment Results</h2>
        <p className="text-gray-600">
          {systemTypeLabel[results.systemType as keyof typeof systemTypeLabel]} ({results.systemSize} {systemSizeUnits[results.systemType as keyof typeof systemSizeUnits]})
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CircleDollarSign className="mr-2 h-5 w-5 text-eco-green-500" />
              Monthly Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{results.monthlySavings}</p>
            <p className="text-sm text-gray-500">{results.savingsPercentage}% of current bill</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Timer className="mr-2 h-5 w-5 text-eco-blue-500" />
              Break-Even Point
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{results.breakEvenYears} years</p>
            <p className="text-sm text-gray-500">Full investment recovery</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Leaf className="mr-2 h-5 w-5 text-eco-green-500" />
              CO2 Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{results.co2Reduction} tons</p>
            <p className="text-sm text-gray-500">Annual carbon offset</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="savings" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="savings">Long-Term Savings</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Projection</TabsTrigger>
          <TabsTrigger value="comparison">Energy Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="savings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Long-Term Investment Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.yearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, '']} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="cumulativeSavings" 
                      stroke="#2E7D32" 
                      fillOpacity={1} 
                      fill="url(#colorSavings)" 
                      name="Cumulative Savings" 
                    />
                    <ReferenceLine x={2025 + paybackYear - 1} stroke="#00897B" strokeDasharray="3 3" label={{ value: 'Break Even', position: 'top', fill: '#00897B' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>The chart shows your cumulative savings over time compared to your initial investment. The break-even point occurs when your cumulative savings exceed your initial investment cost.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Energy Production</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="production" stroke="#2E7D32" name="Energy Production" />
                    <Line type="monotone" dataKey="consumption" stroke="#1976D2" name="Energy Consumption" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart shows your projected monthly energy production compared to your consumption. The closer production meets or exceeds consumption, the less energy you'll need to purchase from the grid.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Cost Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    {name: 'Before', cost: results.annualSavings + (results.annualProduction * 0.15)},
                    {name: 'After', cost: (results.annualProduction * 0.15) - results.annualSavings}
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Annual Energy Cost']} />
                    <Legend />
                    <Bar dataKey="cost" fill="#1976D2" name="Annual Energy Cost" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart compares your annual energy costs before and after installing your {results.systemType} system. With your chosen system, you'll save approximately ₹{results.annualSavings} per year on energy costs.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-eco-green-50 border-l-4 border-eco-green-500 p-4 rounded">
            <h3 className="font-bold text-lg mb-2">Your {systemTypeLabel[results.systemType as keyof typeof systemTypeLabel]} is a great fit!</h3>
            <p className="mb-3">
              Based on your budget of ₹{userBudget}, you can install approximately <strong>{unitsNeeded}</strong> {results.systemType === "solar" ? "solar panels" : "wind turbines"}.
            </p>
            <p>
              This will help you achieve your energy goals effectively while staying within your budget.
            </p>
            <p>Total Cost: ₹{results.totalCost}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDashboard;