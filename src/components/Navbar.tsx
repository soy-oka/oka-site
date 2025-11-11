
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const sectionLinks = [
    { id: "services", label: "Tjänster" },
    { id: "specifications", label: "Vision" },
    { id: "waitlist", label: "Väntelista" },
    { id: "contact", label: "Kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    const offset = window.innerWidth < 768 ? 100 : 80;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    });
  };

  const handleSectionNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (location.pathname === "/") {
      event.preventDefault();
      sectionId ? scrollToSection(sectionId) : scrollToTop();
      closeMenu();
      return;
    }

    if (!sectionId) {
      // Ensure we land at the top when switching pages
      scrollToTop();
    }
    closeMenu();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isMenuOpen
          ? "bg-white shadow-sm"
          : isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center space-x-2 group"
          onClick={() => {
            scrollToTop();
            closeMenu();
          }}
          aria-label="Öka"
        >
          <img
            src="/oka-logo.png"
            alt="Öka Logo"
            className="h-7 sm:h-8"
          />
          <span className="font-playfair text-2xl sm:text-3xl tracking-tight text-gray-900 lowercase">
            öka
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={cn("nav-link", location.pathname === "/" && "font-semibold")}
            onClick={(event) => handleSectionNavigation(event)}
          >
            Hem
          </Link>
          {sectionLinks.map(({ id, label }) => (
            <Link
              key={id}
              to={`/#${id}`}
              className="nav-link"
              onClick={(event) => handleSectionNavigation(event, id)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/om-oss"
            className={cn("nav-link", location.pathname === "/om-oss" && "font-semibold")}
            onClick={() => {
              scrollToTop();
              closeMenu();
            }}
          >
            Om oss
          </Link>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden p-3 text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-opacity duration-200 ease-in-out",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-modal={isMenuOpen}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative flex h-full flex-col">
          <div
            className="flex h-full flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
                Öka
              </span>
              <button
                className="p-3 text-gray-900 focus:outline-none"
                onClick={closeMenu}
                aria-label="Stäng meny"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="mt-12 flex flex-1 flex-col items-center gap-5 px-6 text-center text-gray-900">
              <Link
                to="/"
                className="text-2xl font-semibold"
                onClick={(event) => handleSectionNavigation(event)}
              >
                Hem
              </Link>

              {sectionLinks.map(({ id, label }) => (
                <Link
                  key={id}
                  to={`/#${id}`}
                  className="text-lg font-medium"
                  onClick={(event) => handleSectionNavigation(event, id)}
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/om-oss"
                className="text-lg font-medium"
                onClick={() => {
                  scrollToTop();
                  closeMenu();
                }}
              >
                Om oss
              </Link>
            </nav>

            <div className="px-6 pb-10 text-center text-xs uppercase tracking-[0.35em] text-gray-400">
              © Öka
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
