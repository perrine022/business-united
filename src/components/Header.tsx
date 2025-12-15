'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#8B7355] transition-colors duration-300">
              Architecture d'Intérieur
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="#services" 
              className="text-sm font-medium text-gray-700 hover:text-[#8B7355] transition-colors duration-300 tracking-wide"
            >
              Mes Services
            </Link>
            <Link 
              href="#gallery" 
              className="text-sm font-medium text-gray-700 hover:text-[#8B7355] transition-colors duration-300 tracking-wide"
            >
              Galerie
            </Link>
            <Link 
              href="#about" 
              className="text-sm font-medium text-gray-700 hover:text-[#8B7355] transition-colors duration-300 tracking-wide"
            >
              À Propos
            </Link>
            <Link 
              href="#contact" 
              className="text-sm font-medium text-gray-700 hover:text-[#8B7355] transition-colors duration-300 tracking-wide"
            >
              Contact
            </Link>
            <a 
              href="tel:+33612345678" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#8B7355] transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">06 12 34 56 78</span>
            </a>
            <a 
              href="#contact" 
              className="px-6 py-2.5 bg-[#8B7355] text-white text-sm font-medium hover:bg-[#6B5B47] transition-all duration-300 tracking-wide"
            >
              Demander un devis
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#8B7355] transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-6 space-y-4">
            <Link 
              href="#services" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-[#8B7355] transition-colors"
            >
              Mes Services
            </Link>
            <Link 
              href="#gallery" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-[#8B7355] transition-colors"
            >
              Galerie
            </Link>
            <Link 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-[#8B7355] transition-colors"
            >
              À Propos
            </Link>
            <Link 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-base font-medium text-gray-700 hover:text-[#8B7355] transition-colors"
            >
              Contact
            </Link>
            <a 
              href="tel:+33612345678" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-[#8B7355] transition-colors"
            >
              <Phone className="w-4 h-4" />
              06 12 34 56 78
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-[#8B7355] text-white text-base font-medium hover:bg-[#6B5B47] transition-all duration-300"
            >
              Demander un devis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
