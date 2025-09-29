
import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
}

const testimonials: TestimonialProps[] = [
  {
    content:
      "Atlas förändrade vår produktion genom att ta över repetitiva moment så teamet kunde fokusera på innovation. Vi ökade kapaciteten med 30% på tre månader.",
    author: "Sarah Chen",
    role: "Operativ chef, Axion Manufacturing",
    gradient: 'linear-gradient(135deg, #2330a3 0%, #4a3ce0 50%, #8e63ff 100%)'
  },
  {
    content:
      "Implementeringen av Atlas i våra logistikcenter minskade arbetsskadorna med 40% samtidigt som orderprecisionen ökade. Lärandeförmågan är imponerande.",
    author: "Michael Rodriguez",
    role: "Logistikchef, GlobalShip",
    gradient: 'linear-gradient(135deg, #1f1b80 0%, #4b2fa5 45%, #a545dd 100%)'
  },
  {
    content:
      "Atlas anpassade sig till våra laboratorieprotokoll snabbare än något system vi tidigare använt. Det är som en forskarkollega som aldrig blir trött och alltid levererar precision.",
    author: "Dr. Amara Patel",
    role: "Forskningsledare, BioAdvance Research",
    gradient: 'linear-gradient(135deg, #1d2d7a 0%, #5a3cbc 45%, #c070ff 100%)'
  },
  {
    content:
      "Som medelstort bolag trodde vi inte avancerad AI var inom räckhåll. Atlas ändrade förutsättningarna helt med sin flexibilitet och enkla implementation.",
    author: "Jason Lee",
    role: "VD, Innovative Solutions Inc.",
    gradient: 'linear-gradient(135deg, #1f3fa8 0%, #3f54d7 45%, #7f6af5 100%)'
  }
];

const TestimonialCard = ({ content, author, role, gradient }: TestimonialProps) => {
  return (
    <div className="relative rounded-2xl p-8 h-full flex flex-col justify-between text-white shadow-elegant transition-transform duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0" style={{ background: gradient }}></div>
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)'
        }}
      ></div>
      <div className="relative z-10">
        <p className="text-xl mb-8 font-medium leading-relaxed">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/75">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}> {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">04</span>
            <span>Testimonials</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">What others say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              gradient={testimonial.gradient}
            />
          ))}
        </div>
      </div>
    </section>;
};

export default Testimonials;
