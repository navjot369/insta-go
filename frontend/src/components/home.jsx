import Navbar from "./Navbar/Navbar";
import { useState, useEffect } from "react";
import Footer from "./Footer/Footer";
import Chatbot from './ChatBot/ChatBot';
import { Outlet, useOutletContext } from "react-router-dom";

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
      <Outlet context={{ theme }} />
      <Footer theme={theme}/>
      <Chatbot />
    </div>
  );
}
