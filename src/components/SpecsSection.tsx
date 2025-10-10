
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
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">3</span>
              <span>Vision</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        {/* Main content with text mask image - responsive text sizing */}
        <div className="max-w-6xl mx-auto px-4 sm:px-10 space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900 text-center">
            Vision
          </h2>
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-[28px] border border-primary/25 bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-500 px-6 py-8 sm:px-12 sm:py-14 shadow-[0_26px_50px_rgba(37,99,235,0.24)] transition-all duration-500 hover:shadow-[0_36px_70px_rgba(37,99,235,0.32)]"
            >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500" style={{
              background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.3), transparent 60%)'
            }}></div>
            <div className="relative space-y-5 sm:space-y-6 text-white">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/95">
                Vi vill öka AI-kunskapen hos nordiska företag och ge organisationer de verktyg som krävs för att använda Generativ AI på ett smart och effektivt sätt.
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
    </section>
  );
};

export default SpecsSection;
