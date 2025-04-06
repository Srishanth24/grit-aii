
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sun } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="eco-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Sun className="h-8 w-8 text-eco-green-600" />
          <span className="font-heading font-bold text-xl">EnviroVest AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-eco-green-800">Home</Link>
          <Link to="/calculator" className="text-gray-700 hover:text-eco-green-800">Calculator</Link>
          <Link to="/resources" className="text-gray-700 hover:text-eco-green-800">Resources</Link>
          <Link to="/about" className="text-gray-700 hover:text-eco-green-800">About</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-eco-green-700 hover:text-eco-green-800 hover:bg-eco-green-50">
            Login
          </Button>
          <Button className="bg-eco-green-600 hover:bg-eco-green-700">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
