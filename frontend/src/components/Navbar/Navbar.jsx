import React from 'react';
import './Navbar.css';
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function Navbar({ theme, setTheme }) {
  return (
    <div className='navbar'>
     <h1>InstaGO</h1>
      <div className='main-navbar'>
        <div className='home'>Home</div>
        <div className='book'>Book a ride</div>
        <Link to="/About-us">About Us</Link>
        <div className='contact'>Contact us</div>
      </div>
      
      <div className='login-sign'>
        <Link className='log' to="/account/login">Log in</Link>
        <Link className='sign' to="/account/signup">sign up</Link>
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
