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
        <Link to="/" className='home'>Home</Link>
        <div className='book'>Book a ride</div>
        <Link className= 'about' to="/About-us">About Us</Link>
        <Link className='contact' to="/Contact-us">Contact us</Link>
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
