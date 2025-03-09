import React, { useEffect, useRef } from 'react';

// Componente principal de Data Analytics
const DataAnalyticsContent = () => {
  const canvasRef = useRef(null);

  // Efecto interactivo de fondo con partículas
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
      {/* Canvas de fondo interactivo */}
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
                  <span className="relative z-10">TRANSFORMA</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse"></span>
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  TUS DATOS
                </span>
              </h1>
              <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mt-2 text-white">
                <span className="relative">
                  <span className="relative z-10">EN INFORMACIÓN ACCIONABLE</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse animation-delay-1000"></span>
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-cyan-100 mb-10 font-light tracking-wide">
              Soluciones analíticas avanzadas para impulsar decisiones inteligentes
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="/evaluacion-gratuita" 
                className="group relative overflow-hidden rounded-full py-4 px-8 bg-transparent border border-cyan-500 text-cyan-400 font-bold"
              >
                <span className="relative z-10">Descubre el Potencial</span>
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-transform duration-300 ease-in-out"></span>
              </a>
              
              <a 
                href="/contacto" 
                className="group relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20"
              >
                <span className="relative z-10">Solicita una Consulta</span>
                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300 ease-in-out"></span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Formas geométricas decorativas */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-cyan-500/20 animate-spin-slow"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 rounded-full border-2 border-blue-500/20 animate-reverse-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-cyan-400/30 transform rotate-45 animate-pulse"></div>
      </section>
      {/* Sección de Introducción con Tarjeta Holográfica */}
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
                En <span className="font-bold text-cyan-400">JM AI Consulting</span>, ofrecemos servicios especializados de consultoría en 
                <span className="font-bold text-cyan-400"> Data Analytics</span> para ayudar a las organizaciones a aprovechar el poder de los datos 
                y convertirlos en conocimientos valiosos que impulsen el crecimiento y mejoren la eficiencia operativa.
              </p>
              
              <p className="text-lg text-gray-300 relative z-10">
                Ya sea que necesites analizar grandes volúmenes de datos, identificar patrones ocultos o crear visualizaciones interactivas, 
                estamos aquí para acompañarte en cada paso del proceso, <span className="font-bold text-cyan-400">transformando tus datos en decisiones estratégicas</span> 
                que potencian tu ventaja competitiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios con Tarjetas 3D */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-black text-center mb-4 text-white">
            Nuestros Servicios <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Analíticos</span>
          </h2>
          
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Servicio 1: Visualización de Datos */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-cyan-400">Visualización de Datos e Informes Interactivos</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Facilitamos la interpretación de datos complejos mediante la creación de dashboards visuales y 
                    reportes interactivos que permiten a los tomadores de decisiones acceder a información clave de 
                    forma clara y precisa.
                  </p>
                  
                  <a href="/servicios/visualizacion" className="mt-6 text-cyan-400 group-hover:text-cyan-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Servicio 2: Análisis Predictivo */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-blue-400">Análisis Predictivo y Prescriptivo</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Utilizamos modelos avanzados de análisis predictivo para ayudarte a prever tendencias futuras 
                    basadas en datos históricos. Además, implementamos análisis prescriptivo que no solo muestra lo 
                    que probablemente sucederá, sino también las acciones más recomendadas.
                  </p>
                  
                  <a href="/servicios/predictivo" className="mt-6 text-blue-400 group-hover:text-blue-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Servicio 3: Minería de Datos */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-purple-400">Minería de Datos y Descubrimiento de Patrones</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Aprovechamos técnicas avanzadas de minería de datos para identificar patrones, correlaciones y 
                    oportunidades ocultas en tus bases de datos. Al profundizar en grandes volúmenes de información, 
                    descubrimos insights clave que pueden no ser visibles a simple vista.
                  </p>
                  
                  <a href="/servicios/mineria" className="mt-6 text-purple-400 group-hover:text-purple-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Servicio 4: Automatización de Procesos */}
            <div className="group h-96">
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-pink-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex justify-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 shadow-lg shadow-pink-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-pink-400">Automatización de Procesos Analíticos</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Te ayudamos a automatizar procesos repetitivos en la gestión y análisis de datos, permitiendo que tu 
                    equipo se concentre en tareas de mayor valor. Implementamos soluciones que recopilan, procesan y 
                    analizan datos de forma automatizada, reduciendo el tiempo y esfuerzo requerido.
                  </p>
                  
                  <a href="/servicios/automatizacion-analitica" className="mt-6 text-pink-400 group-hover:text-pink-300 text-sm font-semibold flex items-center">
                    Conoce más
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Servicio 5: Optimización del Rendimiento */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-amber-400">Optimización del Rendimiento Empresarial</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    Convertimos los datos en un activo estratégico que impulsa el rendimiento de tu negocio. 
                    Analizamos indicadores clave de desempeño (KPIs) en áreas como marketing, ventas, operaciones y 
                    finanzas, brindándote una visión clara sobre dónde mejorar, reducir costos y maximizar la eficiencia.
                  </p>
                  
                  <a href="/servicios/optimizacion" className="mt-6 text-amber-400 group-hover:text-amber-300 text-sm font-semibold flex items-center">
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
      {/* Sección de Stack Tecnológico */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        {/* Formas animadas */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white">
              Tecnologías <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Avanzadas</span>
            </h2>
            
            <div className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-8"></div>
            
            <p className="text-xl text-gray-300">
              Utilizamos las herramientas más innovadoras y potentes del mercado para potenciar tus análisis
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
            {/* Tech Stack Item 1 */}
            <div className="group">
              <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-sm p-6 border border-gray-800/50 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl transform group-hover:scale-150 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-cyan-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-cyan-400">Machine Learning</h3>
              </div>
            </div>
            
            {/* Tech Stack Item 2 */}
            <div className="group">
              <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-sm p-6 border border-gray-800/50 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl transform group-hover:scale-150 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-blue-400">Big Data</h3>
              </div>
            </div>
            
            {/* Tech Stack Item 3 */}
            <div className="group">
              <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-sm p-6 border border-gray-800/50 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl transform group-hover:scale-150 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0018 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-purple-400">Visualización</h3>
              </div>
            </div>
            
            {/* Tech Stack Item 4 */}
            <div className="group">
              <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-sm p-6 border border-gray-800/50 transition-all duration-300 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl transform group-hover:scale-150 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-pink-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-pink-400">IA Avanzada</h3>
              </div>
            </div>
            
            {/* Tech Stack Item 5 */}
            <div className="group">
              <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-sm p-6 border border-gray-800/50 transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl transform group-hover:scale-150 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-amber-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-amber-400">Cloud Analytics</h3>
              </div>
            </div>
            
            {/* Tech Stack Item 6 */}
            <div className="group">
              <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-sm p-6 border border-gray-800/50 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl transform group-hover:scale-150 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-center text-lg font-semibold text-green-400">Data Security</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de Casos de Éxito */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-white">
              Casos de <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Éxito</span>
            </h2>
            
            <div className="h-1 w-40 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-8"></div>
            
            <p className="text-xl text-gray-300">
              Descubre cómo hemos ayudado a empresas a transformar sus datos en resultados tangibles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Caso de Éxito 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    Optimización de Ventas
                  </h3>
                  <p className="text-gray-300">
                    Una empresa de retail con presencia internacional logró incrementar sus ventas en un 32% 
                    implementando nuestras soluciones de análisis predictivo para identificar oportunidades 
                    de venta cruzada y optimizar la gestión de inventario.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-cyan-400 font-semibold">Retail Internacional</p>
                      <p className="text-gray-400 text-sm">+32% Ventas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Caso de Éxito 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    Reducción de Fraude
                  </h3>
                  <p className="text-gray-300">
                    Una entidad financiera logró reducir los casos de fraude en un 78% gracias a nuestra 
                    solución de detección de anomalías basada en machine learning, generando ahorros 
                    significativos y mejorando la experiencia de sus clientes.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-blue-400 font-semibold">Entidad Financiera</p>
                      <p className="text-gray-400 text-sm">-78% Fraude</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Caso de Éxito 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative h-full flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                    Análisis en Tiempo Real
                  </h3>
                  <p className="text-gray-300">
                    Una empresa de logística implementó nuestro sistema de análisis en tiempo real para monitorear 
                    su flota y optimizar rutas, logrando una reducción del 25% en tiempos de entrega y un ahorro 
                    del 18% en costos operativos.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold">Empresa Logística</p>
                      <p className="text-gray-400 text-sm">-25% Tiempos de Entrega</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sección CTA (Llamada a la acción) */}
      <section className="py-24 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-blue-950"></div>
        
        {/* Formas animadas */}
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
              
              {/* Efecto de borde brillante */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
              
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                  ¿Listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">transformar tus datos</span>?
                </h2>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-8"></div>
                
                <p className="text-xl text-gray-300 mb-10">
                  Te ayudamos a implementar soluciones de Data Analytics que te permitirán tomar decisiones 
                  más inteligentes y mejorar el rendimiento general de tu negocio
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/evaluacion-gratuita" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>¡Comienza Ahora!</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  </a>
                  
                  <a 
                    href="/demo-virtual" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-transparent border border-cyan-500 text-cyan-400 font-bold"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>Solicitar Demo</span>
                    </span>
                    <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 transition-transform duration-300 ease-in-out"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cursor personalizado y efectos flotantes */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Estos elementos crean un efecto de partículas flotantes futuristas que siguen al cursor */}
        <div className="cursor-follower"></div>
        <div className="cursor-glow"></div>
      </div>
      
      {/* Animación flotante global */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 -left-32 top-1/4 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-72 h-72 -right-36 top-2/3 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute w-72 h-72 left-1/3 bottom-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Estilos adicionales (estarían en una etiqueta style en una implementación real) */}
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

export default DataAnalyticsContent;