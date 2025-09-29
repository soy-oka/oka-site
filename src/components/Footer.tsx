
import React from "react";
const Footer = () => {
  return <footer className="w-full bg-white py-0">
      <div className="section-container">
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Öka. Skapad med stolthet i Sverige.
        </p>
      </div>
    </footer>;
};
export default Footer;
