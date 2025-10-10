
import React from "react";

const SpecsSection = () => {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    event.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty("--mouse-x");
    event.currentTarget.style.removeProperty("--mouse-y");
  };

  return (
    <section className="w-full py-6 sm:py-10 bg-white" id="specifications">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <div className="mb-8 sm:mb-12">
          <div className="h-[1px] bg-gray-200"></div>
        </div>
        
        {/* Main content with text mask image - responsive text sizing */}
        <div className="max-w-6xl mx-auto px-4 sm:px-10 space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 text-center">
            Vision
          </h2>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group"
          >
            <div className="absolute -inset-8 hidden lg:block bg-gradient-to-br from-[#7357ff0d] via-transparent to-[#35c8ff1a] blur-3xl"></div>
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-[#1b1e46] via-[#23327a] to-[#1b63c2] shadow-[0_32px_70px_rgba(16,27,59,0.4)] transition-all duration-500 hover:shadow-[0_40px_90px_rgba(22,40,78,0.55)]">
              <div className="relative overflow-hidden rounded-[30px] bg-[#080d1f]/95 px-6 py-9 sm:px-12 sm:py-14">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-28 left-16 w-52 h-52 bg-gradient-to-br from-[#6f4bff]/45 to-transparent blur-3xl"></div>
                  <div className="absolute -bottom-24 right-8 w-64 h-64 border border-white/12 rounded-full opacity-50"></div>
                  <div className="absolute top-10 right-16 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0%,transparent_65%)] opacity-40"></div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500" style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 156, 255, 0.35), transparent 60%)'
                }}></div>
                <div className="relative space-y-6 sm:space-y-7 text-white text-center">
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/95">
                    Vi vill öka AI-kunskapen hos svenska företag och ge organisationer de verktyg som krävs för att använda Generativ AI på ett smart och effektivt sätt.
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/95">
                    Genom att introducera AI ansvarsfullt skapar vi förutsättningar för en mer jämlik konkurrens, där mindre aktörer kan stå starkare mot de stora bolagen.
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/95">
                    Vi ser AI som en möjliggörare och dörröppnare: en kraftfull resurs som ger företag förmågan att själva lösa problem, driva innovation och skapa hållbar tillväxt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
