import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Isaac',
    role: 'Co-Founder & Head of Operations',
    description: 'Leading client success and project delivery. Ensures every solution hits its targets.',
    image: '/portrait_isaac.jpg',
    color: '#00BFA6',
  },
  {
    name: 'Mackenzie',
    role: 'Co-Founder & Head of Growth',
    description: 'Driving brand strategy and marketing excellence. Turns visibility into revenue.',
    image: '/portrait_mackenzie.jpg',
    color: '#0B3D91',
  },
  {
    name: 'Jotham Situma',
    role: 'Co-Founder & Head of Technology',
    description: 'Architecting scalable systems and AI solutions. Building the tech that powers growth.',
    image: '/portrait_jotham.jpg',
    color: '#FFB400',
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
      className="relative w-full bg-[#F6F7FB] py-20 lg:py-32 z-[60]"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Meet the Team</span>
          <div className="gold-rule mt-3 mx-auto" />
          <h2
            className="text-3xl lg:text-5xl font-bold text-[#111827] mt-6"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            The Minds Behind Qnuru
          </h2>
          <p className="text-[#6B7280] text-base lg:text-lg mt-4">
            Three co-founders, one mission: building tech that drives real business results.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card-q overflow-hidden will-change-transform group"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Social links */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FFB400] transition-colors">
                    <Linkedin className="w-4 h-4 text-[#111827]" />
                  </button>
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#00BFA6] transition-colors">
                    <Twitter className="w-4 h-4 text-[#111827]" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div
                  className="w-10 h-1 rounded-full mb-4"
                  style={{ backgroundColor: member.color }}
                />
                <h3
                  className="text-xl font-bold text-[#111827]"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {member.name}
                </h3>
                <p className="text-sm font-medium mt-1" style={{ color: member.color }}>
                  {member.role}
                </p>
                <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-[#0B3D91]/5 rounded-full px-6 py-3">
            <Mail className="w-5 h-5 text-[#0B3D91]" />
            <span className="text-[#111827] text-sm">
              We're hiring engineers & creators —{' '}
              <a
                href="mailto:hello@qnuru.co.ke"
                className="text-[#0B3D91] hover:text-[#FFB400] font-medium transition-colors"
              >
                hello@qnuru.co.ke
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
