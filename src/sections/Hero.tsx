import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Check, Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { scroll } from 'motion';
import { cn } from '@/lib/utils';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', need: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(card,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(content.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        '-=0.3'
      );
    }, card);

    return () => ctx.revert();
  }, []);

  // Motion scroll parallax for Lottie animation
  useEffect(() => {
    const lottie = lottieRef.current;
    const container = containerRef.current;
    if (!lottie || !container) return;

    const scrollAnimation = scroll(
      (progress: number) => {
        if (lottie) {
          lottie.style.transform = `translateY(${progress * 50}px)`;
        }
      },
      {
        target: container,
        offset: ['start start', 'end start']
      }
    );

    return scrollAnimation;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setShowDialog(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', need: '' });
    }, 2000);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('core-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const leftNavItems = [
    { id: 'core-services', label: 'Services' },
    { id: 'how-it-works', label: 'How It Works' },
  ];

  const rightNavItems = [
    { id: 'team', label: 'Team' },
    { id: 'final-cta', label: 'Contact' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
    >
      {/* Background Lottie Animation */}
      <div 
        ref={lottieRef}
        className="absolute inset-0 lg:left-auto lg:right-0 lg:w-1/2 flex items-center justify-center opacity-30 dark:opacity-20 lg:opacity-100 dark:lg:opacity-100 pointer-events-none z-0"
      >
        <DotLottieReact
          src="/animations/Stacking shapes animation.lottie"
          loop
          autoplay
          className="w-full h-full max-w-2xl lg:max-w-3xl"
        />
      </div>

      {/* Navigation - Island/Notch Style */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 lg:pt-6 pointer-events-none">
        <div 
          ref={cardRef}
          className={cn(
            "pointer-events-auto flex items-center gap-3 lg:gap-8 px-4 lg:px-8 transition-all duration-500 ease-out",
            isScrolled 
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] py-3 rounded-full border border-gray-200/50 dark:border-gray-700/50" 
              : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md py-4 rounded-full border border-gray-200/30 dark:border-gray-700/30"
          )}
        >
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {leftNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-brand-blue dark:text-gray-300 dark:hover:text-brand-blue-dark transition-colors font-montserrat relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue dark:bg-brand-blue-dark transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Logo - Centered */}
          <div className="flex items-center">
            <img 
              src="/images/logo.svg" 
              alt="Qnuru Logo" 
              className={cn(
                "cursor-pointer transition-all duration-300",
                isScrolled ? "h-10 lg:h-11" : "h-12 lg:h-14"
              )}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {rightNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-brand-blue dark:text-gray-300 dark:hover:text-brand-blue-dark transition-colors font-montserrat relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue dark:bg-brand-blue-dark transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl w-[280px] sm:w-[350px] border-l border-gray-200/50 dark:border-gray-700/50">
          <nav className="flex flex-col gap-6 mt-12">
            {[...leftNavItems, ...rightNavItems].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-brand-blue dark:hover:text-brand-blue-dark transition-colors text-left font-montserrat"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content Container */}
      <div className="relative z-10 h-full w-full max-w-[900px] mx-auto px-6 lg:px-12 lg:mr-auto lg:ml-8 flex items-center justify-center">
        {/* Centered Content */}
        <div className="w-full py-24 lg:py-0">
          {/* Content */}
          <div ref={contentRef} className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 lg:space-y-6">
            {/* Top Label */}
            <span className="text-xs tracking-[0.2em] text-brand-green dark:text-brand-green-dark font-bold font-montserrat uppercase">
              PRE-LAUNCH ACCESS
            </span>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-black dark:text-white leading-[1.05] uppercase">
              <span className="font-pepsi tracking-wider">Build</span> <span style={{ fontFamily: 'Impact, sans-serif' }}>Better.</span><br />
              <span style={{ fontFamily: 'Impact, sans-serif' }}>Scale</span> <span className="font-pepsi tracking-wider">Faster.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[#666666] dark:text-gray-400 text-sm lg:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-montserrat">
              We replace chaotic freelance hiring with a dedicated product team. Custom Apps, CRM, and Marketing for ambitious Kenyan businesses.
            </p>

            {/* Countdown */}
            <div className="space-y-2 flex flex-col items-center lg:items-start">
              <p className="text-xs lg:text-sm text-[#666] dark:text-gray-400 font-montserrat">Launch Offer Ends In:</p>
              <FlipClockCountdown
                to={new Date('2026-03-11T00:00:00').getTime()}
                labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                labelStyle={{
                  fontSize: '10px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  fontFamily: 'Montserrat, sans-serif'
                }}
                digitBlockStyle={{
                  width: 48,
                  height: 56,
                  fontSize: 28
                }}
                dividerStyle={{ color: 'transparent', height: 0 }}
                separatorStyle={{ size: '4px' }}
                duration={0.5}
                className="flip-clock-hero"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => setShowDialog(true)}
                className="bg-brand-blue dark:bg-brand-blue-dark text-white px-6 lg:px-8 py-3 rounded-full font-medium font-montserrat text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-describedby="early-access-note"
              >
                Secure Early Access
              </button>
              <button
                onClick={scrollToServices}
                className="bg-transparent border border-[#E5E5E5] dark:border-gray-700 text-black dark:text-white px-6 lg:px-8 py-3 rounded-full font-medium font-montserrat text-sm hover:border-brand-green dark:hover:border-brand-green-dark transition-colors"
              >
                View Solutions
              </button>
            </div>
            <p id="early-access-note" className="text-xs text-[#999] dark:text-gray-500 font-montserrat">Limited founder slots available</p>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <button
        onClick={scrollToServices}
        className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-green dark:text-brand-green-dark hover:opacity-70 transition-opacity"
        aria-label="Scroll to services"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* Signup Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-black dark:text-white font-lato">
              {isSubmitted ? 'Welcome to Qnuru!' : 'Secure Early Access'}
            </DialogTitle>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-brand-green dark:bg-brand-green-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#666] dark:text-gray-400 font-montserrat">Check your inbox for early access details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-black dark:text-white font-montserrat">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[#E5E5E5] dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-brand-green dark:focus:border-brand-green-dark focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green-dark/20 outline-none transition-all font-montserrat"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black dark:text-white font-montserrat">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[#E5E5E5] dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-brand-green dark:focus:border-brand-green-dark focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green-dark/20 outline-none transition-all font-montserrat"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black dark:text-white font-montserrat">WhatsApp/Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[#E5E5E5] dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-brand-green dark:focus:border-brand-green-dark focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green-dark/20 outline-none transition-all font-montserrat"
                  placeholder="+254..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black dark:text-white font-montserrat">What do you need?</label>
                <select
                  value={formData.need}
                  onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-[#E5E5E5] dark:border-gray-700 focus:border-brand-green dark:focus:border-brand-green-dark focus:ring-2 focus:ring-brand-green/20 dark:focus:ring-brand-green-dark/20 outline-none transition-all bg-white dark:bg-gray-900 dark:text-white font-montserrat"
                >
                  <option value="">Select a service</option>
                  <option value="pos">POS System</option>
                  <option value="website">Website/App</option>
                  <option value="crm">CRM Development</option>
                  <option value="erp">ERP/School System</option>
                  <option value="marketing">Marketing Services</option>
                  <option value="bundle">Bundle Package</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full bg-brand-blue dark:bg-brand-blue-dark text-white px-8 py-3.5 rounded-full font-medium font-montserrat hover:bg-brand-blue/90 dark:hover:bg-brand-blue-dark/90 transition-colors"
              >
                Get Early Access + 20% Off
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;
