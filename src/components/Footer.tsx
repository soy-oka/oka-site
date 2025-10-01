
import React from "react";
const Footer = () => {
  return (
    <footer className="w-full bg-white py-12" id="contact">
      <div className="section-container space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Kontakta oss</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg text-gray-700">
            <a href="mailto:hej@okamail.se" className="hover:text-primary transition-colors">
              hej@okamail.se
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a
              href="https://www.linkedin.com/company/oka-online/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Öka. Skapad med stolthet i Sverige.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
