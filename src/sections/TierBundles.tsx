import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Zap, Crown, ArrowRight, Shield, Clock, TrendingUp, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: 'Starter Boost',
    description: 'Perfect for small shops and startups',
    icon: Sparkles,
    color: '#00BFA6',
    gradient: 'from-[#00BFA6] to-[#10D9C1]',
    setup: 'KSh 20,000-50,000',
    monthly: 'KSh 5,000-10,000',
    features: [
      'Basic Website',
      'POS/Payment Integration',
      'Social Media Setup',
      '3-Month Support',
    ],
    guarantee: 'Free setup with 6-month commitment',
    cta: 'Get Started',
    popular: false,
    badge: 'For Startups',
  },
  {
    name: 'Growth Accelerator',
    description: 'For retail & SMEs ready to scale',
    icon: Zap,
    color: '#FFB400',
    gradient: 'from-[#FFB400] to-[#FF8C00]',
    setup: 'KSh 50,000-150,000',
    monthly: 'KSh 15,000-30,000',
    features: [
      'Advanced CRM/POS',
      'Workflow Automation',
      'Marketing Campaigns',
      'Priority Support',
    ],
    guarantee: '+20% efficiency or money back',
    cta: 'Scale Now',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise Impact',
    description: 'Full solution for institutions',
    icon: Crown,
    color: '#0B3D91',
    gradient: 'from-[#0B3D91] to-[#2563EB]',
    setup: 'Custom Quote',
    monthly: 'KSh 30,000+',
    features: [
      'Full ERP/School System',
      'Custom AI Solutions',
      'Full Marketing Suite',
      '24/7 Premium Support',
    ],
    guarantee: 'KPI-based performance contracts',
    cta: 'Contact Sales',
    popular: false,
    badge: 'Enterprise',
  },
];

