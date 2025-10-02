// import React from 'react'
import './Hero.css'
import evScooter from '../../../public/images/ather-1.png'
import whiteevScooter from '../../../public/images/whitescooter.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = ({ theme }) => {
  return (
    <motion.div 
      className='hero'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Text */}
      <motion.div 
        className='herotext'
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div 
          className='tagline'
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Ride InstaGO
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          🚴 Your Smart, Eco-Friendly Travel Companion! 🌱  
          Book in seconds, ride in style, and explore effortlessly!
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/book" className='herobutton'>Book a ride</Link>
        </motion.div>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        className='imgdiv'
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.img
          className='darkscooter'
          src={ theme === "dark" ? evScooter : whiteevScooter }
          alt="scooter"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Hero
