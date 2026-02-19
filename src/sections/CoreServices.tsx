import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingCart, 
  CreditCard, 
  Globe, 
  Users, 
  Building2, 
  Brain,
  Megaphone,
  BarChart3,
  PenTool
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techServices = [
  {
    icon: ShoppingCart,
    title: 'POS System',
    description: 'Custom/cloud POS with inventory, sales tracking, M-Pesa sync, and real-time reports.',
    pricing: 'Setup: KSh 0-20,000 • Monthly: KSh 2,000-8,000',
    delivery: '2-6 weeks',
    guarantee: '+20% sales efficiency or free tweaks',
    color: '#FFB400',
    featured: true,
  },
  {
    icon: CreditCard,
    title: 'Payment & Automation',
    description: 'M-Pesa integration, WhatsApp chatbots, workflow automation.',
    pricing: 'One-off: KSh 5,000-15,000 • Monthly: KSh 1,000-3,000',
    delivery: '1-3 weeks',
    guarantee: '50%+ manual work reduction',
    color: '#00BFA6',
  },
  {
    icon: Globe,
    title: 'Website & App',
    description: 'Mobile-first websites and apps with e-commerce, dashboards, and analytics.',
    pricing: 'Setup: KSh 10,000-30,000 • Monthly: KSh 2,000-5,000',
    delivery: '3-6 weeks',
    guarantee: 'Traffic & leads tracked',
    color: '#0B3D91',
  },
  {
    icon: Users,
    title: 'CRM Development',
    description: 'Custom CRM with lead management, sales pipeline, and AI scoring.',
    pricing: 'Setup: KSh 20,000-80,000 • Monthly: KSh 5,000-15,000',
    delivery: '4-10 weeks',
    guarantee: '+15-30% lead conversion',
    color: '#FFB400',
  },
  {
    icon: Building2,
    title: 'ERP / School System',
    description: 'Modular systems for inventory, HR, fees, attendance, and reporting.',
    pricing: 'Setup: KSh 30,000-150,000 • Monthly: KSh 3,000-12,000',
    delivery: '6-16 weeks',
    guarantee: '30%+ admin time saved',
    color: '#00BFA6',
  },
  {
    icon: Brain,
    title: 'Custom AI & Apps',
    description: 'Bespoke solutions with data insights, predictive tools, and advanced automation.',
    pricing: 'Custom quote + performance bonus',
    delivery: '8+ weeks',
    guarantee: '10-20% fee tied to KPIs',
    color: '#0B3D91',
  },
];

const marketingServices = [
  {
    icon: Megaphone,
    title: 'Social Media Management',
    description: 'Content creation, scheduling, community management across all platforms.',
    pricing: 'KSh 15,000-50,000/month',
    guarantee: '+20-50% engagement or free month',
    color: '#FFB400',
  },
  {
    icon: BarChart3,
    title: 'Campaign Management',
    description: 'Paid ads strategy, execution, and optimization with ROI tracking.',
    pricing: 'KSh 15,000-40,000/month + ad spend',
    guarantee: 'Cost per lead tracked & optimized',
    color: '#00BFA6',
  },
  {
    icon: PenTool,
    title: 'Content & Design',
    description: 'Video editing, copywriting, graphics, and brand assets.',
    pricing: 'KSh 5,000-15,000 per project',
    guarantee: 'Performance review included',
    color: '#0B3D91',
  },
];

const CoreServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const techGrid = techGridRef.current;
    const marketing = marketingRef.current;

    if (!section || !title || !techGrid || !marketing) return;

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

      const techCards = techGrid.querySelectorAll('.service-card');
      techCards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.4,
            }
          }
        );
      });

      gsap.fromTo(marketing,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: marketing,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F6F7FB] py-20 lg:py-32 z-20"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Our Services</span>
          <div className="gold-rule mt-3 mx-auto" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] mt-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Tech Solutions That Drive Results
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg mt-4">
            From POS systems to AI automation — we build, you grow. 
            All services come with performance guarantees.
          </p>
        </div>

        {/* Tech Services Grid */}
        <div ref={techGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techServices.map((service, index) => (
            <div
              key={index}
              className={`service-card card-q p-6 lg:p-8 will-change-transform hover:shadow-xl transition-shadow relative overflow-hidden group ${
                service.featured ? 'ring-2 ring-[#FFB400]' : ''
              }`}
            >
              {service.featured && (
                <div className="absolute top-0 right-0 bg-[#FFB400] text-[#111827] text-xs font-bold px-3 py-1 rounded-bl-xl">
                  MOST POPULAR
                </div>
              )}
              
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
              
              <h3
                className="text-xl font-bold text-[#111827] mb-3"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {service.title}
              </h3>
              
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-[#6B7280]">{service.pricing}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#00BFA6] font-medium">{service.delivery}</span>
                  <span className="text-[#FFB400] font-medium">{service.guarantee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marketing Services */}
        <div ref={marketingRef} className="mt-16">
          <div className="text-center mb-10">
            <h3
              className="text-2xl lg:text-3xl font-bold text-[#111827]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Marketing & Growth
            </h3>
            <p className="text-[#6B7280] mt-2">Results-driven marketing with measurable impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketingServices.map((service, index) => (
              <div
                key={index}
                className="service-card card-q p-6 will-change-transform hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                
                <h4
                  className="text-lg font-bold text-[#111827] mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {service.title}
                </h4>
                
                <p className="text-[#6B7280] text-sm mb-3">
                  {service.description}
                </p>
                
                <div className="text-xs space-y-1">
                  <div className="text-[#6B7280]">{service.pricing}</div>
                  <div className="text-[#FFB400] font-medium">{service.guarantee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
