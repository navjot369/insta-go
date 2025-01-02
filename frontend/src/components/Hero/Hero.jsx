// import React from 'react'
import './Hero.css'
import evScooter from '../../../public/images/ather-1.png'
import whiteevScooter from '../../../public/images/whitescooter.png'
import { Link } from 'react-router-dom'
const Hero = ({theme}) => {
  return (
    <div className= 'hero'>
      <div className='herotext'>
        <div className='tagline'>Ride InstaGO</div>
        <div>🚴Your Smart, Eco-Friendly Travel Companion! 🌱 Book in seconds, ride in style, and explore effortlessly!</div>
        <Link to="/book" className='herobutton'>Book a ride</Link>
      </div>
      <div className='imgdiv'><img className='darkscooter' src={ theme === "dark" ? evScooter : whiteevScooter} alt="" /></div>
    </div>
  )
}

export default Hero
