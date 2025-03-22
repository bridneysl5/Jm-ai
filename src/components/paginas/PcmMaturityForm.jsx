import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';

const PcmMaturityForm = () => {
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
    entity: ''
  });
  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Mapeo de niveles de madurez
  const maturityLevels = {
    "Inicial": 20,
    "Básico": 40,
    "Definido": 60,
    "Gestionado": 80,
    "Optimizado": 100,
  };

  // Descripciones de los niveles de madurez por categoría/fase
  const descriptions = {
    "Fase 1: Identificación de productos y procesos": {
      "Inicial": "Únicamente se han dado pasos muy preliminares para reconocer la importancia de los productos y procesos. Existe documentación muy limitada o inexistente. No se cuenta con un Mapa de Procesos Institucional ni con fichas de procesos formalmente aprobados.",
      "Básico": "Se han dado los primeros esfuerzos para identificar algunos productos y procesos, generando un inventario básico. Se reconoce la necesidad de documentarlos, aunque la cobertura es incompleta y la aprobación formal aún no se ha concretado. Podría existir un borrador de Mapa de Procesos, sin validación ni difusión amplia.",
      "Definido": "Se ha definido de manera más sistemática un conjunto significativo de productos y procesos. Se cuenta con fichas de producto y proceso con información esencial; sin embargo, persisten vacíos o detalles por afinar. Comienza a conformarse un Mapa de Procesos Institucional preliminar, revisado por dueños de procesos y con un alcance mayor que en etapas anteriores.",
      "Gestionado": "Se ha logrado una identificación exhaustiva de los productos y procesos misionales, de apoyo y estratégicos. Existe documentación completa, aprobada por las áreas responsables y con la opinión técnica requerida. El Mapa de Procesos Institucional está formalmente aprobado y es de conocimiento de las unidades de la entidad.",
      "Optimizado": "La identificación de productos y procesos se actualiza de forma continua en función de cambios normativos, de estrategia o del entorno. La documentación se integra con otros sistemas de gestión (planeamiento, presupuesto, calidad, etc.), y se utilizan herramientas tecnológicas de apoyo. Se promueve la revisión y mejora permanente de la estructura de procesos, incorporando aprendizajes y buenas prácticas de forma ágil."
    },
    "Fase 2: Implementación de los procesos": {
      "Inicial": "La documentación, cuando existe, casi no se difunde; el personal desconoce en gran medida los procesos formales. La capacitación o sensibilización sobre los procesos es escasa o nula. La ejecución diaria no sigue de manera consistente la guía o fichas del proceso (si acaso existen).",
      "Básico": "Se difunde mínimamente la documentación en el área directamente involucrada, existiendo charlas o correos informales sobre su contenido. Se ha iniciado un proceso de sensibilización, pero aún no se cubre a todos los involucrados ni se establecen mecanismos estables de capacitación. Los dueños de proceso empiezan a mostrar interés y revisan ocasionalmente la ejecución real frente a la documentación aprobada.",
      "Definido": "Se cuenta con un plan de difusión que alcanza al personal clave. Se brinda asistencia técnica y capacitaciones elementales, procurando que la ejecución se apegue a los procesos establecidos. Se generan registros básicos de ejecución, y los dueños de proceso supervisan su cumplimiento de manera regular.",
      "Gestionado": "La documentación de los procesos se difunde mediante canales institucionales formales y con una periodicidad establecida. Se desarrolla un programa de capacitación y acompañamiento continuo, de modo que el personal comprenda claramente su rol en la ejecución de los procesos. Se verifica que la ejecución cumpla con la documentación aprobada y que se generen los registros correspondientes de forma sistemática.",
      "Optimizado": "Existe una estrategia de difusión que incluye diversas herramientas y canales (plataformas tecnológicas, talleres especializados, etc.), reforzada por evaluaciones periódicas de comprensión. Se fomenta la participación activa de todos los involucrados en la identificación de oportunidades de mejora durante la ejecución misma. Los procesos se retroalimentan en tiempo real con la información recabada, permitiendo ajustes ágiles y fomentando la mejora continua."
    },
    "Fase 3: Evaluación de productos y procesos": {
      "Inicial": "Las mediciones de desempeño, en caso de existir, son esporádicas y no siguen un sistema definido de indicadores. Los resultados de dichas mediciones no se registran de forma organizada ni se analizan formalmente. No se cuenta con un enfoque de análisis que permita identificar brechas, tendencias o áreas críticas de mejora.",
      "Básico": "Se definen algunos indicadores de manera básica, aunque sin una periodicidad ni metas claras. Se inician mediciones y se registran resultados de forma limitada; el análisis comparativo es puntual o se hace solo cuando surgen problemas. La utilidad de los datos recabados es aún restringida, sin un involucramiento transversal de todas las áreas.",
      "Definido": "Se establece un conjunto de indicadores para los principales productos y procesos misionales, con metas preliminares y una periodicidad establecida. Los resultados se registran y se realizan análisis básicos para verificar el desempeño frente a los objetivos planteados. Se empieza a involucrar a las áreas responsables en la lectura de los resultados, valorando la importancia de la medición para la toma de decisiones.",
      "Gestionado": "Se cuenta con una medición sistemática y planificada de los atributos de los productos y del desempeño de los procesos, alineada a la estrategia de la entidad. La información se registra de manera completa y consistente, facilitando el análisis de tendencias y la identificación de acciones correctivas o preventivas. Se consolida un proceso de evaluación periódica, con reportes regulares que permiten a la Alta Dirección y a las áreas conocer el estado real de los procesos y productos.",
      "Optimizado": "Los indicadores se integran con los objetivos estratégicos y procesos presupuestales, posibilitando una gestión basada en evidencia sólida. La evaluación es continua y utiliza herramientas avanzadas de análisis (por ejemplo, tableros de control dinámicos, analítica predictiva, etc.). Se revisa y mejora periódicamente la eficacia de los propios indicadores, a fin de afinar la medición y sostener la mejora continua."
    },
    "Fase 4: Mejora de productos y procesos": {
      "Inicial": "Las mejoras son reactivas, informales y no se basan en un análisis sistemático de causas. No existe priorización clara ni seguimiento de las acciones de mejora. El impacto de las posibles mejoras no se evalúa; las iniciativas quedan, en su mayoría, a nivel de la intuición o la improvisación.",
      "Básico": "Comienza a identificarse un número limitado de oportunidades de mejora en los productos o procesos, a veces motivado por quejas o incidentes específicos. Se realizan intervenciones puntuales, sin que exista una metodología formal de priorización o seguimiento. Los dueños de proceso y algunos equipos participan de manera incipiente en la implementación de cambios pequeños.",
      "Definido": "Se establece un proceso definido para proponer y seleccionar oportunidades de mejora. Se implementan mejoras de forma más ordenada, basadas en el análisis de datos e información recolectada durante la evaluación. Se cuenta con un registro de acciones de mejora y se comienza a dar seguimiento a su implementación, midiendo resultados de forma básica.",
      "Gestionado": "Existe un mecanismo claro y continuo de identificación, priorización y ejecución de mejoras, sustentado en criterios establecidos (impacto, viabilidad, costo-beneficio, etc.). Las mejoras se acompañan de revisiones posteriores para asegurar que los cambios se integren al proceso y se actualice la documentación correspondiente. Se promueve un enfoque preventivo, anticipándose a posibles fallas o variaciones de desempeño.",
      "Optimizado": "Se consolida una cultura de mejora continua, soportada por metodologías estandarizadas (por ejemplo, Lean, Kaizen, BPMN, innovación pública, etc.). Se fomenta la búsqueda de soluciones innovadoras, midiendo el impacto de cada mejora e integrando lecciones aprendidas en ciclos sucesivos. Las acciones de mejora se gestionan como parte de la estrategia institucional, asegurando su sostenibilidad y su alineamiento con la visión de la entidad."
    }
  };

  // Descripciones de los niveles de madurez global
  const globalMaturityDescriptions = {
    "Inicial": "La gestión por procesos es inexistente o se encuentra en etapas muy tempranas y no estructuradas. Puede haber un conocimiento vago o nulo sobre el enfoque de gestión por procesos en la entidad. No se han identificado formalmente los productos ni los procesos de la entidad. No existe documentación de procesos. No se realiza una evaluación sistemática del desempeño de la entidad basada en procesos. Las mejoras se realizan de manera reactiva y no como parte de un ciclo continuo. El compromiso de la Alta Dirección con la gestión por procesos es limitado o inexistente.",
    "Básico": "La entidad ha tomado conciencia de la importancia de la gestión por procesos y ha dado algunos pasos iniciales. Se ha iniciado la identificación de algunos productos y procesos clave de la entidad. Puede existir documentación incipiente y no estandarizada de algunos procesos. El compromiso de la Alta Dirección comienza a manifestarse, aunque de forma limitada. Se puede haber designado una unidad de organización responsable de la gestión por procesos, como la Oficina de Modernización o la que haga sus veces. Se pueden realizar esfuerzos aislados para mejorar algunos procesos, pero sin una metodología definida ni un ciclo formal.",
    "Definido": "La entidad ha establecido formalmente las cuatro fases del ciclo de la gestión por procesos para sus procesos principales. Se han identificado y documentado los productos y procesos de la entidad, incluyendo la elaboración del Inventario de Productos y Procesos y el Mapa de Procesos Institucional. Se han designado dueños de procesos con responsabilidades definidas. Se han establecido indicadores de productos y procesos para medir su desempeño. Se realiza la implementación de los procesos según la documentación establecida y se difunde dicha documentación. Se llevan a cabo evaluaciones periódicas de los productos y procesos. Se identifican oportunidades de mejora a partir de las evaluaciones. La Alta Dirección muestra un compromiso más sólido y adopta decisiones basadas en los resultados de la gestión por procesos.",
    "Gestionado": "La gestión por procesos está integrada en la operativa de la entidad y se gestiona activamente. La medición y el análisis de los indicadores de productos y procesos son sistemáticos y se utilizan para la toma de decisiones y la identificación de oportunidades de mejora. Se implementan mejoras en los productos y procesos de forma planificada y se realiza un seguimiento de su impacto. Se utilizan herramientas de mejora continua y, posiblemente, plataformas o aplicativos tecnológicos en los procesos. La documentación de los procesos se revisa y actualiza periódicamente. Existe una cultura de gestión por procesos en la entidad, con servidores sensibilizados y comprometidos. La gestión por procesos se alinea con otros sistemas de gestión institucional, como la planificación estratégica y la gestión de la calidad.",
    "Optimizado": "La gestión por procesos está arraigada en la cultura organizacional y se enfoca en la mejora continua y la innovación. La entidad busca de manera proactiva la optimización y simplificación de sus procesos, eliminando actividades que no agregan valor. Se fomenta la innovación pública en el diseño y entrega de productos y procesos. Se utilizan metodologías avanzadas de mejora, como Lean, Kaizen o BPMN, de forma sistemática. La entidad realiza comparativas con otras entidades y adopta buenas prácticas. La satisfacción de las personas y la creación de valor público son los principales motores de la mejora continua de los procesos. La Alta Dirección lidera y promueve activamente la cultura de gestión por procesos como un pilar fundamental de la gestión de la entidad."
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
    localStorage.setItem("pcm_form_state", JSON.stringify(state));
  };

  // Cargar el estado del formulario desde localStorage
  const loadFormState = () => {
    const state = JSON.parse(localStorage.getItem("pcm_form_state"));
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
    return `pcm_q${categoryIndex}_${questionIndex}`;
  };

  // Enviar el formulario y calcular resultados
  const submitForm = (e) => {
    e.preventDefault();
    
    // Convertir respuestas a puntuaciones
    const calculatedScores = Object.entries(formData).map(([key, value]) => {
      let score;
      switch (value) {
        case "a":
          score = 1;
          break;
        case "b":
          score = 2;
          break;
        case "c":
          score = 3;
          break;
        case "d":
          score = 4;
          break;
        default:
          score = 0;
      }
      return score;
    });
    
    setScores(calculatedScores);
    
    const totalScore = calculatedScores.reduce((sum, score) => sum + score, 0);
    const percentage = (totalScore / (calculatedScores.length * 4)) * 100;
    
    // Determinar nivel de madurez
    let maturityLevel;
    if (totalScore <= 20) {
      maturityLevel = "Inicial";
    } else if (totalScore <= 40) {
      maturityLevel = "Básico";
    } else if (totalScore <= 60) {
      maturityLevel = "Definido";
    } else if (totalScore <= 80) {
      maturityLevel = "Gestionado";
    } else {
      maturityLevel = "Optimizado";
    }
    
    setResults({
      totalScore,
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
  const generatePDF = () => {
    if (!results) return;
    
    try {
      // Crear un nuevo documento PDF
      const doc = new jsPDF();
      const phases = [
        "Fase 1: Identificación de productos y procesos",
        "Fase 2: Implementación de los procesos",
        "Fase 3: Evaluación de productos y procesos",
        "Fase 4: Mejora de productos y procesos",
      ];
      
      // Encabezado
      doc.setFontSize(16);
      doc.setTextColor(0, 76, 153);
      doc.text("INFORME DE MADUREZ EN GESTIÓN POR PROCESOS", 105, 20, { align: 'center' });
      doc.text("NORMA TÉCNICA N° 002-2025-PCM/SGP", 105, 30, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(70, 70, 70);
      doc.text(`Evaluado: ${userData.name}`, 20, 50);
      doc.text(`Correo: ${userData.email}`, 20, 60);
      doc.text(`Teléfono: ${userData.phone}`, 20, 70);
      
      if (userData.entity) {
        doc.text(`Entidad: ${userData.entity}`, 20, 80);
      }
      
      // Sección de madurez por categoría
      doc.setFontSize(14);
      doc.setTextColor(0, 76, 153);
      doc.text("MADUREZ POR FASE", 105, 100, { align: 'center' });
      
      const startX = 20;
      let startY = 110;
      
      const colWidths = [70, 48, 20, 50];
      const rowHeight = 10;
      const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);
      
      // Cabecera de tabla
      doc.setFillColor(230, 230, 230);
      doc.rect(startX, startY, tableWidth, rowHeight, 'F');
      doc.setTextColor(0, 76, 153);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      
      let currentX = startX;
      ["Fase", "Nivel", "Puntuación", "Porcentaje"].forEach(
        (header, index) => {
          doc.text(header, currentX + 2, startY + 7);
          currentX += colWidths[index];
        }
      );
      
      startY += rowHeight;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
      
      // Agrupar scores por fases (5 preguntas por fase)
      const phaseScores = [];
      for (let i = 0; i < results.calculatedScores.length; i += 5) {
        const phaseScoresSlice = results.calculatedScores.slice(i, i + 5);
        const sumPhaseScore = phaseScoresSlice.reduce((sum, score) => sum + score, 0);
        const avgPhaseScore = sumPhaseScore / phaseScoresSlice.length;
        const phasePercentage = (sumPhaseScore / 20) * 100; // 5 preguntas, 4 puntos máximo por pregunta
        phaseScores.push({
          sum: sumPhaseScore,
          avg: avgPhaseScore,
          percentage: phasePercentage
        });
      }
      
      // Filas de la tabla
      for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];
        const phaseScore = phaseScores[i] || { sum: 0, avg: 0, percentage: 0 };
        
        let phaseLevel = "Inicial";
        if (phaseScore.percentage > 80) {
          phaseLevel = "Optimizado";
        } else if (phaseScore.percentage > 60) {
          phaseLevel = "Gestionado";
        } else if (phaseScore.percentage > 40) {
          phaseLevel = "Definido";
        } else if (phaseScore.percentage > 20) {
          phaseLevel = "Básico";
        }
        
        doc.setFillColor(i % 2 === 0 ? 255 : 245);
        doc.rect(startX, startY, tableWidth, rowHeight, 'F');
        
        currentX = startX;
        
        // Fase
        doc.text(phase, currentX + 2, startY + 7);
        currentX += colWidths[0];
        
        // Nivel
        doc.text(phaseLevel, currentX + 2, startY + 7);
        currentX += colWidths[1];
        
        // Puntuación
        doc.text(`${phaseScore.sum}/20`, currentX + 2, startY + 7);
        currentX += colWidths[2];
        
        // Porcentaje
        doc.text(`${phaseScore.percentage.toFixed(2)}%`, currentX + 2, startY + 7);
        
        startY += rowHeight;
      }
      
      // Añadir descripciones por fase
      startY += 10;
      doc.setFontSize(14);
      doc.setTextColor(0, 76, 153);
      doc.text("DESCRIPCIÓN POR FASE", 105, startY, { align: 'center' });
      startY += 10;
      
      for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];
        const phaseScore = phaseScores[i] || { sum: 0, avg: 0, percentage: 0 };
        
        let phaseLevel = "Inicial";
        if (phaseScore.percentage > 80) {
          phaseLevel = "Optimizado";
        } else if (phaseScore.percentage > 60) {
          phaseLevel = "Gestionado";
        } else if (phaseScore.percentage > 40) {
          phaseLevel = "Definido";
        } else if (phaseScore.percentage > 20) {
          phaseLevel = "Básico";
        }
        
        const phaseDescription = descriptions[phase] && 
                               descriptions[phase][phaseLevel] ? 
                               descriptions[phase][phaseLevel] : 
                               "Descripción no disponible";
        
        doc.setFontSize(12);
        doc.setTextColor(0, 76, 153);
        doc.text(`${phase} - Nivel: ${phaseLevel}`, startX, startY);
        
        doc.setTextColor(40, 40, 40);
        doc.setFontSize(10);
        const textLines = doc.splitTextToSize(phaseDescription, 170);
        startY += 6;
        doc.text(textLines, startX, startY);
        
        startY += textLines.length * 5 + 10;
        
        // Si estamos cerca del final de la página, añadimos una nueva
        if (startY > 270) {
          doc.addPage();
          startY = 20;
        }
      }
      
      // Nueva página para gráfico y resumen
      doc.addPage();
      
      startY = 20;
      doc.setFontSize(14);
      doc.setTextColor(0, 76, 153);
      doc.text("MADUREZ GENERAL", 105, startY, { align: 'center' });
      
      startY += 15;
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text(`Puntuación total: ${results.totalScore}/${results.calculatedScores.length * 4}`, startX, startY);
      
      startY += 10;
      doc.text(`Porcentaje global: ${results.percentage.toFixed(2)}%`, startX, startY);
      
      startY += 10;
      doc.text(`Nivel de madurez: ${results.maturityLevel}`, startX, startY);
      
      // Descripción general
      startY += 20;
      doc.setFontSize(12);
      doc.setTextColor(0, 76, 153);
      doc.text("Descripción general del nivel de madurez:", startX, startY);
      
      startY += 10;
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(10);
      const globalDescription = globalMaturityDescriptions[results.maturityLevel] || "Descripción no disponible";
      const globalDescLines = doc.splitTextToSize(globalDescription, 170);
      doc.text(globalDescLines, startX, startY);
      
      startY += globalDescLines.length * 5 + 15;
      
      // Capturar gráfico como imagen
      if (chartInstance.current && chartInstance.current.canvas) {
        try {
          const canvas = chartInstance.current.canvas;
          const imgData = canvas.toDataURL("image/png");
          doc.addImage(imgData, "PNG", 30, startY, 150, 150);
        } catch (err) {
          console.error("Error al capturar el gráfico:", err);
          doc.text("No se pudo incluir el gráfico en el PDF", 105, startY + 80, { align: 'center' });
        }
      } else {
        doc.text("Gráfico no disponible", 105, startY + 80, { align: 'center' });
      }
      
      // Guardar el PDF
      doc.save("Informe_Madurez_Gestion_Procesos_PCM.pdf");
      
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un problema al generar el PDF. Por favor intente nuevamente.");
    }
  };

  // Crear gráfico radar con los resultados
  useEffect(() => {
    if (results && chartRef.current) {
      // Destruir gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const phases = [
        "Fase 1",
        "Fase 2",
        "Fase 3",
        "Fase 4"
      ];
      
      // Agrupar scores por fases (5 preguntas por fase)
      const phaseScores = [];
      for (let i = 0; i < results.calculatedScores.length; i += 5) {
        const phaseScoresSlice = results.calculatedScores.slice(i, i + 5);
        const sumPhaseScore = phaseScoresSlice.reduce((sum, score) => sum + score, 0);
        const phasePercentage = (sumPhaseScore / 20) * 100; // 5 preguntas, 4 puntos máximo por pregunta
        phaseScores.push(phasePercentage);
      }
      
      // Asegurarnos de tener 4 valores (uno para cada fase)
      while (phaseScores.length < 4) {
        phaseScores.push(0);
      }
      
      chartInstance.current = new Chart(chartRef.current, {
        type: "radar",
        data: {
          labels: phases,
          datasets: [
            {
              label: "Nivel de Madurez (%)",
              data: phaseScores,
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
              suggestedMax: 100,
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

  // Preguntas organizadas por fases
  const questions = [
    // Fase 1: Identificación de productos y procesos
    {
      title: "Fase 1: Identificación de productos y procesos",
      questions: [
        {
          id: "pcm_q1_1",
          text: "¿Su entidad ha realizado una revisión sistemática de las normas que le asignan competencias y funciones para identificar sus productos?",
          options: [
            { value: "a", label: "No se ha realizado ninguna revisión sistemática." },
            { value: "b", label: "Se han realizado algunas revisiones de forma aislada." },
            { value: "c", label: "Se ha realizado una revisión sistemática de las principales normas." },
            { value: "d", label: "Se realiza una revisión periódica y exhaustiva de todas las normas relevantes." }
          ],
          note: "Esta pregunta evalúa si la entidad identifica sus productos partiendo de una revisión de la normativa que le otorga competencias y funciones."
        },
        {
          id: "pcm_q1_2",
          text: "¿Su entidad cuenta con un inventario de todos los productos (bienes, servicios y regulaciones) que genera?",
          options: [
            { value: "a", label: "No se cuenta con un inventario de productos." },
            { value: "b", label: "Existe un inventario preliminar o parcial de productos." },
            { value: "c", label: "Se cuenta con un inventario de productos que está en proceso de validación." },
            { value: "d", label: "Se cuenta con un inventario de productos actualizado y formalmente aprobado." }
          ],
          note: "Un inventario de productos permite tener una visión completa de todos los bienes, servicios y regulaciones que la entidad produce."
        },
        {
          id: "pcm_q1_3",
          text: "¿Su entidad ha realizado un análisis para evitar la duplicidad de productos con otras entidades públicas?",
          options: [
            { value: "a", label: "No se ha realizado ningún análisis de duplicidad." },
            { value: "b", label: "Se ha realizado un análisis informal o no documentado." },
            { value: "c", label: "Se ha realizado un análisis de duplicidad y se han tomado algunas acciones correctivas." },
            { value: "d", label: "Se realiza un análisis de duplicidad de forma sistemática y se coordina con otras entidades para evitarla." }
          ],
          note: "Esta pregunta evalúa si la entidad identifica y evita posibles duplicidades en la generación de productos con otras entidades del sector público."
        },
        {
          id: "pcm_q1_4",
          text: "¿Su entidad ha determinado sus procesos misionales de nivel 0 basados en sus productos y normas sustantivas?",
          options: [
            { value: "a", label: "Los procesos misionales no han sido formalmente determinados." },
            { value: "b", label: "Se han identificado algunos procesos misionales de forma preliminar." },
            { value: "c", label: "Los procesos misionales de nivel 0 han sido determinados y documentados." },
            { value: "d", label: "Los procesos misionales de nivel 0 están claramente definidos, documentados y comprendidos por la organización." }
          ],
          note: "Los procesos misionales de nivel 0 son aquellos que están directamente relacionados con la producción de bienes, servicios o regulaciones que la entidad proporciona a sus destinatarios."
        },
        {
          id: "pcm_q1_5",
          text: "¿Su entidad ha identificado sus procesos estratégicos y de apoyo de nivel 0 considerando las interacciones necesarias?",
          options: [
            { value: "a", label: "Los procesos estratégicos y de apoyo no han sido formalmente identificados." },
            { value: "b", label: "Se han identificado algunos procesos estratégicos y de apoyo de forma preliminar." },
            { value: "c", label: "Los procesos estratégicos y de apoyo de nivel 0 han sido identificados y se encuentran en proceso de documentación." },
            { value: "d", label: "Los procesos estratégicos y de apoyo de nivel 0 están claramente definidos, documentados y su relación con los procesos misionales es clara." }
          ],
          note: "Los procesos estratégicos y de apoyo son aquellos que soportan la operación de los procesos misionales y contribuyen a la dirección y gestión de la entidad."
        }
      ]
    },
    // Fase 2: Implementación de los procesos
    {
      title: "Fase 2: Implementación de los procesos",
      questions: [
        {
          id: "pcm_q2_1",
          text: "¿Su entidad ha elaborado Fichas de producto y proceso para sus procesos de nivel 0 o inferiores?",
          options: [
            { value: "a", label: "No se han elaborado Fichas de producto y proceso." },
            { value: "b", label: "Se han elaborado fichas para algunos procesos de forma aislada." },
            { value: "c", label: "Se han elaborado fichas para la mayoría de los procesos principales." },
            { value: "d", label: "Se han elaborado fichas para todos los niveles de procesos relevantes, siguiendo el formato establecido." }
          ],
          note: "Las fichas de producto y proceso son documentos que describen formalmente las características y elementos de cada producto y proceso."
        },
        {
          id: "pcm_q2_2",
          text: "¿Su entidad cuenta con un Mapa de Procesos Institucional formalmente aprobado?",
          options: [
            { value: "a", label: "No se cuenta con un Mapa de Procesos Institucional." },
            { value: "b", label: "Existe un borrador o propuesta de Mapa de Procesos Institucional." },
            { value: "c", label: "Se cuenta con un Mapa de Procesos Institucional aprobado por la Máxima autoridad administrativa." },
            { value: "d", label: "El Mapa de Procesos Institucional está aprobado, difundido y se utiliza como referencia en la organización." }
          ],
          note: "El Mapa de Procesos es una representación gráfica que muestra la interrelación de todos los procesos de la entidad, clasificados en estratégicos, misionales y de apoyo."
        },
        {
          id: "pcm_q2_3",
          text: "¿Su entidad ha difundido la documentación de los procesos (fichas, mapa, etc.) al personal relevante?",
          options: [
            { value: "a", label: "La documentación de los procesos no ha sido difundida." },
            { value: "b", label: "Se han realizado acciones de difusión limitadas o informales." },
            { value: "c", label: "Se ha difundido la documentación a través de algunos medios (correo electrónico, intranet, etc.)." },
            { value: "d", label: "Se han implementado estrategias de difusión periódicas y efectivas, asegurando el acceso y comprensión de la documentación." }
          ],
          note: "La difusión de la documentación de los procesos es fundamental para que todo el personal conozca y comprenda los procesos en los que participa."
        },
        {
          id: "pcm_q2_4",
          text: "¿Se asigna claramente la responsabilidad de la ejecución de los procesos a los Dueños de Proceso?",
          options: [
            { value: "a", label: "No existen roles de Dueño de Proceso definidos." },
            { value: "b", label: "Se han identificado algunos Dueños de Proceso de forma informal." },
            { value: "c", label: "Los Dueños de Proceso están definidos para los procesos principales." },
            { value: "d", label: "Los roles y responsabilidades de los Dueños de Proceso están formalmente definidos, comunicados y asumidos." }
          ],
          note: "Los Dueños de Proceso son servidores que tienen la responsabilidad de asegurar que el proceso se ejecute eficientemente y logre sus objetivos."
        },
        {
          id: "pcm_q2_5",
          text: "¿Se ejecutan los procesos de acuerdo con lo establecido en su documentación?",
          options: [
            { value: "a", label: "Los procesos se ejecutan de forma inconsistente y sin referencia a la documentación." },
            { value: "b", label: "Algunos procesos se ejecutan siguiendo la documentación, pero no de forma generalizada." },
            { value: "c", label: "La mayoría de los procesos se ejecutan de acuerdo con la documentación, con algunas excepciones." },
            { value: "d", label: "Los procesos se ejecutan consistentemente siguiendo la documentación aprobada, y se registran las desviaciones." }
          ],
          note: "Esta pregunta evalúa si los procesos se ejecutan conforme a lo establecido en su documentación, lo cual es clave para asegurar la estandarización y calidad de los productos."
        }
      ]
    },
    // Fase 3: Evaluación de productos y procesos
    {
      title: "Fase 3: Evaluación de productos y procesos",
      questions: [
        {
          id: "pcm_q3_1",
          text: "¿Su entidad ha establecido indicadores para medir los atributos de sus productos?",
          options: [
            { value: "a", label: "No se han establecido indicadores de productos." },
            { value: "b", label: "Se han definido algunos indicadores de productos de forma preliminar." },
            { value: "c", label: "Se cuenta con indicadores de productos definidos para los principales productos." },
            { value: "d", label: "Se han establecido indicadores claros, relevantes y medibles para los atributos de calidad y los establecidos por los entes rectores de todos los productos relevantes." }
          ],
          note: "Los indicadores de productos permiten medir y evaluar si estos cumplen con los atributos de calidad definidos y con los requisitos establecidos por los entes rectores."
        },
        {
          id: "pcm_q3_2",
          text: "¿Su entidad ha establecido indicadores para medir el desempeño de sus procesos?",
          options: [
            { value: "a", label: "No se han establecido indicadores de procesos." },
            { value: "b", label: "Se han definido algunos indicadores de procesos de forma preliminar." },
            { value: "c", label: "Se cuenta con indicadores de procesos definidos para los principales procesos." },
            { value: "d", label: "Se han establecido indicadores claros, relevantes y medibles para el desempeño de todos los procesos relevantes." }
          ],
          note: "Los indicadores de procesos permiten evaluar su eficiencia, eficacia y efectividad, proporcionando información para la toma de decisiones y la mejora continua."
        },
        {
          id: "pcm_q3_3",
          text: "¿Se realiza la medición de los indicadores de productos y procesos de forma periódica?",
          options: [
            { value: "a", label: "No se realiza la medición de indicadores de forma periódica." },
            { value: "b", label: "La medición se realiza de forma esporádica o no planificada." },
            { value: "c", label: "La medición se realiza periódicamente para algunos indicadores clave." },
            { value: "d", label: "La medición de todos los indicadores definidos se realiza de forma periódica y según lo establecido." }
          ],
          note: "La medición periódica de los indicadores es esencial para contar con información actualizada sobre el desempeño de los productos y procesos."
        },
        {
          id: "pcm_q3_4",
          text: "¿Se analizan los resultados de la medición de los productos para identificar si cumplen con los atributos definidos?",
          options: [
            { value: "a", label: "No se analizan los resultados de la medición de productos." },
            { value: "b", label: "Se realizan análisis superficiales o informales de los resultados." },
            { value: "c", label: "Se analizan los resultados de los productos principales y se identifican algunas desviaciones." },
            { value: "d", label: "Se realiza un análisis sistemático de los resultados de todos los productos, comparándolos con los atributos definidos." }
          ],
          note: "El análisis de los resultados permite identificar si los productos cumplen con los atributos de calidad establecidos y detectar áreas de mejora."
        },
        {
          id: "pcm_q3_5",
          text: "¿Se analizan los resultados de la medición de los procesos para evaluar su desempeño y compararlos con los logros esperados?",
          options: [
            { value: "a", label: "No se analizan los resultados de la medición de procesos." },
            { value: "b", label: "Se realizan análisis superficiales o informales de los resultados." },
            { value: "c", label: "Se analizan los resultados de los procesos principales y se identifican áreas de mejora." },
            { value: "d", label: "Se realiza un análisis sistemático de los resultados de todos los procesos, identificando el nivel de desempeño y oportunidades de mejora." }
          ],
          note: "El análisis del desempeño de los procesos permite evaluar su eficiencia y eficacia, así como identificar oportunidades de mejora."
        }
      ]
    },
    // Fase 4: Mejora de productos y procesos
    {
      title: "Fase 4: Mejora de productos y procesos",
      questions: [
        {
          id: "pcm_q4_1",
          text: "¿Se identifican oportunidades de mejora a partir de los resultados de la evaluación de productos y procesos?",
          options: [
            { value: "a", label: "No se identifican oportunidades de mejora de forma sistemática." },
            { value: "b", label: "Las oportunidades de mejora se identifican de forma aislada o informal." },
            { value: "c", label: "Se identifican oportunidades de mejora a partir del análisis de algunos productos y procesos." },
            { value: "d", label: "Se identifican oportunidades de mejora de forma sistemática y documentada a partir de la evaluación de productos y procesos." }
          ],
          note: "La identificación sistemática de oportunidades de mejora es el primer paso para la mejora continua de los productos y procesos."
        },
        {
          id: "pcm_q4_2",
          text: "¿Se priorizan las oportunidades de mejora considerando su impacto y alineación con los objetivos de la entidad?",
          options: [
            { value: "a", label: "Las oportunidades de mejora no se priorizan formalmente." },
            { value: "b", label: "La priorización se realiza de forma intuitiva o sin criterios claros." },
            { value: "c", label: "Se priorizan algunas oportunidades considerando criterios básicos." },
            { value: "d", label: "Se priorizan las oportunidades de mejora utilizando criterios definidos, como su impacto en los objetivos misionales y las necesidades de las personas." }
          ],
          note: "La priorización adecuada permite enfocar los esfuerzos en las mejoras que generarán mayor valor para la entidad y los ciudadanos."
        },
        {
          id: "pcm_q4_3",
          text: "¿Se determinan e implementan mejoras en los productos o procesos priorizados?",
          options: [
            { value: "a", label: "No se implementan mejoras de forma planificada." },
            { value: "b", label: "Se implementan algunas mejoras de forma aislada." },
            { value: "c", label: "Se implementan mejoras en los productos o procesos principales." },
            { value: "d", label: "Se determinan e implementan mejoras de forma planificada y gestionada, con la participación de los Dueños de Proceso." }
          ],
          note: "La implementación efectiva de las mejoras requiere una planificación adecuada y la participación de los responsables de los procesos."
        },
        {
          id: "pcm_q4_4",
          text: "¿Se actualiza la documentación de los procesos como resultado de las mejoras implementadas?",
          options: [
            { value: "a", label: "La documentación de los procesos no se actualiza después de las mejoras." },
            { value: "b", label: "La documentación se actualiza de forma esporádica o incompleta." },
            { value: "c", label: "La documentación de los procesos principales se actualiza después de las mejoras." },
            { value: "d", label: "La documentación de todos los procesos afectados por las mejoras se actualiza de forma oportuna y precisa." }
          ],
          note: "La actualización de la documentación es esencial para asegurar que los cambios se incorporen formalmente y se mantenga la consistencia en la ejecución de los procesos."
        },
        {
          id: "pcm_q4_5",
          text: "¿Se realiza un seguimiento de la eficacia de las mejoras implementadas a través de los indicadores?",
          options: [
            { value: "a", label: "No se realiza seguimiento de la eficacia de las mejoras." },
            { value: "b", label: "El seguimiento se realiza de forma informal o no sistemática." },
            { value: "c", label: "Se realiza seguimiento de la eficacia de algunas mejoras clave." },
            { value: "d", label: "Se realiza un seguimiento sistemático de la eficacia de todas las mejoras implementadas, utilizando los indicadores definidos." }
          ],
          note: "El seguimiento de la eficacia permite verificar si las mejoras implementadas han tenido el impacto esperado y tomar acciones adicionales si es necesario."
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
                Evaluación de Madurez en Gestión por Procesos
              </h1>
              
              <p className="text-gray-300 text-lg max-w-3xl mb-8">
                Bienvenido a nuestra herramienta de evaluación de madurez en Gestión por Procesos según la Norma Técnica N° 002-2025-PCM/SGP. Esta evaluación le ayudará a comprender el nivel actual de madurez de su entidad en la implementación de la gestión por procesos y le proporcionará recomendaciones para su mejora.
              </p>
              
              <div className="w-full max-w-2xl mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
                <img 
                  src="/api/placeholder/800/300" 
                  alt="Gestión por Procesos" 
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
                                formData[question.id] === option.value
                                  ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500' 
                                  : 'bg-gray-800/50 hover:bg-gray-700/50'
                              }`}
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  checked={formData[question.id] === option.value}
                                  onChange={handleOptionChange}
                                  className="form-radio h-5 w-5 text-cyan-500 focus:ring-cyan-500"
                                />
                                <span className="ml-3 text-white">{option.label}</span>
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
              Resultados de Madurez en Gestión por Procesos
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
                        {results.totalScore}/{results.calculatedScores.length * 4}
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
              
              <div className="col-span-3">
                <div className="bg-gray-800/80 rounded-xl p-6 border border-gray-700/50 shadow-lg mb-6">
                  <div className="text-sm text-gray-400 mb-2">Descripción del nivel de madurez</div>
                  <p className="text-gray-300">
                    {globalMaturityDescriptions[results.maturityLevel] || "Descripción no disponible"}
                  </p>
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
                <label htmlFor="entity" className="block text-gray-300 text-sm font-medium mb-2">Entidad</label>
                <input
                  type="text"
                  id="entity"
                  name="entity"
                  value={userData.entity}
                  onChange={handleUserDataChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
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

export default PcmMaturityForm;