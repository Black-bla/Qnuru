import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { 
  ShoppingCart, 
  CreditCard, 
  Globe, 
  Users, 
  Building2, 
  Brain,
  Megaphone,
  BarChart3,
  PenTool,
  MessageSquare,
  Zap,
  BarChart,
  GraduationCap,
  Smartphone,
  Palette,
  FileText,
  Video,
  Mail,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const allServices = [
  // Core Tech & Digital Systems
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'M-Pesa/Airtel/cards integration with Daraja API and testing',
    pricing: 'KSh 8,000 – 18,000',
    delivery: '1-2 weeks',
    category: 'Tech',
    color: '#FFB400',
  },
  {
    icon: MessageSquare,
    title: 'Chatbot Integration',
    description: 'WhatsApp/Messenger/web chatbots with AI flows and personalization',
    pricing: 'KSh 10,000 – 25,000',
    delivery: '1-3 weeks',
    category: 'Tech',
    color: '#00BFA6',
  },
  {
    icon: ShoppingCart,
    title: 'POS System',
    description: 'Custom POS app with inventory, sales, and hardware sync',
    pricing: 'KSh 50,000 – 180,000',
    delivery: '4-10 weeks',
    category: 'Tech',
    color: '#0B3D91',
    featured: true,
  },
  {
    icon: Zap,
    title: 'Automation Setup',
    description: 'Custom workflows for emails, notifications, and processes',
    pricing: 'KSh 10,000 – 25,000',
    delivery: '2-4 weeks',
    category: 'Tech',
    color: '#FFB400',
  },
  {
    icon: BarChart,
    title: 'Analytics & Data Setup',
    description: 'Google Analytics with custom dashboards and insights',
    pricing: 'KSh 8,000 – 20,000',
    delivery: '1-3 weeks',
    category: 'Tech',
    color: '#00BFA6',
  },
  {
    icon: Globe,
    title: 'Website & App Build',
    description: 'Custom site or mobile app with e-commerce and dashboards',
    pricing: 'KSh 40,000 – 120,000',
    delivery: '4-8 weeks',
    category: 'Tech',
    color: '#0B3D91',
  },
  {
    icon: Users,
    title: 'CRM Development',
    description: 'Custom CRM with leads, sales tracking, and AI scoring',
    pricing: 'KSh 80,000 – 300,000',
    delivery: '6-12 weeks',
    category: 'Tech',
    color: '#FFB400',
  },
  {
    icon: Building2,
    title: 'ERP Development',
    description: 'Modular ERP for inventory, HR, finance, and procurement',
    pricing: 'KSh 150,000 – 600,000+',
    delivery: '8-20 weeks',
    category: 'Tech',
    color: '#00BFA6',
  },
  {
    icon: GraduationCap,
    title: 'School Management System',
    description: 'Custom system for students, fees, attendance, and e-learning',
    pricing: 'KSh 100,000 – 400,000',
    delivery: '8-16 weeks',
    category: 'Tech',
    color: '#0B3D91',
  },
  {
    icon: Smartphone,
    title: 'Custom App Development',
    description: 'Bespoke tools for inventory, booking, and more',
    pricing: 'KSh 60,000 – 250,000+',
    delivery: '6-14 weeks',
    category: 'Tech',
    color: '#FFB400',
  },
  // Marketing & Content
  {
    icon: Megaphone,
    title: 'Social Media Management',
    description: 'Content posting, engagement, and growth across platforms',
    pricing: 'KSh 20,000 – 60,000/month',
    category: 'Marketing',
    color: '#00BFA6',
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    description: 'Graphics, carousels, and social posts in batches',
    pricing: 'KSh 6,000 – 18,000/batch',
    category: 'Marketing',
    color: '#0B3D91',
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Short-form ads and Reels up to 60 seconds',
    pricing: 'KSh 7,000 – 18,000/video',
    category: 'Marketing',
    color: '#FFB400',
  },
  {
    icon: FileText,
    title: 'Copywriting',
    description: 'Captions, descriptions, ads, and website copy',
    pricing: 'KSh 5,000 – 12,000/project',
    category: 'Marketing',
    color: '#00BFA6',
  },
  {
    icon: BarChart3,
    title: 'Campaign Management',
    description: 'Meta/Google ads with tracking and optimization',
    pricing: 'KSh 18,000 – 40,000/month + ad spend',
    category: 'Marketing',
    color: '#0B3D91',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Email setup and automation with Mailchimp',
    pricing: 'KSh 10,000 – 20,000 setup',
    category: 'Marketing',
    color: '#FFB400',
  },
  // Brand & Design
  {
    icon: Palette,
    title: 'Logo & Brand Kit',
    description: 'Complete brand identity with logo, colors, and fonts',
    pricing: 'KSh 12,000 – 25,000',
    category: 'Design',
    color: '#00BFA6',
  },
  {
    icon: Brain,
    title: 'Custom Graphics',
    description: 'Flyers, banners, and social media assets',
    pricing: 'KSh 4,000 – 10,000 each',
    category: 'Design',
    color: '#0B3D91',
  },
  // Growth & Strategy
  {
    icon: TrendingUp,
    title: 'Competitor Analysis',
    description: 'Market research, SWOT, and strategic recommendations',
    pricing: 'KSh 10,000 – 20,000',
    category: 'Strategy',
    color: '#FFB400',
  },
  {
    icon: Lightbulb,
    title: 'Digital Growth Strategy',
    description: 'Complete audit and roadmap for tech, marketing, and AI',
    pricing: 'KSh 20,000 – 40,000',
    category: 'Strategy',
    color: '#00BFA6',
  },
];

const CoreServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = techGridRef.current;

    if (!section || !title || !grid) return;

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

      const cards = grid.querySelectorAll('.service-card');
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.05,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.4,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="core-services"
      className="relative w-full bg-white dark:bg-gray-900 py-20 lg:py-32 z-20 transition-colors duration-300"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Our Services</span>
          <div className="gold-rule mt-3 mx-auto" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] dark:text-white mt-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Everything Your Business Needs
          </h2>
          <p className="text-[#6B7280] dark:text-gray-400 text-base lg:text-lg mt-4">
            From tech development to marketing and design — 20+ services to power your growth. 
            All backed by our performance guarantee.
          </p>

          {/* View All Services Button */}
          <div className="mt-8">
            <Link to="/services">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#0B3D91] to-[#2563EB] hover:from-[#2563EB] hover:to-[#0B3D91] text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Dual-Direction Marquee Layout */}
        <div className="transform -rotate-2 origin-center space-y-6 sm:space-y-8 overflow-hidden">
          {/* First Row - Right to Left */}
          <div>
            <Marquee speed={40} gradient={false} direction="right" pauseOnHover={true}>
              {allServices.slice(0, 10).map((service, index) => (
                <Link key={index} to="/services">
                  <div
                    className="service-card mx-3 cursor-pointer group"
                  >
                      <div
                        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-2 border-gray-200/60 dark:border-gray-700/60
                        bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105
                        transition-all duration-300 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}05 100%)`
                        }}
                      >
                        {(service as any).featured && (
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-[#FFB400] to-[#FF8C00] text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full z-10 shadow-lg">
                            POPULAR
                          </div>
                        )}
                        
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-5" style={{ 
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${service.color} 1px, transparent 0)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                        
                        {/* Logo */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-2 sm:p-3 md:p-4 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src="/images/logo.svg" 
                            alt="Qnuru" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Service Title Badge */}
                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg">
                          <h3 
                            className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white text-center line-clamp-1"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
              ))}
            </Marquee>
          </div>

          {/* Second Row - Left to Right */}
          <div>
            <Marquee speed={40} gradient={false} direction="left" pauseOnHover={true}>
              {allServices.slice(10, 20).map((service, index) => (
                <Link key={index + 10} to="/services">
                  <div
                    className="service-card mx-3 cursor-pointer group"
                  >
                      <div
                        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-2 border-gray-200/60 dark:border-gray-700/60
                        bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105
                        transition-all duration-300 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}05 100%)`
                        }}
                      >
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-5" style={{ 
                          backgroundImage: `radial-gradient(circle at 2px 2px, ${service.color} 1px, transparent 0)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                        
                        {/* Logo */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-2 sm:p-3 md:p-4 group-hover:scale-110 transition-transform duration-500">
                          <img 
                            src="/images/logo.svg" 
                            alt="Qnuru" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Service Title Badge */}
                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-2 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-lg">
                          <h3 
                            className="text-xs sm:text-sm font-bold text-[#111827] dark:text-white text-center line-clamp-1"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                          >
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
