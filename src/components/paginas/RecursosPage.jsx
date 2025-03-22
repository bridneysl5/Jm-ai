import React, { useState } from 'react';

const RecursosPage = () => {
  // Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState('');
  // Estado para la vista activa
  const [vistaActiva, setVistaActiva] = useState('todos');
  
  // Datos de los podcasts
  const podcasts = [
    {
      id: 1,
      titulo: 'IA: La Revolución de la Industria 4.0',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/2F8J0MMTkrFBeiRu1HaTrD?si=1hIPzN3ZSwq4F25MzwiVTQ'
    },
    {
      id: 2,
      titulo: 'Just In Time: Flujos de Producción Eficientes',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/1bKCvNDEz96wlqhHbNCgN8?si=awNn2YNVQri4V4FypffhFg'
    },
    {
      id: 3,
      titulo: 'La Magia del Método de las 5S',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/0MG7bns0gza3OGMuy2qRv2?si=S9OG67HWRmWa-LVbEscyoA'
    },
    {
      id: 4,
      titulo: 'Introducción a ISO 27001',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/3EMPCf0s3TaFNDEuKxOZQV?si=QQuq3EXfSpuhgVSxFnyEVw'
    },
    {
      id: 5,
      titulo: 'Liderazgo y habilidades de gestión en la era digital',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/4YTy2RyKVNZ8VpY1urbJr6?si=X7lt8BoOQUK1ZFo-RZkd3g'
    },
    {
      id: 6,
      titulo: 'El rol de la innovación en la competitiva empresarial',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/1W60OII1oTCCFMv2F873DY?si=ILX_KHYtTMOa6lDP8huFvQ'
    },
    {
      id: 7,
      titulo: 'La economía circular como modelo de negocio sostenible',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/4Lf6kMkuiSiWCy3IZc7nJ1?si=kWIuXON7RjWImvf7ZP73jw'
    },
    {
      id: 8,
      titulo: 'El uso estratégico de la inteligencia artificial en las empresas',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/6aZ734dWp2GpsBbgeRtT44?si=2i6SxEy-QDGZtUucNFtwDA'
    },
    {
      id: 9,
      titulo: 'El arte de asegurar calidad en los negocios',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/2jiv6SQZCx2LOQOmFBoHwc?si=hwyX2i1MSV-409YH-uBVTQ'
    },
    {
      id: 10,
      titulo: 'Gestión de la información SGC ISO 9001',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/2bza05pzL3Mr70KuzwqWdw?si=AzFHb--1T3GGIYNQY06A_w'
    },
    {
      id: 11,
      titulo: 'Gestión de riesgos en proyectos: el PMBOK como guía para el éxito',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/7JrBJFUJgEov2LAPkrWhid?si=-ijlMCYYSYWJfWJueLRwfw'
    },
    {
      id: 12,
      titulo: 'El poder de la autogestión en los negocios',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/35FMX1iFXffKUjsds6TykI?si=PTxdFvKxQZ2dvzOydBVbJA'
    },
    {
      id: 13,
      titulo: 'El ejecutivo eficaz, domina el arte del liderazgo personal',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/5ps7dsO4Hr6ZMCZDmhWFq8?si=m9HM1qY5QBuYJURrGA8Kcg'
    },
    {
      id: 14,
      titulo: 'Gestión de riesgos',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/0rmZcVyF18mcByONlcIpwc?si=9kWpnmSHT9aFVZlr-I8gsg'
    },
    {
      id: 15,
      titulo: 'Design thinking, metodologías para la innovación',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/15bA6OV7LjudmFAodmGoxY?si=FbobA5cNT76JthUW937aKg'
    },
    {
      id: 16,
      titulo: 'Scrum clave para proyectos exitosos',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/2DM6Dl004mVoWTHJBZWXZL?si=9ncFbEU-SGWwVXSYG5lNkw'
    },
    {
      id: 17,
      titulo: 'Administración de la calidad total TQM',
      plataforma: 'Spotify',
      enlace: 'https://open.spotify.com/episode/4hlLTR34jW2TWImCjaGv5m?si=Y_9sJIoqSAubb3crUebuHg'
    }
  ];
  
  // Datos del Dashboard ISO
  const dashboardISO = {
    titulo: 'Dashboard: Certificaciones ISO Global',
    descripcion: 'Visualización interactiva sobre distribución mundial de certificaciones ISO',
    stats: [
      { label: 'ISO 9001', value: '977,716' },
      { label: 'ISO 14001', value: '366,648' },
      { label: 'ISO 45001', value: '343,067' },
      { label: 'ISO 27001', value: '61,457' }
    ],
    icon: '📊',
    enlace: 'https://lookerstudio.google.com/embed/u/0/reporting/5e82d790-f914-41da-9df7-0d7ac998961c/page/3eXTE'
  };
  
  // Datos del Agente IA
  const robertGPT = {
    titulo: 'Robert: Experto en Contrataciones Públicas',
    descripcion: 'Asistente GPT especializado en Ley N.º 32069 y su Reglamento para contrataciones públicas en Perú',
    features: [
      'Principios y procedimientos de contratación pública',
      'Asesoría sobre requisitos y etapas del proceso',
      'Prevención de errores y sanciones',
      'Respuestas basadas en normativa vigente'
    ],
    icon: '🤖',
    enlace: 'https://lnkd.in/e-Bc5jiX'
  };
  
  // Datos de navegación
  const navItems = [
    { id: 'todos', nombre: 'Todos', icono: '🏠' },
    { id: 'podcasts', nombre: 'Podcasts', icono: '🎧' },
    { id: 'dashboard', nombre: 'Dashboard ISO', icono: '📊' },
    { id: 'agente-ia', nombre: 'Agente IA', icono: '🤖' }
  ];
  
  // Filtrar podcasts según término de búsqueda
  const podcastsFiltrados = podcasts.filter(podcast => 
    busqueda === '' || 
    podcast.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  
  return (
    <div className="w-full bg-gray-900 text-white min-h-screen">
      {/* Header con efecto de gradiente y partículas */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,theme(colors.cyan.500/10%)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Recursos Digitales
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestra colección de podcasts, dashboards y agentes IA
          </p>
          
          {/* Barra de búsqueda */}
          <div className="mt-8 max-w-xl mx-auto flex">
            <input 
              type="text" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar recursos..." 
              className="w-full px-5 py-3 text-white-900 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-r-full font-medium transition duration-200 hover:shadow-lg hover:shadow-cyan-500/20">
              Buscar
            </button>
          </div>
        </div>
      </div>
      
      {/* Navegación */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setVistaActiva(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${vistaActiva === item.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <span>{item.icono}</span>
              {item.nombre}
            </button>
          ))}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección de Recursos Destacados */}
        {(vistaActiva === 'todos' || vistaActiva === 'dashboard' || vistaActiva === 'agente-ia') && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-white inline-flex items-center">
              <span className="mr-2">✨</span> Recursos Destacados
              <div className="h-px w-32 bg-gradient-to-r from-cyan-500 to-transparent ml-4"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard ISO */}
              {(vistaActiva === 'todos' || vistaActiva === 'dashboard') && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-800/10 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="bg-gray-800 rounded-lg p-3 mr-4">
                        <span className="text-xl text-cyan-400">{dashboardISO.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{dashboardISO.titulo}</h3>
                        <p className="text-sm text-gray-400 mb-4">{dashboardISO.descripcion}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                      {dashboardISO.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-3 text-center">
                          <div className="text-cyan-400 font-bold text-xl">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <a 
                        href={dashboardISO.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
                      >
                        Explorar Recurso
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {/* Agente IA - Robert */}
              {(vistaActiva === 'todos' || vistaActiva === 'agente-ia') && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-800/10 transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="bg-gray-800 rounded-lg p-3 mr-4">
                        <span className="text-xl text-cyan-400">{robertGPT.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{robertGPT.titulo}</h3>
                        <p className="text-sm text-gray-400 mb-4">{robertGPT.descripcion}</p>
                      </div>
                    </div>
                    
                    <div className="my-6">
                      {robertGPT.features.map((feature, index) => (
                        <div key={index} className="flex items-start mb-3">
                          <span className="text-cyan-400 mr-2">✓</span>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <a 
                        href={robertGPT.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
                      >
                        Explorar Recurso
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Sección de Serie de Podcasts */}
        {(vistaActiva === 'todos' || vistaActiva === 'podcasts') && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                  <path d="M12 3C7.58 3 4 6.58 4 11V17C4 18.1 4.9 19 6 19H9V12C9 11.45 9.45 11 10 11C10.55 11 11 11.45 11 12V19H14V12C14 11.45 14.45 11 15 11C15.55 11 16 11.45 16 12V19H18C19.1 19 20 18.1 20 17V11C20 6.58 16.42 3 12 3Z" fill="#38BDF8"/>
                </svg>
                Serie de Podcasts
              </h2>
              <div className="ml-4 h-px bg-gradient-to-r from-cyan-500 to-transparent flex-grow"></div>
            </div>
            
            <div className="bg-gray-950 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {podcastsFiltrados.slice(0, 8).map((podcast) => (
                  <a 
                    key={podcast.id}
                    href={podcast.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/80 rounded-lg overflow-hidden hover:bg-gray-700/80 transition-all duration-200 flex flex-col group"
                  >
                    <div className="p-4">
                      <div className="mb-3 flex items-center text-cyan-400">
                        <span className="mr-2">●</span>
                        <span className="text-sm">Episodio</span>
                      </div>
                      <h3 className="font-medium mb-10 group-hover:text-cyan-400 flex-grow">{podcast.titulo}</h3>
                    </div>
                    <div className="mt-auto p-4 pt-0">
                      <div className="pt-3 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-sm text-gray-400">{podcast.plataforma}</span>
                        <span className="text-cyan-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            {vistaActiva === 'podcasts' && podcastsFiltrados.length > 8 && (
              <div className="bg-gray-950 rounded-xl p-8 mb-12">
                <h3 className="text-xl font-semibold mb-6 text-white">Más episodios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {podcastsFiltrados.slice(8, 16).map((podcast) => (
                    <a 
                      key={podcast.id}
                      href={podcast.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800/80 rounded-lg overflow-hidden hover:bg-gray-700/80 transition-all duration-200 flex flex-col group"
                    >
                      <div className="p-4">
                        <div className="mb-3 flex items-center text-cyan-400">
                          <span className="mr-2">●</span>
                          <span className="text-sm">Episodio</span>
                        </div>
                        <h3 className="font-medium mb-10 group-hover:text-cyan-400 flex-grow">{podcast.titulo}</h3>
                      </div>
                      <div className="mt-auto p-4 pt-0">
                        <div className="pt-3 border-t border-gray-700 flex justify-between items-center">
                          <span className="text-sm text-gray-400">{podcast.plataforma}</span>
                          <span className="text-cyan-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Banner de suscripción */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl py-12 px-8 mb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-6">
              <div className="bg-gray-900 rounded-full px-4 py-1 text-sm text-cyan-400">
                Mantente actualizado
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              ¿Quieres recibir nuestros nuevos recursos?
            </h2>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
              Suscríbete a nuestro boletín y recibirás información sobre nuevos dashboards, podcasts, 
              herramientas IA y recursos exclusivos directamente en tu bandeja de entrada.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-5 py-3 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full sm:rounded-r-full sm:rounded-l-none font-medium transition duration-200 hover:shadow-lg hover:shadow-cyan-500/20">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Recursos Digitales</h3>
              <p className="text-gray-400 mt-2">Una colección de herramientas para potenciar tu transformación digital</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <span>𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <span>in</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <span>f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <span>▶</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2025 Tu Empresa. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursosPage;