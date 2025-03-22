import React, { useState, useEffect, useRef } from 'react';

// Iconos personalizados SVG para un aspecto más futurista
const IconTarget = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const IconRefreshCw = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2v6h-6"></path>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
    <path d="M3 22v-6h6"></path>
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
  </svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const IconAward = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const NosotrosSeccion = () => {
  // Estado para controlar animaciones según scroll
  const [isVisible, setIsVisible] = useState({
    intro: false,
    vision: false,
    mision: false,
    valores: false,
    experiencia: false,
    proyectos: false,
    compromisos: false // Añadir esta línea
  });
  
  // Referencias para los elementos a observar
  const sectionRefs = {
    intro: useRef(null),
    vision: useRef(null),
    mision: useRef(null),
    valores: useRef(null),
    experiencia: useRef(null),
    proyectos: useRef(null),
    compromisos: useRef(null) // Añadir esta línea
  };
  
  // Estado para efectos de hover y animaciones adicionales
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Seguimiento de la posición del cursor para efectos interactivos
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };
  
  // Efecto para configurar los observadores de intersección
  useEffect(() => {
    const observers = {};
    // Crear observadores para cada sección
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      observers[key] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.15 }
      );
      
      if (ref.current) {
        observers[key].observe(ref.current);
      }
    });
    
    // Configurar event listener para el seguimiento del cursor
    window.addEventListener('mousemove', handleMouseMove);
    
    // Limpiar observadores y event listeners
    return () => {
      Object.values(observers).forEach(observer => {
        observer.disconnect();
      });
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Definición de los valores de la empresa
  const valoresData = [
    {
      icon: <IconShield />,
      title: "Integridad",
      description: "Actuamos con honestidad, ética y transparencia en todos nuestros servicios.",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: <IconAward />,
      title: "Excelencia",
      description: "Buscamos superar las expectativas con soluciones de alta calidad.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <IconUsers />,
      title: "Colaboración",
      description: "Trabajamos en conjunto con nuestros clientes para alcanzar objetivos comunes.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <IconCheck />,
      title: "Innovación",
      description: "Implementamos soluciones creativas utilizando tecnologías de vanguardia.",
      color: "from-cyan-400 to-emerald-400"
    }
  ];
  
  // Experiencia de la empresa
  const experienciaData = [
    {
      numero: "10+",
      sufijo: "Años",
      label: "Experiencia del Equipo",
      descripcion: "Más de una década transformando organizaciones"
    },
    {
      numero: "1,000",
      sufijo: "",
      label: "Horas de consultoría",
      descripcion: "Asesorando empresas públicas y privadas"
    },
    {
      numero: "100",
      sufijo: "%",
      label: "Compromiso",
      descripcion: "Dedicación total a la excelencia"
    },
    {
      numero: "5",
      sufijo: "",
      label: "Proyectos En Curso",
      descripcion: "Transformando organizaciones actualmente"
    }
  ];
  
  // Certificaciones
  const certificacionesData = [
    {
      id: "iso9001",
      nombre: "ISO 9001",
      descripcion: "Sistema de Gestión de Calidad"
    },
    {
      id: "iso27001",
      nombre: "ISO 27001",
      descripcion: "Sistema de Gestión de Seguridad de la Información"
    },
    {
      id: "iso37001",
      nombre: "ISO 37001",
      descripcion: "Sistema de Gestión Antisoborno"
    }
  ];
  
  // Componente para crear efecto de resplandor en hover
  const HoverGlow = ({ children, className, glowColor = "cyan" }) => {
    const colorMap = {
      cyan: "group-hover:shadow-cyan-500/50",
      blue: "group-hover:shadow-blue-500/50",
      purple: "group-hover:shadow-purple-500/50"
    };
    
    return (
      <div className={`group relative transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${colorMap[glowColor]} ${className}`}>
        {children}
      </div>
    );
  };
  
  // Componente para efecto de animación de partículas
  const CyberParticles = () => (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={`particle-${index}`}
          className="absolute bg-cyan-400 rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `floatParticle ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
  return (
    <section id="nosotros" className="relative min-h-screen bg-black text-white py-20 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* ============ ELEMENTOS DE FONDO INTERACTIVOS ============ */}
      <div className="absolute inset-0 z-0">
        {/* Patrón de cuadrícula futurista */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0284c7" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#0284c7" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Orbes de gradiente animados */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-500/5 blur-3xl animate-pulse" 
          style={{ 
            left: `calc(${cursorPos.x/25}px - 10%)`,
            top: `calc(${cursorPos.y/20}px - 10%)`,
            animationDuration: '8s'
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/5 to-blue-500/10 blur-3xl animate-pulse" 
          style={{ 
            right: `calc(${cursorPos.x/30}px - 20%)`,
            bottom: `calc(${cursorPos.y/30}px - 10%)`,
            animationDuration: '12s',
            animationDelay: '2s'
          }}
        ></div>
        
        {/* Partículas estilo cyber-tech */}
        <CyberParticles />
        
        {/* Líneas de conexión animadas en diagonal */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1">
              <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="10s" repeatCount="indefinite" />
            </line>
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="url(#lineGradient)" strokeWidth="1">
              <animate attributeName="stroke-dashoffset" from="0" to="-200" dur="15s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* ============ TÍTULO DE SECCIÓN CON ANIMACIÓN TECH ============ */}
        <div 
          ref={sectionRefs.intro}
          className="text-center mb-16"
        >
          
          <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight pt-[4%]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              NOSOTROS
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full" />
        </div>
          
        
          
          {/* Elemento tech decorativo bajo el texto */}
          <div className="relative h-8 w-48 mx-auto mt-8">
            <div className={`h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-1000 delay-1000 ${isVisible.intro ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black border border-cyan-500 rotate-45 transition-all duration-700 delay-1400 ${isVisible.intro ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
          </div>
        </div>
        {/* ============ VISIÓN Y MISIÓN CON EFECTOS HOLOGRÁFICOS ============ */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Visión con efecto holográfico */}
          <div 
            ref={sectionRefs.vision}
            className="relative overflow-hidden"
            onMouseEnter={() => setHoveredCard('vision')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Efecto de fondo reactivo al hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 transform transition-all duration-700 ${isVisible.vision ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              style={{
                background: hoveredCard === 'vision' 
                  ? `radial-gradient(circle at ${cursorPos.x/5}px ${cursorPos.y/5}px, rgba(56, 189, 248, 0.3) 0%, rgba(2, 132, 199, 0.1) 50%, transparent 100%)`
                  : ''
              }}
            ></div>
            
            {/* Tarjeta de contenido */}
            <div className="relative bg-gray-900/50 backdrop-blur-md border border-blue-900/50 rounded-xl p-8 h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
              {/* Líneas decorativas animadas */}
              <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-1000 ${isVisible.vision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '200ms'}}></div>
              <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-1000 ${isVisible.vision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '400ms'}}></div>
              <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent transition-all duration-1000 ${isVisible.vision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '600ms'}}></div>
              <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent transition-all duration-1000 ${isVisible.vision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '800ms'}}></div>
              
              {/* Título y contenido */}
              <div className="flex items-center mb-6">
                <div className="relative p-3 rounded-lg bg-blue-500/20 mr-4 overflow-hidden">
                  <IconTarget className="relative z-10 text-blue-400 h-6 w-6" />
                  {/* Efecto de pulso en el ícono */}
                  <div className="absolute inset-0 bg-blue-500/30 rounded-lg animate-ping opacity-30"></div>
                </div>
                <h3 className="text-2xl font-bold text-white">Visión</h3>
              </div>
              
              <div className="space-y-4">
                <p className={`text-gray-300 transition-all duration-700 delay-300 ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  Ser la empresa líder en consultoría a nivel nacional, impulsando el desarrollo sostenible del país mediante la optimización de la gestión en organizaciones públicas y privadas, asegurando el cumplimiento de sus objetivos con responsabilidad social, ambiental y de gobernanza.
                </p>
                
                {/* Línea inferior animada */}
                <div className={`h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded transition-all duration-1000 delay-500 ${isVisible.vision ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}></div>
                
                {/* Indicador tech animado */}
                <div className={`absolute bottom-4 right-4 flex items-center space-x-1 transition-all duration-700 delay-700 ${isVisible.vision ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="text-xs text-blue-500">Vision.sys</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Misión con efecto holográfico */}
          <div 
            ref={sectionRefs.mision}
            className="relative overflow-hidden"
            onMouseEnter={() => setHoveredCard('mision')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Efecto de fondo reactivo al hover */}
            <div 
              className={`absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-blue-400/20 transform transition-all duration-700 ${isVisible.mision ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
              style={{
                background: hoveredCard === 'mision' 
                  ? `radial-gradient(circle at ${cursorPos.x/5}px ${cursorPos.y/5}px, rgba(6, 182, 212, 0.3) 0%, rgba(8, 145, 178, 0.1) 50%, transparent 100%)`
                  : ''
              }}
            ></div>
            
            {/* Tarjeta de contenido */}
            <div className="relative bg-gray-900/50 backdrop-blur-md border border-cyan-900/50 rounded-xl p-8 h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20">
              {/* Líneas decorativas animadas */}
              <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-1000 ${isVisible.mision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '200ms'}}></div>
              <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-1000 ${isVisible.mision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '400ms'}}></div>
              <div className={`absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent transition-all duration-1000 ${isVisible.mision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '600ms'}}></div>
              <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent transition-all duration-1000 ${isVisible.mision ? 'opacity-50' : 'opacity-0'}`} style={{transitionDelay: '800ms'}}></div>
              
              {/* Título y contenido */}
              <div className="flex items-center mb-6">
                <div className="relative p-3 rounded-lg bg-cyan-500/20 mr-4 overflow-hidden">
                  <IconRefreshCw className="relative z-10 text-cyan-400 h-6 w-6" />
                  {/* Efecto de pulso en el ícono */}
                  <div className="absolute inset-0 bg-cyan-500/30 rounded-lg animate-ping opacity-30"></div>
                </div>
                <h3 className="text-2xl font-bold text-white">Misión</h3>
              </div>
              
              <div className="space-y-4">
                <p className={`text-gray-300 transition-all duration-700 delay-500 ${isVisible.mision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  Ofrecer servicios de consultoría especializados y adaptados a las necesidades únicas de cada organización, promoviendo su desarrollo y modernización de manera eficiente y eficaz.
                </p>
                
                {/* Línea inferior animada */}
                <div className={`h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-400 rounded transition-all duration-1000 delay-700 ${isVisible.mision ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}></div>
                
                {/* Indicador tech animado */}
                <div className={`absolute bottom-4 right-4 flex items-center space-x-1 transition-all duration-700 delay-900 ${isVisible.mision ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <div className="text-xs text-cyan-500">Mission.sys</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============ NUESTROS VALORES CON EFECTO 3D HOVER ============ */}
        <div 
          ref={sectionRefs.valores}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold text-white mb-4 transition-all duration-700 ${isVisible.valores ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Nuestros Valores</span>
            </h3>
            <div className={`h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded transition-all duration-1000 delay-200 ${isVisible.valores ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>

            {/* Partículas decorativas */}
            <div className={`relative h-8 w-8 mx-auto mt-3 transition-all duration-700 delay-500 ${isVisible.valores ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-500"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 h-px w-4 bg-cyan-500"></div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 h-px w-4 bg-cyan-500"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-4 bg-cyan-500"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Grid de valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valoresData.map((valor, index) => (
              <div 
                key={valor.title}
                className={`group perspective relative transition-all duration-700 ${isVisible.valores ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(`valor-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative preserve-3d transform transition-all duration-500 group-hover:rotate-y-20 h-full">
                  {/* Fondo con efecto 3D */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${valor.color} opacity-0 group-hover:opacity-10 blur-sm rounded-xl transition-opacity duration-500`}
                    style={{
                      transform: hoveredCard === `valor-${index}` 
                        ? `perspective(1000px) rotateY(${(cursorPos.x / window.innerWidth - 0.5) * 20}deg) rotateX(${(cursorPos.y / window.innerHeight - 0.5) * -20}deg)`
                        : 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
                    }}
                  ></div>

                  {/* Contenido principal */}
                  <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 h-full relative group-hover:shadow-lg group-hover:shadow-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
                    {/* Esquinas tech animadas */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-transparent group-hover:border-cyan-500 transition-colors duration-300"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-transparent group-hover:border-cyan-500 transition-colors duration-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-transparent group-hover:border-cyan-500 transition-colors duration-300"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-transparent group-hover:border-cyan-500 transition-colors duration-300"></div>
                    
                    {/* Ícono con animación */}
                    <div className={`bg-gradient-to-br ${valor.color} rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-white relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
                      <span className="relative z-10">
                        {valor.icon}
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse"></div>
                    </div>
                    
                    {/* Título y descripción */}
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{valor.title}</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{valor.description}</p>
                    
                    {/* Indicador de estado activo */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                      <div className="text-xs text-cyan-500">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ============ NUESTRA EXPERIENCIA CON CONTADOR ANIMADO ============ */}
        <div 
  ref={sectionRefs.experiencia}
  className="mb-16"
>
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 rounded-2xl blur-sm"></div>
    
    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-blue-900/50 overflow-hidden">
      {/* Fondo de código Matrix */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="matrix-code">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`code-${i}`} className="code-line" style={{ animationDelay: `${i * 0.2}s` }}>
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={`char-${i}-${j}`} style={{ animationDelay: `${j * 0.05}s` }}>
                  {['0', '1'][Math.floor(Math.random() * 2)]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Título de sección */}
      <div className={`flex items-center mb-8 transition-all duration-700 ${isVisible.experiencia ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <div className="relative p-3 rounded-lg bg-blue-500/20 mr-4 overflow-hidden">
          <IconAward className="relative z-10 text-blue-400 h-6 w-6" />
          <div className="absolute inset-0 bg-blue-500/30 rounded-lg animate-ping opacity-30"></div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white">Nuestra Experiencia</h3>
      </div>
      
      {/* Indicadores de experiencia con contador animado - Ajustado para móviles */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {experienciaData.map((item, index) => (
          <div 
            key={item.label}
            className={`transition-all duration-700 delay-300 ${isVisible.experiencia ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${500 + index * 200}ms` }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-5 border border-blue-900/30 hover:border-cyan-500/50 transition-colors duration-300 group h-full flex flex-col">
              {/* Número con efecto contador */}
              <div className="mb-2 md:mb-3 flex items-baseline text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                <span className="text-3xl md:text-4xl font-bold counter-number" data-target={item.numero}>
                  {isVisible.experiencia ? item.numero : '0'}
                </span>
                {item.sufijo && (
                  <span className="text-lg md:text-xl ml-1">{item.sufijo}</span>
                )}
              </div>
              
              <h4 className="text-white text-sm md:text-base font-medium mb-1">{item.label}</h4>
              <p className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.descripcion}</p>
              
              {/* Línea decorativa con animación de brillo */}
              <div className="mt-auto pt-3">
                <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent relative overflow-hidden">
                  <div className="absolute top-0 -left-4 bottom-0 w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    
    </div>
  </div>
</div>
        {/* ============ SECCIONES DE COMPROMISO ============ */}
<div 
  ref={sectionRefs.compromisos}
  className="mb-20"
>
  {/* Compromiso con la Calidad */}
  <div className="mb-12">
    <div className="relative overflow-hidden rounded-xl mb-2">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-xl blur-sm"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-blue-900/50 overflow-hidden group hover:border-blue-500/50 transition-colors duration-500">
        {/* Título de sección */}
        <div className={`flex items-center mb-8 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h3 className="text-3xl font-bold text-blue-400">Compromiso con la Calidad</h3>
        </div>
        
        <div className="flex flex-col space-y-2 ml-2">
          <p className="text-gray-400 mb-4">JM AI Consulting se compromete a:</p>
          
          {/* Lista de compromisos */}
          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-blue-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Proporcionar servicios de consultoría que satisfagan de manera consistente los requisitos de sus clientes y los requisitos legales y reglamentarios aplicables.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-blue-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Establecer objetivos de calidad medibles y realizar un seguimiento de su progreso.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-blue-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Aumentar la satisfacción del cliente a través de la aplicación eficaz del sistema de gestión de la calidad, incluyendo la mejora continua de sus procesos.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-blue-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-blue-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Proporcionar los recursos necesarios para implementar y mantener el sistema de gestión de la calidad.
              </p>
            </div>
          </div>
        </div>
        
        {/* Efecto de borde brillante al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-blue-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Seguridad de la Información */}
  <div className="mb-12">
    <div className="relative overflow-hidden rounded-xl mb-2">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-blue-800/20 rounded-xl blur-sm"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-cyan-900/50 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
        {/* Título de sección */}
        <div className={`flex items-center mb-8 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
          <h3 className="text-3xl font-bold text-cyan-400">Seguridad de la Información</h3>
        </div>
        
        <div className="flex flex-col space-y-2 ml-2">
          <p className="text-gray-400 mb-4">JM AI Consulting se compromete a:</p>
          
          {/* Lista de compromisos */}
          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Proteger la confidencialidad, integridad y disponibilidad de la información.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Implementar y mantener un sistema de gestión de seguridad de la información (SGSI) eficaz, que cumpla con los requisitos de la norma ISO 27001.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Identificar, evaluar y tratar los riesgos de seguridad de la información.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Cumplir con las leyes y regulaciones aplicables en materia de seguridad de la información.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Revisar periódicamente el SGSI para asegurar su adecuación y eficacia.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Comunicar la importancia de la seguridad de la información a todo el personal.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Proveer los recursos necesarios para la implementación y el mantenimiento del SGSI.
              </p>
            </div>
          </div>
        </div>
        
        {/* Efecto de borde brillante al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-cyan-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-cyan-500 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Lucha Contra el Soborno */}
  <div className="mb-12">
    <div className="relative overflow-hidden rounded-xl mb-2">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-blue-800/20 rounded-xl blur-sm"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-indigo-900/50 overflow-hidden group hover:border-indigo-500/50 transition-colors duration-500">
        {/* Título de sección */}
        <div className={`flex items-center mb-8 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-3xl font-bold text-indigo-400">Lucha Contra el Soborno</h3>
        </div>
        
        <div className="flex flex-col space-y-2 ml-2">
          <p className="text-gray-400 mb-4">JM AI Consulting se compromete a:</p>
          
          {/* Lista de compromisos */}
          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Prohibir el soborno en todas sus formas, incluyendo el soborno directo e indirecto.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Fomentar el uso del Canal de Denuncias de JM AI Consulting, incentivando una cultura de reporte voluntario, de buena fe y confidencial, libre de represalias.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Cumplir con todas las leyes antisoborno aplicables a la empresa.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Apoyar al responsable de la función de cumplimiento para que ejecute sus funciones con autoridad e independencia, cumpliendo con todo lo establecido en el Sistema de Gestión Antisoborno.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Proporcionar un marco de referencia para el establecimiento, revisión y logro de los objetivos antisoborno de acuerdo con los requisitos de nuestro Sistema de Gestión Antisoborno, establecidos en la ISO 37001.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Comunicar la política antisoborno a todo el personal, incluyendo socios de negocios.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Promover una cultura de integridad, transparencia, honestidad y cumplimiento dentro de la empresa.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Investigar cualquier sospecha de soborno y tomar las medidas disciplinarias correspondientes.
              </p>
            </div>
            
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-indigo-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-indigo-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                Proporcionar los recursos necesarios para la implementación y el mantenimiento del SGAS.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mensaje de incumplimiento */}
        <div className={`mt-8 text-gray-300 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>
          <p className="text-sm border-l-2 border-indigo-500 pl-4 py-2 bg-indigo-500/10 rounded-r">
            El incumplimiento de lo establecido en esta política por parte de los miembros de nuestra organización o de cualquier parte interesada vinculada a nuestras actividades, está sujeto a las medidas disciplinarias establecidas y las sanciones legales que determinen las autoridades competentes.
          </p>
        </div>
        
        {/* Efecto de borde brillante al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-indigo-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-indigo-500 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-indigo-500 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-indigo-500 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Mejora Continua */}
  <div className="mb-12">
    <div className="relative overflow-hidden rounded-xl mb-2">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-blue-800/20 rounded-xl blur-sm"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl p-6 border border-cyan-900/50 overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
        {/* Título y contenido en una línea */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className={`flex items-center mb-4 md:mb-0 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '800ms' }}>
            <h3 className="text-3xl font-bold text-cyan-400 mr-4">Mejora Continua</h3>
          </div>
          
          <div className={`flex-1 transition-all duration-700 ${isVisible.compromisos ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '900ms' }}>
            <div className="flex items-start space-x-4 group/item">
              <div className="flex-shrink-0 bg-cyan-600 rounded-full h-6 w-6 flex items-center justify-center mt-1 group-hover/item:bg-cyan-500 transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                JM AI Consulting se compromete a la mejora continua de sus sistemas de gestión de la calidad, seguridad de la información y antisoborno.
              </p>
            </div>
          </div>
        </div>
        
        {/* Efecto de borde brillante al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-cyan-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-cyan-500 to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
</div>
        
        {/* ============ ELEMENTO DECORATIVO DE CIERRE ============ */}
        <div className="relative h-16 mb-8">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-black border border-cyan-500 rotate-45"></div>
          
          {/* Círculos concéntricos animados */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="absolute w-16 h-16 border border-cyan-500/20 rounded-full animate-ping"></div>
            <div className="absolute w-12 h-12 border border-cyan-500/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute w-8 h-8 border border-cyan-500/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute w-4 h-4 border border-cyan-500/80 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* ============ ESTILOS CSS PARA ANIMACIONES AVANZADAS ============ */}
      <style jsx>{`
        /* Efecto Matrix de código binario */
        .matrix-code {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }
        
        .code-line {
          font-family: monospace;
          font-size: 12px;
          color: #0ea5e9;
          white-space: nowrap;
          animation: scrollDown 10s linear infinite;
        }
        
        .code-line span {
          opacity: 0.7;
          animation: flicker 3s linear infinite;
        }
        
        @keyframes scrollDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        
        /* Efecto de brillo deslizante */
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        
        /* Efecto de partículas flotantes */
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        /* Efecto 3D */
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-20 {
          transform: rotateY(20deg);
        }
        
        /* Efecto de typing animado */
        .typing-animation {
          display: inline-block;
          overflow: hidden;
          border-right: 2px solid transparent;
          white-space: nowrap;
          animation: typing 3s steps(40, end), blink 0.75s step-end infinite alternate;
          animation-fill-mode: forwards;
        }
        
        @keyframes typing {
          from { max-width: 0 }
          to { max-width: 100% }
        }
        
        @keyframes blink {
          50% { border-color: #0ea5e9; }
        }
      `}</style>
    </section>
  );
};

export default NosotrosSeccion;