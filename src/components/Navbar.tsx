import React, { useState, useEffect } from 'react';
import { BlueCodeLogo } from './BlueCodeLogo';
import { Menu, X, ArrowUpRight, FileDown } from 'lucide-react';

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
    { name: 'About Us', href: '#about' },
    { name: 'How we Work', href: '#how-we-work' },
    { name: 'Services', href: '#services' },
    { name: 'Studio', href: '#studio' },
    { name: 'Work Package', href: '#pricing' },
    { name: 'Inquiry now', href: '#inquiry' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060913]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-[#060913]/40 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`flex items-center justify-between gap-8 transition-all duration-300 ${scrolled ? 'h-16' : 'h-20 lg:h-22'}`}>
          {/* Zone 1: Brand Mark with transparent bluecode.png logo */}
          <a href="#" className="flex items-center group shrink-0" aria-label="Blue Code Home">
            <BlueCodeLogo size={scrolled ? 38 : 46} />
          </a>

          {/* Zone 2: Navigation Links with Cornflower Blue hover */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#6495ED] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6495ED] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions with Cornflower Blue (#6495ED) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#6495ED] hover:bg-[#5383db] rounded-full transition-all duration-200 whitespace-nowrap shrink-0 shadow-md shadow-[#6495ED]/25 active:scale-95 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span className="whitespace-nowrap">Inquiry Now</span>
            </button>
          </div>

          {/* Mobile Right Controls: Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-[#6495ED] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060913]/98 backdrop-blur-xl border-b border-slate-800 px-6 py-6 shadow-2xl animate-fade-in">
          <nav className="flex flex-col gap-3 mb-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-100 hover:text-[#6495ED] py-2 border-b border-slate-800/60"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold rounded-full bg-[#6495ED] text-white hover:bg-[#5383db] transition shadow-lg shadow-[#6495ED]/20 whitespace-nowrap"
            >
              <FileDown className="w-4 h-4" />
              <span>Inquiry Now</span>
            </button>
            <a
              href="https://wa.me/9779715971505"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-full border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <span>Direct WhatsApp (+977 9715971505)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
