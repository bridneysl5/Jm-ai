import React, { useEffect, useRef } from 'react';

const SistemasGestionContent = () => {
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
        this.color = `rgba(${Math.floor(Math.random() * 50 + 0)}, ${Math.floor(
          Math.random() * 100 + 150
        )}, ${Math.floor(Math.random() * 100 + 150)}, ${Math.random() * 0.5 + 0.2})`;
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
            ctx.strokeStyle = `rgba(64, 206, 255, ${0.1 - distance / 1000})`;
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
                  <span className="relative z-10">IMPLEMENTA</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse"></span>
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  SISTEMAS DE GESTIÓN
                </span>
              </h1>
              <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mt-2 text-white">
                <span className="relative">
                  <span className="relative z-10">MEJORA TU COMPETITIVIDAD</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse animation-delay-1000"></span>
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-cyan-100 mb-10 font-light tracking-wide">
              Soluciones especializadas para implementar estándares internacionales que optimizan y mejoran tus procesos
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="/evaluacion-gratuita" 
                className="group relative overflow-hidden rounded-full py-4 px-8 bg-transparent border border-cyan-500 text-cyan-400 font-bold"
              >
                <span className="relative z-10">Evaluación Gratuita</span>
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-300 ease-in-out"></span>
              </a>
              
              <a 
                href="/contacto" 
                className="group relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20"
              >
                <span className="relative z-10">Contáctanos Ahora</span>
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300 ease-in-out"></span>
              </a>
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
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
              </div>
              
              <p className="text-lg text-gray-300 mb-6 relative z-10">
                En <span className="font-bold text-cyan-400">JM AI Consulting</span>, somos expertos en la 
                <span className="font-bold text-cyan-400"> implementación, mejora y mantenimiento</span> de sistemas de gestión bajo las normas más reconocidas a nivel mundial. 
              </p>
              
              <p className="text-lg text-gray-300 relative z-10">
                Nuestro enfoque se adapta a las necesidades particulares de cada organización, garantizando 
                <span className="font-bold text-cyan-400"> soluciones personalizadas y efectivas</span> que impulsan el crecimiento, la eficiencia y el cumplimiento normativo.
                Acompañamos a tu equipo en cada paso del proceso, desde el diagnóstico inicial hasta la certificación.
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
            Nuestros <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Sistemas de Gestión</span>
          </h2>
          
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service Card 1 - ISO 9001 */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,200,255,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-cyan-400">ISO 9001 - Sistema de Gestión de la Calidad</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Ayudamos a tu empresa a establecer un sistema de gestión de la calidad robusto, que no solo cumple con los requisitos de la norma ISO 9001, sino que también mejora la satisfacción de tus clientes, reduciendo errores y optimizando tus procesos.
                  </p>
                  
                  <a href="/servicios/iso-9001" className="mt-6 text-cyan-400 group-hover:text-cyan-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Service Card 2 - ISO 27001 */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,122,255,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-400">ISO 27001 - Sistema de Gestión de la Seguridad de la Información</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    La protección de los datos es esencial en el entorno digital actual. Te ayudamos a implementar un sistema de gestión de la seguridad de la información basado en la norma ISO 27001, asegurando la confidencialidad, integridad y disponibilidad de tu información.
                  </p>
                  
                  <a href="/servicios/iso-27001" className="mt-6 text-blue-400 group-hover:text-blue-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* Service Card 3 - ISO 37001 */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-purple-400">ISO 37001 - Sistema de Gestión Antisoborno</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Protege la integridad de tu empresa y fortalece su reputación implementando un sistema de gestión antisoborno conforme a ISO 37001. Diseñamos y ejecutamos un marco de control que asegura que tus procesos estén alineados con las mejores prácticas internacionales.
                  </p>
                  
                  <a href="/servicios/iso-37001" className="mt-6 text-purple-400 group-hover:text-purple-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Service Card 4 - ISO 14001 */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-green-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-green-400">ISO 14001 - Sistema de Gestión Ambiental</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Comprométete con el medio ambiente implementando un sistema de gestión ambiental que cumpla con los requisitos de la norma ISO 14001. Te ayudamos a identificar los impactos ambientales de tus operaciones, a establecer estrategias sostenibles y garantizar el cumplimiento con las regulaciones.
                  </p>
                  
                  <a href="/servicios/iso-14001" className="mt-6 text-green-400 group-hover:text-green-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Service Card 5 - ISO 45001 */}
            <div className="group h-96 md:col-span-2 lg:col-span-1">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-amber-400">ISO 45001 - Sistema de Gestión de Seguridad y Salud en el Trabajo</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    La seguridad de tus empleados es fundamental para el éxito a largo plazo de tu empresa. Nuestros expertos te guiarán en la implementación de un sistema de gestión de seguridad y salud en el trabajo bajo la norma ISO 45001, para reducir accidentes laborales y mejorar las condiciones de trabajo.
                  </p>
                  
                  <a href="/servicios/iso-45001" className="mt-6 text-amber-400 group-hover:text-amber-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-blue-950"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
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
                  ¿Listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Implementar</span> tus Sistemas?
                </h2>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-8"></div>
                
                <p className="text-xl text-gray-300 mb-10">
                  Contáctanos hoy y descubre cómo podemos ayudarte a implementar sistemas de gestión 
                  que aumenten tu competitividad y garanticen el cumplimiento normativo
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/evaluacion-gratuita" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>¡Evaluación Gratuita!</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  </a>
                  
                  <a 
                    href="/nuestro-proceso" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-transparent border border-cyan-500 text-cyan-400 font-bold"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>Nuestro Proceso</span>
                    </span>
                    <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 transition-transform duration-300 ease-in-out"></span>
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
        <div className="absolute w-72 h-72 left-1/3 bottom-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
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
          background-color: rgba(6, 182, 212, 0.5);
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

export default SistemasGestionContent;