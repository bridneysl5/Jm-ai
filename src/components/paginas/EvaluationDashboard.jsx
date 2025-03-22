import React, { useState, useEffect } from 'react';

const FuturisticEvaluationDashboard = () => {
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [animatingCard, setAnimatingCard] = useState(null);

  // Datos de las evaluaciones - Nombres actualizados según requerimiento
  const evaluations = [
    {
      id: 'bpm-maturity',
      title: 'Nivel de Madurez de BPM',
      description: 'Evalúa el nivel de madurez en la gestión de procesos de negocio según el modelo de P. Robledo (2014)',
      image: 'https://jmaiconsulting.pe/wp-content/uploads/2024/10/BPMM-imagen.png',
      color: '#00ffff',
      gradient: 'from-cyan-400 via-blue-500 to-blue-600',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      particles: 120
    },
    {
      id: 'pcm-gestion-procesos',
      title: 'EVALUACIÓN DE MADUREZ EN LA IMPLEMENTACIÓN DE LA GESTIÓN POR PROCESOS BAJO LA NORMA TÉCNICA N° 002-2025-PCM/SGP',
      description: 'Evaluación según la Norma Técnica N° 002-2025-PCM/SGP',
      image: 'https://jmaiconsulting.pe/wp-content/uploads/2024/10/gestion-procesos.png',
      color: '#00ffe0',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      particles: 150
    },
    {
      id: 'sgc-iso-9001',
      title: 'EVALUACIÓN DE MADUREZ EN LA IMPLEMENTACIÓN DEL SGC BAJO LA NORMA ISO 9001',
      description: 'Analiza el nivel de madurez en la implementación del Sistema de Gestión de Calidad',
      image: 'https://jmaiconsulting.pe/wp-content/uploads/2024/10/transformacion-digital.png',
      color: '#8080ff',
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      particles: 180
    }
  ];

  // Efecto de carga inicial
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Seguimiento de posición del mouse para efectos de parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Manejo de navegación a evaluación
  const navigateToEvaluation = (evaluationId) => {
    setAnimatingCard(evaluationId);
    setTimeout(() => {
      // Aquí definimos las rutas reales para cada evaluación
      const routes = {
        'bpm-maturity': '/evaluacion-bpm',
        'pcm-gestion-procesos': '/evaluacion-gestion-procesos',
        'sgc-iso-9001': '/evaluacion-sgc-iso9001'
      };
      
      // Redirigir a la página correspondiente
      window.location.href = routes[evaluationId];
    }, 800);
  };

  // Volver al dashboard
  const returnToDashboard = () => {
    setSelectedEvaluation(null);
  };

  // Generar partículas para el fondo
  const generateParticles = (count, color) => {
    return Array.from({ length: count }).map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full animate-float"
        style={{ 
          top: `${Math.random() * 100}%`, 
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 1}px`,
          height: `${Math.random() * 4 + 1}px`,
          opacity: 0.1 + Math.random() * 0.3,
          backgroundColor: color,
          boxShadow: `0 0 ${Math.random() * 10 + 5}px ${color}`,
          animationDuration: `${Math.random() * 15 + 15}s`,
          animationDelay: `${Math.random() * 5}s`
        }}
      ></div>
    ));
  };

  // Si está cargando, muestra animación de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-t-transparent border-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-t-transparent border-b-transparent border-purple-500 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute inset-4 border-4 border-b-transparent border-emerald-500 rounded-full animate-spin-slow"></div>
        </div>
        <div className="mt-8 text-cyan-500 font-mono text-lg animate-pulse">Inicializando sistema de evaluación...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-gray-950 to-gray-900 text-white relative overflow-hidden">
      {/* Fondo futurista */}
      <div className="absolute inset-0 z-0">
        {/* Grid de fondo */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            backgroundPosition: `${mousePosition.x * 10}px ${mousePosition.y * 10}px`,
            transition: 'background-position 0.1s ease-out'
          }}
        ></div>
        
        {/* Gradiente radial */}
        <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 via-transparent to-black/50"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {selectedEvaluation ? 
            generateParticles(
              evaluations.find(e => e.id === selectedEvaluation)?.particles || 120, 
              evaluations.find(e => e.id === selectedEvaluation)?.color || '#00ffff'
            ) : 
            generateParticles(80, '#00ffff')
          }
        </div>
        
        {/* Líneas de escaneo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className="absolute h-px w-full opacity-30"
              style={{
                top: `${30 + i * 20}%`,
                background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)',
                animation: `scanline 8s linear infinite ${i * 2}s`,
                transform: 'translateX(-100%)'
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Header con título de página */}
        <div className="mb-8 flex justify-center items-center">
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pb-1">
              {selectedEvaluation ? 
                evaluations.find(e => e.id === selectedEvaluation)?.title :
                "Evaluaciones de Madurez"}
            </h1>
            <div className="h-px w-full bg-gradient-to-r from-cyan-500 to-transparent"></div>
            
            {/* Efecto de escaneo bajo el título */}
            <div className="absolute bottom-0 h-px w-20 bg-cyan-500 animate-travel-slow"></div>
          </div>
          
          {selectedEvaluation && (
            <button 
              onClick={returnToDashboard}
              className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-full hover:bg-gray-700/50 transition-all duration-300"
            >
              <svg className="w-5 h-5 text-cyan-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-medium">Volver</span>
            </button>
          )}
        </div>
        
        {/* Contenido principal - Dashboard o evaluación específica */}
        <div className="flex-grow">
          {selectedEvaluation ? (
            // Placeholder para la evaluación seleccionada
            <div className="w-full h-full flex items-center justify-center animate-fade-in">
              <div className="text-center p-12 max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-4 border border-gray-700 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 text-cyan-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={evaluations.find(e => e.id === selectedEvaluation)?.icon} />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-1 text-white"
                  style={{ fontSize: evaluations.find(e => e.id === selectedEvaluation)?.title.length > 40 ? '1.5rem' : '1.5rem' }}>
                  {evaluations.find(e => e.id === selectedEvaluation)?.title}
                </h2>
                
                {evaluations.find(e => e.id === selectedEvaluation)?.subtitle && (
                  <div className="mb-4 text-lg font-medium text-gray-400">
                    {evaluations.find(e => e.id === selectedEvaluation)?.subtitle}
                  </div>
                )}
                <p className="text-gray-400 mb-8">
                  Evaluación en desarrollo. Próximamente podrás acceder a esta evaluación.
                </p>
                
                <div className="flex justify-center">
                  <button 
                    onClick={returnToDashboard}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-full text-white font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20"
                  >
                    Volver al Dashboard
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Dashboard con tarjetas de evaluación
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {evaluations.map((evaluation) => (
                <div
                  key={evaluation.id}
                  onClick={() => navigateToEvaluation(evaluation.id)}
                  className={`group relative bg-gray-900/30 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-lg hover:shadow-${evaluation.color.replace('#', '')}/20 
                    ${animatingCard === evaluation.id ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}
                  style={{
                    transform: mousePosition.x ? `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)` : 'none',
                    transition: 'transform 0.3s ease-out, opacity 0.5s ease-out, scale 0.5s ease-out'
                  }}
                >
                  {/* Overlay del borde con brillo */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-xl" style={{ 
                      background: `linear-gradient(45deg, transparent, ${evaluation.color}20, transparent)`,
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease infinite'
                    }}></div>
                  </div>
                  
                  {/* Imagen de fondo con efecto parallax */}
                  <div className="h-48 overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"
                    ></div>
                    <img 
                      src={evaluation.image} 
                      alt={evaluation.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{
                        transform: `translateX(${(mousePosition.x - 0.5) * -10}px) translateY(${(mousePosition.y - 0.5) * -10}px)`,
                      }}
                    />
                    
                    {/* Partículas específicas de la tarjeta */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute w-1 h-1 rounded-full"
                          style={{ 
                            top: `${Math.random() * 100}%`, 
                            left: `${Math.random() * 100}%`,
                            backgroundColor: evaluation.color,
                            boxShadow: `0 0 5px ${evaluation.color}`,
                            opacity: 0.5,
                            animation: `float-card ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contenido de la tarjeta */}
                  <div className="p-6 relative z-20">
                    {/* Icono de categoría */}
                    <div className="absolute -top-8 right-6 bg-gray-900 rounded-full p-3 border border-gray-800 shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                      <svg 
                        className={`w-6 h-6 text-gradient bg-gradient-to-r ${evaluation.gradient} bg-clip-text`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={evaluation.icon} />
                      </svg>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-1 text-gradient bg-gradient-to-r ${evaluation.gradient} bg-clip-text transition-colors`}
                      style={{ fontSize: evaluation.title.length > 40 ? '0.9rem' : '1.25rem' }}>
                      {evaluation.title}
                    </h3>
                    
                    {evaluation.subtitle && (
                      <div className="mb-2 text-sm font-medium text-gray-400">
                        {evaluation.subtitle}
                      </div>
                    )}
                    
                    <p className="text-gray-400 mb-6 text-sm">
                      {evaluation.description}
                    </p>
                    
                    <div className="flex items-center mt-auto">
                      <span className="flex items-center text-cyan-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        Iniciar evaluación
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Estilo de animaciones */}
      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-25px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(15px); }
        }
        
        @keyframes float-card {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes travel-slow {
          0% { left: 0; }
          50% { left: calc(100% - 20px); }
          100% { left: 0; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .text-gradient {
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .animate-travel-slow {
          animation: travel-slow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default FuturisticEvaluationDashboard;