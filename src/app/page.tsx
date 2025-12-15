'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, ArrowRight, Check, Star, Play, Calendar, Users, Target, TrendingUp, Headphones, Award, Globe, Menu, X, Briefcase, Lightbulb, Rocket, Megaphone, ShoppingCart, FileText, Search, BarChart3, Zap, Handshake, User, Building2, Target as TargetIcon, Linkedin, Instagram, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

// Composant pour animer les chiffres
function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2000,
  delay = 0 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (hasStarted) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          setTimeout(() => {
            const startTime = Date.now();
            const startValue = 0;
            const endValue = value;

            const animate = () => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut);
              
              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(endValue);
              }
            };

            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef && observerRef.current) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [value, duration, delay, hasStarted]);

  return (
    <span ref={ref} className="inline-block">
      {prefix}{count}{suffix}
    </span>
  );
}

// Composant pour le widget Calendly
function CalendlyWidget() {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vérifier si le script Calendly est chargé
    const checkCalendly = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        if (calendlyRef.current && !calendlyRef.current.querySelector('iframe')) {
          (window as any).Calendly.initInlineWidget({
            url: 'https://calendly.com/business-united/30min?embed_domain=business-united.fr&embed_type=Inline',
            parentElement: calendlyRef.current
          });
        }
      } else {
        // Réessayer après un court délai si le script n'est pas encore chargé
        setTimeout(checkCalendly, 100);
      }
    };

    checkCalendly();
  }, []);

  return (
    <div 
      ref={calendlyRef}
      className="calendly-inline-widget" 
      style={{ minWidth: '320px', height: '700px' }}
    ></div>
  );
}

