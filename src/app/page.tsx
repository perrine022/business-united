'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, ArrowRight, Check, Star, Play, Calendar, Users, Target, TrendingUp, Headphones, Award, Globe, Menu, X } from 'lucide-react';
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

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          
          const animate = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * target);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return (
    <div ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Charger le script Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer le script au démontage
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10" style={{ background: 'radial-gradient(circle, #003c92, #0a182e)' }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 relative rounded-full overflow-hidden">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-13-at-10.16.33-1765617731496.jpeg"
                  alt="Logo QH"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-bold text-sm md:text-2xl tracking-tight hidden xs:inline">Quentin Heude</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-white/90 hover:text-white transition-colors font-medium">Services</a>
              <a href="#resultats" className="text-white/90 hover:text-white transition-colors font-medium">Résultats</a>
              <a href="#about" className="text-white/90 hover:text-white transition-colors font-medium">À propos</a>
              <a href="#contact" className="text-white/90 hover:text-white transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <a 
                href="https://calendly.com/quentin-heude-30mn/meeting?month=2025-12" 
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-3 py-1.5 md:px-6 md:py-2.5 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#005582] transition-all duration-300 text-xs md:text-base"
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
          <div className="md:hidden border-t border-white/10 bg-[#0a182e] relative z-50">
            <nav className="px-4 py-4 space-y-2">
              <a 
                href="#services" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Services
              </a>
              <a 
                href="#resultats" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Résultats
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                À propos
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-white/90 hover:text-white transition-colors font-medium py-3 px-2 rounded-lg hover:bg-white/5"
              >
                Contact
              </a>
              <a 
                href="https://calendly.com/quentin-heude-30mn/meeting?month=2025-12" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 bg-[#0077B5] text-white font-semibold rounded-lg hover:bg-[#005582] transition-all duration-300 mt-3 text-sm"
              >
                PRENDRE RDV
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative pt-16 md:pt-24 pb-32 md:pb-48 overflow-hidden" style={{ background: 'radial-gradient(circle, #003c92, #0a182e)' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center py-8 md:py-16">
            <div className="pt-4 md:pt-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#2ECC71]/20 rounded-full mb-4 md:mb-6">
                <span className="px-2 py-0.5 bg-[#2ECC71] text-white text-xs font-bold rounded">FREELANCE</span>
                <span className="text-white text-xs md:text-sm">Cold Calling B2B</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Le Federer du <span className="text-[#2ECC71]">cold call</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed max-w-xl">
                Expert freelance du cold calling formé à <span className="text-[#2ECC71] font-medium">Y Combinator</span> et <span className="text-[#2ECC71] font-medium">Revolut</span>. Je contacte les décideurs clés (FR/ES), vous obtenez des rendez-vous qualifiés. <span className="text-[#2ECC71] font-semibold">Sans effort de votre part.</span>
              </p>

              <a 
                href="https://calendly.com/quentin-heude-30mn/meeting?month=2025-12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-4 bg-[#2ECC71] text-white font-bold rounded-lg hover:bg-[#27AE60] transition-all duration-300 text-sm md:text-lg group w-full sm:w-auto justify-center"
              >
                PRENDRE RDV
                <ArrowRight className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative lg:block mt-6 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-xs lg:max-w-none">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp_Image_2025-12-13_at_10.16.31-removebg-preview-1765621863385.png"
                  alt="Quentin Heude - Expert Cold Calling"
                  width={600}
                  height={500}
                  className="object-contain w-full h-[200px] md:h-[300px] lg:h-[450px]"
                />
              </div>
            </div>
          </div>

          {/* Bandeau défilant des sociétés - En bas du hero */}
          <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 py-4 md:py-8 overflow-hidden border-t border-white/10">
            <div className="flex animate-scroll gap-8 md:gap-12 lg:gap-16">
              {/* Première série */}
              {['Ontop', 'Y Combinator', 'Revolut', 'MyCo Phyto', 'Karyon Food', 'BFR', 'Bravi'].map((company, index) => (
                <div key={`first-${index}`} className="flex-shrink-0">
                  <p className="text-white font-bold text-sm md:text-lg lg:text-xl whitespace-nowrap opacity-80">{company}</p>
                </div>
              ))}
              {/* Duplication pour effet infini */}
              {['Ontop', 'Y Combinator', 'Revolut', 'MyCo Phyto', 'Karyon Food', 'BFR', 'Bravi'].map((company, index) => (
                <div key={`second-${index}`} className="flex-shrink-0">
                  <p className="text-white font-bold text-sm md:text-lg lg:text-xl whitespace-nowrap opacity-80">{company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                Les chiffres parlent
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <ScrollReveal delay={0}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#003c92] mb-1 md:mb-2">
                  <AnimatedCounter target={1300} />
                </div>
                <p className="text-gray-700 text-xs md:text-sm lg:text-base uppercase tracking-wide">
                  Appels en 10 jours
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#003c92] mb-1 md:mb-2">
                  <AnimatedCounter target={250} />
                </div>
                <p className="text-gray-700 text-xs md:text-sm lg:text-base uppercase tracking-wide">
                  Conversations
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#003c92] mb-1 md:mb-2">
                  <AnimatedCounter target={29} />
                </div>
                <p className="text-gray-700 text-xs md:text-sm lg:text-base uppercase tracking-wide">
                  RDV qualifiés
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#003c92] mb-1 md:mb-2">
                  2
                </div>
                <p className="text-gray-700 text-xs md:text-sm lg:text-base uppercase tracking-wide">
                  Langues (FR/ES)
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 md:py-20 lg:py-32" style={{ background: 'radial-gradient(circle, #003c92, #0a182e)' }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4">
                Mais dans la <span className="text-[#2ECC71]">réalité</span>…
              </h2>
              <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-4 md:mb-6">
                Vos équipes n'ont pas le temps, pas les ressources, et trop d'autres priorités.
              </p>
              <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                La prospection glisse. Le pipe stagne. Et le marché ne vous parle pas.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
            <ScrollReveal delay={0}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2ECC71]/20 rounded-full flex items-center justify-center border-2 border-[#2ECC71]/30 shadow-lg shadow-[#2ECC71]/10">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-[#2ECC71]" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Clients. Direct.</h3>
                <p className="text-white/80 text-xs md:text-sm text-center">
                  Je parle aux décideurs. Je remplis votre agenda.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2ECC71]/20 rounded-full flex items-center justify-center border-2 border-[#2ECC71]/30 shadow-lg shadow-[#2ECC71]/10">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-[#2ECC71]" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">CRM activé.</h3>
                <p className="text-white/80 text-xs md:text-sm text-center">
                  Fini les données mortes. Place aux opportunités chaudes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2ECC71]/20 rounded-full flex items-center justify-center border-2 border-[#2ECC71]/30 shadow-lg shadow-[#2ECC71]/10">
                    <Headphones className="w-6 h-6 md:w-8 md:h-8 text-[#2ECC71]" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Insights. Immédiats.</h3>
                <p className="text-white/80 text-xs md:text-sm text-center">
                  Leurs objections. Leurs besoins. Leurs budgets.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2ECC71]/20 rounded-full flex items-center justify-center border-2 border-[#2ECC71]/30 shadow-lg shadow-[#2ECC71]/10">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#2ECC71]" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">Market fit testé.</h3>
                <p className="text-white/80 text-xs md:text-sm text-center">
                  Je valide votre offre avec de vrais décideurs.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2ECC71]/20 rounded-full flex items-center justify-center border-2 border-[#2ECC71]/30 shadow-lg shadow-[#2ECC71]/10">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8 text-[#2ECC71]" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">RDV qui closent.</h3>
                <p className="text-white/80 text-xs md:text-sm text-center">
                  Pas de tire-flan. Que des prospects chauds.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="bg-[#2ECC71] rounded-xl p-4 md:p-6 relative overflow-hidden">
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 rounded-full text-white text-xs font-semibold">
                  BONUS
                </div>
                <div className="flex justify-center mb-3 md:mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg shadow-white/20">
                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 text-center">FR & ES natif.</h3>
                <p className="text-white/90 text-xs md:text-sm text-center">
                  Doublez votre terrain. Même excellence.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={600}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 md:mb-3">
                  C'est là que mon système intervient
                </h3>
              </div>
              
              <div className="space-y-3 md:space-y-4 lg:space-y-6 mb-6 md:mb-8 lg:mb-10">
                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#2ECC71] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                    <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-medium flex-1 leading-snug">Des appels transformés en tests marché</p>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#2ECC71] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                    <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-medium flex-1 leading-snug">Des conversations qui produisent des insights actionnables</p>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#2ECC71] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                    <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-medium flex-1 leading-snug">Des rendez-vous qui génèrent du business mesurable, pas du bruit</p>
                </div>
                
                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#2ECC71] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-0.5">
                    <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                  </div>
                  <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-medium flex-1 leading-snug">Une prospection structurée, répétable, qui ne dépend plus de votre agenda</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/20 via-[#2ECC71]/10 to-[#2ECC71]/20 blur-xl"></div>
                <div className="relative border-l-4 border-[#2ECC71] pl-4 md:pl-6 lg:pl-8 py-4 md:py-6 lg:py-8">
                  <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-relaxed">
                    Et surtout : en fonction de votre taux de closing → des nouveaux clients → donc du <span className="text-[#2ECC71] font-bold text-lg md:text-xl lg:text-2xl">CA en plus</span>, pas une dépense
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="resultats" className="py-12 md:py-16 lg:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                  Pourquoi ça <span className="text-[#2ECC71]">fonctionne</span> ?
                </h2>
                <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-5 md:mb-8">
                  Parce qu'après 100 000+ appels générés, j'ai compris que la croissance ne vient pas seulement du volume, mais de :
                </p>
                <div className="space-y-2 md:space-y-3 lg:space-y-4 mb-5 md:mb-8">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#2ECC71] flex-shrink-0 mt-0.5 md:mt-1" />
                    <p className="text-gray-900 text-sm md:text-base lg:text-lg">la qualité des échanges</p>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#2ECC71] flex-shrink-0 mt-0.5 md:mt-1" />
                    <p className="text-gray-900 text-sm md:text-base lg:text-lg">la stratégie</p>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#2ECC71] flex-shrink-0 mt-0.5 md:mt-1" />
                    <p className="text-gray-900 text-sm md:text-base lg:text-lg">la data que chaque appel fait remonter</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 lg:p-6">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-base mb-3 md:mb-4 leading-relaxed">
                    Tech (Ontop – YC USA), fintech (Revolut)… J'ai construit un système commercial qui s'adapte, s'apprend et s'améliore en continu.
                  </p>
                  <p className="text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed">
                    Un système fait pour aider les entreprises à aller là où elles veulent aller : exploration de marché, taux de closing, objections, concurrence, offre… et surtout, des opportunités qui comptent.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative mt-6 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-13-at-10.16.09-1765617659468.jpeg"
                    alt="Quentin Heude en action"
                    width={600}
                    height={500}
                    className="object-cover w-full h-[250px] md:h-[350px] lg:h-[500px]"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-10 md:py-16 lg:py-32 relative overflow-hidden bg-white">
        {/* Effets de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2ECC71]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Colonne gauche - Titre et éléments visuels */}
              <div className="lg:col-span-5">
                <div className="relative">
                  {/* Badge moderne */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#2ECC71]/10 rounded-full mb-4 md:mb-6 border border-[#2ECC71]/30">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#2ECC71] rounded-full animate-pulse"></div>
                    <span className="text-[#2ECC71] text-xs md:text-sm font-semibold uppercase tracking-wider">À propos</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8 leading-tight">
                    Qui <span className="text-[#2ECC71] relative">
                      suis-je
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#2ECC71]/30 rounded-full"></span>
                    </span> ?
                  </h2>

                  {/* Éléments décoratifs */}
                  <div className="hidden md:flex items-center gap-4 mt-6 md:mt-8">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#27AE60] border-2 border-gray-200"></div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-200"></div>
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-gray-200"></div>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#2ECC71]/50 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Contenu */}
              <div className="lg:col-span-7 mt-6 lg:mt-0">
                <div className="relative">
                  {/* Carte moderne avec effet glassmorphism */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 xl:p-10 shadow-xl relative overflow-hidden">
                    {/* Effet de brillance */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2ECC71]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    {/* Contenu */}
                    <div className="relative z-10">
                      <div className="space-y-3 md:space-y-4 lg:space-y-6">
                        <p className="text-gray-900 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed font-light">
                          Je suis <span className="font-semibold text-gray-900">Quentin Heude</span>, spécialiste freelance de la prospection téléphonique, formé chez <span className="text-[#2ECC71] font-medium">Y Combinator</span> et <span className="text-[#2ECC71] font-medium">Revolut</span>.
                        </p>
                        
                        <p className="text-gray-700 text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed">
                          J'identifie, contacte et engage les décideurs clés pour obtenir des rendez-vous pré-qualifiés et de qualité, y compris sur les marchés hispaniques grâce à mon bilinguisme.
                        </p>

                        {/* Stats en highlight */}
                        <div className="bg-[#2ECC71]/10 border border-[#2ECC71]/20 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 mt-4 md:mt-6 lg:mt-8">
                          <p className="text-gray-600 text-xs uppercase tracking-wider mb-2 md:mb-3">Résultats prouvés</p>
                          <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4">
                            <div>
                              <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2ECC71]">1 300</div>
                              <div className="text-gray-600 text-xs mt-0.5 md:mt-1">appels</div>
                            </div>
                            <div>
                              <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2ECC71]">250</div>
                              <div className="text-gray-600 text-xs mt-0.5 md:mt-1">conversations</div>
                            </div>
                            <div>
                              <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2ECC71]">29</div>
                              <div className="text-gray-600 text-xs mt-0.5 md:mt-1">RDV qualifiés</div>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed pt-2 md:pt-3 lg:pt-4">
                          Laissez-moi vous aider à optimiser votre acquisition clients, <span className="text-[#2ECC71] font-medium">sans effort</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-32" style={{ background: 'radial-gradient(circle, #003c92, #0a182e)' }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-10 lg:mb-16">
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-white mb-2 md:mb-3 lg:mb-4">
                Ce qu'ils <span className="text-[#2ECC71]">disent de moi</span>
              </h2>
              <p className="text-white/90 text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto">
                Témoignages de clients et partenaires
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
            <ScrollReveal delay={0}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 xl:p-8 hover:bg-white/20 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#2ECC71]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#2ECC71] font-bold text-sm md:text-base lg:text-lg">R</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">Roberto De Gouveia De Sa</h3>
                    <p className="text-white/80 text-xs md:text-sm">Client - OnTop</p>
                  </div>
                </div>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed flex-grow">
                  "J'ai eu le plaisir de travailler avec Quentin. Dynamique et professionnel, il est capable de s'intégrer rapidement au sein d'une équipe et apporteur de la valeur. Il a professionnalisé nos équipes commerciales, tout cela avec beaucoup de bienveillance et générosité. Merci pour le travail accompli."
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 xl:p-8 hover:bg-white/20 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#2ECC71]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#2ECC71] font-bold text-sm md:text-base lg:text-lg">M</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">Maria Eva Mrini</h3>
                    <p className="text-white/80 text-xs md:text-sm">Head of Sales - Le New Black</p>
                  </div>
                </div>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed flex-grow">
                  "Nous avons eu l'opportunité de travailler ensemble dans le cadre d'une mission de prospection pour mon équipe commerciale chez Le New Black. Quentin a été très efficace, très rapide à apprendre les concepts et les mots clés de nos métiers, il était en mesure de passer un nombre d'appels par jour impressionnant. Grâce à Quentin nous avons pu obtenir des informations pertinentes sur nos prospects et le marché de manière générale, en plus d'avoir de nouveaux rendez-vous pour l'équipe."
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 xl:p-8 hover:bg-white/20 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#2ECC71]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#2ECC71] font-bold text-sm md:text-base lg:text-lg">D</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">David Osipov</h3>
                    <p className="text-white/80 text-xs md:text-sm">AI-Driven B2B Product Manager</p>
                  </div>
                </div>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed flex-grow">
                  "I highly recommend Quentin Heude for a business developer manager role because of his excellent soft skills, attitude, and experience. Despite our financial department not being interested in the services, I recommended Quentin to several C-suite managers because of his exceptional soft skills, attitude, and presentation skills. Quentin's cheerful and friendly attitude, combined with his excellent communication skills, made it easy to maintain our connection even after the business deal fell through."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <ScrollReveal>
              <div className="relative flex justify-center">
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 p-3 md:p-4 lg:p-6 xl:p-8 shadow-2xl border border-gray-200">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-13-at-10.16.09-1-1765617659466.jpeg"
                    alt="Quentin Heude - Professionnel"
                    width={800}
                    height={1200}
                    className="object-contain w-full h-auto max-h-[400px] md:max-h-[600px] lg:max-h-[800px] xl:max-h-[1200px]"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-6">
                  Prêt à transformer votre <span className="text-[#2ECC71]">prospection téléphonique</span> en machine à générer des rendez-vous qualifiés ?
                </h2>
                <a 
                  href="https://calendly.com/quentin-heude-30mn/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-[#2ECC71] text-white font-bold rounded-lg hover:bg-[#27AE60] transition-all duration-300 text-sm md:text-base lg:text-lg group w-full sm:w-auto justify-center"
                >
                  PRENDRE RDV
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="contact" className="py-10 md:py-16 lg:py-32" style={{ background: 'radial-gradient(circle, #003c92, #0a182e)' }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-6 md:mb-8 lg:mb-12">
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
                  On discute de vos <span className="text-[#2ECC71]">objectifs</span> ?
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div 
                ref={calendlyRef}
                className="calendly-inline-widget" 
                data-url="https://calendly.com/quentin-heude-30mn/meeting"
                style={{ minWidth: '320px', height: '1000px', width: '100%' }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 md:py-12 pb-12 md:pb-16" style={{ background: 'radial-gradient(circle, #003c92, #0a182e)' }}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 relative rounded-full overflow-hidden">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp-Image-2025-12-13-at-10.16.33-1765617731496.jpeg"
                  alt="Logo QH"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white font-bold text-base md:text-xl">Quentin Heude</span>
            </div>

            <p className="text-white/90 text-xs md:text-sm text-center">
              Freelance Cold Calling B2B
            </p>

            <p className="text-white/70 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} Quentin Heude. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}