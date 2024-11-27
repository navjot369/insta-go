import React from 'react';
import './Navbar.css';
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";

const Navbar = ({theme, setTheme}) => {
  
  return (
    <div className='navbar'>
     <h1>InstaGO</h1>
      <div className='main-navbar'>
        <div className='home'>Home</div>
        <div className='book'>Book a ride</div>
        <div className='about'>About us</div>
        <div className='contact'>Contact us</div>
      </div>
      
      <div className='login-sign'>
        <div className='log'>Log in</div>
        <div className='sign'>sign up</div>
      </div>
      <div className='theme'>
        {
          theme === "dark" ?(
            <MdDarkMode onClick={() => setTheme("light")} />
          ) : (
            <HiSun onClick={() => setTheme("dark")} />
          )}
      </div>
    </div>
  )
}

export default Navbar;
