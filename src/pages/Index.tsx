
import React, { useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumanoidSection from "@/components/HumanoidSection";
import SpecsSection from "@/components/SpecsSection";
import ImageShowcaseSection from "@/components/ImageShowcaseSection";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === "undefined") return;

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const offset = window.innerWidth < 768 ? 100 : 80;
    const top =
      targetElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    });
  }, []);

  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    const handleAnchorClick = (event: Event) => {
      event.preventDefault();
      const target = event.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href")?.substring(1);
      if (!targetId) return;
      scrollToSection(targetId);
    };

    anchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
    };
  }, [scrollToSection]);

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");
    if (!sectionId) return;

    const timeout = window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [location.hash, scrollToSection]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8"> {/* Reduced space on mobile */}
        <Hero />
        <HumanoidSection />
        <SpecsSection />
        <ImageShowcaseSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