const TierBundles = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTier, setSelectedTier] = useState<typeof tiers[0] | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.4,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleTierClick = (tier: typeof tiers[0]) => {
    setSelectedTier(tier);
    setShowDialog(true);
  };

  return (
    <section
      ref={sectionRef}
      id="bundles"
      className="relative w-full min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-[#0B1120] dark:to-gray-900 py-8 lg:py-12 z-30 transition-colors duration-300 overflow-hidden flex items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(11, 61, 145, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative w-full px-4 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#0B3D91]/10 to-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full mb-3">
            <span className="text-[#0B3D91] dark:text-[#00BFA6] font-semibold text-xs uppercase tracking-wider">
              Bundle Packages
            </span>
          </div>
          
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111827] dark:text-white mb-3 bg-gradient-to-r from-[#111827] via-[#0B3D91] to-[#111827] dark:from-white dark:via-blue-100 dark:to-white bg-clip-text"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Choose Your Growth Path
          </h2>
          
          <p className="text-sm lg:text-base text-[#6B7280] dark:text-gray-400">
            Results-focused with <span className="text-[#00BFA6] font-semibold">performance guarantees</span>
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 mt-4 text-xs lg:text-sm text-[#6B7280] dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-[#00BFA6]" />
              <span>Money-Back</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-[#FFB400]" />
              <span>No Lock-In</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-[#0B3D91]" />
              <span>Scalable</span>
            </div>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`will-change-transform relative group ${tier.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 lg:-top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-[#FFB400] to-[#FF8C00] text-black text-[10px] lg:text-xs font-bold px-3 lg:px-4 py-1 lg:py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div
                className={`relative p-4 lg:p-6 h-full flex flex-col rounded-2xl lg:rounded-3xl border-2 transition-all duration-500 backdrop-blur-sm ${
                  tier.popular 
                    ? 'border-[#FFB400] bg-gradient-to-br from-white/90 to-[#FFB400]/5 dark:from-gray-800/90 dark:to-[#FFB400]/10 shadow-xl shadow-[#FFB400]/20' 
                    : 'border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
                }`}
              >
                {/* Tier Badge */}
                <div className="absolute top-3 lg:top-4 right-3 lg:right-4">
                  <span 
                    className="text-[10px] lg:text-xs font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${tier.color}20`,
                      color: tier.color 
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>

                {/* Header */}
                <div className="mb-3 lg:mb-4">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center mb-2 lg:mb-3 bg-gradient-to-br ${tier.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
                  >
                    <tier.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  
                  <h3
                    className="text-lg lg:text-xl xl:text-2xl font-bold text-[#111827] dark:text-white mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-[#6B7280] dark:text-gray-400 text-xs lg:text-sm">{tier.description}</p>
                </div>

                {/* Pricing */}
                <div className="py-3 lg:py-4 border-y-2 border-gray-100 dark:border-gray-700/50 mb-3 lg:mb-4">
                  <div className="mb-1">
                    <span className="text-[10px] lg:text-xs uppercase tracking-wider text-[#6B7280] dark:text-gray-400 font-semibold">Setup Fee</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span 
                      className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                      style={{ 
                        backgroundImage: `linear-gradient(to right, ${tier.color}, ${tier.color}dd)` 
                      }}
                    >
                      {tier.setup}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#6B7280] dark:text-gray-400">then</span>
                    <span className="text-sm lg:text-base font-bold text-[#111827] dark:text-white">{tier.monthly}</span>
                    <span className="text-xs text-[#6B7280] dark:text-gray-400">/mo</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 lg:space-y-2.5 mb-3 lg:mb-4 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 group/item">
                      <div
                        className={`w-4 h-4 lg:w-5 lg:h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br ${tier.gradient} shadow-sm group-hover/item:scale-110 transition-transform`}
                      >
                        <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-xs lg:text-sm text-[#111827] dark:text-gray-200 leading-relaxed font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Guarantee */}
                <div
                  className="text-center text-[10px] lg:text-xs font-bold py-2 lg:py-2.5 px-3 rounded-lg lg:rounded-xl mb-3 lg:mb-4 border-2 backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${tier.color}15`,
                    borderColor: `${tier.color}40`,
                    color: tier.color 
                  }}
                >
                  <Shield className="w-3 h-3 lg:w-4 lg:h-4 inline-block mr-1" />
                  {tier.guarantee}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleTierClick(tier)}
                  className={`w-full py-2.5 lg:py-3 px-4 lg:px-6 rounded-xl lg:rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base group/btn ${
                    tier.popular
                      ? `bg-gradient-to-r ${tier.gradient} text-white hover:scale-105`
                      : `bg-gradient-to-r ${tier.gradient} text-white hover:scale-105`
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#0B3D91]/5 to-[#00BFA6]/5 border border-[#00BFA6]/20 max-w-3xl mx-auto backdrop-blur-sm">
          <Users className="w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-2 lg:mb-3 text-[#0B3D91] dark:text-[#00BFA6]" />
          <p className="text-xs lg:text-sm text-[#6B7280] dark:text-gray-300 mb-2 lg:mb-3">
            <span className="font-bold text-[#111827] dark:text-white">All packages include</span> maintenance & monthly reports
          </p>
          <button 
            onClick={() => {
              setSelectedTier(null);
              setShowDialog(true);
            }}
            className="text-[#0B3D91] dark:text-[#00BFA6] hover:text-[#FFB400] dark:hover:text-[#FFB400] font-bold text-sm lg:text-base transition-colors inline-flex items-center gap-2 group"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Need a custom solution?
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Inquiry Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle 
              className="text-3xl font-bold text-[#111827] dark:text-white mb-2" 
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {selectedTier ? `Get ${selectedTier.name}` : 'Custom Solution Request'}
            </DialogTitle>
            {selectedTier && (
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${selectedTier.gradient} text-white`}
                >
                  {selectedTier.badge}
                </div>
                <span className="text-sm text-[#6B7280] dark:text-gray-400">
                  Starting at {selectedTier.setup}
                </span>
              </div>
            )}
          </DialogHeader>
          
          <form className="space-y-5 mt-6">
            <div>
              <label className="text-sm font-semibold text-[#111827] dark:text-white mb-2 block">
                Business Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white placeholder:text-gray-400 focus:border-[#00BFA6] dark:focus:border-[#00BFA6] focus:ring-4 focus:ring-[#00BFA6]/10 outline-none transition-all"
                placeholder="e.g., Acme Retail Shop"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-[#111827] dark:text-white mb-2 block">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white placeholder:text-gray-400 focus:border-[#00BFA6] dark:focus:border-[#00BFA6] focus:ring-4 focus:ring-[#00BFA6]/10 outline-none transition-all"
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-[#111827] dark:text-white mb-2 block">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white placeholder:text-gray-400 focus:border-[#00BFA6] dark:focus:border-[#00BFA6] focus:ring-4 focus:ring-[#00BFA6]/10 outline-none transition-all"
                placeholder="you@company.com"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-[#111827] dark:text-white mb-2 block">
                Phone/WhatsApp
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white placeholder:text-gray-400 focus:border-[#00BFA6] dark:focus:border-[#00BFA6] focus:ring-4 focus:ring-[#00BFA6]/10 outline-none transition-all"
                placeholder="+254 712 345 678"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-[#111827] dark:text-white mb-2 block">
                Tell us about your needs
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[#111827] dark:text-white placeholder:text-gray-400 focus:border-[#00BFA6] dark:focus:border-[#00BFA6] focus:ring-4 focus:ring-[#00BFA6]/10 outline-none transition-all resize-none"
                placeholder="What challenges are you facing? What are your goals?"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#0B3D91] to-[#2563EB] hover:from-[#2563EB] hover:to-[#0B3D91] text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg group"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Request Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-xs text-center text-[#6B7280] dark:text-gray-400">
              We'll respond within 24 hours with a custom proposal
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TierBundles;