// Composant Carrousel de témoignages
function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: 'Sabrina',
      age: '34 ans',
      role: 'Coach bien-être',
      initial: 'S',
      content: "Je voulais me lancer dans le coaching bien-être, mais je ne savais pas par où commencer. Business United m'a accompagnée dans le lancement de mon offre. Ils se sont occupés du branding, du tunnel et de la pub de lancement...",
      highlight1: "En 3 semaines, tout était en ligne.",
      highlight2: "J'ai eu mes premiers appels dès la première campagne"
    },
    {
      name: 'Caroline',
      age: '26 ans',
      role: 'Créatrice de boutique en ligne',
      initial: 'C',
      content: "Je me suis sentie soutenue du début à la fin.",
      content2: "Mathieu m'a aidée à choisir mon statut, rédiger mes statuts, déposer ma marque, et même rédiger mes CGV.",
      highlight1: "J'ai pu lancer mon activité d'e-commerce l'esprit léger"
    },
    {
      name: 'François',
      age: '40 ans',
      role: 'Dirigeant de SAS',
      initial: 'F',
      content: "Grâce à Business United, j'ai structuré mon image, lancé un site pro, j'ai eu une vraie stratégie commerciale… et décroché mes premiers résultats ! Je reçois maintenant des demandes qualifiées chaque semaine.",
      highlight1: "Son accompagnement m'a donné une réelle confiance.",
      highlight2: "Je continue toujours de travailler régulièrement avec eux régulièrement"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Carrousel */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-full px-4"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 hover:bg-white/15 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                {/* Bloc rouge décoratif */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#B60000] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#B60000]/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#B60000]/30">
                    <span className="text-[#B60000] font-bold text-base md:text-lg">{testimonial.initial}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base md:text-lg">{testimonial.name}</h3>
                    <p className="text-white/80 text-sm">{testimonial.age}</p>
                    <p className="text-white/80 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm md:text-base leading-relaxed flex-grow mb-4 relative z-10">
                  {testimonial.content}
                </p>
                
                {testimonial.content2 && (
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 relative z-10">
                    {testimonial.content2}
                  </p>
                )}
                
                {testimonial.highlight1 && (
                  <p className="text-white/90 text-sm md:text-base font-semibold mb-2 relative z-10">
                    {testimonial.highlight1}
                  </p>
                )}
                
                {testimonial.highlight2 && (
                  <p className="text-white/90 text-sm md:text-base font-semibold relative z-10">
                    {testimonial.highlight2}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 border border-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Témoignage précédent"
      >
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white rotate-180" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 border border-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Témoignage suivant"
      >
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Indicateurs de pagination */}
      <div className="flex justify-center gap-2 mt-6 md:mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#B60000] w-8'
                : 'bg-white/30 w-2 hover:bg-white/50'
            }`}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-white/20 bg-black/95 shadow-lg shadow-black/50' 
          : 'border-white/10 bg-black/90'
      } overflow-hidden w-full`} style={{ position: 'fixed' }}>
        {/* Bloc rouge décoratif dans le header */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#B60000] rounded-full blur-2xl opacity-20 -z-10"></div>
        <div className="absolute top-0 left-1/4 w-24 h-24 bg-[#B60000] rounded-lg blur-xl opacity-15 rotate-45 -z-10"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
              <Image
                src="/logob.png"
                alt="Business United"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
                priority
              />
              <span className="text-white font-bold text-lg md:text-2xl tracking-tight">Business United</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-white/90 hover:text-white transition-colors font-medium">Services</a>
              <a href="#approche" className="text-white/90 hover:text-white transition-colors font-medium">Notre approche</a>
              <a href="#temoignages" className="text-white/90 hover:text-white transition-colors font-medium">Témoignages</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <a 
                href="#contact" 
                className="hidden sm:inline-flex px-3 py-1.5 md:px-6 md:py-2.5 bg-[#B60000] text-white font-semibold rounded-lg hover:bg-[#950000] transition-all duration-300 text-xs md:text-base"
              >
                PRENDRE RDV
              </a>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 text-white hover:bg-white/20 rounded-lg transition-all duration-200 border border-white/30 bg-white/5 flex-shrink-0 z-50 relative"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95 relative z-50">
            <nav className="px-4 py-4 space-y-2">
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Services
              </a>
              <a 
                href="#approche" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Notre approche
              </a>
              <a 
                href="#temoignages" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Témoignages
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Contact
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 bg-[#B60000] text-white font-semibold rounded-lg hover:bg-[#950000] transition-all duration-300 mt-3 text-sm"
              >
                PRENDRE RDV
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Section Hero - Notre mission */}
      <section className="relative pt-16 md:pt-20 pb-12 md:pb-16 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(182,0,0,0.1),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(182,0,0,0.08),transparent_50%)] animate-pulse-slow animation-delay-200"></div>
        
        {/* Blocs rouges décoratifs en arrière-plan - Design moderne */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grands blocs rouges flous */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#B60000]/30 rounded-3xl blur-3xl rotate-45 animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-[#B60000]/35 rounded-2xl blur-2xl -rotate-12 animate-float"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#B60000]/25 rounded-full blur-3xl animate-rotate-slow"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#B60000]/30 rounded-xl blur-2xl rotate-45"></div>
          
          {/* Blocs géométriques rouges solides - Design moderne */}
          <div className="absolute top-32 right-10 w-40 h-40 bg-[#B60000] rounded-2xl rotate-12 animate-red-block animation-delay-200 opacity-80"></div>
          <div className="absolute bottom-40 left-10 w-32 h-32 bg-[#B60000] rounded-xl -rotate-12 opacity-70 animate-float animation-delay-300"></div>
          <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-[#B60000] rounded-full opacity-60 animate-float animation-delay-400"></div>
          <div className="absolute top-20 right-1/3 w-24 h-24 bg-[#B60000] rounded-lg rotate-45 opacity-75 animate-pulse-slow"></div>
          <div className="absolute bottom-32 right-1/4 w-36 h-36 bg-[#B60000] rounded-2xl -rotate-6 opacity-65 animate-red-block animation-delay-100"></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 bg-[#B60000] rounded-lg rotate-12 opacity-70 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-[#B60000] rounded-full opacity-60 animate-pulse-slow animation-delay-200"></div>
          
          {/* Lignes décoratives */}
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[#B60000]/40 via-[#B60000]/20 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-[#B60000]/30 to-[#B60000]/40"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-2 md:py-4">
            {/* Contenu texte à gauche */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in-up animation-delay-100">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#B60000] rounded-full mb-4 md:mb-6 shadow-lg shadow-[#B60000]/50 animate-scale-in">
                  <span className="text-white text-xs md:text-sm font-bold">CAEN & NORMANDIE</span>
                </div>
              </div>

              <h1 className="animate-fade-in-up animation-delay-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 md:mb-6 leading-[1.2] tracking-tight">
                Notre <span className="text-[#B60000] relative inline-block animate-shimmer font-bold">
                  mission
                  <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#B60000] to-transparent rounded-full animate-pulse-slow"></span>
                </span>
                <br />
                Accompagner les entrepreneurs à Caen et en Normandie
              </h1>

              <p className="animate-fade-in-up animation-delay-400 text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                Entreprise de conseil en affaires qui t'accompagne de A à Z pour structurer ton business à Caen et la France.
              </p>

              <p className="animate-fade-in-up animation-delay-500 text-base md:text-lg lg:text-xl text-white/90 mb-8 md:mb-10 leading-relaxed">
                Transforme tes idées en actions concrètes, mettre en place une stratégie solide et t'aider à réussir à chaque étape, de la création à la croissance de ton activité.
              </p>

              <div className="animate-fade-in-up animation-delay-500">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-4 bg-[#B60000] text-white font-bold rounded-lg hover:bg-[#950000] transition-all duration-300 text-sm md:text-lg group shadow-lg shadow-[#B60000]/50 hover:shadow-xl hover:shadow-[#B60000]/60 hover:scale-105 animate-scale-in"
                >
                  Envie d'un échange ?
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Image à droite avec animations */}
            <div className="relative animate-slide-in-right animation-delay-300 hero-image-container group w-4/5 mx-auto lg:mx-0">
              {/* Bloc rouge décoratif derrière l'image */}
              <div className="absolute -z-10 -top-8 -right-8 w-full h-full bg-[#B60000] rounded-3xl opacity-30 blur-xl animate-float group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#B60000]/40 cursor-pointer transform transition-all duration-700 group-hover:shadow-[#B60000]/60 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B60000]/30 via-transparent to-transparent z-10 group-hover:from-[#B60000]/60 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 group-hover:from-black/20 transition-all duration-700"></div>
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1000&fit=crop&q=80"
                  alt="Business United - Accompagnement entrepreneurs"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                  priority
                />
                {/* Overlay décoratif animé */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-[#B60000] rounded-lg blur-xl animate-pulse-slow opacity-60 group-hover:opacity-100 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#B60000] rounded-full blur-lg animate-float opacity-50 group-hover:opacity-90 group-hover:scale-150 transition-all duration-700"></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#B60000] rounded-full blur-md animate-float animation-delay-300 opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700"></div>
                
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Effet de glow au hover */}
                <div className="absolute inset-0 ring-4 ring-[#B60000]/0 group-hover:ring-[#B60000]/70 rounded-2xl transition-all duration-700 group-hover:ring-8"></div>
                
                {/* Particules animées au hover */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#B60000] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-500"></div>
                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-[#B60000] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float animation-delay-200 transition-opacity duration-500"></div>
              </div>
              
              {/* Éléments décoratifs flottants */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#B60000] rounded-lg rotate-12 animate-float hidden lg:block opacity-80 group-hover:scale-125 group-hover:rotate-45 transition-all duration-700"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#B60000] rounded-full animate-float hidden lg:block opacity-70 animation-delay-200 group-hover:scale-125 transition-all duration-700"></div>
              <div className="absolute top-1/4 -left-6 w-16 h-16 bg-[#B60000] rounded-xl rotate-45 animate-pulse-slow hidden lg:block opacity-60 animation-delay-400 group-hover:rotate-90 group-hover:scale-125 transition-all duration-700"></div>
            </div>
          </div>
        </div>

        {/* Bandeau défilant des entreprises - Intégré dans le hero */}
        <div className="relative mt-8 md:mt-10 pt-4 md:pt-6 border-t border-white/10 overflow-hidden">
          <div className="animate-scroll flex items-center gap-8 md:gap-12 lg:gap-16 whitespace-nowrap">
            {/* Première série */}
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">RK</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">O'Pure</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">Techno' Façade</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">Rocket School</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">moment</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">BB Gestion Conseil Patrimoine</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">RK</span>
            
            {/* Séparateur */}
            <div className="w-px h-6 bg-white/20 mx-4"></div>
            
            {/* Deuxième série (pour l'effet de boucle infinie) */}
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">RK</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">O'Pure</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">Techno' Façade</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">Rocket School</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">moment</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">BB Gestion Conseil Patrimoine</span>
            <span className="text-white/80 font-semibold text-sm md:text-base lg:text-lg hover:text-white transition-colors">RK</span>
          </div>
        </div>
      </section>

      {/* Section Statistiques - Preuve sociale */}
      <section className="relative py-8 md:py-10 bg-black border-y border-white/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Statistique 1 */}
            <ScrollReveal delay={0}>
              <div className="group relative flex flex-col items-center justify-center py-6 px-4 lg:py-8 lg:px-6 border border-white/5 rounded-xl hover:border-[#B60000]/40 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B60000] mb-1.5 leading-none">
                  +15
                </div>
                <div className="text-white/90 text-xs md:text-sm font-semibold text-center leading-tight">
                  Entrepreneurs lancés
                </div>
                <div className="text-white/50 text-[10px] md:text-xs mt-1 text-center">
                  en 12 mois seulement
                </div>
                {/* Ligne décorative au hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#B60000] group-hover:w-1/2 transition-all duration-300"></div>
              </div>
            </ScrollReveal>

            {/* Statistique 2 */}
            <ScrollReveal delay={100}>
              <div className="group relative flex flex-col items-center justify-center py-6 px-4 lg:py-8 lg:px-6 border border-white/5 rounded-xl hover:border-[#B60000]/40 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B60000] mb-1.5 leading-none">
                  100%
                </div>
                <div className="text-white/90 text-xs md:text-sm font-semibold text-center leading-tight">
                  Clients satisfaits
                </div>
                <div className="text-white/50 text-[10px] md:text-xs mt-1 text-center">
                  zéro déception
                </div>
                {/* Ligne décorative au hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#B60000] group-hover:w-1/2 transition-all duration-300"></div>
              </div>
            </ScrollReveal>

            {/* Statistique 3 */}
            <ScrollReveal delay={200}>
              <div className="group relative flex flex-col items-center justify-center py-6 px-4 lg:py-8 lg:px-6 border border-white/5 rounded-xl hover:border-[#B60000]/40 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B60000] mb-1.5 leading-none">
                  3 sem.
                </div>
                <div className="text-white/90 text-xs md:text-sm font-semibold text-center leading-tight">
                  Lancement express
                </div>
                <div className="text-white/50 text-[10px] md:text-xs mt-1 text-center">
                  de l'idée au business
                </div>
                {/* Ligne décorative au hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#B60000] group-hover:w-1/2 transition-all duration-300"></div>
              </div>
            </ScrollReveal>

            {/* Statistique 4 */}
            <ScrollReveal delay={300}>
              <div className="group relative flex flex-col items-center justify-center py-6 px-4 lg:py-8 lg:px-6 border border-white/5 rounded-xl hover:border-[#B60000]/40 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#B60000] mb-1.5 leading-none">
                  +50%
                </div>
                <div className="text-white/90 text-xs md:text-sm font-semibold text-center leading-tight">
                  CA en plus
                </div>
                <div className="text-white/50 text-[10px] md:text-xs mt-1 text-center">
                  résultats garantis
                </div>
                {/* Ligne décorative au hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#B60000] group-hover:w-1/2 transition-all duration-300"></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section Problème */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-[#B60000] via-[#950000] to-[#B60000] overflow-hidden">
        {/* Pattern géométrique sophistiqué */}
        <div className="absolute inset-0 red-background-pattern"></div>
        
        {/* Texture subtile animée */}
        <div className="absolute inset-0 red-texture-overlay"></div>
        
        {/* Grille subtile */}
        <div className="absolute inset-0 red-grid-overlay animate-grid-pulse"></div>
        
        {/* Effet de lumière animée */}
        <div className="absolute inset-0 red-light-sweep"></div>
        
        {/* Points décoratifs */}
        <div className="absolute inset-0 red-dot-pattern"></div>
        
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Blocs décoratifs raffinés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-2xl blur-2xl opacity-30 rotate-45 animate-subtle-glow"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-xl opacity-25 animate-subtle-glow animation-delay-200"></div>
          {/* Lignes décoratives subtiles */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contenu texte */}
            <ScrollReveal>
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6">
                  Tu veux te lancer, structurer ton business ou passer à l'étape supérieure ?
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-6 md:mb-8">
                  Un entrepreneur ne doit pas avancer seul.
                </p>
                <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8">
                  Trop souvent, les porteurs de projets abandonnent faute de clarté, de stratégie ou d'accompagnement adapté.
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-white font-bold mb-6 md:mb-8 drop-shadow-lg">
                  Business United est né pour combler ce vide.
                </p>
                <a 
                  href="#services"
                  className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#B60000] transition-all duration-300 text-sm md:text-lg group shadow-lg"
                >
                  En savoir plus
                  <ArrowRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </ScrollReveal>
            
            {/* Image */}
            <ScrollReveal delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
                  alt="Entrepreneurs en réunion de travail"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(182,0,0,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(182,0,0,0.05)_50%,transparent_70%)] animate-slow-rotate"></div>
        
        {/* Blocs rouges décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-[#B60000] rounded-xl opacity-30 rotate-12 blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-36 h-36 bg-[#B60000] rounded-2xl opacity-25 -rotate-12 blur-xl animate-float"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#B60000] rounded-full opacity-20 blur-2xl"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#B60000]/20 rounded-full mb-6 md:mb-8 backdrop-blur-sm border border-[#B60000]/30 animate-scale-in">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-[#B60000]" />
                <span className="text-[#B60000] text-sm md:text-base font-bold">NOS SERVICES</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Accompagnement <span className="text-[#B60000] relative inline-block">
                  complet
                  <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#B60000] to-transparent rounded-full animate-pulse-slow"></span>
                </span>
              </h2>
              <p className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
                Des services personnalisés pour transformer ton idée en business rentable. Du conseil stratégique à la croissance, on t'accompagne à chaque étape.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Service 1 - Conseil & stratégie */}
            <ScrollReveal delay={0}>
              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 hover:border-[#B60000]/60 hover:bg-white/8 transition-all duration-300 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B60000]/15 rounded-xl flex items-center justify-center border border-[#B60000]/20 group-hover:bg-[#B60000]/25 group-hover:border-[#B60000]/40 transition-all duration-300">
                    <Briefcase className="w-7 h-7 md:w-8 md:h-8 text-[#B60000]" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Conseil & stratégie</h3>
                <p className="text-white/75 text-sm mb-6 text-center leading-relaxed">
                  Structurer ton projet avec une vision claire et des bases solides.
                </p>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Audit d'activité</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Création des statuts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Business plan</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Administratif</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Étude de marché</span>
                  </li>
                </ul>
                <a 
                  href="#contact"
                  className="block w-full text-center px-4 py-2.5 bg-[#B60000] text-white font-medium rounded-lg hover:bg-[#950000] transition-all duration-300 text-sm"
                >
                  Je veux créer mon business
                </a>
              </div>
            </ScrollReveal>

            {/* Service 2 - Création de site & tunnels */}
            <ScrollReveal delay={100}>
              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 hover:border-[#B60000]/60 hover:bg-white/8 transition-all duration-300 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B60000]/15 rounded-xl flex items-center justify-center border border-[#B60000]/20 group-hover:bg-[#B60000]/25 group-hover:border-[#B60000]/40 transition-all duration-300">
                    <Globe className="w-7 h-7 md:w-8 md:h-8 text-[#B60000]" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Création de site & tunnels</h3>
                <p className="text-white/75 text-sm mb-6 text-center leading-relaxed">
                  On conçoit tes outils pour attirer et convertir tes prospects
                </p>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Site vitrine</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Landing page</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Tunnel automatisé</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">SEO</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Boutique en ligne</span>
                  </li>
                </ul>
                <a 
                  href="#contact"
                  className="block w-full text-center px-4 py-2.5 bg-[#B60000] text-white font-medium rounded-lg hover:bg-[#950000] transition-all duration-300 text-sm"
                >
                  J'ai besoin d'un site
                </a>
              </div>
            </ScrollReveal>

            {/* Service 3 - Marketing & publicité */}
            <ScrollReveal delay={200}>
              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 hover:border-[#B60000]/60 hover:bg-white/8 transition-all duration-300 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B60000]/15 rounded-xl flex items-center justify-center border border-[#B60000]/20 group-hover:bg-[#B60000]/25 group-hover:border-[#B60000]/40 transition-all duration-300">
                    <Megaphone className="w-7 h-7 md:w-8 md:h-8 text-[#B60000]" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Marketing & publicité</h3>
                <p className="text-white/75 text-sm mb-6 text-center leading-relaxed">
                  Augmenter ta visibilité et attirer les bons clients
                </p>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Stratégie marketing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Création de contenus</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Visuels</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Pub Meta</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Gestion de campagne</span>
                  </li>
                </ul>
                <a 
                  href="#contact"
                  className="block w-full text-center px-4 py-2.5 bg-[#B60000] text-white font-medium rounded-lg hover:bg-[#950000] transition-all duration-300 text-sm"
                >
                  J'ai besoin de visibilité
                </a>
              </div>
            </ScrollReveal>

            {/* Service 4 - Développement commercial */}
            <ScrollReveal delay={300}>
              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 hover:border-[#B60000]/60 hover:bg-white/8 transition-all duration-300 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#B60000]/15 rounded-xl flex items-center justify-center border border-[#B60000]/20 group-hover:bg-[#B60000]/25 group-hover:border-[#B60000]/40 transition-all duration-300">
                    <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-[#B60000]" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 text-center">Développement commercial</h3>
                <p className="text-white/75 text-sm mb-6 text-center leading-relaxed">
                  Trouver plus de clients, vendre plus et booster le chiffre d'affaires.
                </p>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Création d'offre</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Création de base de données</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Script de vente</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Automatisation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-[#B60000] rounded-full flex-shrink-0"></div>
                    <span className="text-white/85 text-sm">Social selling</span>
                  </li>
                </ul>
                <a 
                  href="#contact"
                  className="block w-full text-center px-4 py-2.5 bg-[#B60000] text-white font-medium rounded-lg hover:bg-[#950000] transition-all duration-300 text-sm"
                >
                  J'ai besoin de vendre
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section Process de lancement - Design Expert UX/UI */}
      <section className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-br from-[#B60000] via-[#950000] to-[#B60000] overflow-hidden">
        {/* Overlay avec gradient radial subtil */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)'
        }}></div>
        
        {/* Pattern de grille professionnel avec animation subtile */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0'
          }}></div>
        </div>

        {/* Effet de lumière ambiante */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl opacity-25"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section avec animations raffinées */}
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20 lg:mb-24">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 bg-white/[0.09] backdrop-blur-lg rounded-full mb-8 md:mb-10 border border-white/18 shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/[0.12] hover:border-white/25 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                <Rocket className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-500 group-hover:scale-110" />
                <span className="text-white text-xs md:text-sm font-medium tracking-[0.1em] uppercase">Process Complet</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-[1.08] tracking-[-0.02em]">
                Je travaille sur tout le{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">process de lancement</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full"></span>
                  <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white/40"></span>
                </span>
              </h2>
              <p className="text-white/92 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-[1.7] font-light tracking-[-0.01em]">
                Un accompagnement complet de A à Z pour transformer ton idée en business rentable
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline Professionnelle avec effets avancés */}
          <div className="relative max-w-7xl mx-auto pt-8">
            {/* Ligne de connexion animée - Desktop uniquement */}
            <div className="hidden lg:block absolute top-[96px] left-0 right-0 h-[1.5px] z-0">
              {/* Ligne principale avec gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              {/* Ligne centrale avec glow */}
              <div className="absolute left-[8%] right-[8%] top-0 h-full bg-white/25 shadow-[0_0_8px_rgba(255,255,255,0.3)]"></div>
              {/* Animation de brillance */}
              <div className="absolute left-[8%] right-[8%] top-0 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{
                animation: 'shimmer-line 3s ease-in-out infinite'
              }}></div>
            </div>

            {/* Grille parfaitement alignée avec stagger animation */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5">
              
              {/* Étape 1 - Création de site web */}
              <ScrollReveal delay={0}>
                <div className="group relative">
                  {/* Point de connexion avec glow animé - Desktop */}
                  <div className="hidden lg:block absolute -top-[40px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 border-2 border-[#B60000] shadow-[0_0_0_4px_rgba(182,0,0,0.15),0_0_12px_rgba(255,255,255,0.2)] group-hover:scale-[1.3] group-hover:bg-[#B60000] group-hover:shadow-[0_0_0_6px_rgba(182,0,0,0.25),0_0_20px_rgba(182,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                  
                  {/* Carte avec effets de profondeur */}
                  <div className="relative bg-white/[0.085] backdrop-blur-xl border border-white/18 rounded-2xl p-8 md:p-10 hover:bg-white/[0.13] hover:border-white/28 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-full flex flex-col items-center text-center group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
                    {/* Overlay de lumière au hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icône avec effets sophistiqués */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/[0.13] rounded-2xl flex items-center justify-center border border-white/22 mb-6 group-hover:bg-white/[0.2] group-hover:border-white/35 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Globe className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Titre avec tracking ajusté */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-[1.2] tracking-[-0.01em] relative z-10 group-hover:text-white transition-colors duration-300">
                      Création de site web
                    </h3>
                    {/* Description avec line-height optimisé */}
                    <p className="text-white/88 text-sm md:text-base leading-[1.6] max-w-[200px] relative z-10 group-hover:text-white/95 transition-colors duration-300">
                      Site vitrine, landing page, e-commerce
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Étape 2 - Création d'entreprise */}
              <ScrollReveal delay={200}>
                <div className="group relative">
                  <div className="hidden lg:block absolute -top-[40px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 border-2 border-[#B60000] shadow-[0_0_0_4px_rgba(182,0,0,0.15),0_0_12px_rgba(255,255,255,0.2)] group-hover:scale-[1.3] group-hover:bg-[#B60000] group-hover:shadow-[0_0_0_6px_rgba(182,0,0,0.25),0_0_20px_rgba(182,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                  
                  <div className="relative bg-white/[0.085] backdrop-blur-xl border border-white/18 rounded-2xl p-8 md:p-10 hover:bg-white/[0.13] hover:border-white/28 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-full flex flex-col items-center text-center group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/[0.13] rounded-2xl flex items-center justify-center border border-white/22 mb-6 group-hover:bg-white/[0.2] group-hover:border-white/35 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Building2 className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-[1.2] tracking-[-0.01em] relative z-10 group-hover:text-white transition-colors duration-300">
                      Création d'entreprise
                    </h3>
                    <p className="text-white/88 text-sm md:text-base leading-[1.6] max-w-[200px] relative z-10 group-hover:text-white/95 transition-colors duration-300">
                      Statuts, formalités, administratif
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Étape 3 - Publicité et marketing */}
              <ScrollReveal delay={400}>
                <div className="group relative">
                  <div className="hidden lg:block absolute -top-[40px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 border-2 border-[#B60000] shadow-[0_0_0_4px_rgba(182,0,0,0.15),0_0_12px_rgba(255,255,255,0.2)] group-hover:scale-[1.3] group-hover:bg-[#B60000] group-hover:shadow-[0_0_0_6px_rgba(182,0,0,0.25),0_0_20px_rgba(182,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                  
                  <div className="relative bg-white/[0.085] backdrop-blur-xl border border-white/18 rounded-2xl p-8 md:p-10 hover:bg-white/[0.13] hover:border-white/28 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-full flex flex-col items-center text-center group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/[0.13] rounded-2xl flex items-center justify-center border border-white/22 mb-6 group-hover:bg-white/[0.2] group-hover:border-white/35 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Megaphone className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-[1.2] tracking-[-0.01em] relative z-10 group-hover:text-white transition-colors duration-300">
                      Publicité & Marketing
                    </h3>
                    <p className="text-white/88 text-sm md:text-base leading-[1.6] max-w-[200px] relative z-10 group-hover:text-white/95 transition-colors duration-300">
                      Campagnes, contenus, visibilité
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Étape 4 - Accompagnement administratif */}
              <ScrollReveal delay={600}>
                <div className="group relative">
                  <div className="hidden lg:block absolute -top-[40px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 border-2 border-[#B60000] shadow-[0_0_0_4px_rgba(182,0,0,0.15),0_0_12px_rgba(255,255,255,0.2)] group-hover:scale-[1.3] group-hover:bg-[#B60000] group-hover:shadow-[0_0_0_6px_rgba(182,0,0,0.25),0_0_20px_rgba(182,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                  
                  <div className="relative bg-white/[0.085] backdrop-blur-xl border border-white/18 rounded-2xl p-8 md:p-10 hover:bg-white/[0.13] hover:border-white/28 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-full flex flex-col items-center text-center group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/[0.13] rounded-2xl flex items-center justify-center border border-white/22 mb-6 group-hover:bg-white/[0.2] group-hover:border-white/35 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <FileText className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-[1.2] tracking-[-0.01em] relative z-10 group-hover:text-white transition-colors duration-300">
                      Accompagnement administratif
                    </h3>
                    <p className="text-white/88 text-sm md:text-base leading-[1.6] max-w-[200px] relative z-10 group-hover:text-white/95 transition-colors duration-300">
                      Paperasse, démarches, conseils
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Étape 5 - Développement commercial */}
              <ScrollReveal delay={800}>
                <div className="group relative">
                  <div className="hidden lg:block absolute -top-[40px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 border-2 border-[#B60000] shadow-[0_0_0_4px_rgba(182,0,0,0.15),0_0_12px_rgba(255,255,255,0.2)] group-hover:scale-[1.3] group-hover:bg-[#B60000] group-hover:shadow-[0_0_0_6px_rgba(182,0,0,0.25),0_0_20px_rgba(182,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"></div>
                  
                  <div className="relative bg-white/[0.085] backdrop-blur-xl border border-white/18 rounded-2xl p-8 md:p-10 hover:bg-white/[0.13] hover:border-white/28 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-full flex flex-col items-center text-center group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/[0.13] rounded-2xl flex items-center justify-center border border-white/22 mb-6 group-hover:bg-white/[0.2] group-hover:border-white/35 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-[1.2] tracking-[-0.01em] relative z-10 group-hover:text-white transition-colors duration-300">
                      Développement commercial
                    </h3>
                    <p className="text-white/88 text-sm md:text-base leading-[1.6] max-w-[200px] relative z-10 group-hover:text-white/95 transition-colors duration-300">
                      Ventes, prospection, croissance
                    </p>
                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* Section Citation */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-[#B60000] via-[#950000] to-[#B60000] overflow-hidden">
        {/* Pattern géométrique sophistiqué */}
        <div className="absolute inset-0 red-background-pattern"></div>
        
        {/* Texture subtile animée */}
        <div className="absolute inset-0 red-texture-overlay"></div>
        
        {/* Grille subtile */}
        <div className="absolute inset-0 red-grid-overlay animate-grid-pulse"></div>
        
        {/* Effet de lumière animée */}
        <div className="absolute inset-0 red-light-sweep"></div>
        
        {/* Points décoratifs */}
        <div className="absolute inset-0 red-dot-pattern"></div>
        
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] animate-pulse-slow"></div>
        
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Bloc décoratif central raffiné */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-30 animate-subtle-glow"></div>
          {/* Cercles concentriques subtils */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/3 rounded-full"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <ScrollReveal delay={100}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group order-2 lg:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B60000]/40 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
                  alt="Stratégie et réussite entrepreneuriale"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
            
            {/* Contenu texte */}
            <ScrollReveal delay={200}>
              <div className="text-center lg:text-left order-1 lg:order-2">
                <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 mb-4 md:mb-6 font-light italic">
                  Entreprendre, c'est un pari.
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 md:mb-6 drop-shadow-lg">
                  Réussir, c'est une stratégie.
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-4 md:mb-6">
                  Chez Business United, on ne promet pas des miracles.
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-white font-semibold">
                  On s'implique à fond pour obtenir des résultats concrets.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="approche" className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(182,0,0,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(182,0,0,0.1),transparent_50%)]"></div>
        
        {/* Blocs rouges décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-48 h-48 bg-[#B60000] rounded-2xl opacity-20 blur-xl rotate-45 animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-[#B60000] rounded-xl opacity-15 -rotate-12 blur-xl animate-float"></div>
        </div>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                Notre approche
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="space-y-8 md:space-y-10">
              <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight">
                On ne promet pas de raccourcis.<br />
                <span className="text-[#B60000]">On crée des résultats.</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                  <p className="text-white text-lg md:text-xl font-semibold">Un cadre testé sur le terrain</p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                  <p className="text-white text-lg md:text-xl font-semibold">Des outils simples et efficaces</p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                  <p className="text-white text-lg md:text-xl font-semibold">Des résultats concrets et mesurables</p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                  <p className="text-white text-lg md:text-xl font-semibold">Présent quand tu en as besoin</p>
                </div>
              </div>

              <p className="text-white text-xl md:text-2xl font-bold text-center mt-12 pt-8 border-t border-white/20">
                Ton succès, <span className="text-[#B60000]">c'est aussi le nôtre.</span>
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-12 md:space-y-16 mt-12 md:mt-16">


            {/* Pourquoi Business United */}
            <ScrollReveal delay={300}>
              <div className="relative">
                {/* Effet de fond rouge animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B60000]/20 via-[#B60000]/30 to-[#B60000]/20 rounded-3xl blur-2xl animate-pulse-slow"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#B60000] rounded-full flex items-center justify-center shadow-lg shadow-[#B60000]/50 animate-scale-in">
                      <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                      Pourquoi <span className="text-[#B60000] relative inline-block">
                        "Business United"
                        <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#B60000] to-transparent rounded-full animate-pulse-slow"></span>
                      </span> ?
                    </h3>
                  </div>
                  <div className="space-y-5 md:space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed group-hover:text-[#B60000] transition-colors duration-300">
                        Parce que tu ne dois pas tout faire seul.
                      </p>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed group-hover:text-[#B60000] transition-colors duration-300">
                        Parce que ton temps est précieux.
                      </p>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#B60000] rounded-full mt-2 flex-shrink-0 shadow-lg shadow-[#B60000]/50 group-hover:scale-125 transition-transform duration-300"></div>
                      <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed group-hover:text-[#B60000] transition-colors duration-300">
                        Parce que ton idée mérite de devenir un vrai business rentable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Section Qui est derrière Business United */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#B60000] via-[#950000] to-[#B60000] overflow-hidden">
        {/* Pattern géométrique sophistiqué */}
        <div className="absolute inset-0 red-background-pattern"></div>
        <div className="absolute inset-0 red-texture-overlay"></div>
        <div className="absolute inset-0 red-grid-overlay animate-grid-pulse"></div>
        <div className="absolute inset-0 red-light-sweep"></div>
        <div className="absolute inset-0 red-dot-pattern"></div>
        
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Blocs décoratifs animés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-40 animate-float"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl opacity-30 animate-float animation-delay-200"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contenu texte */}
            <ScrollReveal delay={0}>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Qui est derrière <span className="text-white">Business United</span> ?
                  </h3>
                </div>
                
                <p className="text-white/95 text-base md:text-lg leading-relaxed">
                  Je m'appelle <span className="text-white font-bold">Mathieu</span>, fondateur de ce cabinet de conseil en affaires basé à <span className="text-white font-semibold">Caen</span>.
                </p>
                
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  Après avoir aidé plusieurs entrepreneurs à lancer leur activité, créer leur site, structurer leur offre ou mettre en place leurs pubs… j'ai décidé de rassembler toutes mes compétences et mon réseau pour créer un vrai cabinet de conseil en affaire et proposer un service clé-en-main pour les entrepreneurs de Caen et de toute la France.
                </p>
                
                <div className="space-y-3 md:space-y-4 pt-4 border-t border-white/20">
                  <h4 className="text-white text-lg md:text-xl font-bold mb-3">Mon parcours :</h4>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <p className="text-white/95 text-sm md:text-base">Entrepreneur autodidacte, passé par les galères</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <p className="text-white/95 text-sm md:text-base">Formé en <span className="text-white font-semibold">marketing</span>, <span className="text-white font-semibold">management</span>, <span className="text-white font-semibold">stratégie digitale</span> et <span className="text-white font-semibold">développement commercial</span></p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <p className="text-white text-base md:text-lg font-bold">
                      <span className="text-white text-xl md:text-2xl">+ 15</span> projets accompagnés sur les <span className="text-white">12 derniers mois</span>
                    </p>
                  </div>
                </div>
                
                <p className="text-white text-base md:text-lg font-medium leading-relaxed pt-2">
                  Aujourd'hui, je veux te faire <span className="text-white font-bold">gagner du temps</span>, en partageant ma connaissance et éviter les erreurs et te propulser vers tes objectifs.
                </p>
              </div>
            </ScrollReveal>
            
            {/* Image */}
            <ScrollReveal delay={100}>
              <div className="relative group">
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-white/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/retouch_2025063000415245-removebg-preview.png"
                    alt="Mathieu - Fondateur de Business United"
                    width={500}
                    height={650}
                    className="w-full h-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section id="temoignages" className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-br from-[#B60000] via-[#950000] to-[#B60000] overflow-hidden">
        {/* Pattern géométrique sophistiqué */}
        <div className="absolute inset-0 red-background-pattern"></div>
        
        {/* Texture subtile animée */}
        <div className="absolute inset-0 red-texture-overlay"></div>
        
        {/* Grille subtile */}
        <div className="absolute inset-0 red-grid-overlay animate-grid-pulse"></div>
        
        {/* Effet de lumière animée */}
        <div className="absolute inset-0 red-light-sweep"></div>
        
        {/* Points décoratifs */}
        <div className="absolute inset-0 red-dot-pattern"></div>
        
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_60%)] animate-pulse-slow"></div>
        
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Blocs décoratifs raffinés */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-44 h-44 bg-white/10 rounded-2xl opacity-30 blur-xl -rotate-12 animate-subtle-glow"></div>
          <div className="absolute bottom-20 right-10 w-36 h-36 bg-white/10 rounded-xl opacity-25 rotate-45 blur-xl animate-subtle-glow animation-delay-200"></div>
          {/* Lignes décoratives diagonales */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                Témoignages <span className="text-white">clients</span>
              </h2>
            </div>
          </ScrollReveal>

          <TestimonialsCarousel />
        </div>
      </section>

      {/* Section CTA Final */}
      <section id="contact" className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Effet de background animé */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(182,0,0,0.2),transparent_70%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(182,0,0,0.05)_90deg,transparent_180deg)] animate-slow-rotate"></div>
        
        {/* Blocs rouges décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B60000] rounded-full blur-3xl opacity-10"></div>
          <div className="absolute top-10 right-10 w-40 h-40 bg-[#B60000] rounded-xl opacity-20 rotate-12 blur-xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-36 h-36 bg-[#B60000] rounded-2xl opacity-15 -rotate-12 blur-xl animate-float"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6">
                Tu veux échanger sur ton projet ?
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8">
                Profite d'un RDV téléphonique offert pour poser tes questions et avoir des conseils personnalisés.
              </p>
            </div>
          </ScrollReveal>
          
          {/* Widget Calendly */}
          <ScrollReveal delay={200}>
            <div className="max-w-4xl mx-auto">
              <CalendlyWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 md:py-12 pb-12 md:pb-16 bg-black">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 md:gap-4">
            {/* Première ligne : Logo et réseaux sociaux */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="flex items-center gap-2 md:gap-3">
                <Image
                  src="/logob.png"
                  alt="Business United"
                  width={120}
                  height={40}
                  className="h-6 md:h-8 w-auto object-contain"
                />
              </div>

              {/* Réseaux sociaux */}
              <div className="flex items-center gap-3 md:gap-4">
                <a
                  href="https://www.linkedin.com/in/mathieubaele/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://www.instagram.com/mathieu_le_bizdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=33767379287&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </div>

            {/* Deuxième ligne : Description */}
            <p className="text-white/90 text-xs md:text-sm text-center">
              Accompagnement entrepreneurs Caen & Normandie
            </p>

            {/* Troisième ligne : Liens légaux */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <a href="#" className="text-white/70 hover:text-white/90 text-xs md:text-sm transition-colors duration-300">
                Mentions légales
              </a>
              <span className="text-white/30">•</span>
              <a href="#" className="text-white/70 hover:text-white/90 text-xs md:text-sm transition-colors duration-300">
                Conditions générales
              </a>
              <span className="text-white/30">•</span>
              <a href="#" className="text-white/70 hover:text-white/90 text-xs md:text-sm transition-colors duration-300">
                Politique de confidentialité
              </a>
            </div>

            {/* Quatrième ligne : Copyright */}
            <p className="text-white/70 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} Business United. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
