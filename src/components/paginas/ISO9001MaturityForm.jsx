import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';

// Componente principal del formulario de evaluación ISO 9001
const ISO9001MaturityForm = () => {
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
    "Inicial": 1.8,
    "Planificado": 2.6,
    "Implementado": 3.4,
    "Monitoreado y Medido": 4.2,
    "Optimizado": 5.0,
  };

  // Descripciones de los niveles de madurez por cláusula
  const descriptions = {
    "Contexto de la Organización": {
      "Inicial": "La organización tiene un conocimiento básico de los requisitos de la cláusula 4, pero la implementación es incipiente o inexistente. Existen algunas evaluaciones iniciales sobre factores internos y externos que influyen en la organización, pero no se han formalizado o documentado.",
      "Planificado": "La organización ha comenzado a planificar cómo cumplir con los requisitos de la cláusula 4. Se están definiendo los procesos para analizar las cuestiones internas y externas relevantes y para identificar las partes interesadas y sus requisitos, aunque todavía están en una fase muy preliminar.",
      "Implementado": "La mayoría de los requisitos de la cláusula 4 han sido abordados y se cuenta con información documentada relacionada con el contexto de la organización y la determinación de su alcance. Se han asignado responsables para dar seguimiento a la evolución de los factores internos y externos.",
      "Monitoreado y Medido": "Los procesos establecidos para comprender el contexto de la organización se ejecutan de manera consistente y se miden o evalúan con regularidad. Se efectúa un seguimiento sistemático de los factores internos y externos que puedan impactar al sistema de gestión de la calidad.",
      "Optimizado": "La organización demuestra un proceso maduro y proactivo de análisis del contexto interno y externo, integrado en la estrategia de negocio. Se identifica de manera continua cómo los cambios en el contexto y en las necesidades de las partes interesadas pueden traducirse en oportunidades de mejora."
    },
    "Liderazgo": {
      "Inicial": "La alta dirección reconoce de manera básica la importancia de liderar el sistema de gestión de la calidad, pero no hay evidencia de un compromiso claro con los requisitos de la cláusula 5. No existen roles ni responsabilidades definidas en torno al liderazgo de la calidad.",
      "Planificado": "Se han comenzado a planificar las responsabilidades y autoridades relacionadas con el liderazgo. Se cuenta con un borrador o versión preliminar de la política de la calidad y se han definido líneas generales de responsabilidad, aunque sin consolidarse totalmente.",
      "Implementado": "La alta dirección impulsa y mantiene una política de la calidad conocida y comprendida por gran parte de la organización. Existen responsables con autoridad asignada para supervisar y mejorar el sistema de gestión de la calidad.",
      "Monitoreado y Medido": "El liderazgo es claramente visible y se ejerce de forma coherente con la política y los objetivos de la calidad. La alta dirección evalúa regularmente la eficacia del sistema de gestión de la calidad, promueve acciones de mejora y revisa si las responsabilidades están adecuadamente asignadas.",
      "Optimizado": "El liderazgo y el compromiso de la alta dirección son ejemplares y se integran de manera total en la cultura de la organización. La política de la calidad está alineada con la estrategia del negocio y se actualiza de forma continua para reflejar mejoras."
    },
    "Planificación": {
      "Inicial": "La organización conoce de forma básica los requisitos de la cláusula 6, pero la planificación para cumplirlos es mínima o inexistente. El análisis de riesgos y oportunidades no está formalizado, y los objetivos de la calidad son escasos o no medibles.",
      "Planificado": "Se han comenzado a establecer objetivos de la calidad y se está definiendo un proceso de identificación y evaluación de riesgos y oportunidades, aunque de manera incipiente. Existe cierta documentación preliminar que describe la planificación del sistema de gestión de la calidad.",
      "Implementado": "La mayoría de los requisitos de la cláusula 6 se han puesto en práctica. Hay objetivos de la calidad definidos y relacionados con la política de la calidad, y se realizan actividades para el tratamiento de riesgos y oportunidades.",
      "Monitoreado y Medido": "Los objetivos de la calidad son medibles y se les da seguimiento de manera sistemática. El análisis de riesgos y oportunidades forma parte de las revisiones periódicas, y se toman acciones correctivas y preventivas bien definidas.",
      "Optimizado": "La planificación es un proceso completamente integrado a la estrategia de la organización. El análisis de riesgos y oportunidades es continuo y se hace de forma ágil, permitiendo respuestas proactivas y mejoras de manera constante."
    },
    "Apoyo": {
      "Inicial": "Se reconoce la necesidad de proporcionar recursos, competencias y una adecuada información documentada, pero la organización todavía no cuenta con planes o procesos formales para la gestión de esos recursos.",
      "Planificado": "Se están definiendo los procesos de gestión de recursos humanos, materiales y tecnológicos. Hay un plan de formación o competencias, aunque no totalmente implantado. Existe un primer esquema para el control de la información documentada.",
      "Implementado": "Los requisitos de la cláusula 7 se cumplen de forma parcial o mayoritaria: la organización dispone de procesos definidos para la competencia y la concienciación del personal, para la provisión de los recursos tecnológicos y de infraestructura.",
      "Monitoreado y Medido": "Los procesos de provisión de recursos están maduros; se evalúan y miden periódicamente la competencia del personal, la eficacia de la formación y la disponibilidad de recursos tecnológicos e infraestructura.",
      "Optimizado": "La organización dispone de un sistema integral de apoyo, en el que los recursos humanos y tecnológicos se planifican con visión de futuro, alineados a la estrategia. El conocimiento organizacional está gestionado de forma proactiva."
    },
    "Operación": {
      "Inicial": "La organización tiene un entendimiento básico de los requisitos de la cláusula 8, pero no ha establecido sistemáticamente procesos para la provisión de productos y servicios. Se han identificado de forma muy general los controles para la producción o prestación del servicio.",
      "Planificado": "Se han comenzado a delinear los procesos operativos y los criterios de aceptación de los productos/servicios, así como la comunicación con clientes. Se elaboran planes iniciales de control y se realiza la identificación de requisitos legales y reglamentarios pertinentes.",
      "Implementado": "La mayoría de los procesos de operación están definidos y documentados. Se implementan actividades de seguimiento y medición en etapas relevantes de la producción o provisión del servicio. Existen métodos para controlar productos no conformes.",
      "Monitoreado y Medido": "Los procesos de producción y provisión de servicio se llevan a cabo con control y coherencia. Se utilizan indicadores de desempeño para supervisar la operación y se realizan auditorías internas para verificar la eficacia de los controles.",
      "Optimizado": "La operación está completamente integrada en un sistema de producción o prestación de servicios robusto y optimizado. La organización emplea información en tiempo real para ajustar sus procesos, corrigiendo desviaciones antes de que se conviertan en no conformidades."
    },
    "Evaluación del Desempeño": {
      "Inicial": "La organización reconoce la importancia de hacer seguimiento y medición de la satisfacción del cliente, los procesos y los productos o servicios, pero aún no se han establecido indicadores claros ni un proceso de auditoría interna definido.",
      "Planificado": "Se han identificado algunos indicadores de desempeño y se está planificando la forma de medirlos, aunque no todos los procesos cuentan con indicadores. Existe un primer enfoque de evaluación de la satisfacción del cliente, pero es puntual o informal.",
      "Implementado": "La organización cuenta con un conjunto de indicadores que se miden regularmente. Se han realizado algunas auditorías internas y se conservan registros de los resultados. La satisfacción del cliente se evalúa de forma más consistente.",
      "Monitoreado y Medido": "Los indicadores de desempeño y la satisfacción del cliente se evalúan y analizan de forma sistemática, integrándose en la revisión por la dirección. Las auditorías internas se llevan a cabo según un programa planificado.",
      "Optimizado": "La evaluación del desempeño es altamente proactiva: la organización integra la medición y el análisis de datos con metodologías avanzadas para predecir necesidades futuras y posibles desviaciones."
    },
    "Mejora": {
      "Inicial": "La organización identifica la necesidad de mejorar, pero no dispone de un proceso formal para la gestión de no conformidades ni para la mejora continua. La acción correctiva se produce de manera esporádica y reactiva, sin registros adecuados.",
      "Planificado": "Existen planes básicos para responder a no conformidades mediante acciones correctivas. Se ha discutido la conveniencia de implantar metodologías de mejora continua, pero éstas no están implementadas de manera consistente.",
      "Implementado": "La mayoría de los requisitos de la cláusula 10 están en marcha. La organización gestiona las no conformidades, las analiza y emprende acciones correctivas. Empiezan a observarse iniciativas de mejora continua en algunos procesos.",
      "Monitoreado y Medido": "El ciclo de mejora continua está implantado de forma regular y se monitorea a través de objetivos y resultados claros. Las acciones correctivas y preventivas se abordan con metodologías definidas.",
      "Optimizado": "La organización ha integrado la mejora continua en su cultura. Se aprovechan herramientas y metodologías de mejora de manera proactiva e innovadora. Las acciones correctivas y preventivas impulsan cambios estratégicos y operativos."
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
    localStorage.setItem("iso9001_form_state", JSON.stringify(state));
  };

  // Cargar el estado del formulario desde localStorage
  const loadFormState = () => {
    const state = JSON.parse(localStorage.getItem("iso9001_form_state"));
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
    let clauseIndex = 0;
    let questionIndex = 0;
    
    // Mapeo de la cantidad de preguntas por cláusula
    const questionsPerClause = [4, 3, 3, 5, 8, 4, 3];
    
    let questionCount = 0;
    for (let i = 0; i < questionsPerClause.length; i++) {
      if (step < questionCount + questionsPerClause[i]) {
        clauseIndex = i + 1;
        questionIndex = step - questionCount + 1;
        break;
      }
      questionCount += questionsPerClause[i];
    }
    
    return `iso9001_q${clauseIndex}_${questionIndex}`;
  };

  // Enviar el formulario y calcular resultados
  const submitForm = (e) => {
    e.preventDefault();
    
    // Convertir respuestas a puntuaciones
    const calculatedScores = Object.entries(formData).map(([key, value]) => {
      let score;
      switch (value) {
        case "Tenemos una idea general de algunos factores que podrían afectarnos.":
        case "No hemos identificado formalmente a nuestras partes interesadas ni sus requisitos.":
        case "No tenemos un alcance definido formalmente.":
        case "Tenemos procesos operativos, pero no están formalmente definidos ni sus interacciones comprendidas.":
        case "La alta dirección muestra un interés limitado en el SGC.":
        case "No tenemos una política de calidad definida o no es conocida por el personal.":
        case "Las responsabilidades y autoridades no están claramente definidas ni comunicadas.":
        case "No hemos considerado formalmente los riesgos y oportunidades relacionados con nuestro SGC.":
        case "No tenemos objetivos de calidad definidos formalmente.":
        case "Los cambios se realizan de manera reactiva y sin una planificación formal.":
        case "Los recursos se abordan según la necesidad inmediata.":
        case "La competencia del personal no se evalúa formalmente.":
        case "El personal tiene poco o ningún conocimiento de la política y los objetivos de la calidad.":
        case "Las comunicaciones son informales y no planificadas.":
        case "La información documentada es inconsistente y no está controlada formalmente.":
        case "La operación de los procesos es principalmente reactiva.":
        case "Los requisitos del cliente no siempre se comprenden completamente ni se revisan.":
        case "El diseño y desarrollo se realiza de manera informal y sin controles definidos.":
        case "El control de proveedores externos es limitado o inexistente.":
        case "La producción y la provisión del servicio se realizan sin condiciones controladas definidas.":
        case "La identificación y trazabilidad no se gestionan formalmente.":
        case "Las salidas no conformes no siempre se identifican ni se controlan adecuadamente.":
        case "El seguimiento y la medición son limitados o inexistentes.":
        case "No realizamos un seguimiento formal de la satisfacción del cliente.":
        case "No se realizan auditorías internas.":
        case "La revisión por la dirección no se realiza o es superficial.":
        case "Las mejoras se realizan de manera reactiva cuando surgen problemas.":
        case "Las no conformidades no siempre se registran ni se corrigen.":
        case "No hay evidencia de mejora continua.":
          score = 1;
          break;
        case "Hemos identificado y considerado algunos factores externos e internos relevantes.":
        case "Hemos identificado algunas partes interesadas clave y sus requisitos generales.":
        case "Hemos discutido y acordado un alcance general.":
        case "Hemos identificado algunos de los procesos clave y sus interacciones.":
        case "La alta dirección reconoce la importancia del SGC y ha establecido una política de calidad.":
        case "Tenemos una política de calidad establecida, pero su comunicación y entendimiento son limitados.":
        case "Algunas responsabilidades y autoridades han sido asignadas informalmente.":
        case "Hemos identificado algunos riesgos y oportunidades de manera informal.":
        case "Hemos establecido algunos objetivos de calidad, pero no son claramente medibles ni monitoreados.":
        case "Consideramos algunos aspectos antes de realizar cambios.":
        case "Hemos identificado algunos de los recursos necesarios.":
        case "Verificamos las calificaciones básicas del personal.":
        case "Se ha comunicado la política de calidad, pero el entendimiento de los objetivos y la contribución es limitado.":
        case "Algunas comunicaciones clave se realizan según la necesidad.":
        case "Algunos documentos están disponibles, pero su control es limitado.":
        case "Tenemos algunos planes y controles para la operación.":
        case "Se consideran algunos requisitos del cliente.":
        case "Algunas etapas del diseño y desarrollo se consideran.":
        case "Realizamos algunas verificaciones de los suministros externos.":
        case "Se siguen algunas instrucciones básicas.":
        case "Algunas salidas se identifican.":
        case "Se toman acciones correctivas ocasionales.":
        case "Se recopilan algunos datos, pero el análisis y la evaluación son informales.":
        case "Recibimos comentarios de los clientes de manera informal.":
        case "Se realizan auditorías internas de manera esporádica.":
        case "Se realizan algunas revisiones por la dirección ocasionalmente.":
        case "Se consideran algunas oportunidades de mejora de manera informal.":
        case "Se toman algunas acciones para abordar las no conformidades.":
        case "Se realizan algunas mejoras de manera ocasional.":
          score = 2;
          break;
        case "Hemos documentado los factores externos e internos relevantes y cómo afectan nuestro SGC.":
        case "Hemos documentado las partes interesadas pertinentes y sus requisitos relevantes para nuestro SGC.":
        case "Hemos documentado el alcance de nuestro SGC, incluyendo los tipos de productos/servicios y justificaciones para cualquier no aplicabilidad.":
        case "Hemos definido y documentado los procesos necesarios y sus interacciones en nuestro SGC.":
        case "La alta dirección participa activamente en la implementación y mantenimiento del SGC, asegurando la disponibilidad de recursos.":
        case "La política de calidad está documentada, comunicada y generalmente entendida dentro de la organización.":
        case "Las responsabilidades y autoridades para los roles relevantes dentro del SGC están definidas, documentadas y comunicadas.":
        case "Hemos establecido un proceso para identificar y planificar acciones para abordar los riesgos y oportunidades que pueden afectar nuestro SGC.":
        case "Hemos establecido objetivos de calidad medibles, coherentes con la política de calidad, y los comunicamos.":
        case "Planificamos los cambios en el SGC, considerando su propósito, consecuencias, integridad y recursos.":
        case "Determinamos y proporcionamos los recursos necesarios (personas, infraestructura, ambiente, seguimiento y medición, conocimientos).":
        case "Determinamos la competencia necesaria, aseguramos la competencia basada en educación, formación o experiencia, y conservamos registros.":
        case "El personal es consciente de la política de calidad, los objetivos relevantes y su contribución a la eficacia del SGC.":
        case "Hemos determinado qué, cuándo, a quién, cómo y quién comunica información relevante para el SGC.":
        case "Hemos establecido procesos para la creación, actualización y control de la información documentada.":
        case "Planificamos, implementamos y controlamos los procesos, determinando requisitos, criterios y recursos.":
        case "Determinamos y revisamos los requisitos del cliente, incluyendo los legales y reglamentarios, antes de comprometernos a suministrar.":
        case "Hemos establecido, implementado y mantenemos un proceso de diseño y desarrollo con etapas y controles definidos.":
        case "Hemos determinado los controles a aplicar a los proveedores externos basándonos en su capacidad para cumplir los requisitos.":
        case "Implementamos la producción y provisión del servicio bajo condiciones controladas, incluyendo la disponibilidad de información documentada y recursos.":
        case "Utilizamos medios apropiados para identificar las salidas y su estado con respecto a los requisitos de seguimiento y medición.":
        case "Identificamos y controlamos las salidas no conformes para prevenir su uso o entrega no intencionada y tomamos acciones apropiadas.":
        case "Determinamos qué necesita seguimiento y medición, los métodos, cuándo y cuándo analizar y evaluar los resultados.":
        case "Realizamos el seguimiento de las percepciones del cliente sobre el grado en que se cumplen sus necesidades y expectativas.":
        case "Llevamos a cabo auditorías internas a intervalos planificados para verificar la conformidad y la eficacia del SGC.":
        case "La alta dirección revisa el SGC a intervalos planificados para asegurar su conveniencia, adecuación y eficacia.":
        case "Determinamos y seleccionamos oportunidades de mejora para cumplir los requisitos del cliente y aumentar su satisfacción.":
        case "Reaccionamos ante las no conformidades, las corregimos y evaluamos la necesidad de acciones correctivas para eliminar sus causas.":
        case "La organización busca mejorar el desempeño del SGC.":
          score = 3;
          break;
        case "Realizamos un seguimiento y revisión periódica de nuestros factores externos e internos y ajustamos nuestro SGC en consecuencia.":
        case "Realizamos un seguimiento y revisamos periódicamente los requisitos de nuestras partes interesadas y adaptamos nuestro SGC.":
        case "El alcance está claramente comunicado y entendido en toda la organización.":
        case "Gestionamos nuestros procesos utilizando criterios definidos, realizamos seguimiento y evaluación de su eficacia.":
        case "La alta dirección revisa periódicamente el desempeño del SGC, promueve la mejora y asegura el enfoque al cliente.":
        case "La política de calidad se aplica como un marco de referencia para los objetivos de la calidad y es accesible a las partes interesadas pertinentes.":
        case "El personal comprende sus responsabilidades y autoridades y cómo contribuyen a la eficacia del SGC.":
        case "Hemos integrado acciones para abordar riesgos y oportunidades en nuestros procesos del SGC y evaluamos su eficacia.":
        case "Realizamos un seguimiento regular del logro de nuestros objetivos de calidad y los actualizamos según sea necesario.":
        case "Gestionamos los cambios planificados y revisamos las consecuencias de los cambios no previstos, tomando acciones para mitigar efectos adversos.":
        case "Aseguramos la disponibilidad y el mantenimiento adecuado de los recursos para el SGC.":
        case "Tomamos acciones para adquirir la competencia necesaria y evaluamos la eficacia de estas acciones.":
        case "El personal comprende las implicaciones del incumplimiento de los requisitos del SGC.":
        case "Nuestras comunicaciones son eficaces y apoyan la operación y el desempeño del SGC.":
        case "La información documentada está disponible, es adecuada para su uso y está protegida.":
        case "Mantenemos información documentada para tener confianza en que los procesos se llevan a cabo según lo planificado y para demostrar la conformidad.":
        case "Aseguramos nuestra capacidad para cumplir los requisitos y gestionamos los cambios en los requisitos de manera eficaz.":
        case "Aplicamos controles al proceso de diseño y desarrollo para asegurar que se cumplen los requisitos y se gestionan los cambios.":
        case "Evaluamos, seleccionamos, realizamos seguimiento del desempeño y reevaluamos a los proveedores externos.":
        case "Realizamos seguimiento y medición en las etapas apropiadas para verificar el cumplimiento de los criterios.":
        case "Controlamos la identificación única cuando la trazabilidad es un requisito y conservamos la información documentada necesaria.":
        case "Verificamos la conformidad cuando se corrigen las salidas no conformes y conservamos información documentada.":
        case "Evaluamos el desempeño y la eficacia del SGC basándonos en el análisis de datos y conservamos la información documentada.":
        case "Determinamos los métodos para obtener, realizar el seguimiento y revisar la información sobre la satisfacción del cliente.":
        case "Planificamos, establecemos, implementamos y mantenemos programas de auditoría, asegurando la objetividad y el informe de resultados a la dirección.":
        case "Las entradas de la revisión por la dirección consideran el estado de acciones previas, cambios, desempeño del SGC, adecuación de recursos y oportunidades de mejora.":
        case "Consideramos los resultados del análisis y la evaluación, y las salidas de la revisión por la dirección para identificar necesidades u oportunidades de mejora continua.":
        case "Implementamos acciones correctivas, revisamos su eficacia y conservamos información documentada.":
        case "La organización considera los resultados del análisis y la revisión por la dirección para la mejora continua.":
          score = 4;
          break;
        case "Utilizamos nuestro conocimiento del contexto para identificar riesgos y oportunidades para la mejora continua y la innovación.":
        case "Integramos las necesidades y expectativas de las partes interesadas en nuestros procesos de mejora y toma de decisiones estratégicas.":
        case "Revisamos el alcance periódicamente para asegurar su continua pertinencia y alineación con el contexto organizacional.":
        case "Optimizamos continuamente nuestros procesos basándonos en la evaluación del desempeño y el pensamiento basado en riesgos.":
        case "La alta dirección lidera la cultura de calidad, impulsa la mejora continua y alinea el SGC con la dirección estratégica de la organización.":
        case "La política de calidad se revisa periódicamente para asegurar su continua adecuación y es un motor para la mejora del desempeño.":
        case "La alta dirección asegura que las responsabilidades y autoridades apoyan la integridad del SGC durante los cambios y promueven el enfoque al cliente.":
        case "Utilizamos el pensamiento basado en riesgos de manera proactiva para mejorar la eficacia del SGC, lograr mejores resultados y prevenir efectos negativos.":
        case "Nuestros objetivos de calidad son un motor para la mejora continua y están alineados con la dirección estratégica y las necesidades del cliente.":
        case "Utilizamos la planificación de cambios como una oportunidad para mejorar la eficacia y eficiencia del SGC.":
        case "Planificamos estratégicamente la adquisición y gestión de recursos para apoyar la mejora continua del SGC.":
        case "Fomentamos una cultura de aprendizaje continuo y gestionamos el conocimiento organizacional para asegurar la competencia a largo plazo.":
        case "Fomentamos activamente la participación y el compromiso del personal con la mejora del SGC.":
        case "Utilizamos las comunicaciones como una herramienta para fomentar la transparencia, la colaboración y la mejora continua.":
        case "Gestionamos la información documentada como un activo de conocimiento que apoya la eficacia y la mejora continua.":
        case "Optimizamos continuamente nuestros procesos operacionales para mejorar la eficiencia y la conformidad de los productos y servicios.":
        case "Nos anticipamos a las necesidades y expectativas del cliente, buscando superar sus requisitos y aumentar su satisfacción.":
        case "Utilizamos el diseño y desarrollo como una oportunidad para la innovación y la mejora continua de nuestros productos y servicios.":
        case "Establecemos relaciones estratégicas con proveedores externos para impulsar la mejora mutua y la creación de valor.":
        case "Optimizamos continuamente nuestros procesos de producción y provisión del servicio para mejorar la eficiencia, minimizar errores y asegurar la conformidad.":
        case "Utilizamos la identificación y trazabilidad para optimizar la gestión de la cadena de suministro y mejorar la respuesta ante problemas.":
        case "Analizamos las no conformidades para identificar causas raíz e implementar acciones correctivas eficaces para prevenir su recurrencia y mejorar continuamente.":
        case "Utilizamos los resultados del seguimiento, la medición, el análisis y la evaluación para impulsar la mejora continua y la toma de decisiones basada en la evidencia.":
        case "Utilizamos la retroalimentación del cliente como una fuente clave para la mejora de nuestros productos, servicios y procesos.":
            case "Utilizamos los resultados de las auditorías internas para identificar oportunidades de mejora y fortalecer la cultura de calidad.":
                case "Las salidas de la revisión por la dirección incluyen decisiones y acciones relacionadas con oportunidades de mejora, cambios en el SGC y necesidades de recursos, alineadas con la dirección estratégica.":
                case "Fomentamos una cultura de mejora continua e innovación en toda la organización.":
                case "Utilizamos el proceso de acción correctiva como una oportunidad para el aprendizaje organizacional y la prevención de recurrencias.":
                case "La mejora continua es una parte integral de la cultura organizacional y se evidencia en la optimización de procesos y el logro de mejores resultados.":
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
              maturityLevel = "Planificado";
            } else if (averageScore <= 3.4) {
              maturityLevel = "Implementado";
            } else if (averageScore <= 4.2) {
              maturityLevel = "Monitoreado y Medido";
            } else {
              maturityLevel = "Optimizado";
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
          const generatePDF = () => {
            if (!results) return;
            
            try {
              // Crear un nuevo documento PDF
              const doc = new jsPDF();
              const categories = [
                "Contexto de la Organización",
                "Liderazgo",
                "Planificación",
                "Apoyo",
                "Operación",
                "Evaluación del Desempeño",
                "Mejora"
              ];
              
              // Encabezado
              doc.setFontSize(18);
              doc.setTextColor(0, 76, 153);
              doc.text("INFORME DE MADUREZ ISO 9001:2015", 105, 20, { align: 'center' });
              
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
              doc.text("MADUREZ POR CLÁUSULA", 105, 90, { align: 'center' });
              
              const startX = 20;
              let startY = 100;
              
              const colWidths = [55, 35, 20, 80];
              const rowHeight = 10;
              const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);
              
              // Cabecera de tabla
              doc.setFillColor(230, 230, 230);
              doc.rect(startX, startY, tableWidth, rowHeight, 'F');
              doc.setTextColor(0, 76, 153);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10);
              
              let currentX = startX;
              ["Cláusula", "Nivel", "Valor", "Descripción"].forEach(
                (header, index) => {
                  doc.text(header, currentX + 2, startY + 7);
                  currentX += colWidths[index];
                }
              );
              
              startY += rowHeight;
              doc.setFont("helvetica", "normal");
              doc.setTextColor(40, 40, 40);
              
              // Agrupar scores por categorías (según cantidad de preguntas por cláusula)
              const questionsPerClause = [4, 3, 3, 5, 8, 4, 3];
              const categoryScores = [];
              let scoreIndex = 0;
              
              for (let i = 0; i < questionsPerClause.length; i++) {
                const clauseScores = results.calculatedScores.slice(scoreIndex, scoreIndex + questionsPerClause[i]);
                const avgClauseScore = clauseScores.reduce((sum, score) => sum + score, 0) / clauseScores.length;
                categoryScores.push(avgClauseScore);
                scoreIndex += questionsPerClause[i];
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
              doc.text(`Nivel de Madurez: ${results.maturityLevel}`, startX, startY);
              
              // Añadir explicación del nivel de madurez
              startY += 20;
              doc.setFontSize(14);
              doc.setTextColor(0, 76, 153);
              doc.text("Descripción del Nivel", startX, startY);
              
              startY += 10;
              doc.setFontSize(10);
              doc.setTextColor(40, 40, 40);
              
              let maturityDescription = "";
              
              switch(results.maturityLevel) {
                case "Inicial":
                  maturityDescription = "La organización tiene un conocimiento básico de los requisitos de la norma ISO 9001:2015. La implementación es incipiente o inexistente. Se han realizado algunas evaluaciones iniciales y se reconoce la necesidad de un sistema de gestión de la calidad.";
                  break;
                case "Planificado":
                  maturityDescription = "La organización ha definido el alcance de su sistema de gestión de la calidad. Se han identificado las partes interesadas y se ha comenzado a planificar los procesos y la documentación necesaria. Se ha establecido una política de la calidad y algunos objetivos iniciales.";
                  break;
                case "Implementado":
                  maturityDescription = "La mayoría de los procesos del sistema de gestión de la calidad se han implementado y se está comenzando a recopilar información documentada. Se han definido responsabilidades y autoridades. Se realizan algunas actividades de seguimiento y medición.";
                  break;
                case "Monitoreado y Medido":
                  maturityDescription = "Los procesos del SGC están operando de manera consistente. Se realiza un seguimiento y medición sistemáticos de los indicadores clave de desempeño. Se realizan auditorías internas y revisiones por la dirección. Se abordan no conformidades y se toman acciones correctivas.";
                  break;
                case "Optimizado":
                  maturityDescription = "La organización demuestra una mejora continua de la conveniencia, adecuación y eficacia del SGC. Se utilizan los resultados del análisis y la evaluación para identificar oportunidades de mejora y se implementan de manera proactiva. La cultura de la calidad está arraigada en toda la organización.";
                  break;
                default:
                  maturityDescription = "No se ha determinado un nivel de madurez.";
              }
              
              const descLines = doc.splitTextToSize(maturityDescription, 170);
              doc.text(descLines, startX, startY);
              
              // Capturar gráfico como imagen - con verificación de seguridad
              if (chartInstance.current && chartInstance.current.canvas) {
                try {
                  const canvas = chartInstance.current.canvas;
                  const imgData = canvas.toDataURL("image/png");
                  doc.addImage(imgData, "PNG", 30, startY + 30, 150, 150);
                } catch (err) {
                  console.error("Error al capturar el gráfico:", err);
                  doc.text("No se pudo incluir el gráfico en el PDF", 105, startY + 80, { align: 'center' });
                }
              } else {
                doc.text("Gráfico no disponible", 105, startY + 80, { align: 'center' });
              }
              
              // Guardar el PDF
              doc.save("Informe_Madurez_ISO9001.pdf");
              
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
              
              const categories = [
                "Contexto de la Organización",
                "Liderazgo",
                "Planificación",
                "Apoyo",
                "Operación",
                "Evaluación del Desempeño",
                "Mejora"
              ];
              
              // Agrupar scores por categorías (según cantidad de preguntas por cláusula)
              const questionsPerClause = [4, 3, 3, 5, 8, 4, 3];
              const categoryScores = [];
              let scoreIndex = 0;
              
              for (let i = 0; i < questionsPerClause.length; i++) {
                const clauseScores = results.calculatedScores.slice(scoreIndex, scoreIndex + questionsPerClause[i]);
                const avgClauseScore = clauseScores.reduce((sum, score) => sum + score, 0) / clauseScores.length;
                categoryScores.push(avgClauseScore);
                scoreIndex += questionsPerClause[i];
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
                          size: 12,
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
        
          // Preguntas organizadas por secciones (cláusulas ISO 9001)
          const questions = [
            // Cláusula 4: Contexto de la Organización
            {
              title: "Contexto de la Organización",
              questions: [
                {
                  id: "iso9001_q1_1",
                  text: "¿Cómo describe mejor la comprensión de su organización sobre los factores externos e internos relevantes para su propósito y dirección estratégica?",
                  options: [
                    "Tenemos una idea general de algunos factores que podrían afectarnos.",
                    "Hemos identificado y considerado algunos factores externos e internos relevantes.",
                    "Hemos documentado los factores externos e internos relevantes y cómo afectan nuestro SGC.",
                    "Realizamos un seguimiento y revisión periódica de nuestros factores externos e internos y ajustamos nuestro SGC en consecuencia.",
                    "Utilizamos nuestro conocimiento del contexto para identificar riesgos y oportunidades para la mejora continua y la innovación."
                  ],
                  note: "Esta pregunta evalúa cómo la organización comprende su entorno interno y externo, incluyendo factores como el mercado, la tecnología, la competencia, la legislación, así como su estructura, cultura, recursos y capacidades internas."
                },
                {
                  id: "iso9001_q1_2",
                  text: "¿Cómo aborda su organización la identificación de las partes interesadas pertinentes y sus requisitos?",
                  options: [
                    "No hemos identificado formalmente a nuestras partes interesadas ni sus requisitos.",
                    "Hemos identificado algunas partes interesadas clave y sus requisitos generales.",
                    "Hemos documentado las partes interesadas pertinentes y sus requisitos relevantes para nuestro SGC.",
                    "Realizamos un seguimiento y revisamos periódicamente los requisitos de nuestras partes interesadas y adaptamos nuestro SGC.",
                    "Integramos las necesidades y expectativas de las partes interesadas en nuestros procesos de mejora y toma de decisiones estratégicas."
                  ],
                  note: "Las partes interesadas pueden incluir clientes, accionistas, empleados, proveedores, reguladores, comunidades locales, etc. La organización debe identificar las partes interesadas relevantes y comprender sus necesidades y expectativas."
                },
                {
                  id: "iso9001_q1_3",
                  text: "¿Qué tan formalmente ha definido y documentado el alcance de su sistema de gestión de la calidad?",
                  options: [
                    "No tenemos un alcance definido formalmente.",
                    "Hemos discutido y acordado un alcance general.",
                    "Hemos documentado el alcance de nuestro SGC, incluyendo los tipos de productos/servicios y justificaciones para cualquier no aplicabilidad.",
                    "El alcance está claramente comunicado y entendido en toda la organización.",
                    "Revisamos el alcance periódicamente para asegurar su continua pertinencia y alineación con el contexto organizacional."
                  ],
                  note: "El alcance define los límites y la aplicabilidad del sistema de gestión de la calidad, considerando el contexto de la organización y los requisitos de las partes interesadas."
                },
                {
                  id: "iso9001_q1_4",
                  text: "¿Cómo describe la determinación y gestión de los procesos necesarios para su SGC y sus interacciones?",
                  options: [
                    "Tenemos procesos operativos, pero no están formalmente definidos ni sus interacciones comprendidas.",
                    "Hemos identificado algunos de los procesos clave y sus interacciones.",
                    "Hemos definido y documentado los procesos necesarios y sus interacciones en nuestro SGC.",
                    "Gestionamos nuestros procesos utilizando criterios definidos, realizamos seguimiento y evaluación de su eficacia.",
                    "Optimizamos continuamente nuestros procesos basándonos en la evaluación del desempeño y el pensamiento basado en riesgos."
                  ],
                  note: "La organización debe determinar los procesos necesarios para su SGC, establecer sus secuencias e interacciones, y aplicar el ciclo PHVA (Planificar-Hacer-Verificar-Actuar) para su gestión y mejora."
                }
              ]
            },
            
            // Cláusula 5: Liderazgo
            {
              title: "Liderazgo",
              questions: [
                {
                  id: "iso9001_q2_1",
                  text: "¿Cómo demuestra la alta dirección su liderazgo y compromiso con el sistema de gestión de la calidad?",
                  options: [
                    "La alta dirección muestra un interés limitado en el SGC.",
                    "La alta dirección reconoce la importancia del SGC y ha establecido una política de calidad.",
                    "La alta dirección participa activamente en la implementación y mantenimiento del SGC, asegurando la disponibilidad de recursos.",
                    "La alta dirección revisa periódicamente el desempeño del SGC, promueve la mejora y asegura el enfoque al cliente.",
                    "La alta dirección lidera la cultura de calidad, impulsa la mejora continua y alinea el SGC con la dirección estratégica de la organización."
                  ],
                  note: "La alta dirección debe demostrar liderazgo y compromiso con respecto al SGC, asumiendo la responsabilidad de su eficacia, promoviendo el enfoque al cliente y la mejora continua, y asegurando la integración de los requisitos del SGC en los procesos de negocio."
                },
                {
                  id: "iso9001_q2_2",
                  text: "¿Qué tan apropiada, comunicada y entendida es la política de la calidad en su organización?",
                  options: [
                    "No tenemos una política de calidad definida o no es conocida por el personal.",
                    "Tenemos una política de calidad establecida, pero su comunicación y entendimiento son limitados.",
                    "La política de calidad está documentada, comunicada y generalmente entendida dentro de la organización.",
                    "La política de calidad se aplica como un marco de referencia para los objetivos de la calidad y es accesible a las partes interesadas pertinentes.",
                    "La política de calidad se revisa periódicamente para asegurar su continua adecuación y es un motor para la mejora del desempeño."
                  ],
                  note: "La política de la calidad debe ser apropiada al propósito y contexto de la organización, proporcionar un marco de referencia para establecer objetivos, incluir un compromiso de cumplir con los requisitos aplicables y de mejora continua."
                },
                {
                  id: "iso9001_q2_3",
                  text: "¿Cómo se asignan, comunican y entienden las responsabilidades y autoridades dentro de su organización para el SGC?",
                  options: [
                    "Las responsabilidades y autoridades no están claramente definidas ni comunicadas.",
                    "Algunas responsabilidades y autoridades han sido asignadas informalmente.",
                    "Las responsabilidades y autoridades para los roles relevantes dentro del SGC están definidas, documentadas y comunicadas.",
                    "El personal comprende sus responsabilidades y autoridades y cómo contribuyen a la eficacia del SGC.",
                    "La alta dirección asegura que las responsabilidades y autoridades apoyan la integridad del SGC durante los cambios y promueven el enfoque al cliente."
                  ],
                  note: "La alta dirección debe asegurarse de que las responsabilidades y autoridades para los roles pertinentes se asignen, comuniquen y entiendan en toda la organización, incluyendo la responsabilidad de asegurar la conformidad con la norma ISO 9001."
                }
              ]
            },
            
            // Cláusula 6: Planificación
            {
              title: "Planificación",
              questions: [
                {
                  id: "iso9001_q3_1",
                  text: "¿Cómo aborda su organización la identificación y planificación de acciones para abordar los riesgos y oportunidades?",
                  options: [
                    "No hemos considerado formalmente los riesgos y oportunidades relacionados con nuestro SGC.",
                    "Hemos identificado algunos riesgos y oportunidades de manera informal.",
                    "Hemos establecido un proceso para identificar y planificar acciones para abordar los riesgos y oportunidades que pueden afectar nuestro SGC.",
                    "Hemos integrado acciones para abordar riesgos y oportunidades en nuestros procesos del SGC y evaluamos su eficacia.",
                    "Utilizamos el pensamiento basado en riesgos de manera proactiva para mejorar la eficacia del SGC, lograr mejores resultados y prevenir efectos negativos."
                  ],
                  note: "La organización debe determinar los riesgos y oportunidades que es necesario abordar para asegurar que el SGC pueda lograr los resultados previstos, aumentar los efectos deseables, prevenir o reducir efectos no deseados, y lograr la mejora."
                },
                {
                  id: "iso9001_q3_2",
                  text: "¿Qué tan definidos, medibles, monitoreados y comunicados son sus objetivos de la calidad?",
                  options: [
                    "No tenemos objetivos de calidad definidos formalmente.",
                    "Hemos establecido algunos objetivos de calidad, pero no son claramente medibles ni monitoreados.",
                    "Hemos establecido objetivos de calidad medibles, coherentes con la política de calidad, y los comunicamos.",
                    "Realizamos un seguimiento regular del logro de nuestros objetivos de calidad y los actualizamos según sea necesario.",
                    "Nuestros objetivos de calidad son un motor para la mejora continua y están alineados con la dirección estratégica y las necesidades del cliente."
                  ],
                  note: "Los objetivos de la calidad deben ser coherentes con la política de la calidad, ser medibles, tener en cuenta los requisitos aplicables, ser pertinentes para la conformidad de los productos y servicios y para el aumento de la satisfacción del cliente, ser objeto de seguimiento, y actualizarse según corresponda."
                },
                {
                  id: "iso9001_q3_3",
                  text: "¿Cómo planifica y gestiona su organización los cambios en el sistema de gestión de la calidad?",
                  options: [
                    "Los cambios se realizan de manera reactiva y sin una planificación formal.",
                    "Consideramos algunos aspectos antes de realizar cambios.",
                    "Planificamos los cambios en el SGC, considerando su propósito, consecuencias, integridad y recursos.",
                    "Gestionamos los cambios planificados y revisamos las consecuencias de los cambios no previstos, tomando acciones para mitigar efectos adversos.",
                    "Utilizamos la planificación de cambios como una oportunidad para mejorar la eficacia y eficiencia del SGC."
                  ],
                  note: "Cuando la organización determina la necesidad de cambios en el SGC, estos cambios deben llevarse a cabo de manera planificada, considerando el propósito de los cambios y sus consecuencias potenciales, la integridad del SGC, la disponibilidad de recursos, y la asignación o reasignación de responsabilidades y autoridades."
                }
              ]
            },
            
            // Cláusula 7: Apoyo
            {
              title: "Apoyo",
              questions: [
                {
                  id: "iso9001_q4_1",
                  text: "¿Cómo determina y proporciona su organización los recursos necesarios para el SGC?",
                  options: [
                    "Los recursos se abordan según la necesidad inmediata.",
                    "Hemos identificado algunos de los recursos necesarios.",
                    "Determinamos y proporcionamos los recursos necesarios (personas, infraestructura, ambiente, seguimiento y medición, conocimientos).",
                    "Aseguramos la disponibilidad y el mantenimiento adecuado de los recursos para el SGC.",
                    "Planificamos estratégicamente la adquisición y gestión de recursos para apoyar la mejora continua del SGC."
                  ],
                  note: "La organización debe determinar y proporcionar los recursos necesarios para el establecimiento, implementación, mantenimiento y mejora continua del SGC, considerando las capacidades y limitaciones de los recursos internos existentes y qué se necesita obtener de los proveedores externos."
                },
                {
                  id: "iso9001_q4_2",
                  text: "¿Cómo asegura su organización la competencia de las personas que realizan trabajo bajo su control que afecta el desempeño y eficacia del SGC?",
                  options: [
                    "La competencia del personal no se evalúa formalmente.",
                    "Verificamos las calificaciones básicas del personal.",
                    "Determinamos la competencia necesaria, aseguramos la competencia basada en educación, formación o experiencia, y conservamos registros.",
                    "Tomamos acciones para adquirir la competencia necesaria y evaluamos la eficacia de estas acciones.",
                    "Fomentamos una cultura de aprendizaje continuo y gestionamos el conocimiento organizacional para asegurar la competencia a largo plazo."
                  ],
                  note: "La organización debe determinar la competencia necesaria de las personas que realizan trabajo bajo su control que afecta el desempeño y eficacia del SGC, asegurarse de que estas personas sean competentes, tomar acciones para adquirir la competencia necesaria, y conservar la información documentada apropiada como evidencia de la competencia."
                },
                {
                  id: "iso9001_q4_3",
                  text: "¿Qué nivel de conciencia tiene el personal sobre la política de la calidad, los objetivos relevantes y su contribución al SGC?",
                  options: [
                    "El personal tiene poco o ningún conocimiento de la política y los objetivos de la calidad.",
                    "Se ha comunicado la política de calidad, pero el entendimiento de los objetivos y la contribución es limitado.",
                    "El personal es consciente de la política de calidad, los objetivos relevantes y su contribución a la eficacia del SGC.",
                    "El personal comprende las implicaciones del incumplimiento de los requisitos del SGC.",
                    "Fomentamos activamente la participación y el compromiso del personal con la mejora del SGC."
                  ],
                  note: "La organización debe asegurarse de que las personas que realizan trabajo bajo su control son conscientes de la política de la calidad, los objetivos de la calidad pertinentes, su contribución a la eficacia del SGC, y las implicaciones del incumplimiento de los requisitos del SGC."
                },
                {
                  id: "iso9001_q4_4",
                  text: "¿Cómo gestiona su organización las comunicaciones internas y externas relevantes para el SGC?",
                  options: [
                    "Las comunicaciones son informales y no planificadas.",
                    "Algunas comunicaciones clave se realizan según la necesidad.",
                    "Hemos determinado qué, cuándo, a quién, cómo y quién comunica información relevante para el SGC.",
                    "Nuestras comunicaciones son eficaces y apoyan la operación y el desempeño del SGC.",
                    "Utilizamos las comunicaciones como una herramienta para fomentar la transparencia, la colaboración y la mejora continua."
                  ],
                  note: "La organización debe determinar las comunicaciones internas y externas pertinentes al SGC, incluyendo qué comunicar, cuándo comunicarlo, a quién comunicarlo, cómo comunicarlo, y quién comunica."
                },
                {
                  id: "iso9001_q4_5",
                  text: "¿Cómo controla su organización la información documentada requerida por la norma y la necesaria para la eficacia del SGC?",
                  options: [
                    "La información documentada es inconsistente y no está controlada formalmente.",
                    "Algunos documentos están disponibles, pero su control es limitado.",
                    "Hemos establecido procesos para la creación, actualización y control de la información documentada.",
                    "La información documentada está disponible, es adecuada para su uso y está protegida.",
                    "Gestionamos la información documentada como un activo de conocimiento que apoya la eficacia y la mejora continua."
                  ],
                  note: "La organización debe controlar la información documentada, asegurándose de que esté disponible y sea idónea para su uso, esté protegida adecuadamente, y se aborden actividades como distribución, acceso, almacenamiento, preservación, control de cambios, y disposición."
                }
              ]
            },
            
            // Cláusula 8: Operación
            {
              title: "Operación",
              questions: [
                {
                  id: "iso9001_q5_1",
                  text: "¿Cómo planifica, implementa y controla su organización los procesos necesarios para la provisión de productos y servicios?",
                  options: [
                    "La operación de los procesos es principalmente reactiva.",
                    "Tenemos algunos planes y controles para la operación.",
                    "Planificamos, implementamos y controlamos los procesos, determinando requisitos, criterios y recursos.",
                    "Mantenemos información documentada para tener confianza en que los procesos se llevan a cabo según lo planificado y para demostrar la conformidad.",
                    "Optimizamos continuamente nuestros procesos operacionales para mejorar la eficiencia y la conformidad de los productos y servicios."
                  ],
                  note: "La organización debe planificar, implementar y controlar los procesos necesarios para cumplir los requisitos para la provisión de productos y servicios, determinando los requisitos para los productos y servicios, estableciendo criterios para los procesos y para la aceptación de los productos y servicios, y determinando los recursos necesarios."
                },
                {
                  id: "iso9001_q5_2",
                  text: "¿Cómo determina, revisa y cumple su organización los requisitos para los productos y servicios?",
                  options: [
                    "Los requisitos del cliente no siempre se comprenden completamente ni se revisan.",
                    "Se consideran algunos requisitos del cliente.",
                    "Determinamos y revisamos los requisitos del cliente, incluyendo los legales y reglamentarios, antes de comprometernos a suministrar.",
                    "Aseguramos nuestra capacidad para cumplir los requisitos y gestionamos los cambios en los requisitos de manera eficaz.",
                    "Nos anticipamos a las necesidades y expectativas del cliente, buscando superar sus requisitos y aumentar su satisfacción."
                  ],
                  note: "La organización debe asegurarse de que los requisitos para los productos y servicios se definen, incluyendo los requisitos legales y reglamentarios aplicables, y se cumple con las declaraciones acerca de los productos y servicios que ofrece."
                },
                {
                  id: "iso9001_q5_3",
                  text: "¿Qué tan formalizado y controlado es su proceso de diseño y desarrollo (si aplica)?",
                  options: [
                    "El diseño y desarrollo se realiza de manera informal y sin controles definidos.",
                    "Algunas etapas del diseño y desarrollo se consideran.",
                    "Hemos establecido, implementado y mantenemos un proceso de diseño y desarrollo con etapas y controles definidos.",
                    "Aplicamos controles al proceso de diseño y desarrollo para asegurar que se cumplen los requisitos y se gestionan los cambios.",
                    "Utilizamos el diseño y desarrollo como una oportunidad para la innovación y la mejora continua de nuestros productos y servicios."
                  ],
                  note: "La organización debe establecer, implementar y mantener un proceso de diseño y desarrollo que sea adecuado para asegurarse de la posterior provisión de productos y servicios, considerando la naturaleza, duración y complejidad de las actividades de diseño y desarrollo."
                },
                {
                  id: "iso9001_q5_4",
                  text: "¿Cómo controla su organización los procesos, productos y servicios suministrados externamente?",
                  options: [
                    "El control de proveedores externos es limitado o inexistente.",
                    "Realizamos algunas verificaciones de los suministros externos.",
                    "Hemos determinado los controles a aplicar a los proveedores externos basándonos en su capacidad para cumplir los requisitos.",
                    "Evaluamos, seleccionamos, realizamos seguimiento del desempeño y reevaluamos a los proveedores externos.",
                    "Establecemos relaciones estratégicas con proveedores externos para impulsar la mejora mutua y la creación de valor."
                  ],
                  note: "La organización debe asegurarse de que los procesos, productos y servicios suministrados externamente son conformes a los requisitos, determinando y aplicando criterios para la evaluación, selección, seguimiento del desempeño y la reevaluación de los proveedores externos."
                },
                {
                  id: "iso9001_q5_5",
                  text: "¿Cómo asegura su organización el control de la producción y la provisión del servicio?",
                  options: [
                    "La producción y la provisión del servicio se realizan sin condiciones controladas definidas.",
                    "Se siguen algunas instrucciones básicas.",
                    "Implementamos la producción y provisión del servicio bajo condiciones controladas, incluyendo la disponibilidad de información documentada y recursos.",
                    "Realizamos seguimiento y medición en las etapas apropiadas para verificar el cumplimiento de los criterios.",
                    "Optimizamos continuamente nuestros procesos de producción y provisión del servicio para mejorar la eficiencia, minimizar errores y asegurar la conformidad."
                  ],
                  note: "La producción y provisión del servicio debe realizarse bajo condiciones controladas, incluyendo la disponibilidad de información documentada que defina las características de los productos y servicios, los resultados a alcanzar, la disponibilidad y uso de recursos de seguimiento y medición adecuados, y la implementación de actividades de seguimiento y medición."
                },
                {
                  id: "iso9001_q5_6",
                  text: "¿Cómo gestiona su organización la identificación y trazabilidad de las salidas?",
                  options: [
                    "La identificación y trazabilidad no se gestionan formalmente.",
                    "Algunas salidas se identifican.",
                    "Utilizamos medios apropiados para identificar las salidas y su estado con respecto a los requisitos de seguimiento y medición.",
                    "Controlamos la identificación única cuando la trazabilidad es un requisito y conservamos la información documentada necesaria.",
                    "Utilizamos la identificación y trazabilidad para optimizar la gestión de la cadena de suministro y mejorar la respuesta ante problemas."
                  ],
                  note: "La organización debe utilizar los medios apropiados para identificar las salidas, cuando sea necesario, para asegurar la conformidad de los productos y servicios, y debe controlar la identificación única de las salidas cuando la trazabilidad sea un requisito."
                },
                {
                  id: "iso9001_q5_7",
                  text: "¿Cómo cuida y protege su organización la propiedad perteneciente a los clientes o a proveedores externos?",
                  options: [
                    "No tenemos un proceso formal para cuidar la propiedad del cliente o proveedor externo.",
                    "Tomamos algunas precauciones básicas.",
                    "Identificamos, verificamos, protegemos y salvaguardamos la propiedad del cliente o de proveedores externos.",
                    "Informamos al cliente o proveedor externo cuando su propiedad se pierde, deteriora o se considera inadecuada para su uso.",
                    "Implementamos sistemas avanzados para la gestión y protección de la propiedad de clientes y proveedores externos."
                  ],
                  note: "La organización debe cuidar la propiedad perteneciente a clientes o a proveedores externos mientras esté bajo el control de la organización o esté siendo utilizada por la misma, identificándola, verificándola, protegiéndola y salvaguardándola."
                },
                {
                  id: "iso9001_q5_8",
                  text: "¿Cómo controla su organización las salidas no conformes?",
                  options: [
                    "Las salidas no conformes no siempre se identifican ni se controlan adecuadamente.",
                    "Se toman acciones correctivas ocasionales.",
                    "Identificamos y controlamos las salidas no conformes para prevenir su uso o entrega no intencionada y tomamos acciones apropiadas.",
                    "Verificamos la conformidad cuando se corrigen las salidas no conformes y conservamos información documentada.",
                    "Analizamos las no conformidades para identificar causas raíz e implementar acciones correctivas eficaces para prevenir su recurrencia y mejorar continuamente."
                  ],
                  note: "La organización debe asegurarse de que las salidas que no sean conformes con sus requisitos se identifican y se controlan para prevenir su uso o entrega no intencionada, tomando las acciones adecuadas basándose en la naturaleza de la no conformidad y en su efecto sobre la conformidad de los productos y servicios."
                }
              ]
            },
            
            // Cláusula 9: Evaluación del Desempeño
            {
              title: "Evaluación del Desempeño",
              questions: [
                {
                  id: "iso9001_q6_1",
                  text: "¿Cómo realiza su organización el seguimiento, la medición, el análisis y la evaluación del desempeño del SGC?",
                  options: [
                    "El seguimiento y la medición son limitados o inexistentes.",
                    "Se recopilan algunos datos, pero el análisis y la evaluación son informales.",
                    "Determinamos qué necesita seguimiento y medición, los métodos, cuándo y cuándo analizar y evaluar los resultados.",
                    "Evaluamos el desempeño y la eficacia del SGC basándonos en el análisis de datos y conservamos la información documentada.",
                    "Utilizamos los resultados del seguimiento, la medición, el análisis y la evaluación para impulsar la mejora continua y la toma de decisiones basada en la evidencia."
                  ],
                  note: "La organización debe determinar qué necesita seguimiento y medición, los métodos de seguimiento, medición, análisis y evaluación necesarios para asegurar resultados válidos, cuándo se deben llevar a cabo el seguimiento y la medición, y cuándo se deben analizar y evaluar los resultados."
                },
                {
                  id: "iso9001_q6_2",
                  text: "¿Cómo realiza su organización el seguimiento de la satisfacción del cliente?",
                  options: [
                    "No realizamos un seguimiento formal de la satisfacción del cliente.",
                    "Recibimos comentarios de los clientes de manera informal.",
                    "Realizamos el seguimiento de las percepciones del cliente sobre el grado en que se cumplen sus necesidades y expectativas.",
                    "Determinamos los métodos para obtener, realizar el seguimiento y revisar la información sobre la satisfacción del cliente.",
                    "Utilizamos la retroalimentación del cliente como una fuente clave para la mejora de nuestros productos, servicios y procesos."
                  ],
                  note: "La organización debe realizar el seguimiento de las percepciones de los clientes del grado en que se cumplen sus necesidades y expectativas, determinando los métodos para obtener, realizar el seguimiento y revisar esta información."
                },
                {
                  id: "iso9001_q6_3",
                  text: "¿Con qué frecuencia y eficacia se realizan las auditorías internas en su organización?",
                  options: [
                    "No se realizan auditorías internas.",
                    "Se realizan auditorías internas de manera esporádica.",
                    "Llevamos a cabo auditorías internas a intervalos planificados para verificar la conformidad y la eficacia del SGC.",
                    "Planificamos, establecemos, implementamos y mantenemos programas de auditoría, asegurando la objetividad y el informe de resultados a la dirección.",
                    "Utilizamos los resultados de las auditorías internas para identificar oportunidades de mejora y fortalecer la cultura de calidad."
                  ],
                  note: "La organización debe llevar a cabo auditorías internas a intervalos planificados para proporcionar información acerca de si el SGC es conforme con los requisitos propios de la organización y los requisitos de la norma ISO 9001, y se implementa y mantiene eficazmente."
                },
                {
                  id: "iso9001_q6_4",
                  text: "¿Con qué regularidad y profundidad la alta dirección revisa el sistema de gestión de la calidad?",
                  options: [
                    "La revisión por la dirección no se realiza o es superficial.",
                    "Se realizan algunas revisiones por la dirección ocasionalmente.",
                    "La alta dirección revisa el SGC a intervalos planificados para asegurar su conveniencia, adecuación y eficacia.",
                    "Las entradas de la revisión por la dirección consideran el estado de acciones previas, cambios, desempeño del SGC, adecuación de recursos y oportunidades de mejora.",
                    "Las salidas de la revisión por la dirección incluyen decisiones y acciones relacionadas con oportunidades de mejora, cambios en el SGC y necesidades de recursos, alineadas con la dirección estratégica."
                  ],
                  note: "La alta dirección debe revisar el SGC de la organización a intervalos planificados, para asegurarse de su conveniencia, adecuación, eficacia y alineación continuas con la dirección estratégica de la organización."
                }
              ]
            },
            
            // Cláusula 10: Mejora
            {
              title: "Mejora",
              questions: [
                {
                  id: "iso9001_q7_1",
                  text: "¿Cómo identifica y selecciona su organización las oportunidades de mejora?",
                  options: [
                    "Las mejoras se realizan de manera reactiva cuando surgen problemas.",
                    "Se consideran algunas oportunidades de mejora de manera informal.",
                    "Determinamos y seleccionamos oportunidades de mejora para cumplir los requisitos del cliente y aumentar su satisfacción.",
                    "Consideramos los resultados del análisis y la evaluación, y las salidas de la revisión por la dirección para identificar necesidades u oportunidades de mejora continua.",
                    "Fomentamos una cultura de mejora continua e innovación en toda la organización."
                  ],
                  note: "La organización debe determinar y seleccionar las oportunidades de mejora e implementar cualquier acción necesaria para cumplir los requisitos del cliente y aumentar la satisfacción del cliente, incluyendo mejorar los productos y servicios, corregir efectos no deseados, y mejorar el desempeño y la eficacia del SGC."
                },
                {
                  id: "iso9001_q7_2",
                  text: "¿Cómo aborda su organización las no conformidades y toma acciones correctivas?",
                  options: [
                    "Las no conformidades no siempre se registran ni se corrigen.",
                    "Se toman algunas acciones para abordar las no conformidades.",
                    "Reaccionamos ante las no conformidades, las corregimos y evaluamos la necesidad de acciones correctivas para eliminar sus causas.",
                    "Implementamos acciones correctivas, revisamos su eficacia y conservamos información documentada.",
                    "Utilizamos el proceso de acción correctiva como una oportunidad para el aprendizaje organizacional y la prevención de recurrencias."
                  ],
                  note: "Cuando ocurre una no conformidad, la organización debe reaccionar ante la no conformidad, evaluar la necesidad de acciones para eliminar las causas de la no conformidad, implementar cualquier acción necesaria, revisar la eficacia de cualquier acción correctiva tomada, y actualizar los riesgos y oportunidades determinados durante la planificación, si es necesario."
                },
                {
                  id: "iso9001_q7_3",
                  text: "¿Cómo demuestra su organización la mejora continua de la conveniencia, adecuación y eficacia del SGC?",
                  options: [
                    "No hay evidencia de mejora continua.",
                    "Se realizan algunas mejoras de manera ocasional.",
                    "La organización busca mejorar el desempeño del SGC.",
                    "La organización considera los resultados del análisis y la revisión por la dirección para la mejora continua.",
                    "La mejora continua es una parte integral de la cultura organizacional y se evidencia en la optimización de procesos y el logro de mejores resultados."
                  ],
                  note: "La organización debe mejorar continuamente la conveniencia, adecuación y eficacia del SGC, considerando los resultados del análisis y la evaluación, así como las salidas de la revisión por la dirección, para determinar si hay necesidades u oportunidades que deben considerarse como parte de la mejora continua."
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
                        Evaluación de Madurez ISO 9001:2015
                      </h1>
                      
                      <p className="text-gray-300 text-lg max-w-3xl mb-8">
                        Bienvenido a nuestra herramienta de evaluación de madurez del Sistema de Gestión de Calidad bajo la norma ISO 9001:2015. Esta evaluación le ayudará a comprender el nivel actual de madurez de su organización y le proporcionará información valiosa para la mejora continua.
                      </p>
                      
                      <div className="w-full max-w-2xl mb-10 rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
                        <img 
                          src="https://www.iso.org/files/live/sites/isoorg/files/news/News_archive/2015/en/Ref2014/ISO%209001_2015.png" 
                          alt="ISO 9001:2015 Assessment" 
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
                          let stepIndex = 0;
                          for (let i = 0; i < categoryIndex; i++) {
                            stepIndex += questions[i].questions.length;
                          }
                          stepIndex += questionIndex;
                          
                          return stepIndex === currentStep ? (
                            <div key={question.id} className="animate-fadeIn">
                              {/* Indicador de categoría */}
                              <div className="flex justify-between items-center mb-6">
                                <div className="px-4 py-1 bg-blue-600/30 rounded-full text-cyan-400 text-sm font-medium">
                                  Cláusula {categoryIndex + 4}: {category.title}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  Pregunta {questionIndex + 1} de {category.questions.length}
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
                      Resultados de Madurez ISO 9001:2015
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 2 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
          
          export default ISO9001MaturityForm;