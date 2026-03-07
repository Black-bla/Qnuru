import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Isaac',
    role: 'CEO & Commercial Lead',
    description: 'Driving client acquisition, partnerships, and revenue growth. Turns relationships into results.',
    image: '/images/team/isaac.png',
    color: '#00BFA6',
    height: '520px', // Varying heights
  },
  {
    name: 'Mackenzie',
    role: 'CMO & Brand Strategist',
    description: 'Leading brand development, social media, and marketing campaigns. Builds trust at scale.',
    image: '/images/team/Makenzie.png',
    color: '#FFB400',
    height: '580px',
  },
  {
    name: 'Jotham',
    role: 'CTO & Systems Architect',
    description: 'Architecting scalable systems, AI solutions, and technical infrastructure. Powers innovation.',
    image: '/images/team/Jotham.png',
    color: '#0B3D91',
    height: '560px',
  },
  {
    name: 'Ian',
    role: 'COO & Lead Engineer',
    description: 'Overseeing operations, quality control, and engineering excellence. Delivers perfection.',
    image: '/images/team/ian.png',
    color: '#00BFA6',
    height: '540px',
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
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

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative w-full bg-white dark:bg-gray-900 py-20 lg:py-32 z-[60] transition-colors duration-300"
    >
      <div className="w-full">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-6xl mx-auto mb-20 px-6">
          <h2
            className="text-5xl lg:text-7xl font-bold text-[#111827] dark:text-white leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            THE TEAM POWERING
            <br />
            YOUR GROWTH
          </h2>
          <p className="text-[#6B7280] dark:text-gray-400 text-lg lg:text-xl mt-6 max-w-2xl mx-auto">
            Four visionaries building Kenya's next-generation digital ecosystem. 
            From tech to brand, operations to strategy—we've got you covered.
          </p>
        </div>

        {/* Mobile: 2x2 Grid - No Space */}
        <div className="md:hidden grid grid-cols-2 relative">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="will-change-transform group cursor-pointer"
            >
              {/* Pill Shape */}
              <div 
                className="relative w-full rounded-t-full overflow-hidden transition-all duration-500"
                style={{ 
                  backgroundColor: member.color,
                  height: '300px'
                }}
              >
                {/* Image Container */}
                <div className="absolute inset-0 flex items-end justify-center overflow-hidden px-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[85%] object-cover object-top transition-transform duration-700"
                    style={{ 
                      filter: 'grayscale(100%) contrast(1.1)',
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>

                {/* Name at Bottom */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-4 transition-all duration-500 group-hover:-translate-y-20">
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: 'Pepsi, Space Grotesk, sans-serif' }}
                  >
                    {member.name.toUpperCase()}
                  </h3>
                </div>

                {/* Details - Hidden until hover */}
                <div className="absolute bottom-0 left-0 right-0 text-center px-4 pb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <p className="text-xs text-white font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-white leading-relaxed mb-3 line-clamp-2">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-2">
                    <button className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                      <Linkedin className="w-3 h-3 text-white" />
                    </button>
                    <button className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                      <Twitter className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Full Width Pills - Side by Side - No Gaps */}
        <div className="hidden md:flex items-end">
          {teamMembers.map((member, index) => (
            <div
              key={`desktop-${index}`}
              className="flex-1 will-change-transform group cursor-pointer"
            >
              {/* Pill Shape */}
              <div 
                className="relative w-full rounded-t-full overflow-hidden transition-all duration-500"
                style={{ 
                  backgroundColor: member.color,
                  height: member.height
                }}
              >
                {/* Image Container */}
                <div className="absolute inset-0 flex items-end justify-center overflow-hidden px-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[80%] object-cover object-top transition-transform duration-700"
                    style={{ 
                      filter: 'grayscale(100%) contrast(1.1)',
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>

                {/* Name at Bottom - Moves up on hover */}
                <div className="absolute bottom-10 left-0 right-0 text-center px-6 transition-all duration-500 group-hover:-translate-y-32">
                  <h3
                    className="text-3xl lg:text-4xl font-bold text-white"
                    style={{ fontFamily: 'Pepsi, Space Grotesk, sans-serif' }}
                  >
                    {member.name.toUpperCase()}
                  </h3>
                </div>

                {/* Details - Hidden until hover, revealed at bottom */}
                <div className="absolute bottom-0 left-0 right-0 text-center px-6 pb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <p className="text-base lg:text-lg text-white font-bold mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-white leading-relaxed mb-6 max-w-xs mx-auto">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring CTA */}
        <div className="text-center mt-32 lg:mt-40 px-6">
          <div className="inline-flex flex-col items-center gap-4">
            <h3 
              className="text-2xl lg:text-3xl font-bold text-[#111827] dark:text-white"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Want to join the team?
            </h3>
            <a
              href="mailto:careers@qnuru.co.ke"
              className="inline-flex items-center gap-3 bg-[#0B3D91] hover:bg-[#FFB400] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 group"
            >
              <span>VIEW OPEN POSITIONS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
