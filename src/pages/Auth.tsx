
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Leaf } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  
  const handleSuccess = () => {
    navigate('/calculator');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 bg-[#F2FCE2]">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-[#9b87f5] p-3 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to GRIT 🌱</CardTitle>
            <CardDescription>
              Let's grow your green investments together!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
