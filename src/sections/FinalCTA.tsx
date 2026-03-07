import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Phone, Mail, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', need: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const form = formRef.current;
    const footer = footerRef.current;

    if (!section || !headline || !form || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headline,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headline,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      gsap.fromTo(form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.4,
          }
        }
      );

      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.4,
          }
        }
      );
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

  const benefits = [
    'Free POS setup with 6-month plan',
    '20% launch discount',
    'Priority consultation',
    'Results guarantee',
  ];

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative w-full bg-[#0B3D91] dark:bg-gray-900 py-20 lg:py-32 z-[70] transition-colors duration-300"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB400]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00BFA6]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full px-6 lg:px-12">
        {/* CTA Content */}
        <div ref={headlineRef} className="text-center max-w-3xl mx-auto">
          <h2
            className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/70 text-base lg:text-lg mt-6">
            Join the waitlist for early access, free setup, and exclusive launch pricing.
          </p>
        </div>

        {/* Benefits */}
        <div ref={formRef} className="mt-10 flex flex-wrap justify-center gap-4">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2"
            >
              <Check className="w-4 h-4 text-[#00BFA6]" />
              <span className="text-white/90 text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowDialog(true)}
            className="btn-primary text-lg inline-flex items-center gap-3 group shadow-[0_0_30px_rgba(255,180,0,0.3)] hover:shadow-[0_0_40px_rgba(255,180,0,0.5)]"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className="mt-20 lg:mt-32 pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Logo & About - Takes more space */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/logo.svg" 
                  alt="Qnuru Logo" 
                  className="w-10 h-10 object-contain"
                />
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Qnuru
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Nuru ya Biashara Yako — Illuminating your business with world-class digital solutions, built by Africa's best talent.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/qnuru' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/qnuru' },
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/qnuru' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-[#FFB400] rounded-full flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white group-hover:text-[#111827]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                {['POS Systems', 'Custom Software', 'Mobile Apps', 'Digital Marketing', 'Brand Design', 'ERP/CRM'].map((item) => (
                  <li key={item}>
                    <a href="#core-services" className="text-white/60 hover:text-[#FFB400] text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', href: '#team' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Guarantee', href: '#guarantee' },
                  { label: 'Pricing', href: '#tier-bundles' },
                  { label: 'Academy', href: '#' },
                  { label: 'Careers', href: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-white/60 hover:text-[#FFB400] text-sm transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                Get in Touch
              </h3>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="tel:+254792899725" className="flex items-center gap-2 text-white/60 hover:text-[#FFB400] text-sm transition-colors group">
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    +254 792 899 725
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@qnuru.co.ke" className="flex items-center gap-2 text-white/60 hover:text-[#FFB400] text-sm transition-colors group">
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    hello@qnuru.co.ke
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4" />
                  Nairobi, Kenya
                </li>
              </ul>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-white/70 text-xs mb-2">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#FFB400] transition-colors"
                  />
                  <button className="px-4 py-2 bg-[#FFB400] hover:bg-[#FFB400]/90 rounded-lg text-[#111827] font-semibold text-sm transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/5">
            <p className="text-white/40 text-sm">
              © 2026 Qnuru. All rights reserved.
            </p>
            <div className="flex gap-6 text-white/40 text-sm">
              <a href="#" className="hover:text-[#FFB400] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#FFB400] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#FFB400] transition-colors">Cookies</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Signup Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md card-q dark:bg-gray-900 dark:border-gray-700 border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#111827] dark:text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {isSubmitted ? 'Welcome to Qnuru!' : 'Join the Waitlist'}
            </DialogTitle>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#6B7280] dark:text-gray-400">Check your inbox for early access details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-[#111827] dark:text-white">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827] dark:text-white">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827] dark:text-white">Phone/WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all"
                  placeholder="+254..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827] dark:text-white">What do you need?</label>
                <select
                  value={formData.need}
                  onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                  className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-[#FFB400] focus:ring-2 focus:ring-[#FFB400]/20 outline-none transition-all bg-white"
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

export default FinalCTA;
