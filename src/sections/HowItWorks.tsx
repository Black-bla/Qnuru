import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Users, Rocket, ShieldCheck, LineChart, Infinity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Your Vision, Our Blueprint',
    description: 'Free 30-min strategy session where we dive deep into your business—what\'s working, what\'s stuck, and where the biggest opportunities hide. Kenyan market expertise meets data-driven insights.',
    icon: Compass,
    color: '#FFB400',
  },
  {
    number: '02',
    title: 'Tailored Tech + Talent Matching',
    description: 'We design your solution architecture and handpick the perfect team from our Academy-trained, vetted talent pool. Transparent pricing, clear KPIs, and dedicated project leads—no outsourcing mysteries.',
    icon: Users,
    color: '#00BFA6',
  },
  {
    number: '03',
    title: 'Build in Sprints, See Progress Live',
    description: 'Our residential engineering team builds in 1-2 week sprints with regular demos and feedback loops. Track progress on your dashboard—weekly demos, no black boxes.',
    icon: Rocket,
    color: '#0B3D91',
  },
  {
    number: '04',
    title: 'Quality Vetting & Qnuru Stamp',
    description: 'Our CTO and lead engineers personally review code quality, security, and performance. Only work that meets the "Qnuru Standard" goes live—backed by our Academy certification.',
    icon: ShieldCheck,
    color: '#00BFA6',
  },
  {
    number: '05',
    title: 'Go Live + Real Results Tracking',
    description: 'Launch day is just the beginning. We track what matters: M-Pesa transactions, traffic, conversions, engagement. Monthly reports with actionable insights, not vanity metrics.',
    icon: LineChart,
    color: '#FFB400',
  },
  {
    number: '06',
    title: 'Continuous Optimization',
    description: 'Your dedicated team doesn\'t disappear after launch. Through monthly retainers, we continuously optimize, add features, and scale as you grow. Your growth partner, not just a vendor.',
    icon: Infinity,
    color: '#0B3D91',
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
      className="relative w-full bg-white dark:bg-gray-900 py-20 lg:py-32 z-40 transition-colors duration-300"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label dark:text-gray-400">How It Works</span>
          <div className="gold-rule mt-3 mx-auto" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] dark:text-white mt-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Your Growth Journey with Qnuru
          </h2>
          <p className="text-[#6B7280] dark:text-gray-400 text-base lg:text-lg mt-4">
            From discovery to continuous growth—a transparent, outcome-driven process powered by Academy-trained talent.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                  className="text-xl font-bold text-[#111827] dark:text-white mb-3"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '100%', label: 'Academy-Vetted Talent' },
            { value: '<3 Days', label: 'Quote to Proposal' },
            { value: '4-Layer', label: 'Support Ecosystem' },
            { value: '1-2 Week', label: 'Sprint Cycles' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-3xl lg:text-4xl font-bold text-[#0B3D91] dark:text-[#FFB400]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#6B7280] dark:text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* The Qnuru Difference */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#0B3D91]/5 to-[#00BFA6]/5 dark:from-[#0B3D91]/10 dark:to-[#00BFA6]/10 rounded-2xl p-8 lg:p-10 border border-[#0B3D91]/10 dark:border-[#00BFA6]/20">
            <h3 
              className="text-2xl lg:text-3xl font-bold text-[#111827] dark:text-white mb-6 text-center"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              The Qnuru Difference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Local Expertise', 
                  desc: 'Deep Kenyan market knowledge: M-Pesa, local payment systems, customer behavior' 
                },
                { 
                  title: 'Youth-Powered Innovation', 
                  desc: 'Fresh perspectives from Academy-trained talent—vetted, skilled, and motivated' 
                },
                { 
                  title: 'No Intermediation Risk', 
                  desc: "We're your trusted partner with quality control and the Qnuru stamp on every project" 
                },
                { 
                  title: 'Outcome Guarantees', 
                  desc: 'Track real metrics that matter—traffic, sales, engagement—not vanity numbers' 
                },
                { 
                  title: 'Residential Engineering Hub', 
                  desc: 'Fast collaboration from our shared workspace—no distributed delays or timezone chaos' 
                },
                { 
                  title: 'Continuous Growth Partnership', 
                  desc: "We don't disappear after launch—monthly retainers keep you scaling and optimizing" 
                },
              ].map((item, index) => (
                <div key={index} className="text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00BFA6] flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#111827] dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
