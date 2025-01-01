// import React from 'react';
import './Navbar.css';
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Navbar({ theme, setTheme }) {
  const [isLogged, setLogged] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("user") != null) {
      setLogged(true);
    }
  }, []);
  return (
    <div className='navbar'>
     <h1>InstaGO</h1>
      <div className='main-navbar'>
        <Link to="/" className='home'>Home</Link>
        <Link to="/book" className='book'>Book a ride</Link>
        <Link className= 'about' to="/About-us">About Us</Link>
        <Link className='contact' to="/Contact-us">Contact us</Link>
      </div>
      
      {isLogged? 
      <button className="auth-button" onClick={() => {
        localStorage.removeItem("user");
        window.location.reload();
      }}>Log out</button>
      :<div className='login-sign'>
        <Link className='log' to="/account/login">Log in</Link>
        <Link className='sign' to="/account/signup">sign up</Link>
      </div>}
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
