import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Zap, Crown, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: 'Starter Boost',
    description: 'Perfect for small shops and startups',
    icon: Sparkles,
    color: '#00BFA6',
    setup: 'KSh 20,000-50,000',
    monthly: 'KSh 5,000-10,000',
    features: [
      'Basic Website',
      'POS/Payment Integration',
      'Social Media Setup',
      '3-Month Support',
      'Monthly Impact Report',
    ],
    guarantee: 'Free setup with 6-month commitment',
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth Accelerator',
    description: 'For retail & SMEs ready to scale',
    icon: Zap,
    color: '#FFB400',
    setup: 'KSh 50,000-150,000',
    monthly: 'KSh 15,000-30,000',
    features: [
      'Advanced CRM/POS',
      'Workflow Automation',
      'Marketing Campaigns',
      'Analytics Dashboard',
      'Results Tracking',
      'Priority Support',
    ],
    guarantee: '+20% efficiency or money back',
    cta: 'Scale Now',
    popular: true,
  },
  {
    name: 'Enterprise Impact',
    description: 'Full solution for institutions',
    icon: Crown,
    color: '#0B3D91',
    setup: 'Custom Quote',
    monthly: 'KSh 30,000+',
    features: [
      'Full ERP/School System',
      'Custom AI Solutions',
      'Full Marketing Suite',
      'Dedicated Account Manager',
      '24/7 Premium Support',
      'Quarterly Strategy Reviews',
    ],
    guarantee: 'KPI-based performance contracts',
    cta: 'Contact Sales',
    popular: false,
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
      className="relative w-full bg-[#F6F7FB] py-20 lg:py-32 z-30"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Bundle Packages</span>
          <div className="gold-rule mt-3 mx-auto" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] mt-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Choose Your Growth Path
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg mt-4">
            Results-focused packages with guarantees. Start small, scale fast.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`will-change-transform relative ${tier.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFB400] text-[#111827] text-xs font-bold px-4 py-1.5 rounded-full z-10">
                  MOST POPULAR
                </div>
              )}
              
              <div
                className={`card-q p-6 lg:p-8 h-full flex flex-col ${
                  tier.popular ? 'ring-2 ring-[#FFB400] shadow-xl' : 'hover:shadow-lg'
                } transition-shadow`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${tier.color}15` }}
                  >
                    <tier.icon className="w-6 h-6" style={{ color: tier.color }} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-[#111827]"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {tier.name}
                    </h3>
                    <p className="text-[#6B7280] text-xs">{tier.description}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="py-4 border-y border-gray-100 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#111827]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {tier.setup}
                    </span>
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    Setup fee + {tier.monthly}/month
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${tier.color}15` }}
                      >
                        <Check className="w-3 h-3" style={{ color: tier.color }} />
                      </div>
                      <span className="text-sm text-[#111827]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Guarantee */}
                <div
                  className="text-xs font-medium py-2 px-3 rounded-lg mb-6"
                  style={{ backgroundColor: `${tier.color}10`, color: tier.color }}
                >
                  {tier.guarantee}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleTierClick(tier)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    tier.popular
                      ? 'bg-[#FFB400] text-[#111827] hover:bg-[#E5A200]'
                      : 'bg-[#0B3D91] text-white hover:bg-[#0A3275]'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-[#6B7280] text-sm">
            All packages include maintenance, updates, and monthly impact reports.{' '}
            <button 
              onClick={() => {
                setSelectedTier(null);
                setShowDialog(true);
              }}
              className="text-[#0B3D91] hover:text-[#FFB400] font-medium transition-colors"
            >
              Need a custom solution?
            </button>
          </p>
        </div>
      </div>

      {/* Inquiry Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md card-q border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#111827]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {selectedTier ? `Get ${selectedTier.name}` : 'Custom Solution'}
            </DialogTitle>
          </DialogHeader>
          
          <form className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-[#111827]">Business Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                placeholder="Your business name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#111827]">Contact Name *</label>
              <input
                type="text"
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#111827]">Email *</label>
              <input
                type="email"
                required
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#111827]">Phone/WhatsApp</label>
              <input
                type="tel"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                placeholder="+254..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#111827]">Tell us about your needs</label>
              <textarea
                rows={3}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all resize-none"
                placeholder="What challenges are you facing?"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Request Consultation
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TierBundles;
