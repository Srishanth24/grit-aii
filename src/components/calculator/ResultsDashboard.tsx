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
  ResponsiveContainer 
} from 'recharts';
import { CircleDollarSign, Leaf, Timer, TrendingUp } from 'lucide-react';

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
    roi10Year: number;
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
    wind: "Wind Turbine System",
    battery: "Battery Storage System",
    hybrid: "Hybrid Solar + Battery System"
  };
  
  const systemSizeUnits = {
    solar: "kW",
    wind: "kW",
    battery: "kWh",
    hybrid: "kW"
  };
  
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
              <TrendingUp className="mr-2 h-5 w-5 text-eco-teal-500" />
              10-Year ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{results.roi10Year}%</p>
            <p className="text-sm text-gray-500">Return on investment</p>
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
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ff0000" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year"
                      label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }}
                    />
                    <YAxis
                      label={{ value: 'Dollars (₹)', angle: -90, position: 'insideLeft' }}
                    />
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
                    {/* Add a horizontal line for the initial investment */}
                    <Area
                      type="monotone"
                      dataKey={() => results.initialCost}
                      stroke="#ff0000"
                      strokeDasharray="5 5"
                      fill="none"
                      name="Initial Investment"
                    />
                    {/* Add a vertical line at the break-even point */}
                    {paybackYear <= 25 && (
                      <ReferenceLine
                        x={2025 + paybackYear - 1}
                        stroke="#00897B"
                        strokeDasharray="3 3"
                        label={{ value: 'Break Even', position: 'top', fill: '#00897B' }}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>The chart shows your cumulative savings over time compared to your initial investment. The break-even point 
                occurs when your cumulative savings exceed your initial investment cost.</p>
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
                    <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="production" 
                      stroke="#2E7D32" 
                      activeDot={{ r: 8 }}
                      name="Energy Production" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#1976D2" 
                      name="Energy Consumption" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart shows your projected monthly energy production compared to your consumption. 
                The closer production meets or exceeds consumption, the less energy you'll need to purchase from the grid.</p>
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
                  ]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Annual Cost (₹)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Annual Energy Cost']} />
                    <Legend />
                    <Bar dataKey="cost" fill="#1976D2" name="Annual Energy Cost" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>This chart compares your annual energy costs before and after installing your {results.systemType} system. 
                With your chosen system, you'll save approximately ₹{results.annualSavings} per year on energy costs.</p>
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
              Based on your location and energy usage, your selected {results.systemType} system will 
              provide excellent value with a {results.breakEvenYears} year payback period and {results.roi10Year}% ROI over 10 years.
            </p>
            {results.systemType === 'solar' && (
              <p>With abundant sunshine in your area, solar panels are an optimal choice for consistent energy production.</p>
            )}
            {results.systemType === 'wind' && (
              <p>Your location has favorable wind patterns that make this investment particularly worthwhile.</p>
            )}
            {results.systemType === 'battery' && (
              <p>Battery storage will help you optimize your energy usage and provide backup during outages.</p>
            )}
            {results.systemType === 'hybrid' && (
              <p>A hybrid system gives you the best of both worlds - solar generation and battery storage for maximum efficiency.</p>
            )}
            <p>Total Cost: ₹{results.totalCost}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add ReferenceLine component for the chart
const ReferenceLine = ({ x, stroke, strokeDasharray, label }: any) => {
  return (
    <g>
      <line x1={x} y1={0} x2={x} y2="100%" stroke={stroke} strokeDasharray={strokeDasharray} />
      {label && (
        <text x={x} y={15} textAnchor="middle" fill={label.fill || stroke}>
          {label.value}
        </text>
      )}
    </g>
  );
};

export default ResultsDashboard;
