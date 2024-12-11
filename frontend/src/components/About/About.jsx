import React from 'react'
import './About.css' 
import aboutImg from '../../../public/images/aboutImg.png'

const About = ({theme}) => {
  return (
    <div className='abc'>
        <div> <img className='aboutImg' src={aboutImg}></img></div>
        <div className='text'>
            <h1>About us</h1>
            <p>Lorem ipsum dolor, sit hi ba iadbaibdi adiab idbaojnsnvdojanc asjncoajsbciopas coj anctio assumenda</p>
            <p>Lorem ipsum dolor, sig elit.  magni pladandab diabdibai ceat illo. Distinctio assumenda</p>
        </div>
    </div>
  )
}

export default About;
