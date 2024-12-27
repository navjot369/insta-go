import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Services from "./Services/Services";
import { useState, useEffect } from "react";
import Reviews from "./Reviews/Reviews";
import Footer from "./Footer/Footer";

export default function Home() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="container">
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero theme={theme}/>
      <About theme={theme}/>
      <Services theme={theme}/>
      <Reviews theme={theme}/>
      <Footer/>
    </div>
  );
}
