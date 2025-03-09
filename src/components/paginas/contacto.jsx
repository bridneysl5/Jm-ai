import React, { useState, useEffect } from 'react';

const FuturisticContact = () => {
  const [formState, setFormState] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    consulta: '',
    politica: false,
    marketing: false
  });
  
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // Animation effect for particles
  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 20) {
        setParticles(prev => [
          ...prev,
          {
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 5 + 2,
            duration: Math.random() * 15 + 5,
            delay: Math.random() * 5
          }
        ]);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [particles]);
  
  // Remove old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(Math.max(prev.length - 20, 0)));
    }, 10000);
    
    return () => clearInterval(cleanup);
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleFocus = (field) => {
    setActiveField(field);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success message
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          nombre: '',
          correo: '',
          asunto: '',
          consulta: '',
          politica: false,
          marketing: false
        });
      }, 3000);
    }, 2000);
  };
  
  // Custom icons using SVGs instead of lucide-react
  const IconMail = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
  
  const IconPhone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
  
  const IconSend = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
  
  const IconCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
  
  // Custom styles for animation (alternative to using @keyframes in CSS)
  const floatAnimation = {
    animation: 'float 10s ease-in-out infinite alternate',
  };
  
  // We'll add a style tag for our animations
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 0.8; }
        100% { opacity: 0.6; }
      }
      
      .particle {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(59, 130, 246, 0.3);
        animation: float var(--duration) ease-in-out var(--delay) infinite alternate;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);
  
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white overflow-hidden">
      {/* Animated particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Glowing circle background effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600 filter blur-3xl opacity-20" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-teal-500 filter blur-3xl opacity-10" />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight pt-[4%]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              CONTACTO
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full" />
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch gap-8 max-w-6xl mx-auto">
          {/* Left side - Contact info */}
          <div className="lg:w-2/5 backdrop-blur-lg bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-gray-800">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-400">CONTÁCTANOS</h3>
              
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-black opacity-30" />
                <img 
                  src="/api/placeholder/600/400" 
                  alt="JM AI Consulting"
                  className="w-full h-48 object-cover rounded-xl" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <p className="text-lg font-bold">JM AI Consulting</p>
                </div>
              </div>
            </div>
            
            <p className="mb-6 text-gray-300">
              En JM AI Consulting, estamos listos para acompañarte en cada paso hacia la transformación digital de tu empresa. Si tienes alguna pregunta, inquietud o deseas conocer más sobre cómo podemos ayudarte a alcanzar tus objetivos, no dudes en contactarnos.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:hola@jmaiconsulting.pe" className="flex items-center group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 bg-opacity-50 border border-blue-700 mr-4 group-hover:bg-blue-700 transition-all duration-300">
                  <IconMail />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Correo</p>
                  <p className="text-lg font-medium text-blue-400">hola@jmaiconsulting.pe</p>
                </div>
              </a>
              
              <a href="tel:914811842" className="flex items-center group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 bg-opacity-50 border border-blue-700 mr-4 group-hover:bg-blue-700 transition-all duration-300">
                  <IconPhone />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-lg font-medium text-blue-400">914811842</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="lg:w-3/5 backdrop-blur-lg bg-gray-900 bg-opacity-50 rounded-2xl p-8 border border-gray-800">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-green-600 bg-opacity-20 flex items-center justify-center mb-6">
                  <IconCheck />
                </div>
                <h3 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-400 mb-6">Gracias por contactarnos. Te responderemos a la brevedad posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className={`relative border ${activeField === 'nombre' ? 'border-blue-500' : 'border-gray-700'} rounded-xl overflow-hidden transition-all duration-300`}>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={formState.nombre}
                      onChange={handleChange}
                      onFocus={() => handleFocus('nombre')}
                      onBlur={handleBlur}
                      placeholder="Nombre y Apellidos"
                      className="w-full px-5 py-4 bg-transparent text-white outline-none"
                      required
                    />
                    {activeField === 'nombre' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500" />
                    )}
                  </div>
                  
                  <div className={`relative border ${activeField === 'correo' ? 'border-blue-500' : 'border-gray-700'} rounded-xl overflow-hidden transition-all duration-300`}>
                    <input
                      type="email"
                      name="correo"
                      id="correo"
                      value={formState.correo}
                      onChange={handleChange}
                      onFocus={() => handleFocus('correo')}
                      onBlur={handleBlur}
                      placeholder="Correo"
                      className="w-full px-5 py-4 bg-transparent text-white outline-none"
                      required
                    />
                    {activeField === 'correo' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500" />
                    )}
                  </div>
                  
                  <div className={`relative border ${activeField === 'asunto' ? 'border-blue-500' : 'border-gray-700'} rounded-xl overflow-hidden transition-all duration-300`}>
                    <input
                      type="text"
                      name="asunto"
                      id="asunto"
                      value={formState.asunto}
                      onChange={handleChange}
                      onFocus={() => handleFocus('asunto')}
                      onBlur={handleBlur}
                      placeholder="Asunto"
                      className="w-full px-5 py-4 bg-transparent text-white outline-none"
                      required
                    />
                    {activeField === 'asunto' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500" />
                    )}
                  </div>
                  
                  <div className={`relative border ${activeField === 'consulta' ? 'border-blue-500' : 'border-gray-700'} rounded-xl overflow-hidden transition-all duration-300`}>
                    <textarea
                      name="consulta"
                      id="consulta"
                      value={formState.consulta}
                      onChange={handleChange}
                      onFocus={() => handleFocus('consulta')}
                      onBlur={handleBlur}
                      placeholder="Escribe tu Consulta"
                      rows="5"
                      className="w-full px-5 py-4 bg-transparent text-white outline-none resize-none"
                      required
                    />
                    {activeField === 'consulta' && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="politica"
                        checked={formState.politica}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className={`w-5 h-5 border ${formState.politica ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-gray-600'} rounded transition-colors`} />
                      {formState.politica && (
                        <svg className="absolute text-white w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-gray-300">
                      He leído y acepto la <a href="#" className="text-blue-400 hover:underline">política de privacidad</a>
                    </div>
                  </label>
                  
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        name="marketing"
                        checked={formState.marketing}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border ${formState.marketing ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-gray-600'} rounded transition-colors`} />
                      {formState.marketing && (
                        <svg className="absolute text-white w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-gray-300">
                      Acepto recibir información sobre <span className="text-blue-400">productos, servicios y beneficios</span>
                    </div>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center transition-all duration-300 ${isSubmitting ? 'opacity-80' : ''}`}
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar 
                        <span className="ml-2">
                          <IconSend />
                        </span>
                      </>
                    )}
                  </span>
                  
                  {/* Button particle effects */}
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  <span className="absolute -left-10 w-20 h-full transform rotate-12 translate-x-0 group-hover:translate-x-full transition-all duration-700 bg-white opacity-10" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticContact;