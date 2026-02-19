import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import CoreServices from './sections/CoreServices';
import TierBundles from './sections/TierBundles';
import HowItWorks from './sections/HowItWorks';
import Guarantee from './sections/Guarantee';
import Team from './sections/Team';
import FinalCTA from './sections/FinalCTA';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navigation />
      <main className="relative">
        <Hero />
        <CoreServices />
        <TierBundles />
        <HowItWorks />
        <Guarantee />
        <Team />
        <FinalCTA />
      </main>
    </div>
  );
}

export default App;
