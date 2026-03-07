import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Ecosystem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!section || !title || !card1 || !card2) return;

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

      // Card 1 (Marketplace) - slides from left
      gsap.fromTo(card1,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card1,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.4,
          }
        }
      );

      // Card 1 text animation
      const card1Text = card1.querySelector('.card-text');
      if (card1Text) {
        gsap.fromTo(card1Text,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card1,
              start: 'top 60%',
              end: 'top 35%',
              scrub: 0.4,
            }
          }
        );
      }

      // Card 2 (Academy) - slides from right
      gsap.fromTo(card2,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: card2,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.4,
          }
        }
      );

      // Card 2 text animation
      const card2Text = card2.querySelector('.card-text');
      if (card2Text) {
        gsap.fromTo(card2Text,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card2,
              start: 'top 55%',
              end: 'top 30%',
              scrub: 0.4,
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative w-full bg-white dark:bg-gray-900 py-20 lg:py-32 z-40 transition-colors duration-300"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section label */}
        <div ref={titleRef} className="mb-12 lg:mb-16">
          <span className="section-label">The Ecosystem</span>
          <div className="gold-rule mt-3" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] mt-6 max-w-2xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            More than services—an entire ecosystem
          </h2>
        </div>

        {/* Horizontal cards */}
        <div className="space-y-6 lg:space-y-8">
          {/* Card 1 - Marketplace */}
          <div
            ref={card1Ref}
            className="card-q overflow-hidden will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden">
                <img
                  src="/marketplace_meeting.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
              
              {/* Content */}
              <div className="card-text p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-12 h-12 bg-[#FFB400]/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#FFB400]" />
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Hire vetted young talent—fast.
                </h3>
                <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-6">
                  From content to code, get matched with pros who deliver in days, not weeks. 
                  Our marketplace connects Kenyan SMEs with skilled youth talent.
                </p>
                <ul className="space-y-2">
                  {['Pre-vetted developers & designers', 'Content creators & marketers', 'Quick matching, fair pricing'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <div className="w-1.5 h-1.5 bg-[#FFB400] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 - Academy */}
          <div
            ref={card2Ref}
            className="card-q overflow-hidden will-change-transform"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content */}
              <div className="card-text p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="w-12 h-12 bg-[#00BFA6]/10 rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-[#00BFA6]" />
                </div>
                <h3
                  className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Learn the skills that move the needle.
                </h3>
                <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed mb-6">
                  Short, practical courses in CapCut, vibe coding, and growth marketing. 
                  Designed for the modern Kenyan hustler.
                </p>
                <ul className="space-y-2">
                  {['CapCut video editing', 'Vibe coding basics', 'Growth marketing', 'AI tools mastery'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <div className="w-1.5 h-1.5 bg-[#00BFA6] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden order-1 lg:order-2">
                <img
                  src="/academy_learning.jpg"
                  alt="Learning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
