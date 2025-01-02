import React from 'react'
import './About.css' 
import aboutImg from '../../../public/images/aboutImg.png'

const About = ({theme}) => {
  return (
    <div className='abc'>
        <div> <img className='aboutImg' src={aboutImg}></img></div>
        <div className='text'>
            <h1>About us</h1>
            <p>Welcome to InstaGO, your trusted platform for convenient, eco-friendly travel solutions around your university campus. We are passionate about empowering students with easy access to sustainable transportation, making every ride an opportunity to reduce your carbon footprint while enjoying seamless mobility.</p>
        </div>
    </div>
  )
}

export default About;
