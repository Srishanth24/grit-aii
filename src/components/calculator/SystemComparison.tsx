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

interface SystemComparisonProps {
  budget: number;
}

const SystemComparison = ({ budget }: SystemComparisonProps) => {
  const calculateData = (budget: number) => {
    const costPerUnit = {
      solar: 2500,
      wind: 5000,
      battery: 800,
      hybrid: 3500
    };

    const baseProduction = {
      solar: 1200,
      wind: 2000,
      battery: 0,
      hybrid: 1500
    };

    const systemSizes = {
      solar: budget / costPerUnit.solar,
      wind: budget / costPerUnit.wind,
      battery: budget / costPerUnit.battery,
      hybrid: budget / costPerUnit.hybrid
    };

    const annualProduction = {
      solar: baseProduction.solar * systemSizes.solar,
      wind: baseProduction.wind * systemSizes.wind,
      battery: 0,
      hybrid: baseProduction.hybrid * systemSizes.hybrid
    };

    const rate = 0.15;
    const annualSavings = {
      solar: annualProduction.solar * rate,
      wind: annualProduction.wind * rate,
      battery: budget / costPerUnit.battery * 100,
      hybrid: annualProduction.hybrid * rate * 1.1
    };

    const breakEven = {
      solar: budget / annualSavings.solar,
      wind: budget / annualSavings.wind,
      battery: budget / annualSavings.battery,
      hybrid: budget / annualSavings.hybrid
    };

    return {
      systemSizes,
      annualProduction,
      annualSavings,
      breakEven
    };
  };

  const data = calculateData(budget);

  const formatCurrency = (value: number) => `₹${Math.round(value).toLocaleString()}`;
  const formatDecimal = (value: number) => Math.round(value * 10) / 10;

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
              <TableHead>System Type</TableHead>
              <TableHead>System Size</TableHead>
              <TableHead>Annual Savings</TableHead>
              <TableHead>Break-Even</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Solar Panels</TableCell>
              <TableCell>{formatDecimal(data.systemSizes.solar)} kW</TableCell>
              <TableCell>{formatCurrency(data.annualSavings.solar)}</TableCell>
              <TableCell>{formatDecimal(data.breakEven.solar)} years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Wind Turbines</TableCell>
              <TableCell>{formatDecimal(data.systemSizes.wind)} kW</TableCell>
              <TableCell>{formatCurrency(data.annualSavings.wind)}</TableCell>
              <TableCell>{formatDecimal(data.breakEven.wind)} years</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SystemComparison;
