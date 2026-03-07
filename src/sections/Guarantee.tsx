import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import Earth from '@/components/ui/globe';

gsap.registerPlugin(ScrollTrigger);

const guarantees = [
  {
    icon: TrendingUp,
    title: 'Measurable Results',
    description: '+20% efficiency or we optimize for free',
    color: '#FFB400',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Clear timelines, regular updates, no delays',
    color: '#00BFA6',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement',
    description: 'Monthly reports and ongoing optimization',
    color: '#0B3D91',
  },
];

const Guarantee = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (!section || !card || items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.4,
          }
        }
      );

      items.forEach((item, index) => {
        gsap.fromTo(item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
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
      className="relative w-full bg-white dark:bg-gray-900 py-20 lg:py-32 z-50 transition-colors duration-300"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Main guarantee card */}
        <div
          ref={cardRef}
          className="max-w-4xl mx-auto card-q dark:bg-gray-900 p-8 lg:p-12 will-change-transform overflow-hidden relative"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB400]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Badge */}
            <div className="flex-shrink-0">
              <div className="w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                <Earth />
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <span className="section-label dark:text-gray-400">Our Promise</span>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#111827] dark:text-white mt-3 mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Results Guaranteed — Or We Fix It Free
              </h2>
              <p className="text-[#6B7280] dark:text-gray-400 text-base lg:text-lg leading-relaxed mb-6">
                We set clear KPIs before starting. If we don't hit the targets, 
                we keep working at no extra cost until we do. Your success is our success.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['+20% Efficiency', 'Money-Back Guarantee', 'Free Optimization'].map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-[#FFB400]/10 dark:bg-[#FFB400]/20 text-[#111827] dark:text-white text-sm font-medium px-3 py-1.5 rounded-full"
                  >
                    <Check className="w-4 h-4 text-[#FFB400]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          {guarantees.map((item, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="card-q dark:bg-gray-900 p-6 will-change-transform text-center"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <h3
                className="text-lg font-bold text-[#111827] dark:text-white mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {item.title}
              </h3>
              <p className="text-[#6B7280] dark:text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
