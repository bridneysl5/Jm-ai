import React, { useEffect, useRef } from 'react';

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
                  <span className="relative z-10">¡Impulsa tu Organización hacia el</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse"></span>
                </span>
              </h1>
              <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mt-2 text-white">
                <span className="relative">
                  <span className="relative z-10">Futuro Digital con JM AI Consulting!</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 animate-pulse animation-delay-1000"></span>
                </span>
              </h2>
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
                estamos aquí para acompañarte en cada paso del proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios con Tarjetas 3D */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Servicio 1: Análisis Predictivo */}
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
                    "Utilizamos modelos avanzados de análisis predictivo para ayudarte a prever tendencias futuras basadas en datos históricos. Además, implementamos análisis prescriptivo que no solo muestra lo que probablemente sucederá, sino también las acciones más recomendadas para lograr resultados óptimos. Estas soluciones te permiten anticiparte al mercado y tomar decisiones informadas con confianza."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Servicio 2: Minería de Datos */}
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
                    "Aprovechamos técnicas avanzadas de minería de datos para identificar patrones, correlaciones y oportunidades ocultas en tus bases de datos. Al profundizar en grandes volúmenes de información, descubrimos insights clave que pueden no ser visibles a simple vista, permitiéndote optimizar procesos, identificar oportunidades de negocio y mejorar la toma de decisiones."
                  </p>
                </div>
              </div>
            </div>
            
            {/* Servicio 3: Visualización de Datos */}
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
                    "Facilitamos la interpretación de datos complejos mediante la creación de dashboards visuales y reportes interactivos que permiten a los tomadores de decisiones acceder a información clave de forma clara y precisa. Estas visualizaciones te permitirán analizar grandes cantidades de datos en tiempo real, identificar tendencias, y tomar decisiones rápidas y bien fundamentadas."
                  </p>
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
                    "Te ayudamos a automatizar procesos repetitivos en la gestión y análisis de datos, permitiendo que tu equipo se concentre en tareas de mayor valor. Implementamos soluciones que recopilan, procesan y analizan datos de forma automatizada, reduciendo el tiempo y esfuerzo requerido para obtener información relevante, y asegurando que los datos estén siempre actualizados."
                  </p>
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
                  
                  <h3 className="text-xl font-bold mb-4 text-center text-amber-400">Optimización del Rendimiento Empresarial Basado en Datos</h3>
                  
                  <p className="text-gray-300 flex-grow">
                    "Convertimos los datos en un activo estratégico que impulsa el rendimiento de tu negocio. Analizamos indicadores clave de desempeño (KPIs) en áreas como marketing, ventas, operaciones y finanzas, brindándote una visión clara sobre dónde mejorar, reducir costos y maximizar la eficiencia. Te ayudamos a implementar una cultura organizacional basada en datos para tomar decisiones ágiles y mejorar el rendimiento general."
                  </p>
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
                  ¿Estás listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">transformar tus datos</span> en una fuente de ventaja competitiva?
                </h2>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 mb-8"></div>
                
                <p className="text-xl text-gray-300 mb-10">
                  Te ayudamos a implementar soluciones de Data Analytics que te permitirán tomar decisiones 
                  más inteligentes y mejorar el rendimiento general de tu negocio
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="/contacto" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>Contáctanos</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  </a>
                  
                  {/* Botón de WhatsApp */}
                  <a 
                    href="https://wa.me/51914811842?text=Hola,%20estoy%20interesado%20en%20sus%20servicios%20de%20Data%20Analytics.%20¿Podría%20recibir%20más%20información?" 
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/20"
                    title="Conversemos sobre cómo transformar tus datos en decisiones estratégicas"
                  >
                    {/* Logo de WhatsApp */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 text-white fill-current">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
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