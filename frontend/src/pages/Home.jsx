import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse, Package, TrendingUp, Shield } from 'lucide-react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Warehouse size={40} />,
      title: 'Multi-Warehouse Management',
      description: 'Manage multiple warehouses from a single dashboard with ease',
    },
    {
      icon: <Package size={40} />,
      title: 'Product Tracking',
      description: 'Track inventory levels, prices, and stock status in real-time',
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Analytics & Reports',
      description: 'Get insights into your inventory with powerful analytics',
    },
    {
      icon: <Shield size={40} />,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to WareFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Complete Warehouse Management Solution
        </p>
        <Button onClick={() => navigate('/login')} className="text-lg px-8 py-3">
          Get Started
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        {features.map((feature, index) => (
          <Card key={index}>
            <div className="text-purple-600 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;