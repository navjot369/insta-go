

import Hero from "./../Hero/Hero";
import About from "./../About/About";
import Services from "./../Services/Services";
import Reviews from "./../Reviews/Reviews";

export default function Landing({theme}) {
    return (<>
        <Hero theme={theme}/>
      <About theme={theme}/>
      <Services theme={theme}/>
      <Reviews theme={theme}/></>);
};