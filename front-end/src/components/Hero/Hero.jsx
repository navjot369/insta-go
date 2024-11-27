import React from 'react'
import './Hero.css'
import evScooter from '../../../public/images/ather-1.png'
import whiteevScooter from '../../../public/images/whitescooter.png'
const Hero = ({theme}) => {
  return (
    <div className= 'hero'>
      <div className='herotext'>
        <div className='tagline'>Effortless</div>
        <div>Ev rental</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores magnam nam reprehenderi</div>
        <button className='herobutton'>Book a ride</button>
      </div>
      <div className='imgdiv'><img className='darkscooter' src={ theme === "dark" ? evScooter : whiteevScooter} alt="" /></div>
    </div>
  )
}

export default Hero
