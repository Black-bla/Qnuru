import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { 
  CreditCard, 
  Globe, 
  Users, 
  Building2, 
  Brain,
  Megaphone,
  BarChart3,
  PenTool,
  ShoppingBag,
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
    features: [
      'M-Pesa & Airtel Money integration',
      'Card payment gateway setup',
      'Transaction webhook handling',
      'Payment testing & validation',
      'Error handling & notifications'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Chatbot Integration',
    description: 'WhatsApp/Messenger/web chatbots with AI flows and personalization',
    pricing: 'KSh 10,000 – 25,000',
    delivery: '1-3 weeks',
    category: 'Tech',
    color: '#00BFA6',
    features: [
      'Multi-platform chatbot setup',
      'AI-powered conversation flows',
      'Custom response templates',
      'Integration with your systems',
      'Analytics dashboard'
    ]
  },
  {
    icon: ShoppingBag,
    title: 'POS System',
    description: 'Custom POS app with inventory, sales, and hardware sync',
    pricing: 'KSh 50,000 – 180,000',
    delivery: '4-10 weeks',
    category: 'Tech',
    color: '#0B3D91',
    featured: true,
    features: [
      'Complete POS application',
      'Inventory management',
      'Sales tracking & reporting',
      'Receipt printing',
      'Multi-user access control'
    ]
  },
  {
    icon: Zap,
    title: 'Automation Setup',
    description: 'Custom workflows for emails, notifications, and processes',
    pricing: 'KSh 10,000 – 25,000',
    delivery: '2-4 weeks',
    category: 'Tech',
    color: '#FFB400',
    features: [
      'Email automation workflows',
      'SMS & push notifications',
      'Process automation',
      'API integrations',
      'Scheduled tasks'
    ]
  },
  {
    icon: BarChart,
    title: 'Analytics & Data Setup',
    description: 'Google Analytics with custom dashboards and insights',
    pricing: 'KSh 8,000 – 20,000',
    delivery: '1-3 weeks',
    category: 'Tech',
    color: '#00BFA6',
    features: [
      'Google Analytics setup',
      'Custom tracking events',
      'Dashboard creation',
      'Conversion tracking',
      'Monthly reports'
    ]
  },
  {
    icon: Globe,
    title: 'Website & App Build',
    description: 'Custom site or mobile app with e-commerce and dashboards',
    pricing: 'KSh 40,000 – 120,000',
    delivery: '4-8 weeks',
    category: 'Tech',
    color: '#0B3D91',
    features: [
      'Responsive web design',
      'Mobile app development',
      'E-commerce functionality',
      'Admin dashboard',
      'SEO optimization'
    ]
  },
  {
    icon: Users,
    title: 'CRM Development',
    description: 'Custom CRM with leads, sales tracking, and AI scoring',
    pricing: 'KSh 80,000 – 300,000',
    delivery: '6-12 weeks',
    category: 'Tech',
    color: '#FFB400',
    features: [
      'Lead management system',
      'Sales pipeline tracking',
      'AI lead scoring',
      'Email integration',
      'Reporting & analytics'
    ]
  },
  {
    icon: Building2,
    title: 'ERP Development',
    description: 'Modular ERP for inventory, HR, finance, and procurement',
    pricing: 'KSh 150,000 – 600,000+',
    delivery: '8-20 weeks',
    category: 'Tech',
    color: '#00BFA6',
    features: [
      'Inventory management',
      'HR & payroll system',
      'Financial accounting',
      'Procurement module',
      'Custom reporting'
    ]
  },
  {
    icon: GraduationCap,
    title: 'School Management System',
    description: 'Custom system for students, fees, attendance, and e-learning',
    pricing: 'KSh 100,000 – 400,000',
    delivery: '8-16 weeks',
    category: 'Tech',
    color: '#0B3D91',
    features: [
      'Student management',
      'Fee collection & tracking',
      'Attendance system',
      'E-learning platform',
      'Parent portal'
    ]
  },
  {
    icon: Smartphone,
    title: 'Custom App Development',
    description: 'Bespoke tools for inventory, booking, and more',
    pricing: 'KSh 60,000 – 250,000+',
    delivery: '6-14 weeks',
    category: 'Tech',
    color: '#FFB400',
    features: [
      'Custom application design',
      'Feature development',
      'API integration',
      'User authentication',
      'Ongoing support'
    ]
  },
  // Marketing & Content
  {
    icon: Megaphone,
    title: 'Social Media Management',
    description: 'Content posting, engagement, and growth across platforms',
    pricing: 'KSh 20,000 – 60,000/month',
    delivery: 'Ongoing',
    category: 'Marketing',
    color: '#00BFA6',
    features: [
      'Daily content posting',
      'Community engagement',
      'Growth strategies',
      'Performance analytics',
      'Multi-platform management'
    ]
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    description: 'Graphics, carousels, and social posts in batches',
    pricing: 'KSh 6,000 – 18,000/batch',
    delivery: '3-5 days',
    category: 'Marketing',
    color: '#0B3D91',
    features: [
      'Custom graphics design',
      'Social media templates',
      'Carousel posts',
      'Brand-aligned content',
      'Unlimited revisions'
    ]
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Short-form ads and Reels up to 60 seconds',
    pricing: 'KSh 7,000 – 18,000/video',
    delivery: '2-4 days',
    category: 'Marketing',
    color: '#FFB400',
    features: [
      'Professional video editing',
      'Motion graphics',
      'Subtitles & captions',
      'Music & sound effects',
      'Platform optimization'
    ]
  },
  {
    icon: FileText,
    title: 'Copywriting',
    description: 'Captions, descriptions, ads, and website copy',
    pricing: 'KSh 5,000 – 12,000/project',
    delivery: '2-3 days',
    category: 'Marketing',
    color: '#00BFA6',
    features: [
      'Engaging copy creation',
      'SEO optimization',
      'Brand voice alignment',
      'Multiple revisions',
      'Fast turnaround'
    ]
  },
  {
    icon: BarChart3,
    title: 'Campaign Management',
    description: 'Meta/Google ads with tracking and optimization',
    pricing: 'KSh 18,000 – 40,000/month + ad spend',
    delivery: 'Ongoing',
    category: 'Marketing',
    color: '#0B3D91',
    features: [
      'Campaign strategy',
      'Ad creation & testing',
      'Performance tracking',
      'Budget optimization',
      'Monthly reporting'
    ]
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Email setup and automation with Mailchimp',
    pricing: 'KSh 10,000 – 20,000 setup',
    delivery: '1-2 weeks',
    category: 'Marketing',
    color: '#FFB400',
    features: [
      'Email list setup',
      'Template design',
      'Automation workflows',
      'A/B testing',
      'Analytics & reporting'
    ]
  },
  // Brand & Design
  {
    icon: Palette,
    title: 'Logo & Brand Kit',
    description: 'Complete brand identity with logo, colors, and fonts',
    pricing: 'KSh 12,000 – 25,000',
    delivery: '1-2 weeks',
    category: 'Design',
    color: '#00BFA6',
    features: [
      'Custom logo design',
      'Color palette',
      'Typography selection',
      'Brand guidelines',
      'Source files included'
    ]
  },
  {
    icon: Brain,
    title: 'Custom Graphics',
    description: 'Flyers, banners, and social media assets',
    pricing: 'KSh 4,000 – 10,000 each',
    delivery: '2-3 days',
    category: 'Design',
    color: '#0B3D91',
    features: [
      'Custom design work',
      'Print-ready files',
      'Digital formats',
      'Multiple concepts',
      'Fast delivery'
    ]
  },
  // Growth & Strategy
  {
    icon: TrendingUp,
    title: 'Competitor Analysis',
    description: 'Market research, SWOT, and strategic recommendations',
    pricing: 'KSh 10,000 – 20,000',
    delivery: '1-2 weeks',
    category: 'Strategy',
    color: '#FFB400',
    features: [
      'Market research',
      'SWOT analysis',
      'Competitor profiling',
      'Strategic insights',
      'Actionable recommendations'
    ]
  },
  {
    icon: Lightbulb,
    title: 'Digital Growth Strategy',
    description: 'Complete audit and roadmap for tech, marketing, and AI',
    pricing: 'KSh 20,000 – 40,000',
    delivery: '2-3 weeks',
    category: 'Strategy',
    color: '#00BFA6',
    features: [
      'Digital audit',
      'Growth roadmap',
      'Technology stack review',
      'Marketing strategy',
      'AI integration opportunities'
    ]
  },
];

