import React from 'react';

const ServiceCircle = ({ title, icon, isMain = false, description = '', buttonText = '', onClick, isActive = false }) => {
  // Círculo principal (central)
  if (isMain) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full w-full h-full flex flex-col items-center justify-center text-white p-6 text-center z-10 shadow-xl shadow-blue-900/20 border border-blue-400/30 backdrop-blur-lg relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-blue-400 opacity-20 blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-indigo-400 opacity-20 blur-xl"></div>
        
        {/* Círculos pequeños decorativos */}
        <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-blue-300"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 rounded-full bg-blue-300"></div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4 relative">
          {title}
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-300 rounded-full opacity-70"></span>
        </h2>
        
        <p className="text-sm md:text-base mb-6 text-blue-100">{description}</p>
        
        {buttonText && (
          <button
            onClick={onClick}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm opacity-60 group-hover:opacity-90 transition duration-300"></div>
            <div className="relative border-2 border-white px-6 py-2 rounded-full text-sm md:text-base font-medium bg-blue-600 group-hover:bg-blue-700 transition-colors">
              {buttonText}
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all duration-300">→</span>
            </div>
          </button>
        )}
      </div>
    );
  }
  
  // Círculos secundarios (orbitales)
  return (
    <div className="text-center transition-all duration-300 transform hover:scale-110">
      <div 
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto cursor-pointer transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-700 shadow-lg shadow-blue-500/30 border-2 border-blue-300/50 scale-110' 
            : 'bg-gray-800/80 hover:bg-gray-700/80 border border-blue-500/30'}`}
        onClick={onClick}
      >
        <div className={`w-8 h-8 md:w-10 md:h-10 text-white ${isActive ? 'text-white' : 'text-blue-400'}`}>
          {icon}
        </div>
      </div>
      <div className={`text-center mt-2 text-xs md:text-sm font-medium transition-all duration-300 
        ${isActive ? 'text-blue-300' : 'text-gray-300'}`}>
        {title}
      </div>
    </div>
  );
};

export default ServiceCirle;