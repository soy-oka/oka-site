import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <section className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">
              Om oss
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-gray-900">
              Öka gör AI enkelt för svenska företag
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Öka grundades med en enkel idé: att göra kraften i Generativ AI tillgänglig för alla innovatörer — inte bara för stora bolag med egna AI-team. Vi hjälper små och medelstora företag i Sverige att arbeta smartare, bättre och mer effektivt med AI genom workshops, automationer och skräddarsydda AI-lösningar.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Vi tror inte på AI-hype. Vi tror på konkreta resultat, mätbar förbättring och drivna människor. Vi utgår alltid från er verksamhet med era rutiner, utmaningar och mål i fokus. På så sätt får ni en AI-lösning som faktiskt används och skapar värde från dag ett.
            </p>
          </div>
        </section>

        <section className="relative mt-16 overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, rgba(120,110,255,0.18) 0%, rgba(104,205,255,0.16) 45%, rgba(255,187,246,0.18) 100%)"
            }}
          ></div>
          <div
            className="absolute inset-x-0 -top-32 h-40 -z-10"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(232,238,255,0.65) 60%, rgba(232,238,255,0.95) 100%)"
            }}
          ></div>
          <div className="container px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
              <div className="flex justify-center">
                <div className="w-full max-w-[440px] mx-auto">
                  <div className="relative">
                    <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-tr from-indigo-500/25 via-sky-400/18 to-transparent blur-3xl -z-10"></div>
                    <div className="relative rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(15,23,42,0.22)] border border-white/40">
                      <img
                        src="/about-portrait.jpg"
                        alt="Porträtt av grundaren"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-5 rounded-3xl bg-white/75 backdrop-blur-sm border border-white/60 px-6 sm:px-8 py-6 sm:py-7 shadow-[0_18px_45px_rgba(76,106,219,0.12)]">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500/80">
                      Kontakt
                    </span>
                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-900">Simon Danielsson</h3>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    <a
                      href="mailto:simon@okamail.se"
                      className="group flex items-center gap-2 text-indigo-900/90 font-medium"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200/60 text-indigo-700 text-sm font-semibold">
                        @
                      </span>
                      <span className="group-hover:text-indigo-600 group-hover:underline group-hover:underline-offset-4">
                        simon@okamail.se
                      </span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/simon-danielsson-510b1013b"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 text-indigo-900/90 font-medium"
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-200/60 text-sky-700 text-sm font-semibold">
                        in
                      </span>
                      <span className="group-hover:text-sky-600 group-hover:underline group-hover:underline-offset-4">
                        LinkedIn-profil
                      </span>
                    </a>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/60 px-6 sm:px-8 py-6 sm:py-7 shadow-[0_18px_45px_rgba(76,106,219,0.12)]">
                  <h2 className="text-lg sm:text-xl font-semibold text-indigo-900">Om mig</h2>
                  <p className="text-sm sm:text-base text-indigo-900/85 leading-relaxed">
                    Jag heter Simon och grundade Öka för att ge svenska företag tillgång till AI. Jag har en bakgrund som projektledare inom civilsamhället och har sett hur rätt verktyg kan skapa helt nya möjligheter. Som projektledare har jag utvecklat och presenterat egna arbetsmetoder, både i Sverige och internationellt. Jag drivs av att hjälpa människor att växa och förmedla verktyg för utveckling.
                  </p>
                  <p className="text-sm sm:text-base text-indigo-900/85 leading-relaxed">
                    Jag tror på ett nära samarbete, där vi bygger lösningar och utvärderar tillsammans. Jag ser till att ni får användbara verktyg som skapar värde, sparar tid och ökar kvaliteten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
