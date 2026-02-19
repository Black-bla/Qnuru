import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, HeadphonesIcon, Receipt } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatYouGet = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardA = cardARef.current;
    const cardB = cardBRef.current;
    const cardC = cardCRef.current;

    if (!section || !title || !cardA || !cardB || !cardC) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { y: 24, opacity: 0 },
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

      // Card A (large left)
      gsap.fromTo(cardA,
        { x: '-10vw', opacity: 0, rotate: -1.5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardA,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4,
          }
        }
      );

      // Card B (top right)
      gsap.fromTo(cardB,
        { x: '10vw', opacity: 0, rotate: 1.5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardB,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );

      // Card C (bottom right)
      gsap.fromTo(cardC,
        { x: '10vw', opacity: 0, rotate: 1.5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardC,
            start: 'top 65%',
            end: 'top 35%',
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
      className="relative w-full min-h-screen bg-[#F6F7FB] py-20 lg:py-32 z-20"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section label */}
        <div ref={titleRef} className="mb-12 lg:mb-16">
          <span className="section-label">What You Get</span>
          <div className="gold-rule mt-3" />
        </div>

        {/* Asymmetric card layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Card A - Large left */}
          <div
            ref={cardARef}
            className="lg:col-span-7 card-q p-8 lg:p-12 will-change-transform"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#FFB400]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#FFB400]" />
              </div>
            </div>
            <h3
              className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              A full digital setup—without the chaos.
            </h3>
            <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg">
              We design, build, and run your website, POS, CRM, and campaigns. 
              You focus on customers. From M-Pesa integration to AI chatbots, 
              we handle the tech so you can grow your business.
            </p>
            <ul className="mt-6 space-y-2">
              {['Custom websites & e-commerce', 'POS & inventory systems', 'CRM & customer management', 'AI automation & chatbots'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <div className="w-1.5 h-1.5 bg-[#00BFA6] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8">
            {/* Card B */}
            <div
              ref={cardBRef}
              className="card-q p-6 lg:p-8 will-change-transform"
            >
              <div className="w-10 h-10 bg-[#00BFA6]/10 rounded-full flex items-center justify-center mb-4">
                <HeadphonesIcon className="w-5 h-5 text-[#00BFA6]" />
              </div>
              <h3
                className="text-xl font-bold text-[#111827] mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Monthly support that actually shows up.
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Dedicated support team, regular updates, and proactive maintenance. 
                We're not ghosting you after launch.
              </p>
            </div>

            {/* Card C */}
            <div
              ref={cardCRef}
              className="card-q p-6 lg:p-8 will-change-transform"
            >
              <div className="w-10 h-10 bg-[#0B3D91]/10 rounded-full flex items-center justify-center mb-4">
                <Receipt className="w-5 h-5 text-[#0B3D91]" />
              </div>
              <h3
                className="text-xl font-bold text-[#111827] mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Clear pricing. No surprise invoices.
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Transparent packages starting from freemium setups to full 
                enterprise solutions. Know what you're paying for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
