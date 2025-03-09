import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';

// Contenido principal del componente que usará Tailwind CSS
const BpmMaturityForm = () => {
  // Estados para controlar la visualización de pasos
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [scores, setScores] = useState([]);
  const [results, setResults] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Mapeo de niveles de madurez
  const maturityLevels = {
    Inicial: 1.8,
    Gestionado: 2.6,
    Definido: 3.4,
    "Orientación por Procesos": 4.2,
    Excelencia: 5.0,
  };

  // Descripciones de los niveles de madurez por categoría (igual que antes)
  // Descripciones de los niveles de madurez por categoría
const descriptions = {
  Estrategia: {
    Inicial: "Ningún alineamiento de los procesos hacia la estrategia empresarial. No se están evaluando los procesos en cuanto a contribución hacia la estrategia empresarial.",
    Gestionado: "Se dispone de algunas métricas o KPIs del funcionamiento y rendimiento de algunos procesos y hay cierta estrategia de plan de mejora de esas métricas. También se dispone de métricas de rendimiento de recursos.",
    Definido: "Se dispone de un completo cuadro de mando de los procesos automatizados enlazado con la estrategia empresarial para tener capacidad de respuesta operativa del negocio.",
    "Orientación por Procesos": "Cuadros de mandos estratégicos y operativos relacionados con los procesos con capacidad de respuesta operativa del negocio rápida y ágil.",
    Excelencia: "Alineamiento completo de los procesos a la estrategia empresarial realizando una gestión predictiva, proactiva y reactiva del negocio en tiempo real. Alineación de la gestión por procesos con el resto de gestiones empresariales buscando siempre la excelencia."
  },
  Procesos: {
    Inicial: "No procesos en BPM, sólo Pilotos BPM.",
    Gestionado: "Pocos procesos en BPM. Mapa de procesos definido y documentado.",
    Definido: "Estrategia BPM definida y Roadmap de Procesos.",
    "Orientación por Procesos": "Automatización del 75% de los procesos de la organización en BPM.",
    Excelencia: "Procesos automatizados en BPM en toda la Organización."
  },
  Métodos: {
    Inicial: "No uso de metodologías.",
    Gestionado: "Uso de Notación formal para representar procesos BPM.",
    Definido: "Utilización de enfoque metodológico hacia procesos.",
    "Orientación por Procesos": "Utilización de metodología de Arquitectura Empresarial.",
    Excelencia: "Utilización de metodologías de mejora continua con BPM (Lean, Six Sigma, TOC)."
  },
  Tecnologías: {
    Inicial: "No uso de tecnología BPM y no seleccionada ninguna herramienta BPM.",
    Gestionado: "Uso de herramientas de Modelización y diseño de procesos.",
    Definido: "Utilización de BPMS para optimización de procesos.",
    "Orientación por Procesos": "Uso siempre de BPMS para automatización de procesos.",
    Excelencia: "Innovación tecnológica continua para satisfacer las nuevas demandas de la orientación a procesos y la dinámica del mercado."
  },
  Personas: {
    Inicial: "Falta de conocimiento BPM.",
    Gestionado: "Conocimientos fundamentales en BPM y en modelización y diseño de procesos. Cierta involucración de Dirección.",
    Definido: "Equipo mínimo formado. Definición de Roles y Responsabilidades de Procesos.",
    "Orientación por Procesos": "La Dirección realiza una Gestión de Procesos con conocimiento de la contribución de los procesos a la estrategia empresarial.",
    Excelencia: "RRHH gestiona los recursos humanos por su productividad y competencias en los procesos que participa."
  },
  Gobierno: {
    Inicial: "No compromiso Dirección. Difícil gestión de los cambios del mercado. No se evalúa la contribución de los procesos en la estrategia.",
    Gestionado: "Cierta involucración de la Dirección. Primeras métricas de rendimiento. Gestión de procesos para facilitar la gestión de cambios. Control de la implantación BPM.",
    Definido: "Equipo BPM. Gobierno mediante Cuadro de mando de los procesos automatizados. Uso de herramientas de Gobierno BPM.",
    "Orientación por Procesos": "Formación completa del Centro de Competencias y operativo. Implantación de herramientas de Gobierno para controlar y administrar la orientación por procesos.",
    Excelencia: "Gobierno de BPM alineado al Gobierno de otras gestiones empresariales (calidad, EFQM, Competencias ISO, Seguridad, RRHH, Riesgos, Prevención, Medio Ambiente…)."
  },
  Cultura: {
    Inicial: "No cultura de procesos.",
    Gestionado: "Asimilación conceptual de la filosofía BPM.",
    Definido: "Empresa mentalizada de la necesidad de orientación a procesos, definido plan de cambio cultural a procesos.",
    "Orientación por Procesos": "Empresa gestionada por procesos. Ejecución de la Gestión del Cambio hacia BPM.",
    Excelencia: "Organización orientada a procesos con un organigrama liderado por Dueños de Procesos alineados a la Estrategia Empresarial / Organizacional."
  }
};

  // Iniciar la evaluación
  const startEvaluation = () => {
    setShowIntro(false);
    loadFormState();
  };

  // Guardar el estado del formulario en localStorage
  const saveFormState = () => {
    const state = {
      formData,
      currentStep
    };
    localStorage.setItem("bpm_form_state", JSON.stringify(state));
  };

  // Cargar el estado del formulario desde localStorage
  const loadFormState = () => {
    const state = JSON.parse(localStorage.getItem("bpm_form_state"));
    if (state) {
      setFormData(state.formData || {});
      setCurrentStep(state.currentStep || 0);
    }
  };

  // Efecto para guardar el estado cuando cambia
  useEffect(() => {
    if (!showIntro) {
      saveFormState();
    }
  }, [formData, currentStep, showIntro]);

  // Manejar cambios en las opciones del formulario
  const handleOptionChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar cambios en el formulario de usuario
  const handleUserDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Ir al siguiente paso
  const goToNextStep = () => {
    const questionName = getQuestionNameForStep(currentStep);
    if (!formData[questionName]) {
      alert("Por favor, selecciona una respuesta antes de continuar.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // Ir al paso anterior
  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Obtener el nombre de la pregunta para el paso actual
  const getQuestionNameForStep = (step) => {
    const categoryIndex = Math.floor(step / 5) + 1;
    const questionIndex = (step % 5) + 1;
    return `bpm_q${categoryIndex}_${questionIndex}`;
  };

  // Enviar el formulario y calcular resultados
  const submitForm = (e) => {
    e.preventDefault();
    
    // Convertir respuestas a puntuaciones
    const calculatedScores = Object.entries(formData).map(([key, value]) => {
      let score;
      switch (value) {
        case "Nunca":
        case "Muy en desacuerdo":
        case "Sin importancia":
        case "0 al 20%":
          score = 1;
          break;
        case "Casi nunca":
        case "En desacuerdo":
        case "De poca importancia":
        case "21 al 40%":
          score = 2;
          break;
        case "En ocasiones":
        case "Neutral":
        case "Moderadamente importante":
        case "41 al 60%":
          score = 3;
          break;
        case "Casi siempre":
        case "De acuerdo":
        case "Importante":
        case "61 al 80%":
          score = 4;
          break;
        case "Siempre":
        case "Muy de acuerdo":
        case "Muy importante":
        case "81 al 100%":
          score = 5;
          break;
        default:
          score = 3;
      }
      return score;
    });
    
    setScores(calculatedScores);
    
    const totalScore = calculatedScores.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / calculatedScores.length;
    const percentage = (averageScore / 5) * 100;
    
    // Determinar nivel de madurez
    let maturityLevel;
    if (averageScore <= 1.8) {
      maturityLevel = "Inicial";
    } else if (averageScore <= 2.6) {
      maturityLevel = "Gestionado";
    } else if (averageScore <= 3.4) {
      maturityLevel = "Definido";
    } else if (averageScore <= 4.2) {
      maturityLevel = "Orientación por Procesos";
    } else {
      maturityLevel = "Excelencia";
    }
    
    setResults({
      totalScore,
      averageScore,
      percentage,
      maturityLevel,
      calculatedScores
    });
  };

  // Solicitar datos de usuario para descargar el informe
  const requestUserData = () => {
    setShowUserForm(true);
  };

  // Generar y descargar el PDF
// Generar y descargar el PDF
const generatePDF = () => {
  if (!results) return;
  
  try {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    const categories = [
      "Estrategia",
      "Procesos",
      "Métodos",
      "Tecnologías",
      "Personas",
      "Gobierno",
      "Cultura",
    ];
    
    // Encabezado
    doc.setFontSize(18);
    doc.setTextColor(0, 76, 153);
    doc.text("INFORME DE MADUREZ EN BPM", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70);
    doc.text(`Evaluado: ${userData.name}`, 20, 40);
    doc.text(`Correo: ${userData.email}`, 20, 50);
    doc.text(`Teléfono: ${userData.phone}`, 20, 60);
    
    if (userData.company) {
      doc.text(`Empresa: ${userData.company}`, 20, 70);
    }
    
    // Sección de madurez por categoría
    doc.setFontSize(16);
    doc.setTextColor(0, 76, 153);
    doc.text("MADUREZ POR CATEGORÍA", 105, 90, { align: 'center' });
    
    const startX = 20;
    let startY = 100;
    
    const colWidths = [35, 48, 20, 80];
    const rowHeight = 10;
    const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);
    
    // Cabecera de tabla
    doc.setFillColor(230, 230, 230);
    doc.rect(startX, startY, tableWidth, rowHeight, 'F');
    doc.setTextColor(0, 76, 153);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    
    let currentX = startX;
    ["Categoría", "Nivel", "Valor", "Descripción"].forEach(
      (header, index) => {
        doc.text(header, currentX + 2, startY + 7);
        currentX += colWidths[index];
      }
    );
    
    startY += rowHeight;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    
    // Agrupar scores por categorías (5 preguntas por categoría)
    const categoryScores = [];
    for (let i = 0; i < results.calculatedScores.length; i += 5) {
      const categoryScoresSlice = results.calculatedScores.slice(i, i + 5);
      const avgCategoryScore = categoryScoresSlice.reduce((sum, score) => sum + score, 0) / categoryScoresSlice.length;
      categoryScores.push(avgCategoryScore);
    }
    
    // Filas de la tabla
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const categoryScore = categoryScores[i] || 0;
      
      let categoryLevel = "Inicial";
      for (const [level, threshold] of Object.entries(maturityLevels)) {
        if (categoryScore <= threshold) {
          categoryLevel = level;
          break;
        }
      }
      
      // Evitar errores si la descripción no existe
      const categoryDescription = descriptions[category] && 
                               descriptions[category][categoryLevel] ? 
                               descriptions[category][categoryLevel] : 
                               "Descripción no disponible";
      
      doc.setFillColor(i % 2 === 0 ? 255 : 245);
      doc.rect(startX, startY, tableWidth, rowHeight, 'F');
      
      currentX = startX;
      
      // Categoria
      doc.text(category, currentX + 2, startY + 7);
      currentX += colWidths[0];
      
      // Nivel
      doc.text(categoryLevel, currentX + 2, startY + 7);
      currentX += colWidths[1];
      
      // Valor
      doc.text(categoryScore.toFixed(2), currentX + 2, startY + 7);
      currentX += colWidths[2];
      
      // Descripción - manejo texto largo
      const maxWidth = colWidths[3] - 4;
      const textLines = doc.splitTextToSize(categoryDescription, maxWidth);
      doc.text(textLines, currentX + 2, startY + 5);
      
      // Ajustar altura para la siguiente fila
      const textHeight = textLines.length * 5;
      startY += Math.max(rowHeight, textHeight);
      
      // Si estamos cerca del final de la página, añadimos una nueva
      if (startY > 270) {
        doc.addPage();
        startY = 20;
      }
    }
    
    // Nueva página para gráfico y resumen
    doc.addPage();
    
    startY = 20;
    doc.setFontSize(16);
    doc.setTextColor(0, 76, 153);
    doc.text("MADUREZ GENERAL", 105, startY, { align: 'center' });
    
    startY += 15;
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`Puntuación: ${results.totalScore}/${results.calculatedScores.length * 5}`, startX, startY);
    
    startY += 10;
    doc.text(`Promedio: ${results.averageScore.toFixed(2)}`, startX, startY);
    
    startY += 10;
    doc.text(`Porcentaje: ${results.percentage.toFixed(2)}%`, startX, startY);
    
    startY += 10;
    doc.text(`Resultado: ${results.maturityLevel}`, startX, startY);
    
    // Capturar gráfico como imagen - con verificación de seguridad
    if (chartInstance.current && chartInstance.current.canvas) {
      try {
        const canvas = chartInstance.current.canvas;
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 30, startY + 20, 150, 150);
      } catch (err) {
        console.error("Error al capturar el gráfico:", err);
        doc.text("No se pudo incluir el gráfico en el PDF", 105, startY + 80, { align: 'center' });
      }
    } else {
      doc.text("Gráfico no disponible", 105, startY + 80, { align: 'center' });
    }
    
    // Guardar el PDF
    doc.save("Informe_Madurez_BPM.pdf");
    
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Hubo un problema al generar el PDF. Por favor intente nuevamente.");
  }
};
  // Crear gráfico radar con los resultados
