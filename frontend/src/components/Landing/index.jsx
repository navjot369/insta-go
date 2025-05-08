import Hero from "./../Hero/Hero";
import About from "./../About/About";
import Services from "./../Services/Services";
import Reviews from "./../Reviews/Reviews";
import HowItWorks from "./../HowItWorks/HowItWorks"; // Import the new component
import { useOutletContext } from 'react-router-dom'; // Import useOutletContext

export default function Landing() { // Remove theme prop
    const { theme } = useOutletContext(); // Get theme from context
    return (<div className="landing-page"> {/* Optional: Add a wrapper for global page styles */}
      <Hero theme={theme}/>
      <HowItWorks theme={theme} /> {/* Add the new section */}
      <About theme={theme}/>
      <Services theme={theme}/>
      <Reviews theme={theme}/>
      </div>);
};