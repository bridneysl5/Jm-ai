import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone, MdSecurity, MdPrivacyTip } from 'react-icons/md';
import { HiDocumentText } from 'react-icons/hi';
import { RiCopyrightLine } from 'react-icons/ri';

// SOLUCIÓN PARA EL LOGO:
// Opción 1: Importación directa con ruta relativa
// import logoImage from '../../../public/images/services/logo-jm-ai-consulting.png';

// Opción 2: Usar una URL absoluta
const logoImage = '/images/services/logo-jm-ai-consulting.png';

const ModernFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Actualiza el año si es necesario
    const interval = setInterval(() => {
      const year = new Date().getFullYear();
      if (currentYear !== year) {
        setCurrentYear(year);
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [currentYear]);

  // Función para volver al inicio suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-600 mix-blend-overlay blur-3xl opacity-10"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-cyan-500 mix-blend-overlay blur-3xl opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Botón circular para volver arriba - CORREGIDO: Z-INDEX Y POSICIÓN */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
        <button 
          onClick={scrollToTop} 
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1"
          aria-label="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
      
      {/* Contenido principal del footer */}
      <div className={`container mx-auto px-4 py-12 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              {/* SOLUCION PARA EL LOGO: Agregar fallback y altura mínima */}
              <div className="h-16 mb-4 relative">
                <img 
                  src={logoImage} 
                  alt="JM AI Consulting" 
                  className="h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x60/0b5591/ffffff?text=JM+AI+CONSULTING';
                    console.error('Error al cargar el logo, usando imagen de respaldo');
                  }} 
                />
              </div>
              <p className="text-gray-400 text-sm mb-6 text-center md:text-left">
                Soluciones innovadoras en gestión de procesos, transformación digital y análisis de datos para impulsar el éxito de tu organización.
              </p>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/JM.AI.Consulting.Latam" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <FaFacebookF className="text-white" />
                </a>
                <a href="https://www.linkedin.com/company/jmaiconsulting/?viewAsMember=true" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <FaLinkedinIn className="text-white" />
                </a>
                <a href="https://www.instagram.com/jmai_consulting?igsh=anBudzF2Z2hydTI2" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaInstagram className="text-white" />
                </a>
                <a href="https://www.tiktok.com/@jmai_consulting" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black transition-colors">
                  <FaTiktok className="text-white" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Links de servicios */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Servicios
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/servicios/gestion-por-procesos" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Gestión por Procesos
                </a>
              </li>
              <li>
                <a href="/servicios/data-analytics" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Data Analytics
                </a>
              </li>
              <li>
                <a href="/servicios/sistemas-gestion" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Sistemas de Gestión ISO
                </a>
              </li>
              <li>
                <a href="/servicios/transformacion-digital" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Transformación Digital
                </a>
              </li>
              <li>
                <a href="/servicios/gestion-riesgos" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Gestión de Riesgos
                </a>
              </li>
              <li>
                <a href="/servicios/bpm" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  BPM
                </a>
              </li>
              <li>
                <a href="/servicios/sistemas-gestion" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Sistemas de Gestión
                </a>
              </li>
              <li>
                <a href="/servicios/conocimiento" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Gestión del Conocimiento
                </a>
              </li>
            </ul>
          </div>
          
          {/* Links importantes */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Enlaces
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/osotros" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/evaluacion-gratuita" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  EVALUACIÓN GRATUITA
                </a>
              </li>
              
              <li>
                <a href="/recursos" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Recursos y Podcast
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Contacto
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+51999999999" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-start">
                  <MdPhone className="text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <span>+51 914 811 842</span>
                </a>
              </li>
              <li>
                <a href="mailto:contacto@jmaiconsulting.pe" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-start">
                  <MdEmail className="text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <span>contacto@jmaiconsulting.pe</span>
                </a>
              </li>
            
              <li>
                <a href="https://wa.me/51914811842" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-start">
                  <FaWhatsapp className="text-cyan-500 mt-1 mr-3 flex-shrink-0" />
                  <span>WhatsApp Business</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Barra legal - CORREGIDO: COLOR MÁS CLARO */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <a href="/politicas/sig" className="text-xs text-gray-400 hover:text-cyan-400 flex items-center transition-colors">
                <MdSecurity className="mr-1" /> Política del SIG
              </a>
              <a href="/politicas/datos-personales" className="text-xs text-gray-400 hover:text-cyan-400 flex items-center transition-colors">
                <MdPrivacyTip className="mr-1" /> Tratamiento de datos personales
              </a>
              <a href="/politicas/privacidad" className="text-xs text-gray-400 hover:text-cyan-400 flex items-center transition-colors">
                <MdPrivacyTip className="mr-1" /> Política de privacidad
              </a>
              <a href="/politicas/reclamaciones" className="text-xs text-gray-400 hover:text-cyan-400 flex items-center transition-colors">
                <HiDocumentText className="mr-1" /> Libro de reclamaciones
              </a>
            </div>
            
            <div className="flex items-center text-xs text-gray-400">
              <RiCopyrightLine className="mr-1" /> 
              <span>{currentYear} JM AI Consulting. Todos los derechos reservados.</span>
            </div>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-400">
            <p>Creado por <a href="https://websumaq.com" className="text-cyan-500 hover:text-cyan-400 transition-colors">Websumaq</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;