// Crear gráfico radar con los resultados
useEffect(() => {
  if (results && chartRef.current) {
    // Destruir gráfico anterior si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const categories = [
      "Estrategia",
      "Procesos",
      "Métodos",
      "Tecnologías",
      "Personas",
      "Gobierno",
      "Cultura",
    ];
    
    // Agrupar scores por categorías (5 preguntas por categoría)
    const categoryScores = [];
    for (let i = 0; i < results.calculatedScores.length; i += 5) {
      const categoryScoresSlice = results.calculatedScores.slice(i, i + 5);
      const avgCategoryScore = categoryScoresSlice.reduce((sum, score) => sum + score, 0) / categoryScoresSlice.length;
      categoryScores.push(avgCategoryScore);
    }
    
    // Asegurarnos de tener 7 valores (uno para cada categoría)
    while (categoryScores.length < 7) {
      categoryScores.push(0);
    }
    
    chartInstance.current = new Chart(chartRef.current, {
      type: "radar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Nivel de Madurez",
            data: categoryScores,
            fill: true,
            backgroundColor: "rgba(6, 182, 212, 0.2)",
            borderColor: "rgba(6, 182, 212, 1)",
            pointBackgroundColor: "rgba(6, 182, 212, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(6, 182, 212, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0.2
          }
        },
        scales: {
          r: {
            angleLines: {
              color: "rgba(255, 255, 255, 0.2)",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.2)",
            },
            pointLabels: {
              color: "rgba(255, 255, 255, 0.8)",
              font: {
                size: 14,
                weight: "bold"
              }
            },
            ticks: {
              backdropColor: "transparent",
              color: "rgba(255, 255, 255, 0.6)",
              z: 100
            },
            suggestedMin: 0,
            suggestedMax: 5,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.8)",
              font: {
                size: 14
              }
            }
          }
        }
      },
    });
  }
}, [results]);

  // Preguntas organizadas por secciones
// Preguntas organizadas por secciones (completo - 7 categorías)
const questions = [
  // Estrategia
  {
    title: "Estrategia",
    questions: [
      {
        id: "bpm_q1_1",
        text: "¿Se evalúan regularmente los procesos para determinar su contribución a los objetivos estratégicos de la organización?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Esta pregunta se refiere a si la organización revisa sistemáticamente sus procesos para asegurar que estén alineados y contribuyan a los objetivos generales y metas a largo plazo de la empresa."
      },
      {
        id: "bpm_q1_2",
        text: "¿Se disponen de métricas o KPIs del rendimiento de los procesos y los recursos involucrados, relacionados con objetivos empresariales?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Aquí se busca entender si la organización utiliza indicadores específicos y cuantificables para evaluar cómo los procesos y los recursos están ayudando a alcanzar los objetivos clave de la empresa."
      },
      {
        id: "bpm_q1_3",
        text: "¿Existe un cuadro de mando operativo basado en BPM que demuestre la capacidad de respuesta operativa de la organización?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Un cuadro de mando operativo es una herramienta visual que muestra en tiempo real cómo están funcionando los procesos clave de la organización, permitiendo una rápida toma de decisiones."
      },
      {
        id: "bpm_q1_4",
        text: "¿Se disponen de cuadros de mando para la gestión táctica y estratégica de los procesos de la organización?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta indaga si la organización utiliza cuadros de mando que no solo monitorean la operación diaria (gestión táctica) sino también el cumplimiento de objetivos a largo plazo (gestión estratégica)."
      },
      {
        id: "bpm_q1_5",
        text: "¿Se está realizando una gestión predictiva, proactiva y reactiva del negocio en tiempo real?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "La gestión predictiva, proactiva y reactiva implica anticipar y responder a los cambios en el entorno empresarial en tiempo real, tomando decisiones informadas para mantener o mejorar el rendimiento de los procesos."
      }
    ]
  },
  // Procesos
  {
    title: "Procesos",
    questions: [
      {
        id: "bpm_q2_1",
        text: "¿Se está realizando algún piloto de implantación de procesos en BPMS?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta se refiere a si la organización ha comenzado a probar o implementar un sistema de gestión por procesos (BPMS) en alguno de sus procesos clave."
      },
      {
        id: "bpm_q2_2",
        text: "¿Se dispone del Mapa de Procesos de la organización definido y documentado?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Un Mapa de Procesos es una representación gráfica o diagramática de los procesos clave de la organización, mostrando cómo interactúan entre sí y cómo contribuyen a los objetivos generales."
      },
      {
        id: "bpm_q2_3",
        text: "¿Existe una hoja de ruta clara para la mejora de procesos basada en una estrategia BPM definida?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Una hoja de ruta de mejora de procesos es un plan detallado que guía los pasos a seguir para optimizar los procesos, alineado con una estrategia específica de gestión por procesos (BPM)."
      },
      {
        id: "bpm_q2_4",
        text: "¿Qué porcentaje de procesos están identificados en BPMN?",
        options: ["81 al 100%", "61 al 80%", "41 al 60%", "21 al 40%", "0 al 20%"],
        note: "BPMN es una notación estándar para modelar procesos de negocio. Esta pregunta busca saber cuántos procesos de la organización están documentados utilizando esta metodología."
      },
      {
        id: "bpm_q2_5",
        text: "¿Qué porcentaje de procesos están \"hiperautomatizados\"?",
        options: ["81 al 100%", "61 al 80%", "41 al 60%", "21 al 40%", "0 al 20%"],
        note: "Hiperautomatización se refiere al uso de tecnologías avanzadas, como inteligencia artificial, para automatizar procesos de manera más eficiente. Aquí se pregunta cuántos procesos han sido mejorados con estas tecnologías."
      }
    ]
  },
  // Métodos
  {
    title: "Métodos",
    questions: [
      {
        id: "bpm_q3_1",
        text: "¿Se ha definido un metamodelo y se usan BPMN (Business Process Model & Notation) para modelar procesos de negocio y DMN (Decision Model & Notation) para modelar decisiones y reglas de negocio?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta verifica si la organización ha adoptado marcos y herramientas estándar (BPMN y DMN) para modelar tanto los procesos como las decisiones que los acompañan."
      },
      {
        id: "bpm_q3_2",
        text: "¿Se usa Metodología de Arquitectura Empresarial para planificar qué procesos deben mejorarse y analizar los impactos?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "La Arquitectura Empresarial es un marco que ayuda a estructurar y alinear los procesos con los objetivos estratégicos. Aquí se pregunta si este enfoque se utiliza para planificar mejoras en los procesos."
      },
      {
        id: "bpm_q3_3",
        text: "¿Con qué frecuencia se usan metodologías para implementar procesos en tecnologías BPMS y RPA?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Esta pregunta se refiere a la frecuencia con la que la organización aplica metodologías específicas para automatizar procesos utilizando tecnologías como BPMS y RPA (Automatización Robótica de Procesos)."
      },
      {
        id: "bpm_q3_4",
        text: "¿Se usa Process Mining para el análisis de procesos de negocio?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Process Mining es una técnica que permite analizar los procesos empresariales basándose en datos reales. La pregunta busca saber si esta técnica se usa regularmente en la organización."
      },
      {
        id: "bpm_q3_5",
        text: "¿Se utilizan metodologías de optimización y mejora de procesos?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Aquí se indaga si la organización sigue métodos formales y estructurados para mejorar continuamente sus procesos de negocio."
      }
    ]
  },
  // Tecnologías
  {
    title: "Tecnologías",
    questions: [
      {
        id: "bpm_q4_1",
        text: "¿Se usa herramienta BPA (Business Process Analytics) para el modelado y análisis del proceso y reglas de negocio?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "BPA es una herramienta que permite modelar, analizar y optimizar procesos de negocio. Esta pregunta busca saber si la organización utiliza este tipo de herramientas."
      },
      {
        id: "bpm_q4_2",
        text: "¿Se usa herramienta de Arquitectura empresarial?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Aquí se pregunta si la organización utiliza herramientas especializadas para gestionar la arquitectura empresarial, alineando procesos, tecnología y estrategia."
      },
      {
        id: "bpm_q4_3",
        text: "¿Se utilizan tecnologías para la orquestación y automatización de tareas y procesos?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "La orquestación y automatización se refieren al uso de tecnologías que coordinan y ejecutan automáticamente tareas y procesos. La pregunta indaga si la organización emplea estas tecnologías."
      },
      {
        id: "bpm_q4_4",
        text: "¿Se utilizan tecnologías para la integración de procesos con sistemas, aplicaciones, datos y objetos inteligentes?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Esta pregunta se refiere a si la organización utiliza tecnologías que permiten conectar y sincronizar procesos con sistemas internos y externos, aplicaciones, datos y dispositivos inteligentes."
      },
      {
        id: "bpm_q4_5",
        text: "¿Se utilizan tecnologías para la monitorización de procesos?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Aquí se busca saber si la organización utiliza herramientas tecnológicas que permiten monitorear el rendimiento de los procesos en tiempo real."
      }
    ]
  },
  // Personas
  {
    title: "Personas",
    questions: [
      {
        id: "bpm_q5_1",
        text: "¿Todos los miembros del equipo de BPM y los líderes de procesos poseen competencias transformacionales, operativas y técnicas en BPM?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "La pregunta verifica si el equipo de BPM y los líderes de procesos tienen las habilidades necesarias para gestionar, transformar y mejorar los procesos utilizando metodologías BPM."
      },
      {
        id: "bpm_q5_2",
        text: "¿La Dirección está involucrada en las iniciativas de BPM?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Se refiere a si los altos directivos de la organización participan activamente en las iniciativas y proyectos relacionados con la gestión por procesos."
      },
      {
        id: "bpm_q5_3",
        text: "¿Se han definido roles y responsabilidades de procesos?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "La pregunta indaga si la organización ha establecido claramente quién es responsable de cada proceso y qué roles específicos se deben cumplir."
      },
      {
        id: "bpm_q5_4",
        text: "¿La Dirección realiza una Gestión por Procesos con conocimiento de la contribución de los procesos a la estrategia empresarial?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Aquí se pregunta si los líderes de la organización gestionan los procesos con una comprensión clara de cómo estos contribuyen a los objetivos estratégicos."
      },
      {
        id: "bpm_q5_5",
        text: "¿RRHH gestiona los recursos por su productividad y competencias en los procesos que participa?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Esta pregunta se refiere a si el departamento de recursos humanos asigna y gestiona personal en función de su productividad y competencias específicas dentro de los procesos."
      }
    ]
  },
  // Gobierno
  {
    title: "Gobierno",
    questions: [
      {
        id: "bpm_q6_1",
        text: "¿Hay compromiso de la dirección en BPM?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta busca entender si la alta dirección de la organización está comprometida con la implementación y éxito de la gestión por procesos."
      },
      {
        id: "bpm_q6_2",
        text: "¿Hay definido un Centro de Excelencia BPM?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Se refiere a si la organización ha establecido un equipo o departamento especializado en promover y gestionar la excelencia en BPM."
      },
      {
        id: "bpm_q6_3",
        text: "¿Con qué frecuencia se utilizan los metamodelos, normas y guías de BPM?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Aquí se pregunta si la organización sigue consistentemente los modelos, estándares y guías establecidos para la gestión por procesos."
      },
      {
        id: "bpm_q6_4",
        text: "¿Existe un control y administración de las iniciativas BPM y su implementación con tecnologías BPM?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "La pregunta verifica si hay un sistema para supervisar y gestionar todas las iniciativas BPM y su implementación tecnológica."
      },
      {
        id: "bpm_q6_5",
        text: "¿Considera que el Gobierno de BPM está alineado a otras gestiones empresariales?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta busca determinar si la gestión de BPM está integrada y alineada con otras áreas de gestión como calidad, recursos humanos, seguridad, etc."
      }
    ]
  },
  // Cultura
  {
    title: "Cultura",
    questions: [
      {
        id: "bpm_q7_1",
        text: "¿Con qué frecuencia se apoyan los esfuerzos de la innovación en procesos?",
        options: ["Siempre", "Casi siempre", "En ocasiones", "Casi nunca", "Nunca"],
        note: "Se refiere a si la organización fomenta regularmente la innovación dentro de sus procesos de negocio."
      },
      {
        id: "bpm_q7_2",
        text: "¿Los beneficios de implementar BPM en la empresa están definidos, medidos y recompensados?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta se refiere a si la organización ha establecido claramente los beneficios esperados de BPM, si se miden regularmente y si se recompensa a los equipos por lograr esos beneficios."
      },
      {
        id: "bpm_q7_3",
        text: "¿Se impulsan las prioridades y decisiones para garantizar el ROI de las iniciativas de mejoras de procesos?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Esta pregunta indaga si la organización toma decisiones estratégicas para asegurar que las iniciativas de mejora de procesos generen un retorno sobre la inversión (ROI) adecuado."
      },
      {
        id: "bpm_q7_4",
        text: "¿Es saludable el clima orientado a procesos?",
        options: ["Muy de acuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"],
        note: "Se refiere a si la cultura organizacional apoya y fomenta un enfoque basado en procesos, con un ambiente que favorece la eficiencia y la mejora continua."
      },
      {
        id: "bpm_q7_5",
        text: "¿Qué importancia tiene el cambio de transformaciones provocado por la mejora operativa gestionada?",
        options: ["Muy importante", "Importante", "Moderadamente importante", "De poca importancia", "Sin importancia"],
        note: "La pregunta busca evaluar cuán importante es para la organización gestionar los cambios que resultan de las mejoras operativas, asegurando que las transformaciones sean efectivas y bien administradas."
      }
    ]
  }
];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      
      {/* Contenedor principal */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        
        {/* Intro Screen */}
        {showIntro && (
          <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/30 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Nivel de Madurez de BPM
              </h1>
              
              <p className="text-gray-300 text-lg max-w-3xl mb-8">
                Bienvenido a nuestra herramienta de evaluación de madurez en Gestión de Procesos de Negocio (Basado en el Modelo de Madurez de la Gestión por Procesos de P. Robledo, 2014). Esta evaluación le ayudará a comprender el nivel actual de madurez de su organización en BPM y le proporcionará insights valiosos para mejorar.
              </p>
              
              <div className="w-full max-w-2xl mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
                <img 
                  src="https://jmaiconsulting.pe/wp-content/uploads/2024/10/BPMM-imagen.png" 
                  alt="BPM Maturity Assessment" 
                  className="w-full h-auto"
                />
              </div>
              
              <button 
                onClick={startEvaluation}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-lg font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Comenzar Evaluación</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        )}
        
        {/* Formulario Principal */}
        {!showIntro && !results && (
          <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/30 shadow-xl">
            <form onSubmit={submitForm} className="w-full">
              {/* Barra de progreso */}
              <div className="mb-8 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / (questions.reduce((sum, category) => sum + category.questions.length, 0) - 1)) * 100}%` }}
                ></div>
                <div className="absolute top-3 right-0 text-sm text-gray-400">
                  {Math.round((currentStep / (questions.reduce((sum, category) => sum + category.questions.length, 0) - 1)) * 100)}%
                </div>
              </div>
              
              {/* Paso actual */}
              {questions.map((category, categoryIndex) => 
                category.questions.map((question, questionIndex) => {
                  const stepIndex = categoryIndex * 5 + questionIndex;
                  return stepIndex === currentStep ? (
                    <div key={question.id} className="animate-fadeIn">
                      {/* Indicador de categoría */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="px-4 py-1 bg-blue-600/30 rounded-full text-cyan-400 text-sm font-medium">
                          {category.title}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Pregunta {questionIndex + 1} de 5
                        </div>
                      </div>
                      
                      {/* Contenedor de pregunta */}
                      <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">
                          {question.text}
                        </h2>
                        
                        {/* Opciones */}
                        <div className="space-y-3">
                          {question.options.map((option, index) => (
                            <label 
                              key={index} 
                              className={`block p-4 rounded-xl border border-gray-700 cursor-pointer transition-all duration-200 ${
                                formData[question.id] === option 
                                  ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500' 
                                  : 'bg-gray-800/50 hover:bg-gray-700/50'
                              }`}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option}
                                  checked={formData[question.id] === option}
                                  onChange={handleOptionChange}
                                  className="form-radio h-5 w-5 text-cyan-500 focus:ring-cyan-500"
                                />
                                <span className="ml-3 text-white">{option}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        
                        {/* Nota */}
                        {question.note && (
                          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-xl flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 mr-3">
                              i
                            </div>
                            <p className="text-gray-300 text-sm">{question.note}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Botones de navegación */}
                      <div className="flex justify-between mt-8">
                        {currentStep > 0 && (
                          <button 
                            type="button" 
                            onClick={goToPrevStep}
                            className="flex items-center px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Anterior
                          </button>
                        )}
                        
                        {currentStep < questions.reduce((sum, category) => sum + category.questions.length, 0) - 1 ? (
                          <button 
                            type="button" 
                            onClick={goToNextStep}
                            className="ml-auto flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all duration-200"
                          >
                            Siguiente
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ) : (
                          <button 
                            type="submit"
                            className="ml-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all duration-200 relative overflow-hidden group"
                          >
                            <span className="relative z-10">Finalizar Evaluación</span>
                            <span className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:right-0 transition-all duration-500"></span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null;
                })
              )}
            </form>
          </div>
        )}
        
        {/* Resultados */}
        {results && !showUserForm && (
          <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/30 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Resultados de Madurez en BPM
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="col-span-1 bg-gray-800/80 rounded-xl p-6 border border-gray-700/50 shadow-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Nivel de Madurez</div>
                  <div className="text-3xl font-bold text-white mb-6">{results.maturityLevel}</div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Puntuación</div>
                      <div className="text-lg font-medium text-cyan-400">
                        {results.totalScore}/{results.calculatedScores.length * 5}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Promedio</div>
                      <div className="text-lg font-medium text-cyan-400">
                        {results.averageScore.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Porcentaje</div>
                      <div className="text-lg font-medium text-cyan-400">
                        {results.percentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 bg-gray-800/80 rounded-xl p-6 border border-gray-700/50 shadow-lg flex items-center justify-center">
                <div className="w-full h-full">
                  <canvas ref={chartRef} className="max-w-full"></canvas>
                </div>
              </div>
              
              <div className="col-span-3 mt-4">
                <button 
                  onClick={requestUserData}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Descargar Informe Completo</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Formulario de Datos de Usuario */}
        {showUserForm && (
          <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/30 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Complete sus datos para descargar el informe
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserDataChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Correo</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-gray-300 text-sm font-medium mb-2">Empresa (Opcional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={userData.company}
                  onChange={handleUserDataChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <button 
                onClick={generatePDF}
                className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-xl text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span>Guardar y Descargar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BpmMaturityForm;