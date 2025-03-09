import React, { useState } from 'react';

const RecursosPage = () => {
  // Estado para la categoría activa
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  // Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState('');
  
  // Datos de ejemplo para los recursos
  const recursos = [
    {
      id: 1,
      titulo: 'Agente IA para Análisis Predictivo',
      descripcion: 'Herramienta avanzada para análisis predictivo en negocios',
      categoria: 'agentes-ia',
      imagen: '/img/recursos/agente-ia-1.jpg',
      enlace: '/recursos/agente-ia-predictivo',
      tipo: 'descargable',
      fecha: '2025-02-15'
    },
    {
      id: 2,
      titulo: 'Estadísticas de Transformación Digital 2025',
      descripcion: 'Informe completo sobre tendencias de transformación digital',
      categoria: 'estadisticas',
      imagen: '/img/recursos/estadisticas-2025.jpg',
      enlace: '/recursos/estadisticas-transformacion-2025.pdf',
      tipo: 'pdf',
      fecha: '2025-01-20'
    },
    {
      id: 3,
      titulo: 'Dashboard Interactivo de IA',
      descripcion: 'Dashboard personalizable para monitoreo de proyectos IA',
      categoria: 'herramientas',
      imagen: '/img/recursos/dashboard-ia.jpg',
      enlace: '/recursos/dashboard-ia',
      tipo: 'aplicacion',
      fecha: '2024-12-10'
    },
    {
      id: 4,
      titulo: 'Guía de Implementación IA Ética',
      descripcion: 'Manual práctico para implementar IA con principios éticos',
      categoria: 'guias',
      imagen: '/img/recursos/guia-ia-etica.jpg',
      enlace: '/recursos/guia-ia-etica.pdf',
      tipo: 'pdf',
      fecha: '2025-03-01'
    },
    {
      id: 5,
      titulo: 'Dataset de Comportamiento de Usuario',
      descripcion: 'Dataset anonimizado para entrenar modelos de comportamiento',
      categoria: 'estadisticas',
      imagen: '/img/recursos/dataset-usuarios.jpg',
      enlace: '/recursos/dataset-comportamiento-usuarios.zip',
      tipo: 'dataset',
      fecha: '2024-11-30'
    },
    {
      id: 6,
      titulo: 'Asistente Virtual Corporativo',
      descripcion: 'Agente IA personalizable para asistencia empresarial',
      categoria: 'agentes-ia',
      imagen: '/img/recursos/asistente-virtual.jpg',
      enlace: '/recursos/asistente-corporativo',
      tipo: 'descargable',
      fecha: '2025-02-28'
    },
  ];

  // Filtrar recursos según la categoría seleccionada y término de búsqueda
  const recursosFiltrados = recursos
    .filter(recurso => categoriaActiva === 'todos' || recurso.categoria === categoriaActiva)
    .filter(recurso => 
      busqueda === '' || 
      recurso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );

  // Definir las categorías disponibles
  const categorias = [
    { id: 'todos', nombre: 'Todos los recursos', icono: '🔍' },
    { id: 'agentes-ia', nombre: 'Agentes IA', icono: '🤖' },
    { id: 'estadisticas', nombre: 'Estadísticas', icono: '📊' },
    { id: 'guias', nombre: 'Guías y Manuales', icono: '📚' },
    { id: 'herramientas', nombre: 'Herramientas', icono: '🔧' },
  ];

  // Iconos para los tipos de recursos
  const obtenerIcono = (tipo) => {
    switch(tipo) {
      case 'pdf': return '📄';
      case 'descargable': return '⬇️';
      case 'dataset': return '📊';
      case 'aplicacion': return '🖥️';
      default: return '📌';
    }
  };

  return (
    <div className="w-full bg-gray-900 text-white min-h-screen">
      {/* Header con efecto de gradiente y partículas */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-950 py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,theme(colors.cyan.500/10%)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="pt-[4%] text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Biblioteca de Recursos
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explora nuestra colección de herramientas, guías y datasets para potenciar tu transformación digital
          </p>
          
          {/* Barra de búsqueda */}
          <div className="mt-8 max-w-xl mx-auto flex">
            <input 
              type="text" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar recursos..." 
              className="w-full px-5 py-3 text-gray-900 bg-white/10 backdrop-blur-lg border border-gray-700 rounded-l-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-r-full font-medium transition duration-200 hover:shadow-lg hover:shadow-cyan-500/20">
              Buscar
            </button>
          </div>
        </div>
      </div>
      
      {/* Filtros de categorías */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaActiva(categoria.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${categoriaActiva === categoria.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <span>{categoria.icono}</span>
              {categoria.nombre}
            </button>
          ))}
        </div>
        
        {/* Grid de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursosFiltrados.length > 0 ? (
            recursosFiltrados.map((recurso) => (
              <div 
                key={recurso.id}
                className="bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recurso.imagen} 
                    alt={recurso.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full">
                    <span className="text-lg">{obtenerIcono(recurso.tipo)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {recurso.titulo}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {recurso.descripcion}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{recurso.fecha}</span>
                    <a 
                      href={recurso.enlace} 
                      className="inline-flex items-center px-4 py-2 bg-cyan-600/30 text-cyan-400 rounded-lg hover:bg-cyan-600/50 transition-all duration-200"
                    >
                      Acceder
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-300">No se encontraron recursos</h3>
              <p className="mt-1 text-gray-400">Intenta con otros términos de búsqueda o categorías.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecursosPage;