import React from 'react';
import './HowItWorks.css';
import { FaUserPlus, FaSearchLocation, FaMotorcycle, FaRegCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
    <motion.div 
      className={`how-it-works${theme === 'dark' ? ' dark' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    > 
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        How InstaGO Works
      </motion.h2>

      {/* Steps */}
      <motion.div 
        className="steps-container"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
          }
        }}
      >
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="step-card"
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 30 },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="step-icon"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {step.icon}
            </motion.div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;
