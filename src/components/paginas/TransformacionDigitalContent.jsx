import React, { useEffect, useRef } from 'react';

const TransformacionDigitalContent = () => {
  const canvasRef = useRef(null);

  // Interactive background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(
          Math.random() * 50 + 50
        )}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particlesCount = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < particlesCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-black">
      {/* Interactive Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 relative">
              <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-2 text-white">
                <span className="relative">
                  <span className="relative z-10">Transforma tus datos</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse"></span>
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                en información accionable
                </span>
              </h1>
              <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mt-2 text-white">
                <span className="relative">
                  <span className="relative z-10">y mejora la toma de decisiones</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse animation-delay-1000"></span>
                </span>
              </h2>
            </div>
          
            
            
          </div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-cyan-500/20 animate-spin-slow"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 rounded-full border-2 border-blue-500/20 animate-reverse-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-cyan-400/30 transform rotate-45 animate-pulse"></div>
      </section>
      {/* Intro Section with Holographic Card */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto perspective">
            <div className="relative holographic-card bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-cyan-500/20">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-sky-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
              </div>
              
              <p className="text-lg text-gray-300 mb-6 relative z-10">
                En <span className="font-bold text-cyan-400">JM AI Consulting</span>, te ofrecemos un servicio de consultoría integral en transformación digital, diseñado para guiar a tu organización, ya sea privada o pública ,
                <span className="font-bold text-cyan-400">  a maximizar las oportunidades</span> del mundo digital. Entendemos que la
              </p>
              
              <p className="text-lg text-gray-300 relative z-10">
              transformación digital es un proceso continuo,
                <span className="font-bold text-cyan-400">  disruptivo y estratégico de cambio organizativo y cultural,</span>  que se sustenta en el uso intensivo de tecnologías digitales y el análisis de datos para generar valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with 3D Cards */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-black text-center mb-4 text-white">
            Nuestras <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Soluciones Digitales</span>
          </h2>
          
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service Card 1 - Estrategia Digital */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6, 182, 212, 0.3),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-cyan-400">Diagnóstico y Evaluación Inicial</h3>
                  
                  <p className="text-gray-300 flex-grow">
                  Análisis de la situación actual y principales desafíos.
                  Identificación de oportunidades en relación con la estrategia organizacional y las directrices nacionales de transformación digital.
                  </p>
                  
                 
                </div>
              </div>
            </div>
            
            {/* Service Card 2 - Automatización de Procesos */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-400">Definición de la Visión y Estrategia Digital</h3>
                  
                  <p className="text-gray-300 flex-grow">
                  Colaboramos para establecer objetivos claros y metas SMART.
                  Diseñamos una estrategia integral que potencie la innovación y garantice un impacto medible.
                  </p>
                  
                
                </div>
              </div>
            </div>
            {/* Service Card 3 - Análisis de Datos e IA */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-sky-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-pink-500 shadow-lg shadow-sky-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-sky-400">Diseño y Planificación de la Implementació</h3>
                  
                  <p className="text-gray-300 flex-grow">
                  Seleccionamos las tecnologías adecuadas (Big Data, IA, etc.).
                  Elaboramos un plan de implementación y adopción con metodologías ágiles
                  </p>
                  
                  
                </div>
              </div>
            </div>
            
            {/* Service Card 4 - Desarrollo de Software */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-400">Implementación y Ejecución</h3>
                  
                  <p className="text-gray-300 flex-grow">
                  Desplegamos soluciones digitales, gestionamos el cambio y capacitamos al talento.
                  Fomentamos la participación ciudadana o de usuarios en la mejora de procesos.
                  </p>
                  
                 
                </div>
              </div>
            </div>
            
            {/* Service Card 5 - Ciberseguridad */}
            <div className="group h-96 md:col-span-2 lg:col-span-1">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 shadow-lg shadow-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-400">Monitoreo y Optimización Continua</h3>
                  
                  <p className="text-gray-300 flex-grow">
                  Seguimiento de KPIs, retroalimentación y ajustes estratégicos.
                  </p>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-cyan-950"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/40 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-gray-800/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              
              {/* Glowing Edge Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
              
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                ¿Estás listo para iniciar tu viaje hacia la <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">transformación digita</span> con JM AI Consulting
                </h2>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-8"></div>
                
                <p className="text-xl text-gray-300 mb-10">
                Nuestras propuestas abarcan tanto organizaciones privadas como instituciones públicas, impulsando la competitividad, la transparencia y la eficiencia.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/contacto" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>Contáctanos Ahora</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  </a>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Custom Cursor and Floating Effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* These elements create a futuristic floating particle effect that follows the cursor */}
        <div className="cursor-follower"></div>
        <div className="cursor-glow"></div>
      </div>
      
      {/* Global Floating Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 -left-32 top-1/4 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-72 h-72 -right-36 top-2/3 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute w-72 h-72 left-1/3 bottom-0 bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Additional Styles (would be in a style tag in a real implementation) */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        
        .animate-reverse-spin-slow {
          animation: spin 20s linear infinite reverse;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #334155 1px, transparent 1px),
                            linear-gradient(to bottom, #334155 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .holographic-card {
          transform-style: preserve-3d;
          transition: transform 0.5s;
        }
        
        .holographic-card:hover {
          transform: rotateX(5deg) rotateY(5deg);
        }
        
        .cursor-follower {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(6, 182, 212, 0.3);
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          pointer-events: none;
          transition: width 0.3s, height 0.3s;
          z-index: 9999;
        }
        
        .cursor-glow {
          position: fixed;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
        }
      `}</style>
    </div>
  );
};

export default TransformacionDigitalContent;