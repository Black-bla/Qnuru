import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Hero from './sections/Hero';
import CoreServices from './sections/CoreServices';
import TierBundles from './sections/TierBundles';
import HowItWorks from './sections/HowItWorks';
import Guarantee from './sections/Guarantee';
import Team from './sections/Team';
import FinalCTA from './sections/FinalCTA';
import Services from './sections/Services';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <CoreServices />
      <TierBundles />
      <HowItWorks />
      <Guarantee />
      <Team />
      <FinalCTA />
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
