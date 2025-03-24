import React, { useState, useEffect } from 'react';

const FuturisticHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');
  const [headerHeight, setHeaderHeight] = useState(80); // Default header height estimate
  
  // Referencia para medir la altura real del header
  const headerRef = React.useRef(null);
  
  // Detectar la página actual basada en la URL
  useEffect(() => {
    // Obtener la ruta actual
    const path = window.location.pathname;
    
    // Actualizar la sección activa basada en la ruta
    if (path === '/') {
      setActiveSection('inicio');
    } else if (path.includes('/nosotros')) {
      setActiveSection('nosotros');
    } else if (path.includes('/servicios')) {
      setActiveSection('servicios');
    } else if (path.includes('/evaluacion-gratuita')) {
      setActiveSection('evaluacion');
    } else if (path.includes('/recursos')) {
      setActiveSection('recursos');
    } else if (path.includes('/contacto')) {
      setActiveSection('contacto');
    }
  }, []);
  
  // Controlar scroll y animaciones
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Actualizar posición de scroll para efectos parallax
      setScrollY(currentScrollY);
      
      // Ocultar/mostrar header al hacer scroll hacia abajo/arriba
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Ocultar al scroll hacia abajo
      } else {
        setIsVisible(true); // Mostrar al scroll hacia arriba
      }
      
      setLastScrollY(currentScrollY);
      
      // Nota: La detección de sección activa basada en el scroll se ha desactivado
      // para favorecer la detección basada en la URL actual.
      // La siguiente sección se mantiene comentada como referencia:
      /*
      if (currentScrollY < 500) {
        setActiveSection('inicio');
      } else if (currentScrollY < 1000) {
        setActiveSection('nosotros');
      } else if (currentScrollY < 1500) {
        setActiveSection('servicios');
      } else if (currentScrollY < 2000) {
        setActiveSection('evaluacion');
      } else if (currentScrollY < 2500) {
        setActiveSection('recursos');
      } else {
        setActiveSection('contacto');
      }
      */
      
      // Actualizar altura del header para el espaciado del contenido
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Medir la altura inicial del header
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lista de enlaces de navegación
  const navLinks = [
    { name: 'inicio', path: '/', label: 'INICIO' },
    { name: 'nosotros', path: '/nosotros', label: 'NOSOTROS' },
    { name: 'servicios', path: '/servicios', label: 'SERVICIOS' },
    { name: 'evaluacion', path: '/evaluacion-gratuita', label: 'EVALUACIÓN GRATUITA' },
    { name: 'recursos', path: '/recursos', label: 'RECURSOS' },
    { name: 'contacto', path: '/contacto', label: 'CONTACTO' }
  ];

  // Lista reorganizada de servicios según el orden solicitado
  const serviceLinks = [
    {
      name: 'Gestión por Procesos',
      path: '/servicios/gestion-por-procesos',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
      </svg>
    },
    {
      name: 'Gestión del Conocimiento',
      path: '/servicios/conocimiento',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
    },
    {
      name: 'Sistemas de Gestión',
      path: '/servicios/sistemas-gestion',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    },
    {
      name: 'Transformación Digital',
      path: '/servicios/transformacion-digital',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    },
    {
      name: 'Gestión de Riesgos',
      path: '/servicios/gestion-riesgos',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    },
    {
      name: 'Gestión de Proyectos',
      path: '/servicios/gestion-de-proyectos',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    },
    {
      name: 'Data Analytics',
      path: '/servicios/data-analytics',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    },
    {
      name: 'BPM',
      path: '/servicios/bpm',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    }
  ];

  return (
    <>
      {/* Barra de navegación principal */}
      <header 
        ref={headerRef}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-[#06080C] py-2' 
            : 'bg-[#06080C] py-5'
        } ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo con efecto brillante */}
            {/* Logo con imagen */}
            <div className="flex-shrink-0 relative group">
              <a href="/" className="flex items-center">
                {/* Logo de JM AI Consulting como imagen */}
                <div className="relative">
                  <img 
                    src="/images/services/logo-jm-ai-consulting.png"
                    alt="JM AI Consulting Logo"
                    className=" h-12 object-contain"
                  />
                  
                  {/* Resplandor bajo el logo (opcional) */}
                  <div className="absolute -bottom-3 left-0 right-0 h-3 bg-cyan-500/20 blur-md rounded-full mx-2 opacity-60"></div>
                </div>
                
               
              </a>
            </div>

            {/* Navegación de escritorio */}
            <nav className={`hidden md:flex items-center ${!isVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              {/* Indicador de posición activa - ahora comparte la misma visibilidad que el header */}
              
              <ul className="flex">
                {navLinks.map((item, index) => (
                  <li key={item.name} className="mx-2 relative group">
                    <a 
                      href={item.path} 
                      className={`py-2 px-1 inline-block uppercase tracking-wide text-sm font-medium transition-colors duration-300 ${
                        activeSection === item.name 
                          ? 'text-cyan-400' 
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                      
                      {/* Efecto hover para elementos del menú */}
                      <span className="absolute left-0 right-0 bottom-0 h-px w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    
                    {/* Submenú para servicios - ORDEN ACTUALIZADO */}
                    {item.name === 'servicios' && (
                      <div className="absolute left-0 mt-1 w-64 rounded-xl overflow-hidden transition-all duration-500 origin-top-left bg-gradient-to-br from-gray-900 to-black border border-cyan-950 backdrop-blur-lg opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
                        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                        <ul className="relative z-10 py-1">
                          {serviceLinks.map((service, idx) => (
                            <li key={idx}>
                              <a 
                                href={service.path} 
                                className="flex items-center pl-4 pr-8 py-3 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
                              >
                                <span className="w-6 h-6 mr-3 flex items-center justify-center text-cyan-500">
                                  {service.icon}
                                </span>
                                {service.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {/* Botón "Contáctanos" con efecto de brillo */}
            <div className="hidden md:block">
              <a href="/contacto" className="relative inline-block group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <button className="relative bg-black px-5 py-2 rounded-full leading-none flex items-center text-cyan-300 border border-cyan-700/50 hover:text-white hover:border-cyan-500 transition-colors">
                  <span>Contáctanos</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </a>
            </div>

            {/* Botón de menú móvil */}
            <button 
              className="md:hidden relative w-10 h-10 flex justify-center items-center"
              onClick={toggleMenu}
              aria-label="Menú principal"
            >
              <div className={`w-6 flex flex-col items-end justify-center transition-all duration-300 ${isMenuOpen ? 'space-y-0' : 'space-y-1.5'}`}>
                <span className={`block h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded transition-all duration-300 ${isMenuOpen ? 'w-6 translate-y-0.5 -rotate-45' : 'w-6'}`}></span>
                <span className={`block h-0.5 bg-cyan-400 rounded transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-4'}`}></span>
                <span className={`block h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded transition-all duration-300 ${isMenuOpen ? 'w-6 -translate-y-0.5 rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div 
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-500 ease-in-out flex flex-col justify-center overflow-hidden ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
      >
        {/* Elementos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/5 to-blue-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-500/5 to-blue-600/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-8 py-12 relative">
          <div className="flex flex-col space-y-6">
            {/* Enlaces de navegación */}
            <ul className="flex flex-col space-y-6 mb-8">
              {navLinks.map((item, index) => (
                <li key={item.name} className={`overflow-hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${100 + index * 50}ms`, transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <a 
                    href={item.path} 
                    className="group flex items-center text-2xl font-light text-white/80 hover:text-cyan-400 transition-colors duration-300"
                    onClick={() => item.name !== 'servicios' && setIsMenuOpen(false)}
                  >
                    <span className="mr-3 w-6 h-0.5 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    {item.label}
                  </a>
                  
                  {/* Submenú de servicios - ORDEN ACTUALIZADO */}
                  {item.name === 'servicios' && (
                    <ul className="mt-4 ml-10 space-y-3">
                      {serviceLinks.map((service, subIndex) => (
                        <li key={subIndex} className={`overflow-hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${300 + subIndex * 50}ms`, transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                          <a 
                            href={service.path} 
                            className="text-sm font-light text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mr-2"></span>
                            {service.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Botón de contacto */}
            <div className={`${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <a 
                href="/contacto" 
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contáctanos Ahora
              </a>
            </div>
            
            {/* Redes sociales */}
            <div className={`flex space-x-4 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {[
              { 
                icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />, 
                href: 'https://facebook.com' 
              },
              { 
                icon: <g>
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </g>, 
                href: 'https://linkedin.com' 
              },
              { 
                icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />, 
                href: 'https://twitter.com' 
              },
              { 
                icon: <g>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </g>, 
                href: 'https://instagram.com' 
              }
            ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Espaciador para evitar que el contenido quede debajo del header */}
      <div style={{ height: headerHeight }} className="w-full"></div>

      {/* Estilos para los efectos y animaciones */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), 
                            radial-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px);
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
        }
      `}</style>
    </>
  );
};

export default FuturisticHeader;