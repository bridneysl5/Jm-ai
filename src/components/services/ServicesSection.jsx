import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesSection = () => {
  // Estado para el servicio activo
  const [activeService, setActiveService] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showMobileModal, setShowMobileModal] = useState(false);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const isMobile = useRef(false); // Inicializar con un valor por defecto
  
  // Datos de los servicios
  const services = [
    {
      id: 1,
      title: 'Transformación Digital',
      shortTitle: 'Transformación',
      description: 'Te ayudamos a integrar la tecnología con tus operaciones para aumentar tu competitividad, habilitando nuevos modelos de negocio e impulsando tu crecimiento exponencial.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      color: '#00C2FF',
      angle: 0 // top position (0 degrees)
    },
    {
      id: 2,
      title: 'Gestión por Procesos',
      shortTitle: 'Procesos',
      description: 'Revolucionamos tus flujos de trabajo mediante IA predictiva que optimiza procesos en tiempo real, elevando la eficiencia operativa hasta un 300% con soluciones personalizadas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7"></circle>
          <path d="M12 9v3l1.5 1.5"></path>
          <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>
        </svg>
      ),
      color: '#FF4B8C',
      angle: 60 // top-right
    },
    {
      id: 3,
      title: 'Sistemas de Gestión ISO',
      shortTitle: 'ISO',
      description: 'Implementamos ecosistemas digitales autónomos que evolucionan con tu negocio, incorporando tecnologías avanzadas para crear entornos de gestión que se adaptan proactivamente.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      color: '#7E22CE',
      angle: 120 // right
    },
    {
      id: 4,
      title: 'Data Analytics',
      shortTitle: 'Analytics',
      description: 'Transformamos datos brutos en narrativas visuales inmersivas, permitiéndote navegar entre dimensiones de información para descubrir insights que impulsan decisiones estratégicas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
          <path d="M6 14l3-3 3 3 6-6"></path>
        </svg>
      ),
      color: '#30CDFF',
      angle: 180 // bottom
    },
    {
      id: 5,
      title: 'Gestión de Riesgos',
      shortTitle: 'Riesgos',
      description: 'Identificamos patrones de riesgo invisibles con análisis predictivo avanzado, creando escenarios de simulación que permiten anticiparse a crisis con meses de antelación.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      color: '#FF3D71',
      angle: 240 // bottom-left
    },
    {
      id: 6,
      title: 'Gestión por Proyectos',
      shortTitle: 'Proyectos',
      description: 'Fusionamos metodologías ágiles con inteligencia de enjambre para crear ecosistemas de proyectos auto-organizados donde cada componente se sincroniza en tiempo real.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      color: '#00D68F',
      angle: 300 // left
    }
  ];

  // Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth <= 768;
    };
     // Comprobar el tamaño inicial del navegador cuando el componente se monta
  if (typeof window !== 'undefined') {
    handleResize(); // Establecer el valor inicial
  }
    window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  // Rastrear posición del mouse para efectos paralaje
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => setIsHovering(true));
      container.addEventListener('mouseleave', () => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', () => setIsHovering(true));
        container.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, []);
  // Crear rotación automática con un intervalo, se detiene al pasar el mouse
  useEffect(() => {
    if (isHovering) return;
    
    const rotationInterval = setInterval(() => {
      setActiveService(current => {
        if (current >= services.length) {
          return 1;
        }
        return current + 1;
      });
    }, 5000);
    
    return () => clearInterval(rotationInterval);
  }, [isHovering, services.length]);

  // Efecto de paralaje cuando el mouse se mueve
  useEffect(() => {
    if (!isHovering || !orbitRef.current) return;
    
    const xOffset = (mousePosition.x - 0.5) * 20;
    const yOffset = (mousePosition.y - 0.5) * 20;
    
    orbitRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    
    return () => {
      if (orbitRef.current) {
        orbitRef.current.style.transform = 'translate(0px, 0px)';
      }
    };
  }, [mousePosition, isHovering]);
  
  // Calcular posición basada en ángulo para una distribución circular
  const calculatePosition = (angle, radius = 57) => {
    const angleInRadians = (angle * Math.PI) / 180;
    const x = 50 + radius * Math.cos(angleInRadians);
    const y = 50 + radius * Math.sin(angleInRadians);
    return { x, y };
  };
  
  // Crear partículas animadas para el fondo
  const createParticles = (count = 25) => {
    return Array.from({ length: count }).map((_, i) => (
      <div 
        key={i}
        className="absolute bg-white rounded-full opacity-30"
        style={{ 
          top: `${Math.random() * 100}%`, 
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          boxShadow: `0 0 ${Math.random() * 5 + 3}px ${services[activeService - 1].color}`,
          animation: `float ${Math.random() * 10 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ));
  };
  
  // Variantes para animaciones de Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const centerServiceVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  // Componente para cada orbe de servicio
  const ServiceOrb = ({ service, isActive, onClick }) => {
    const position = calculatePosition(service.angle);
    const activeColor = service.color;
    const inactiveColor = 'rgba(50, 50, 70, 0.6)';
    const isMobileView = isMobile.current;
    
    
    const handleClick = () => {
      onClick();
      if (isMobileView) {
        setShowMobileModal(true);
      }
    };
    
    return (
      <div 
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`,
          zIndex: isActive ? 30 : 10,
          transition: 'all 0.3s ease-out'
        }}
      >
        <div
          className="text-center select-none cursor-pointer group"
          onClick={handleClick}
          style={{
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div 
            className={`
              relative flex items-center justify-center rounded-full 
              transition-all duration-300 ease-out
              ${isActive 
                ? 'overflow-visible z-20' 
                : 'overflow-hidden z-10'
              }
            `}
            style={{ 
              width: isMobileView ? '3.5rem' : '4.5rem', 
              height: isMobileView ? '3.5rem' : '4.5rem',
              transform: 'scale(1)',
              transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
            }}
          >
            {/* Fondo del orbe con gradiente */}
            <div 
              className={`
                absolute inset-0 rounded-full ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'} 
                transition-colors duration-300
              `}
              style={{ 
                background: isActive 
                  ? `linear-gradient(135deg, ${activeColor}, ${activeColor}90)`
                  : inactiveColor,
                border: isActive 
                  ? `2px solid ${activeColor}80` 
                  : '1px solid rgba(130, 130, 230, 0.3)',
                boxShadow: isActive 
                  ? `0 0 20px ${activeColor}60, 0 0 30px ${activeColor}30` 
                  : 'none',
                transition: 'all 0.3s ease-out'
              }}
            />
            
            {/* Anillos decorativos - simplificados para evitar parpadeo */}
            {isActive && (
              <>
                <div 
                  className="absolute w-[120%] h-[120%] border border-white opacity-20 rounded-full"
                  style={{ 
                    animation: 'none', // Quitamos la animación que causa parpadeo
                    transition: 'all 0.3s ease-out'
                  }}
                />
              </>
            )}
            
            {/* Icono */}
            <div className={`relative z-10 w-7 h-7 ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'} transition-colors duration-300`}>
              {service.icon}
            </div>
          </div>
          
          {/* Título */}
          <div 
            className={`
              mt-2 text-xs font-medium tracking-wide
              transition-all duration-300 px-1
              ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}
            `}
          >
            {isMobileView ? service.shortTitle : service.title}
          </div>
        </div>
      </div>
    );
  };
  // Renderizar el servicio central
  const renderCentralService = () => {
    const service = services.find(s => s.id === activeService);
    
    return (
      <AnimatePresence mode="wait">
        <motion.div 
          key={service.id}
          className="w-full h-full relative z-20"
          variants={centerServiceVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="absolute inset-0 bg-gradient-to-br rounded-full overflow-hidden backdrop-blur-lg border border-white/10">
            {/* Fondo gradiente */}
            <div 
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)`,
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 8s ease infinite'
              }}
            />
            
            {/* Patrón de red neuronal */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{ 
                backgroundImage: 'url("/images/neural-network.svg")',
                backgroundSize: 'cover',
                animation: 'pulse-subtle 8s ease-in-out infinite'
              }}
            />
            
            {/* Elementos decorativos */}
            <div className="absolute top-[-5%] right-[-5%] w-1/3 h-1/3 rounded-full opacity-40"
              style={{ 
                background: `radial-gradient(circle, ${service.color} 0%, transparent 70%)`,
                filter: 'blur(20px)'
              }}
            />
            
            <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 rounded-full opacity-30"
              style={{ 
                background: `radial-gradient(circle, ${service.color} 0%, transparent 70%)`,
                filter: 'blur(30px)'
              }}
            />
            
            {/* Líneas de escaneo */}
            <div 
              className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"
              style={{ mixBlendMode: 'overlay' }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-[1px] w-full"
                  style={{
                    top: `${15 + i * 17}%`,
                    background: `linear-gradient(to right, transparent, ${service.color}, transparent)`,
                    animation: `scan-line 4s linear infinite ${i * 0.7}s`,
                    opacity: 0.5
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Contenido */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              className="w-12 h-12 mb-4 text-white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {service.icon}
            </motion.div>
            
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-3 text-white tracking-wide relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {service.title}
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white/40 rounded-full" />
            </motion.h3>
            
            <motion.p 
              className="text-sm md:text-base text-white/90 mb-5 max-w-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {service.description}
            </motion.p>
            
            <motion.button
              className="relative group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Fondo brillante */}
              <div 
                className="absolute -inset-0.5 rounded-lg opacity-70 blur-sm group-hover:opacity-100 transition duration-300"
                style={{ background: `linear-gradient(to right, ${service.color}, ${service.color}90)` }}
              />
              
              {/* Botón en sí */}
              <div className="relative flex items-center justify-center px-6 py-2 bg-black bg-opacity-50 border border-white/20 rounded-lg text-white z-10">
                <span className="tracking-wide">Explorar Solución</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Modal para móviles
  const MobileServiceModal = () => {
    const service = services.find(s => s.id === activeService);
    if (!service) return null;
    
    return (
      <AnimatePresence>
        {showMobileModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowMobileModal(false)}
            />
            
            <motion.div 
              className="relative bg-gray-900 w-full max-w-sm rounded-xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              <div 
                className="absolute top-0 left-0 right-0 h-20"
                style={{ 
                  background: `linear-gradient(135deg, ${service.color}40, ${service.color}10)`,
                }}
              />
              
              <button 
                className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white"
                onClick={() => setShowMobileModal(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="pt-16 pb-8 px-6 relative z-10">
                <div 
                  className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}90)`,
                    boxShadow: `0 0 20px ${service.color}60` 
                  }}
                >
                  <div className="w-9 h-9 text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white text-center">
                  {service.title}
                </h3>
                
                <p className="text-gray-200 mb-6 text-center">
                  {service.description}
                </p>
                
                <button
                  className="w-full py-3 rounded-lg font-medium relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}, ${service.color}90)`,
                  }}
                >
                  <div className="relative flex items-center justify-center text-white">
                    <span>Explorar Solución</span>
                    <svg 
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section className="relative py-16 md:py-24 w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Elementos de fondo */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(100, 100, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Gradientes de fondo */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-15"
          style={{
            background: `radial-gradient(circle at 10% 20%, rgb(50, 50, 150) 0%, transparent 70%)`
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-full h-full opacity-15"
          style={{
            background: `radial-gradient(circle at 80% 80%, rgb(90, 50, 180) 0%, transparent 70%)`
          }}
        />
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {createParticles(40)}
        </div>
        
        {/* Línea horizonte */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Encabezado de sección */}
        <div className="text-center mb-24">
          <motion.span 
            className="inline-block px-4 py-1 rounded-full text-sm font-medium tracking-widest mb-6"
            style={{ 
              background: `linear-gradient(135deg, ${services[activeService - 1].color}30, ${services[activeService - 1].color}10)`,
              border: `1px solid ${services[activeService - 1].color}40`,
              color: services[activeService - 1].color
            }}
            variants={itemVariants}
          >
            NUESTROS SERVICIOS
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight"
            variants={itemVariants}
          >
            Soluciones Integrales
          </motion.h2>
          
          <motion.div
            className="h-0.5 w-24 mx-auto mb-6 rounded"
            style={{ 
              background: `linear-gradient(to right, transparent, ${services[activeService - 1].color}, transparent)` 
            }}
            variants={itemVariants}
          />
          
          <motion.p 
            className="max-w-2xl mx-auto text-gray-300 text-lg"
            variants={itemVariants}
          >
            Ofrecemos servicios especializados para potenciar el crecimiento y la eficiencia de tu organización mediante tecnologías avanzadas
         
          </motion.p>
        </div>
        
        {/* Contenedor principal con órbita y servicios */}
        <div className="flex flex-col items-center justify-center relative">
          {/* Servicio Hub - versión de escritorio */}
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] hidden md:block">
            {/* Círculos orbitales decorativos */}
            <div 
              className="absolute w-full h-full rounded-full border transition-all duration-500"
              style={{ 
                borderColor: `${services[activeService - 1].color}20`,
                transform: 'scale(1.1)'
              }}
            />
            
            <div 
              className="absolute w-full h-full rounded-full border transition-all duration-500 animate-spin-slow"
              style={{ 
                borderColor: `${services[activeService - 1].color}10`,
                transform: 'scale(1.3)',
                animationDuration: '60s'
              }}
            />
            
            {/* Contenedor con efecto parallax */}
            <div ref={orbitRef} className="absolute inset-0 transition-transform duration-700 ease-out">
              {/* Servicio central */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full z-10">
                {renderCentralService()}
              </div>
              
              {/* Orbes de servicio alrededor */}
              {services.map(service => (
                <ServiceOrb
                  key={service.id}
                  service={service}
                  isActive={service.id === activeService}
                  onClick={() => setActiveService(service.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Servicio Hub - versión móvil */}
          <div className="relative w-[280px] h-[280px] md:hidden">
            {/* Círculos orbitales decorativos para móvil */}
            <div 
              className="absolute w-full h-full rounded-full border"
              style={{ 
                borderColor: `${services[activeService - 1].color}20`,
                transform: 'scale(1.1)'
              }}
            />
            
            {/* Servicio central para móvil */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full z-10">
              {renderCentralService()}
            </div>
            
            {/* Orbes de servicio para móvil */}
            {services.map(service => (
              <ServiceOrb
                key={service.id}
                service={service}
                isActive={service.id === activeService}
                onClick={() => setActiveService(service.id)}
              />
            ))}
          </div>
          
          {/* Indicadores de navegación mejorados */}
<div className="flex space-x-3 mt-16">
  {services.map(service => (
    <button
      key={service.id}
      className="w-3 h-3 rounded-full relative"
      onClick={() => setActiveService(service.id)}
      aria-label={`Ver servicio: ${service.title}`}
      style={{
        transition: 'all 0.3s ease'
      }}
    >
      <span 
        className="absolute inset-0 rounded-full"
        style={{ 
          backgroundColor: service.id === activeService 
            ? service.color 
            : 'rgba(100, 100, 100, 0.3)',
          transform: service.id === activeService ? 'scale(1)' : 'scale(0.7)',
          boxShadow: service.id === activeService 
            ? `0 0 10px ${service.color}80` 
            : 'none',
          transition: 'all 0.3s ease'
        }}
      />
      
      {/* Removemos el efecto ping que causa parpadeo */}
    </button>
  ))}
</div>
        </div>
      </motion.div>
      
      {/* Modal para móviles */}
      <MobileServiceModal />
      
      {/* Estilos CSS personalizados para animaciones avanzadas */}
      // Modifica también tu definición de keyframes CSS para hacer las animaciones más suaves:

      <style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-15px) translateX(5px); }
  }
  
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes spin-slower {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse-subtle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.3; }
  }
  
  @keyframes scan-line {
    0% { transform: translateX(-100%); opacity: 0.1; }
    100% { transform: translateX(100%); opacity: 0.1; }
  }
  
  .animate-spin-slow {
    animation: spin-slow 60s linear infinite;
  }
  
  .animate-spin-slower {
    animation: spin-slower 90s linear infinite;
  }
`}</style>
    </section>
  );
};

export default ServicesSection;