const Services = () => {
  const [cart, setCart] = useState<typeof allServices>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tech', 'Marketing', 'Design', 'Strategy'];

  const filteredServices = selectedCategory === 'All' 
    ? allServices 
    : allServices.filter(service => service.category === selectedCategory);

  const addToCart = (service: typeof allServices[0]) => {
    setCart([...cart, service]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#0B1120] to-[#000000] text-white">
      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <img 
              src="/images/logo.svg" 
              alt="Qnuru Logo" 
              className="h-10 lg:h-12"
            />
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FFB400] to-[#FF8C00] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#0B3D91]/20 to-[#00BFA6]/20 border border-[#00BFA6]/30 rounded-full mb-6">
              <span className="text-[#00BFA6] font-semibold text-sm uppercase tracking-wider">
                Complete Service Catalog
              </span>
            </div>
            
            <h1 
              className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              All Our Services
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              From tech development to marketing and design — 20+ services to power your growth.
              <br />
              <span className="text-[#00BFA6]">All backed by our performance guarantee.</span>
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#0B3D91] to-[#2563EB] text-white shadow-lg scale-105'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span>{filteredServices.length} Services</span>
              <span>•</span>
              <span>All Prices in KSh</span>
              <span>•</span>
              <span>Performance Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative pb-20 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div
                  className="relative p-8 rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-white/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}15 0%, transparent 50%)`
                  }}
                >
                  {/* Popular Badge */}
                  {(service as any).featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FFB400] to-[#FF8C00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                      POPULAR
                    </div>
                  )}

                  {/* Icon */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: `${service.color}30` }}
                  >
                    <service.icon className="w-10 h-10" style={{ color: service.color }} />
                  </div>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ 
                        backgroundColor: `${service.color}20`,
                        color: service.color
                      }}
                    >
                      {service.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-2 mb-6 flex-grow">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[#00BFA6] mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Pricing & Delivery */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Pricing</span>
                      <span className="font-bold text-white">{service.pricing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Delivery</span>
                      <span className="font-semibold text-[#00BFA6]">{service.delivery}</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => addToCart(service)}
                    className="w-full bg-gradient-to-r from-[#0B3D91] to-[#2563EB] hover:from-[#2563EB] hover:to-[#0B3D91] text-white font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16 border-t border-white/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8">
            Select the services you need and we'll create a custom package for you.
          </p>
          <Link to="/">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#00BFA6] to-[#10D9C1] hover:from-[#10D9C1] hover:to-[#00BFA6] text-black font-bold px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
