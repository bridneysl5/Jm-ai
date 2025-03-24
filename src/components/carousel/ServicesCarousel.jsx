import React, { useState, useEffect, useRef } from 'react';

const ServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);
  
  // Enhanced slide data with custom URLs for each service
  const slides = [
    {
      id: 1,
      title: 'GESTIÓN POR PROCESOS',
      description: 'Basándonos en la Norma Técnica N° 002 -2025-PCM-SGP, en JM AI Consulting le ofrecemos una consultoría especializada para implementar una gestión por procesos efectiva que transforme su organización.',
      image: '/images/services/Gestión-por-procesos.png',
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z', // Lightning bolt icon
      color: '#00ffff',
      particles: 150,
      url: '/servicios/gestion-por-procesos' // URL personalizada
    },
    {
      id: 2,
      title: 'GESTIÓN DEL CONOCIMIENTO',
      description: 'Implementamos la Gestión del Conocimiento para mejorar eficiencia operativa y decisiones estratégicas, aplicando la Norma Técnica N° 001-2025-PCM/SGP y estándares internacionales.',
      image: '/images/services/Gestión-del-conocimiento.png',
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', // Book icon
      color: '#ffa200',
      particles: 140,
      url: '/servicios/conocimiento/' // URL personalizada
    },
    {
      id: 3,
      title: 'SISTEMAS DE GESTIÓN ISO',
      description: 'Somos expertos en la implementación, mejora y mantenimiento de sistemas de gestión bajo las normas más reconocidas a nivel mundial. Nuestro enfoque se adapta a las necesidades particulares de cada organización, garantizando soluciones personalizadas y efectivas.',
      image: '/images/services/Sistemas-de-Gestión.png',
      gradient: 'from-teal-400 via-cyan-500 to-blue-600',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', // Cube icon
      color: '#00ffe0',
      particles: 180,
      url: '/servicios/sistemas-gestion' // URL personalizada
    },
    {
      id: 4,
      title: 'TRANSFORMACIÓN DIGITAL',
      description: 'Ofrecemos el servicio de consultoría integral en transformación digital, diseñado para guiar a tu organización, ya sea privada o pública, a maximizar las oportunidades del mundo digital',
      image: '/images/services/Transformación-digital.png',
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', // Computer icon
      color: '#00ffff',
      particles: 150,
      url: '/servicios/transformacion-digital' // URL personalizada
    },
    {
      id: 5,
      title: 'GESTIÓN DE RIESGOS',
      description: '"Ofrecemos servicios especializados en gestión de riesgos para ayudar a las organizaciones a identificar, evaluar, gestionar y aprovechar tanto los riesgos como las oportunidades',
      image: '/images/services/Gestión-de-riesgos.png',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', // Warning icon
      color: '#00ff9d',
      particles: 120,
      url: '/servicios/gestion-riesgos' // URL personalizada
    },
    {
      id: 6,
      title: 'GESTIÓN DE PROYECTOS',
      description: 'Ofrecemos servicios especializados de consultoría en gestión de proyectos para asegurar que tus iniciativas se ejecuten de manera eficiente, cumpliendo con los plazos, presupuestos y objetivos establecidos.',
      image: '/images/services/Gestión-de-poryectos.png',
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', // Clipboard icon
      color: '#8080ff',
      particles: 160,
      url: '/servicios/gestion-de-proyectos/' // URL personalizada
    },
    {
      id: 7,
      title: 'DATA ANALYTICS',
      description: 'Ofrecemos servicios especializados de consultoría en Data Analytics para ayudar a las organizaciones a aprovechar el poder de los datos y convertirlos en conocimientos valiosos que impulsen el crecimiento y mejoren la eficiencia operativa.',
      image: '/images/services/Data-Analytics.png',
      gradient: 'from-purple-400 via-pink-500 to-red-600',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', // Chart icon
      color: '#ff00ff',
      particles: 200,
      url: '/servicios/data-analytics' // URL personalizada
    },
    {
      id: 8,
      title: 'BPM',
      description: 'Nos especializamos en guiar a las organizaciones a través de todo el ciclo de vida de BPM con la finalidad de impulsar los resultados comerciales, crear valor y permitir que las organizaciones cumplan sus objetivos de negocios con mayor agilidad.',
      image: '/images/services/BPM.png',
      gradient: 'from-blue-500 via-indigo-600 to-violet-700',
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', // Workflow icon
      color: '#4d7aff',
      particles: 170,
      url: '/servicios/bpm' // URL personalizada
    }
  ];
  
  // Next slide logic
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Previous slide logic
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    if (!isHovering) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 8000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentSlide, isHovering]);

  // Track mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!carouselRef.current) return;
      
      const rect = carouselRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    
    const carousel = carouselRef.current;
    
    if (carousel) {
      carousel.addEventListener('mousemove', handleMouseMove);
      carousel.addEventListener('mouseenter', () => setIsHovering(true));
      carousel.addEventListener('mouseleave', () => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      });
    }
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('mousemove', handleMouseMove);
        carousel.removeEventListener('mouseenter', () => setIsHovering(true));
        carousel.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);

  // Create animated background using CSS and HTML
  const createAnimatedParticles = () => {
    return Array.from({ length: 50 }).map((_, i) => (
      <div 
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-white animate-float"
        style={{ 
          top: `${Math.random() * 100}%`, 
          left: `${Math.random() * 100}%`,
          opacity: 0.2 + Math.random() * 0.4,
          boxShadow: `0 0 ${Math.random() * 10 + 5}px ${slides[currentSlide].color}`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 5}s`
        }}
      ></div>
    ));
  };
  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden h-screen bg-black"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: `radial-gradient(circle at center, ${slides[currentSlide].color}20 0%, transparent 70%)`,
          }}
        ></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'url("/images/grid.svg")',
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        ></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {createAnimatedParticles()}
        </div>
      </div>
      
      {/* Digital grid overlay */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
        
        {/* Horizontal scanning lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
              style={{
                top: `${20 + i * 15}%`,
                animation: `scanline 5s linear infinite ${i * 0.5}s`,
                transform: 'translateX(-100%)'
              }}
            ></div>
          ))}
        </div>
        
        {/* Radial gradient pulse */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-40 z-10"
          style={{ mixBlendMode: 'multiply' }}
        ></div>
      </div>

      {/* Main Content Layer */}
      <div className="relative h-full z-20">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
              index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'
            }`}
            style={{
              transform: `translateX(${index === currentSlide ? '0%' : index < currentSlide ? '-100%' : '100%'})`,
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), scale 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="h-full flex items-center justify-center px-4">
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                
                {/* Text Content - Clean modern design without glitch effect */}
                <div className="md:w-1/2 z-10 text-left space-y-8">
                  {/* Service icon with animated aura */}
                  <div className="mb-6 relative">
                    <div 
                      className="inline-flex items-center justify-center p-4 rounded-full shadow-lg relative z-10 service-icon"
                      style={{ 
                        background: `linear-gradient(135deg, ${slide.color}, rgba(0,0,0,0.8))`,
                        boxShadow: `0 0 30px ${slide.color}50, 0 0 15px ${slide.color}30`
                      }}
                    >
                      <svg 
                        className="w-10 h-10 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={slide.icon} />
                      </svg>
                    </div>
                    
                    {/* Animated outer rings */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-white opacity-20 animate-ping-slow"></div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-white opacity-10 animate-ping-slower"></div>
                    </div>
                  </div>
                  
               {/* Clean Modern Title - without glitch effect */}
<div className="overflow-hidden relative">
  <div className="flex items-center mb-1">
    {/* Decorative binary prefix - visible only in desktop */}
    <div className="text-xs font-mono mr-2 opacity-70 tracking-wider hidden md:block" style={{ color: slide.color }}>
      01<span className="animate-blink">_</span>
    </div>
    
    <h2 
      className="text-4xl md:text-6xl font-black tracking-tight text-white relative z-10"
      style={{ 
        fontSize: slide.title.length > 15 ? 'clamp(1.75rem, 5vw, 3.75rem)' : '', 
        lineHeight: slide.title.length > 15 ? '1.1' : '' 
      }}
    >
      {slide.title}
      <span className="absolute -inset-1 blur-sm opacity-20" style={{ color: slide.color }}>{slide.title}</span>
    </h2>
  </div>
  
  {/* Underline with animated travel effect */}
  <div className="h-0.5 w-full bg-gray-700 relative overflow-hidden mt-2">
    <div 
      className="absolute h-full w-16 animate-travel" 
      style={{ 
        background: `linear-gradient(to right, transparent, ${slide.color}, transparent)`,
        animation: 'travel 3s ease-in-out infinite'
      }}
    ></div>
  </div>
</div>
                  
                  {/* Futuristic Description with smooth fade-in instead of typing effect */}
                  <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', animationDuration: '1s' }}>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                  
                  {/* Holographic Call-to-action Button - UPDATED to use custom URL */}
                  <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.6s', animationDuration: '1s' }}>
                    
                    {/* Using the custom URL property */}
                    <a
                      href={slide.url}
                      className="holo-button group relative overflow-hidden inline-flex items-center gap-3"
                    >
                      <div 
                        className="absolute inset-0 rounded-lg opacity-40"
                        style={{ 
                          background: `linear-gradient(45deg, transparent, ${slide.color}40, transparent)`,
                          backgroundSize: '200% 200%',
                          animation: 'gradient-shift 3s ease infinite'
                        }}
                      ></div>
                      
                      <div className="relative z-10 flex items-center justify-between w-full px-8 py-4">
                        <span className="font-medium tracking-wider text-lg">EXPLORAR SOLUCIÓN</span>
                        
                        <span className="relative overflow-hidden w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-10">
                          <svg 
                            className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                          
                          {/* Energy trail effect */}
                          <div 
                            className="absolute w-full h-0.5 bg-white opacity-50 bottom-4 -left-full group-hover:animate-trail"
                            style={{ background: `linear-gradient(to right, transparent, ${slide.color})` }}
                          ></div>
                        </span>
                      </div>
                      
                      {/* Border glow effect */}
                      <div 
                        className="absolute inset-0 rounded-lg border opacity-70"
                        style={{ borderColor: slide.color }}
                      ></div>
                      
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: slide.color }}></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: slide.color }}></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: slide.color }}></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: slide.color }}></div>
                    </a>
                  </div>
                </div>
                
                {/* Visualization Area - Enhanced with holographic effect */}
                <div className="md:w-1/2 flex items-center justify-center">
                  <div className="holographic-container relative w-full max-w-lg aspect-square">
                    {/* Spinning outer ring with nodes */}
                    <div className="absolute inset-0 animate-spin-slow pointer-events-none opacity-80">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const angle = (i / 24) * Math.PI * 2;
                        const x = 50 + 45 * Math.cos(angle);
                        const y = 50 + 45 * Math.sin(angle);
                        return (
                          <div 
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{ 
                              left: `${x}%`, 
                              top: `${y}%`,
                              backgroundColor: i % 3 === 0 ? slide.color : 'rgba(255,255,255,0.5)',
                              boxShadow: i % 3 === 0 ? `0 0 10px ${slide.color}` : 'none',
                              opacity: i % 2 === 0 ? 0.8 : 0.4
                            }}
                          ></div>
                        );
                      })}
                      
                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="1,3" />
                      </svg>
                    </div>
                    
                    {/* Middle spinning ring in opposite direction */}
                    <div className="absolute inset-8 animate-spin-slow-reverse pointer-events-none opacity-70">
                      <div className="absolute inset-0 border border-white opacity-20 rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                          style={{ transform: 'rotate(45deg)' }}
                        ></div>
                        <div 
                          className="w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                          style={{ transform: 'rotate(-45deg)' }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Holographic display area */}
                    <div className="absolute inset-12 rounded-full overflow-hidden">
                      {/* Base plate with scanning effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center"
                      >
                        {/* Scanning line */}
                        <div 
                          className="absolute w-full h-full opacity-40"
                          style={{ 
                            background: `linear-gradient(to bottom, transparent, ${slide.color}, transparent)`,
                            backgroundSize: '100% 200%',
                            animation: 'hologram-scan 4s ease-in-out infinite'
                          }}
                        ></div>
                        
                        {/* Horizontal scan lines */}
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-full h-px bg-cyan-400 opacity-30"
                            style={{ 
                              top: `${i * 5}%`,
                              backgroundImage: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)'
                            }}
                          ></div>
                        ))}
                        
                        {/* Service visualization with holographic effect */}
                        <div 
                          className="relative w-full h-full holographic-image"
                          style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.8,
                            transform: 'scale(1.1)',
                            filter: 'saturate(1.2) contrast(1.1)',
                            mixBlendMode: 'screen'
                          }}
                        ></div>
                        
                        {/* Subtle noise overlay */}
                        <div 
                          className="absolute inset-0 opacity-20"
                          style={{ 
                            backgroundImage: 'url("/images/noise.png")',
                            mixBlendMode: 'overlay'
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Floating data points */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                          boxShadow: `0 0 10px ${slide.color}`,
                          opacity: 0.8,
                          animation: `float-data ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Futuristic navigation controls */}
      <div className="absolute inset-x-0 bottom-1/2 flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="group h-full flex items-center justify-start pl-2 pr-4 py-16 opacity-0 hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous slide"
        >
          <div className="bg-black/30 backdrop-blur-xl border-r border-cyan-500/20 rounded-r-full p-2.5 text-white/50 group-hover:text-white/90 transition-all duration-300 group-hover:pl-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
            </svg>
            
            {/* Energy trail */}
            <div className="absolute h-px w-10 -right-10 top-1/2 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10" style={{ 
              background: 'linear-gradient(to left, transparent, cyan)',
              opacity: 0.6
            }}></div>
          </div>
        </button>
        
        <button
          onClick={nextSlide}
          className="group h-full flex items-center justify-end pr-2 pl-4 py-16 opacity-0 hover:opacity-100 transition-opacity duration-300"
          aria-label="Next slide"
        >
          <div className="bg-black/30 backdrop-blur-xl border-l border-cyan-500/20 rounded-l-full p-2.5 text-white/50 group-hover:text-white/90 transition-all duration-300 group-hover:pr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
            
            {/* Energy trail */}
            <div className="absolute h-px w-10 -left-10 top-1/2 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 z-10" style={{ 
              background: 'linear-gradient(to right, transparent, cyan)',
              opacity: 0.6
            }}></div>
          </div>
        </button>
      </div>
      
      {/* Enhanced slide indicators with futuristic design - Desktop version */}
      <div className="absolute right-5 md:right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-30 hidden md:block">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex items-center cursor-pointer group px-3 py-2 rounded-lg hover:bg-black/40 backdrop-blur-sm transition-all duration-300"
            onClick={() => goToSlide(i)}
          >
            <div className={`text-sm font-mono mr-3 transition-colors duration-300 ${i === currentSlide ? 'text-white' : 'text-gray-400'} group-hover:text-white`}>
              {i + 1 < 10 ? `0${i + 1}` : i + 1}
            </div>
            <div className="relative h-1 w-16 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-600 ${i === currentSlide ? 'animate-pulse-slow' : ''}`}
                style={{ 
                  width: i === currentSlide ? '100%' : '0%',
                  background: i === currentSlide ? `linear-gradient(to right, white, ${slides[i].color})` : 'white',
                  boxShadow: i === currentSlide ? `0 0 10px ${slides[i].color}` : 'none'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile indicators - Dots instead of numbered indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 md:hidden z-30">
        {slides.map((slide, i) => (
          <button
            key={i}
            className="flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300"
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              backgroundColor: i === currentSlide ? slide.color : 'rgba(255,255,255,0.2)',
              boxShadow: i === currentSlide ? `0 0 10px ${slide.color}` : 'none',
              transform: i === currentSlide ? 'scale(1.3)' : 'scale(1)'
            }}
          ></button>
        ))}
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: cyan }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 0.2; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes float-data {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -100;
          }
        }
        
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        
        @keyframes hologram-scan {
          0%, 100% { background-position: 0 0%; }
          50% { background-position: 0 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-25px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(15px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes travel {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes trail {
          0% { transform: translateX(0); opacity: 0.8; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Holographic button */
        .holo-button {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: all 0.3s;
        }
        
        .holo-button:hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        
        /* Holographic container */
        .holographic-container {
          perspective: 1000px;
        }
        
        .holographic-image {
          animation: hologram-float 6s ease-in-out infinite;
        }
        
        @keyframes hologram-float {
          0%, 100% { transform: translateZ(0) scale(1.1); }
          50% { transform: translateZ(20px) scale(1.15); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        /* Additional animations from your new styles */
        .service-orbital {
          transition: all 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .service-icon {
          transition: all 0.3s ease;
        }

        .service-icon:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ServicesCarousel;