import React from 'react'
import './About.css' 
import aboutImg from '../../../public/images/aboutImg.png'
import { motion } from 'framer-motion'

const About = ({ theme }) => {
  return (
    <motion.div 
      className={`abc ${theme === 'dark' ? 'dark' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img className='aboutImg' src={aboutImg} alt="About InstaGO" />
      </motion.div>

      {/* Text */}
      <motion.div 
        className='text'
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          About us
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Welcome to InstaGO, your trusted platform for convenient, eco-friendly travel solutions around your university campus. 
          We are passionate about empowering students with easy access to sustainable transportation, 
          making every ride an opportunity to reduce your carbon footprint while enjoying seamless mobility.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default About
