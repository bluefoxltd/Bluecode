import React, { useState, useEffect } from 'react';
import { BlueCodeLogo } from './BlueCodeLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#features' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'Studio', href: '#studio' },
    { name: 'Work', href: '#work' },
    { name: 'Packages', href: '#pricing' },
  ];

  const handleWhatsAppDirect = () => {
    window.open('https://wa.me/9779715971505', '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-transparent border-b border-slate-900/5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`flex items-center justify-between gap-8 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20 lg:h-24'}`}>
          {/* Zone 1: Brand Mark */}
          <a href="#" className="flex items-center group shrink-0" aria-label="Blue Code Home">
            <BlueCodeLogo size={scrolled ? 34 : 40} showText={true} />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#0052FF] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0052FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={handleWhatsAppDirect}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#002068] hover:bg-[#0052FF] rounded-full transition-all duration-300 whitespace-nowrap shrink-0 shadow-sm hover:shadow-md"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 hover:text-[#0052FF] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-6 py-6 shadow-xl animate-fade-in">
          <nav className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 hover:text-[#0052FF] py-2 border-b border-slate-100"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppDirect();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-full bg-[#002068] text-white hover:bg-[#0052FF] transition"
            >
              <span>Start a Project via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              <span>Book Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
