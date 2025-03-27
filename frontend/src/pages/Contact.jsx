import { useContext, useState } from "react";
import { motion } from "framer-motion";
import GlobalContext from "../../contexts/GlobalContext";

const Contact = () => {
  const { services, contactStatus, sendContactMessage } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    plan: "",
    serviceType: "",
    additionalIdeas: "",
  });

  const [errors, setErrors] = useState({});
  const [formStep, setFormStep] = useState(1);

  const serviceTypes = [
    { id: "web", name: "Desenvolvimento Web", description: "Sites, aplicações web e e-commerce" },
    { id: "marketing", name: "Marketing Digital", description: "SEO, publicidade e gestão de redes sociais" }
  ];

  const servicePlans = {
    web: [
      { id: "basic", name: "Básico", price: "R$ 2.500", description: "Site institucional básico" },
      { id: "pro", name: "Profissional", price: "R$ 5.000", description: "Site com recursos avançados" },
      { id: "premium", name: "Premium", price: "Personalizado", description: "Solução completa personalizada" }
    ],
    marketing: [
      { id: "basic", name: "Básico", price: "R$ 1.500", description: "Gestão básica de redes sociais" },
      { id: "pro", name: "Profissional", price: "R$ 3.000", description: "Gestão completa + publicidade" },
      { id: "premium", name: "Premium", price: "Personalizado", description: "Estratégia completa personalizada" }
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Nome completo é obrigatório";
    if (!formData.email.trim()) {
      tempErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email inválido";
    }
    if (!formData.phone.trim()) tempErrors.phone = "Telefone é obrigatório";
    if (!formData.message.trim()) tempErrors.message = "Mensagem é obrigatória";
    if (!formData.plan) tempErrors.plan = "Por favor, selecione um plano";
    if (!formData.serviceType) tempErrors.serviceType = "Por favor, selecione o tipo de serviço";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const formattedMessage = `
Tipo de Serviço: ${formData.serviceType === 'web' ? 'Desenvolvimento Web' : 'Marketing Digital'}
Plano Escolhido: ${formData.plan}
Telefone: ${formData.phone}
Mensagem: ${formData.message}
${formData.additionalIdeas ? `Ideias Adicionais: ${formData.additionalIdeas}` : ''}
        `.trim();

        const contactData = {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          message: formattedMessage,
        };

        await sendContactMessage(contactData);
        
        // Limpiar el formulario solo si el envío fue exitoso
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          plan: "",
          serviceType: "",
          additionalIdeas: "",
        });
        
        // Volver al primer paso
        setFormStep(1);
        
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        // Mostrar mensaje de error más específico al usuario
        setErrors({
          submit: error.response?.data?.error || "Erro ao enviar mensagem. Por favor, tente novamente."
        });
      }
    }
  };

  const nextStep = () => {
    const fieldsToValidate = formStep === 1 
      ? ['fullName', 'email', 'phone'] 
      : formStep === 2
      ? ['serviceType']
      : formStep === 3
      ? ['plan']
      : ['message'];
    
    const stepErrors = {};
    fieldsToValidate.forEach(field => {
      if (!formData[field]) {
        stepErrors[field] = `${field === 'fullName' ? 'Nome completo' : field} é obrigatório`;
      } else if (field === 'email' && !/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Email inválido";
      }
    });
    
    setErrors(stepErrors);
    
    if (Object.keys(stepErrors).length === 0) {
      setFormStep(formStep + 1);
      window.scrollTo({ top: document.getElementById('form-container').offsetTop - 100, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  // Información de contacto y horarios
  const contactInfo = [
    { icon: "phone", title: "Telefone", content: "+55 (48) 99225-9119" },
    { icon: "mail", title: "Email", content: "contato@webrushbrasil.com.br" },
    { icon: "map-pin", title: "Endereço", content: "Palhoça - SC " },
  ];

  // Horarios de atención
  const businessHours = [
    { day: "Segunda a Sexta", hours: "09:00 - 18:00" },
    { day: "Sábado", hours: "10:00 - 14:00" },
    { day: "Domingo", hours: "Fechado" },
  ];

  // Tiempo de respuesta promedio
  const responseTime = "24 horas";

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80 z-10"></div>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
              alt="Contact background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              CONTATO
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
              Estamos aqui para transformar suas ideias em realidade. Nossa equipe está pronta para atender você.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="#form-container" 
                className="group relative bg-neon-green text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden mx-auto inline-flex"
              >
                <span className="relative z-10">Fale Conosco</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Info Cards Section */}
      <section className="py-16 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tiempo de respuesta */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 flex flex-col items-center text-center hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-neon-green/10 p-3 rounded-full mb-4">
                <svg className="w-8 h-8 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tempo de Resposta</h3>
              <p className="text-gray-300">Respondemos todas as mensagens em até</p>
              <p className="text-2xl font-bold text-neon-green mt-2">{responseTime}</p>
              <p className="text-sm text-gray-400 mt-2">Dias úteis</p>
            </motion.div>

            {/* Horarios de atención */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 flex flex-col items-center hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-neon-green/10 p-3 rounded-full mb-4">
                <svg className="w-8 h-8 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Horário de Atendimento</h3>
              <ul className="w-full">
                {businessHours.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0">
                    <span className="font-medium text-gray-300">{item.day}</span>
                    <span className="text-neon-green font-semibold">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Información de contacto */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 flex flex-col hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-neon-green/10 p-3 rounded-full mb-4 self-center">
                <svg className="w-8 h-8 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Informações de Contato</h3>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="bg-gray-700/50 p-2 rounded-full">
                      <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {item.icon === "phone" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>}
                        {item.icon === "mail" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>}
                        {item.icon === "map-pin" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>}
                        {item.icon === "map-pin" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>}
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.title}</p>
                      <p className="text-white font-medium">{item.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <motion.section
        id="form-container"
        className="py-20 bg-gray-800/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
                FALE CONOSCO
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">Como Podemos Ajudar?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível. 
                Estamos ansiosos para conhecer seu projeto!
              </p>
            </div>
            
            {/* Progress Steps */}
            {formStep < 4 && (
              <div className="mb-10">
                <div className="flex items-center justify-center mb-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${formStep >= 1 ? 'bg-violet-600 text-gray-900' : 'bg-gray-700 text-gray-400'} transition-colors duration-300`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div className={`h-1 w-16 sm:w-24 ${formStep >= 2 ? 'bg-violet-600' : 'bg-gray-700'} transition-colors duration-300`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${formStep >= 2 ? 'bg-violet-600 text-gray-900' : 'bg-gray-700 text-gray-400'} transition-colors duration-300`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  </div>
                  <div className={`h-1 w-16 sm:w-24 ${formStep >= 3 ? 'bg-violet-600' : 'bg-gray-700'} transition-colors duration-300`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${formStep >= 3 ? 'bg-violet-600 text-gray-900' : 'bg-gray-700 text-gray-400'} transition-colors duration-300`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 px-4">
                  <span className={formStep >= 1 ? 'text-neon-green font-medium' : ''}>Seus Dados</span>
                  <span className={formStep >= 2 ? 'text-neon-green font-medium' : ''}>Serviço</span>
                  <span className={formStep >= 3 ? 'text-neon-green font-medium' : ''}>Detalhes</span>
                </div>
              </div>
            )}
            
            {/* Form Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700/50">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {formStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Informações Pessoais</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-gray-300 font-medium mb-2">
                          Nome Completo *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green ${
                              errors.fullName ? "border-red-500" : "border-gray-600"
                            } text-white placeholder-gray-400`}
                            placeholder="Seu nome completo"
                          />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                          Email *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green ${
                              errors.email ? "border-red-500" : "border-gray-600"
                            } text-white placeholder-gray-400`}
                            placeholder="seu@email.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">
                          Telefone *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-3 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green ${
                              errors.phone ? "border-red-500" : "border-gray-600"
                            } text-white placeholder-gray-400`}
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="group relative bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
                      >
                        <span className="relative z-10">Próximo</span>
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                        />
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Service Selection */}
                {formStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Escolha seu Serviço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {serviceTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, serviceType: type.id }));
                            nextStep();
                          }}
                          className={`p-6 rounded-xl border transition-all duration-300 ${
                            formData.serviceType === type.id
                              ? 'bg-neon-green/10 border-neon-green text-white'
                              : 'bg-gray-700/50 border-gray-600 hover:border-neon-green/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <h4 className="text-lg font-bold mb-2">{type.name}</h4>
                          <p className="text-sm">{type.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Plan Selection */}
                {formStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Escolha seu Plano</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {servicePlans[formData.serviceType]?.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, plan: plan.name }));
                            nextStep();
                          }}
                          className={`p-6 rounded-xl border transition-all duration-300 ${
                            formData.plan === plan.name
                              ? 'bg-neon-green/10 border-neon-green text-white'
                              : 'bg-gray-700/50 border-gray-600 hover:border-neon-green/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
                          <p className="text-2xl font-bold mb-2">{plan.price}</p>
                          <p className="text-sm">{plan.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Project Details */}
                {formStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Detalhes do Projeto</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                          Mensagem *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="4"
                          className={`w-full px-3 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green ${
                            errors.message ? "border-red-500" : "border-gray-600"
                          } text-white placeholder-gray-400`}
                          placeholder="Descreva seu projeto ou necessidade"
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="additionalIdeas" className="block text-gray-300 font-medium mb-2">
                          Ideias Adicionais
                        </label>
                        <textarea
                          id="additionalIdeas"
                          name="additionalIdeas"
                          value={formData.additionalIdeas}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-3 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green border-gray-600 text-white placeholder-gray-400"
                          placeholder="Ideias adicionais (opcional)"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center"
                      >
                        <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className={`group relative bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center ${
                          contactStatus.loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={contactStatus.loading}
                      >
                        {contactStatus.loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <span className="relative z-10">Enviar Mensagem</span>
                            <motion.div
                              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: 0 }}
                            />
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Feedback del estado del envío */}
                {contactStatus.success && (
                  <motion.div 
                    className="mt-6 bg-green-900/50 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">{contactStatus.success}</p>
                      <p className="text-sm">Entraremos em contato em breve!</p>
                    </div>
                  </motion.div>
                )}
                {contactStatus.error && (
                  <motion.div 
                    className="mt-6 bg-red-900/50 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg className="w-5 h-5 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p className="font-medium">Ocorreu um erro</p>
                      <p className="text-sm">{contactStatus.error}</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Dúvidas Comuns</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre nossos serviços e processo de atendimento.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Qual é o prazo médio para conclusão de um projeto?",
                  answer: "O prazo varia de acordo com a complexidade do projeto. Projetos simples podem ser concluídos em 2-3 semanas, enquanto projetos mais complexos podem levar de 1 a 3 meses. Após nossa análise inicial, forneceremos um cronograma detalhado."
                },
                {
                  question: "Como funciona o processo de pagamento?",
                  answer: "Trabalhamos com um modelo de pagamento em etapas. Geralmente, 30% no início do projeto, 40% na entrega da primeira versão e 30% na conclusão. Aceitamos transferências bancárias, PIX e cartões de crédito."
                },
                {
                  question: "Vocês oferecem suporte após a conclusão do projeto?",
                  answer: "Sim, oferecemos 30 dias de suporte gratuito após a entrega final do projeto. Após esse período, temos planos de manutenção mensal que podem ser contratados de acordo com suas necessidades."
                },
                {
                  question: "É possível fazer alterações durante o desenvolvimento do projeto?",
                  answer: "Sim, entendemos que ajustes são parte do processo criativo. Pequenas alterações estão incluídas no escopo inicial. Mudanças significativas podem requerer ajustes no orçamento e prazo, que serão discutidos previamente."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?business')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
            PRONTO PARA COMEÇAR?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green via-neon-blue to-neon-green">
            Transforme suas Ideias em Realidade
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a alcançar seus objetivos. Entre em contato hoje mesmo!
          </p>
          <a 
            href="#form-container" 
            className="group relative bg-neon-green text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden mx-auto inline-flex"
          >
            <span className="relative z-10">Iniciar Projeto</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
            />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;