import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', need: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 45);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    const cta = ctaRef.current;

    if (!section || !glow || !content || !stats || !cta) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(glow,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      )
      .fromTo(content.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(stats.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 1,
          onLeaveBack: () => {
            gsap.set([glow, content, stats, cta], { opacity: 1, x: 0, y: 0, scale: 1 });
          }
        }
      });

      scrollTl
        .fromTo(content,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.3, ease: 'power2.in' },
          0.70
        )
        .fromTo(stats,
          { y: 0, opacity: 1 },
          { y: '-5vh', opacity: 0.2, ease: 'power2.in' },
          0.72
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '5vh', opacity: 0.2, ease: 'power2.in' },
          0.74
        )
        .to([content, stats, cta], { opacity: 0 }, 0.95);
    }, section);

    return () => ctx.revert();
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

  const perks = [
    'Free POS Setup',
    '20% Launch Discount',
    'Results Guarantee',
    'Priority Support',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-[#0B3D91] overflow-hidden z-10 pt-20 lg:pt-24 pb-8"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw]"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,180,0,0.15) 0%, rgba(0,191,166,0.1) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFB400]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-[#00BFA6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center px-6 lg:px-12">
        <div ref={contentRef} className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#FFB400]" />
            <span className="text-white/90 text-sm font-medium">Coming Soon — Join the Waitlist</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            The Dawn of Your
            <span className="block mt-2 bg-gradient-to-r from-[#FFB400] via-[#00BFA6] to-[#FFB400] bg-clip-text text-transparent">
              Digital Success
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/70 text-lg lg:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">
            Fast, results-driven tech solutions for Kenyan SMEs. POS systems, 
            custom CRMs, AI automation — built by young innovators, guaranteed to perform.
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 lg:gap-6 mt-8">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl lg:text-4xl font-bold text-[#FFB400]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="mt-auto mb-4 flex flex-wrap justify-center gap-6 lg:gap-12"
        >
          {[
            { icon: Zap, value: '2-6', label: 'Weeks Delivery' },
            { icon: TrendingUp, value: '+20%', label: 'Efficiency Gain' },
            { icon: Check, value: '100%', label: 'Results Guarantee' },
          ].map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFB400]/20 rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-[#FFB400]" />
              </div>
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.value}</div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mb-6 text-center">
          <button
            onClick={() => setShowDialog(true)}
            className="btn-primary text-lg inline-flex items-center gap-3 group shadow-[0_0_30px_rgba(255,180,0,0.3)]"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-1.5 text-white/60 text-xs">
                <Check className="w-3 h-3 text-[#00BFA6]" />
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signup Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md card-q border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#111827]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {isSubmitted ? 'Welcome to Qnuru!' : 'Join the Waitlist'}
            </DialogTitle>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#6B7280]">Check your inbox for early access details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-[#111827]">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827]">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827]">WhatsApp/Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                  placeholder="+254..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827]">What do you need?</label>
                <select
                  value={formData.need}
                  onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all bg-white"
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
              <button type="submit" className="btn-primary w-full">
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
