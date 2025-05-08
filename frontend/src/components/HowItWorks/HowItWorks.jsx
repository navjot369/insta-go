import React from 'react';
import './HowItWorks.css';
import { FaUserPlus, FaSearchLocation, FaMotorcycle, FaRegCheckCircle } from 'react-icons/fa';

const HowItWorks = ({ theme }) => {
  const steps = [
    {
      icon: <FaUserPlus size={50} />,
      title: 'Sign Up / Log In',
      description: 'Create an account or log in to get started.',
    },
    {
      icon: <FaSearchLocation size={50} />,
      title: 'Find a Scooter',
      description: 'Locate available scooters near you using our map.',
    },
    {
      icon: <FaMotorcycle size={50} />,
      title: 'Unlock & Ride',
      description: 'Unlock your chosen scooter with the app and enjoy your ride.',
    },
    {
      icon: <FaRegCheckCircle size={50} />,
      title: 'Park & End Trip',
      description: 'Park in a designated zone and end your trip via the app.',
    },
  ];
  return (
    <div className={`how-it-works${theme === 'dark' ? ' dark' : ''}`}> 
      <h2>How InstaGO Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;