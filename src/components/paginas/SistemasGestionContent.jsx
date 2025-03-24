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
            ctx.strokeStyle = `rgba(64, 106, 255, ${0.1 - distance / 1000})`;
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
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white">
                <span className="relative">
                  <span className="relative z-10">IMPLEMENTA ESTÁNDARES</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 blur-xl opacity-30 animate-pulse"></span>
                </span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  INTERNACIONALES
                </span>
              </h1>
              <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mt-2 text-white">
                <span className="relative">
                  <span className="relative z-10">Y AUMENTA TU COMPETITIVIDAD</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 blur-xl opacity-30 animate-pulse animation-delay-1000"></span>
                </span>
              </h2>
            </div>
          </div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-blue-500/20 animate-spin-slow"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 rounded-full border-2 border-indigo-500/20 animate-reverse-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-blue-400/30 transform rotate-45 animate-pulse"></div>
      </section>
      
      {/* Intro Section with Holographic Card */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto perspective">
            <div className="relative holographic-card bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-blue-500/20">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
              </div>
              
              <p className="text-lg text-gray-300 mb-6 relative z-10">
                En <span className="font-bold text-blue-400">JM AI Consulting</span>, somos expertos en la implementación, mejora y mantenimiento de sistemas de gestión bajo las normas más reconocidas a nivel mundial. Nuestro enfoque se adapta a las necesidades particulares de cada organización, garantizando soluciones personalizadas y efectivas que impulsan a mejorar la calidad de sus productos y servicios, aumentar la satisfacción del cliente, identificar y gestionar los riesgos y oportunidades, demostrar su compromiso con la calidad, optimizar sus procesos, mejorar continuamente su desempeño, facilitar el cumplimiento de requisitos legales y reglamentarios aplicables, fortalecer la comunicación interna y externa, involucrar y comprometer a su personal, entre otros.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section with Cards */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* ISO 9001 Card */}
            <div className="group">
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-xl font-bold">Consultoría en ISO 9001 - Sistema de Gestión de la Calidad</h3>
                  </div>
                  
                  <p className="text-gray-300">
                    Ayudamos a tu empresa a establecer un sistema de gestión de la calidad robusto, que no solo cumple con los requisitos de la norma ISO 9001, sino que también mejora la satisfacción de tus clientes, reduciendo errores y optimizando tus procesos. Nuestro equipo te guiará en la implementación de herramientas que garantizan la mejora continua en todas las áreas de tu organización
                  </p>
                </div>
              </div>
            </div>
            
            {/* ISO 37001 Card */}
            <div className="group">
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex-shrink-0 bg-indigo-600 text-white p-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-xl font-bold">Consultoría en ISO 37001 - Sistema de Gestión Antisoborno</h3>
                  </div>
                  
                  <p className="text-gray-300">
                    Protege la integridad de tu empresa y fortalece su reputación implementando un sistema de gestión antisoborno conforme a ISO 37001. Diseñamos y ejecutamos un marco de control que asegura que tus procesos estén alineados con las mejores prácticas internacionales, minimizando el riesgo de actos de corrupción o soborno
                  </p>
                </div>
              </div>
            </div>
            
            {/* ISO 27001 Card */}
            <div className="group">
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex-shrink-0 bg-purple-600 text-white p-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-xl font-bold">Consultoría en ISO 27001 - Sistema de Gestión de la Seguridad de la Información</h3>
                  </div>
                  
                  <p className="text-gray-300">
                    La protección de los datos es esencial en el entorno digital actual. Te ayudamos a implementar un sistema de gestión de la seguridad de la información basado en la norma ISO 27001. Con nuestras soluciones, asegurarás la confidencialidad, integridad y disponibilidad de tu información y la de tus clientes, fortaleciendo la confianza y el cumplimiento legal
                  </p>
                </div>
              </div>
            </div>
            
            {/* ISO 45001 Card */}
            <div className="group">
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-pink-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex-shrink-0 bg-pink-600 text-white p-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-xl font-bold">Consultoría en ISO 45001 - Sistema de Gestión de Seguridad y Salud en el Trabajo</h3>
                  </div>
                  
                  <p className="text-gray-300">
                    La seguridad de tus empleados es fundamental para el éxito a largo plazo de tu empresa. Nuestros expertos te guiarán en la implementación de un sistema de gestión de seguridad y salud en el trabajo bajo la norma ISO 45001, para reducir accidentes laborales, mejorar las condiciones de trabajo y cumplir con la legislación vigente
                  </p>
                </div>
              </div>
            </div>
            
            {/* ISO 14001 Card */}
            <div className="group md:col-span-2">
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 p-1 transition-all duration-500 hover:scale-[1.03] hover:shadow-xl hover:shadow-green-500/10">
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.1),transparent_70%)]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex flex-col p-6 rounded-xl bg-gray-900/90 backdrop-blur-sm">
                  <div className="flex-shrink-0 bg-green-600 text-white p-4 rounded-lg mb-4 inline-block">
                    <h3 className="text-xl font-bold">Consultoría en ISO 14001 - Sistema de Gestión Ambiental</h3>
                  </div>
                  
                  <p className="text-gray-300">
                    Comprométete con el medio ambiente implementando un sistema de gestión ambiental que cumpla con los requisitos de la norma ISO 14001. Te ayudamos a identificar los impactos ambientales de tus operaciones, a establecer estrategias sostenibles y garantizar el cumplimiento con las regulaciones ambientales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-indigo-950"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/40 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-gray-800/50 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              
              {/* Glowing Edge Effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
              
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
                  ¿Listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">aumentar tu competitividad</span>?
                </h2>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 mb-8"></div>
                
                <p className="text-xl text-gray-300 mb-10">
                  Descubre cómo podemos ayudarte a implementar un sistema de gestión que impulse tu éxito empresarial.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a 
                    href="#contacto" 
                    className="group w-full sm:w-auto relative overflow-hidden rounded-full py-4 px-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span>Contáctanos</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                  </a>
                  
                  <a href="https://wa.me/TUNUMERO" className="w-16 h-16 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:shadow-green-500/40 transform transition-all duration-300 hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
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
        <div className="absolute w-64 h-64 -left-32 top-1/4 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-72 h-72 -right-36 top-2/3 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000"></div>
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
          background-color: rgba(59, 130, 246, 0.5);
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
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
        }
      `}</style>
      </div>
  );
};

export default SistemasGestionContent;