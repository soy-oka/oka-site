
import React, { useEffect, useRef, useState } from "react";

const HumanoidSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // More responsive timing function with shorter duration
  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity',
    boxShadow: '0 30px 80px rgba(28, 22, 78, 0.35)'
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start observing when 10% of element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          
          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div 
      ref={sectionRef} 
      id="services"
      className="relative" 
      style={{ height: '300vh' }}
    >
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white" id="why-humanoid">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-2 md:mb-8 pt-6 sm:pt-8">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">
              Ökas AI-tjänster
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl">
              Från första AI-introduktion till fullständig implementering. Vi möter era utmaningar med smarta lösningar i fokus.
            </p>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {/* First Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 10,
                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
                opacity: isFirstCardVisible ? 1 : 0
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: "linear-gradient(135deg, #26156a 5%, #4323a2 55%, #ba3bc5 100%)"
                }}
              ></div>
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex items-center justify-center text-center">
                <div className="max-w-2xl space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-bold leading-tight">
                    AI Talks
                  </h3>
                  <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                    Interaktiva workshops som höjer hela teamets AI-kompetens. Vi kartlägger nuläget, ringar in utvecklingsområden och ger er färdiga strategier att använda direkt.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Second Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 20,
                transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95)`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? 'auto' : 'none'
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: "linear-gradient(135deg, #1f1a87 0%, #3a40c0 50%, #7341dd 100%)"
                }}
              ></div>
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex items-center justify-center text-center">
                <div className="max-w-2xl space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-bold leading-tight">
                    Automationer och AI-agenter
                  </h3>
                  <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                    Vi designar skräddarsydda automationer och AI-agenter som sköter repetitiva uppgifter, förbättrar kundupplevelsen och frigör tid för er att utvecklas.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Third Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 30,
                transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1)`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? 'auto' : 'none'
              }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: "linear-gradient(140deg, #1d126b 0%, #4d1faf 55%, #f24fae 100%)"
                }}
              ></div>
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex items-center justify-center text-center">
                <div className="max-w-2xl space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-bold leading-tight">
                    Optimering & Support
                  </h3>
                  <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                    Stora förändringar, nya rutiner och strategi – eller småskalig problemlösning och individanpassad optimering. Målet är att hitta AI-lösningar som inte bara fungerar utan också utvecklas och förbättras över tid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HumanoidSection;
