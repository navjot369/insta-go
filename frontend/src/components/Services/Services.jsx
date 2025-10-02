import React from 'react'
import './Services.css'
import { motion } from 'framer-motion'

const Services = ({ theme }) => {
  return (
    <motion.div 
      className={`whyus ${theme === 'dark' ? 'dark' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Title */}
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why Choose Us
      </motion.h1>

      {/* Cards */}
      <motion.div 
        className="cards-container"
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
        {[
          {
            title: "Best Price",
            desc: "Lorem ipsum dolor sit amet co hd iadia wdawhdaw dhnsectetur, adipisicing elit."
          },
          {
            title: "Fast and Safe",
            desc: "Lorem ipsum dolor sit amet c aw jdicjaw djoa wdaw onsectetur, adipisicing elit."
          },
          {
            title: "Experience Drivers",
            desc: "Lorem ipsum dolor sit amet con dawid iahw diawd a  sectetur, adipisicing elit."
          }
        ].map((service, index) => (
          <motion.div 
            key={index} 
            className="card"
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 30 },
              show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <h2>{service.title}</h2>
            <p>{service.desc}</p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Learn more
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Services
