import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Rocket, LineChart, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We learn about your business, pain points, and goals. Free 30-minute consultation to understand your needs.',
    icon: Phone,
    color: '#FFB400',
  },
  {
    number: '02',
    title: 'Solution Design',
    description: 'We design a custom solution with clear KPIs, timeline, and pricing. No surprises, full transparency.',
    icon: Handshake,
    color: '#00BFA6',
  },
  {
    number: '03',
    title: 'Rapid Build',
    description: 'Our agile team builds your solution in weeks, not months. Regular updates and demos throughout.',
    icon: Rocket,
    color: '#0B3D91',
  },
  {
    number: '04',
    title: 'Launch & Optimize',
    description: 'Go live with confidence. We track metrics, provide reports, and continuously optimize for results.',
    icon: LineChart,
    color: '#FFB400',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const steps = stepsRef.current.filter(Boolean);
    const line = lineRef.current;

    if (!section || !title || steps.length === 0 || !line) return;

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

      // Progress line animation
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.4,
          }
        }
      );

      steps.forEach((step, index) => {
        gsap.fromTo(step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: step,
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
      id="how-it-works"
      className="relative w-full bg-[#F6F7FB] py-20 lg:py-32 z-40"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">How It Works</span>
          <div className="gold-rule mt-3 mx-auto" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] mt-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            From Idea to Impact in 4 Steps
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg mt-4">
            Simple, transparent process designed to get you results fast.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Progress line (desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB400] via-[#00BFA6] to-[#0B3D91] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="will-change-transform text-center"
              >
                {/* Icon */}
                <div className="relative inline-block mb-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: '#111827' }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold text-[#111827] mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '2-6', label: 'Weeks Average Delivery' },
            { value: '50+', label: 'Projects Completed' },
            { value: '95%', label: 'Client Satisfaction' },
            { value: '+20%', label: 'Average Efficiency Gain' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-3xl lg:text-4xl font-bold text-[#0B3D91]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#6B7280] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
