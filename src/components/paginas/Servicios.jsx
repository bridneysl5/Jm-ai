import React from 'react';

const Servicios = () => (
  <div className="bg-gradient-to-b from-[#06080C] to-[#0d111a] min-h-screen py-16 relative overflow-hidden">
    {/* Efectos de fondo animados */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-purple-900/10 to-transparent"></div>
      
      {/* Círculos decorativos que se mueven lentamente */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 animate-pulse" style={{animationDuration: '15s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 animate-pulse" style={{animationDuration: '10s'}}></div>
      
      {/* Líneas de cuadrícula para un aspecto más tecnológico */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L3N2Zz4=')]"></div>
    </div>

    {/* Partículas flotantes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Partículas pequeñas */}
      <div className="absolute h-2 w-2 rounded-full bg-cyan-400/30 top-1/4 left-1/4 animate-pulse" style={{animationDuration: '4s'}}></div>
      <div className="absolute h-3 w-3 rounded-full bg-blue-400/20 top-1/3 right-1/3 animate-pulse" style={{animationDuration: '7s'}}></div>
      <div className="absolute h-2 w-2 rounded-full bg-purple-400/30 bottom-1/4 right-1/4 animate-pulse" style={{animationDuration: '5s'}}></div>
      <div className="absolute h-4 w-4 rounded-full bg-cyan-400/20 bottom-1/3 left-1/3 animate-pulse" style={{animationDuration: '6s'}}></div>
      
      {/* Líneas flotantes */}
      <div className="absolute h-px w-32 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 top-1/2 left-1/4 animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute h-px w-48 bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-blue-400/0 bottom-1/3 right-1/3 animate-pulse" style={{animationDuration: '9s'}}></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Nuestros Servicios
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Soluciones avanzadas para transformar y optimizar sus procesos de negocio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Tarjeta 5 - Sistemas de Gestión */}
        <div className="group relative">
          {/* Fondo con efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          
          {/* Borde con efecto de brillo */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
          
          {/* Contenido de la tarjeta */}
          <div className="relative bg-[#0f1521] border border-cyan-800/30 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
            <div className="relative mb-8">
              {/* Círculo de fondo con animación */}
              <div className="absolute -inset-2 bg-cyan-500/10 rounded-full blur-sm group-hover:animate-pulse"></div>
              
              {/* Ícono */}
              <div className="relative z-10 text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">Sistemas de Gestión</h3>
            
            <p className="text-gray-400 mb-6 flex-grow">
              Diseñamos e implementamos sistemas de gestión integrados basados en estándares internacionales (ISO 9001, ISO 14001, ISO 27001, entre otros) para mejorar el desempeño organizacional.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Implementación de ISO 9001</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Sistemas de gestión integrados</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Auditorías y mejora continua</span>
              </li>
            </ul>
            
            <div className="flex justify-center">
              <a href="/mas-informacion" className="relative inline-flex items-center group/btn">
                <span className="relative z-10 inline-flex items-center text-cyan-400 font-medium group-hover/btn:text-white px-4 py-2 transition-colors duration-300">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 scale-x-0 rounded-full group-hover/btn:scale-x-100 group-hover/btn:scale-y-100 bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Tarjeta 1 - Gestión por Procesos */}
        <div className="group relative">
          {/* Fondo con efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-green-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          
          {/* Borde con efecto de brillo */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
          
          {/* Contenido de la tarjeta */}
          <div className="relative bg-[#0f1521] border border-teal-800/30 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-2xl group-hover:shadow-teal-500/10">
            <div className="relative mb-8">
              {/* Círculo de fondo con animación */}
              <div className="absolute -inset-2 bg-teal-500/10 rounded-full blur-sm group-hover:animate-pulse"></div>
              
              {/* Ícono */}
              <div className="relative z-10 text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">Gestión por Procesos</h3>
            
            <p className="text-gray-400 mb-6 flex-grow">
              Analizamos, diseñamos y optimizamos los procesos organizacionales para mejorar la eficiencia y reducir costos. Implementamos metodologías ágiles y mejores prácticas de BPM.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-2">
                <span className="text-teal-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Mapeo y documentación de procesos</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Análisis y rediseño de procesos</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-teal-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Automatización de flujos de trabajo</span>
              </li>
            </ul>
            
            <div className="flex justify-center">
              <a href="/mas-informacion" className="relative inline-flex items-center group/btn">
                <span className="relative z-10 inline-flex items-center text-teal-400 font-medium group-hover/btn:text-white px-4 py-2 transition-colors duration-300">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 scale-x-0 rounded-full group-hover/btn:scale-x-100 group-hover/btn:scale-y-100 bg-gradient-to-r from-teal-500 to-green-600 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 - Data Analytics */}
        <div className="group relative">
          {/* Fondo con efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          
          {/* Borde con efecto de brillo */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
          
          {/* Contenido de la tarjeta */}
          <div className="relative bg-[#0f1521] border border-blue-800/30 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-2xl group-hover:shadow-blue-500/10">
            <div className="relative mb-8">
              {/* Círculo de fondo con animación */}
              <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-sm group-hover:animate-pulse"></div>
              
              {/* Ícono */}
              <div className="relative z-10 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">Data Analytics</h3>
            
            <p className="text-gray-400 mb-6 flex-grow">
              Transformamos sus datos en información valiosa para la toma de decisiones estratégicas. Utilizamos técnicas avanzadas de análisis y visualización para generar insights accionables.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Business Intelligence</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Visualización de datos interactiva</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Análisis predictivo y prescriptivo</span>
              </li>
            </ul>
            
            <div className="flex justify-center">
              <a href="/mas-informacion" className="relative inline-flex items-center group/btn">
                <span className="relative z-10 inline-flex items-center text-blue-400 font-medium group-hover/btn:text-white px-4 py-2 transition-colors duration-300">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 scale-x-0 rounded-full group-hover/btn:scale-x-100 group-hover/btn:scale-y-100 bg-gradient-to-r from-blue-500 to-indigo-600 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 - Transformación Digital */}
        <div className="group relative">
          {/* Fondo con efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          
          {/* Borde con efecto de brillo */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
          
          {/* Contenido de la tarjeta */}
          <div className="relative bg-[#0f1521] border border-purple-800/30 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-2xl group-hover:shadow-purple-500/10">
            <div className="relative mb-8">
              {/* Círculo de fondo con animación */}
              <div className="absolute -inset-2 bg-purple-500/10 rounded-full blur-sm group-hover:animate-pulse"></div>
              
              {/* Ícono */}
              <div className="relative z-10 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">Transformación Digital</h3>
            
            <p className="text-gray-400 mb-6 flex-grow">
              Guiamos a su organización en el camino hacia la digitalización. Desarrollamos estrategias para integrar tecnologías disruptivas que mejoren sus operaciones y experiencia de cliente.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-2">
                <span className="text-purple-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Estrategia de transformación digital</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Adopción de nuevas tecnologías</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-gray-300">Innovación y cultura digital</span>
              </li>
            </ul>
            
            <div className="flex justify-center">
              <a href="/mas-informacion" className="relative inline-flex items-center group/btn">
                <span className="relative z-10 inline-flex items-center text-purple-400 font-medium group-hover/btn:text-white px-4 py-2 transition-colors duration-300">
                  Más información
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 scale-x-0 rounded-full group-hover/btn:scale-x-100 group-hover/btn:scale-y-100 bg-gradient-to-r from-purple-500 to-pink-600 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Tarjeta 4 - Gestión de Riesgos */}
        <div className="group relative">
          {/* Fondo con efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          
          {/* Borde con efecto de brillo */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
          
          {/* Contenido de la tarjeta */}
          <div className="relative bg-[#0f1521] border border-yellow-800/30 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
            <div className="relative mb-8">
              {/* Círculo de fondo con animación */}
              <div className="absolute -inset-2 bg-yellow-500/10 rounded-full blur-sm group-hover:animate-pulse"></div>
             
             {/* Ícono */}
             <div className="relative z-10 text-yellow-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                 <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                 <line x1="12" y1="9" x2="12" y2="13"></line>
                 <line x1="12" y1="17" x2="12.01" y2="17"></line>
               </svg>
             </div>
           </div>
           
           <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">Gestión de Riesgos</h3>
           
           <p className="text-gray-400 mb-6 flex-grow">
             Identificamos, evaluamos y mitigamos los riesgos operacionales y estratégicos de su organización. Implementamos sistemas de gestión de riesgos alineados con estándares internacionales.
           </p>
           
           <ul className="space-y-3 mb-8">
             <li className="flex items-start space-x-2">
               <span className="text-yellow-400 mt-1 flex-shrink-0">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                 </svg>
               </span>
               <span className="text-gray-300">Evaluación y análisis de riesgos</span>
             </li>
             <li className="flex items-start space-x-2">
               <span className="text-yellow-400 mt-1 flex-shrink-0">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                 </svg>
               </span>
               <span className="text-gray-300">Planes de continuidad de negocio</span>
             </li>
             <li className="flex items-start space-x-2">
               <span className="text-yellow-400 mt-1 flex-shrink-0">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                 </svg>
               </span>
               <span className="text-gray-300">Cumplimiento regulatorio</span>
             </li>
           </ul>
           
           <div className="flex justify-center">
             <a href="/mas-informacion" className="relative inline-flex items-center group/btn">
               <span className="relative z-10 inline-flex items-center text-yellow-400 font-medium group-hover/btn:text-white px-4 py-2 transition-colors duration-300">
                 Más información
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                 </svg>
               </span>
               <span className="absolute inset-0 scale-x-0 rounded-full group-hover/btn:scale-x-100 group-hover/btn:scale-y-100 bg-gradient-to-r from-yellow-500 to-orange-600 transition-transform duration-300 origin-left"></span>
             </a>
           </div>
         </div>
       </div>
     </div>
   </div>
   
   {/* Partículas flotantes adicionales en la parte inferior */}
   <div className="absolute bottom-0 w-full h-24 overflow-hidden">
     <div className="absolute h-2 w-2 rounded-full bg-teal-400/30 bottom-8 left-1/6 animate-pulse" style={{animationDuration: '3s'}}></div>
     <div className="absolute h-3 w-3 rounded-full bg-purple-400/30 bottom-12 left-1/3 animate-pulse" style={{animationDuration: '5s'}}></div>
     <div className="absolute h-2 w-2 rounded-full bg-yellow-400/30 bottom-16 right-1/4 animate-pulse" style={{animationDuration: '4s'}}></div>
     <div className="absolute h-1 w-1 rounded-full bg-blue-400/30 bottom-6 right-1/3 animate-pulse" style={{animationDuration: '6s'}}></div>
   </div>
 </div>
);

export default Servicios;