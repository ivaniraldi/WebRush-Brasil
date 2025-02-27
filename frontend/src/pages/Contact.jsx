"use client"

import { useContext, useState } from "react"
import { motion } from "framer-motion"
import GlobalContext from "../../contexts/GlobalContext"

const Contact = () => {
  const { services } = useContext(GlobalContext)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    plan: "",
    additionalIdeas: "",
  })

  const [formattedData, setFormattedData] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const tempErrors = {}
    if (!formData.fullName.trim()) tempErrors.fullName = "Nome completo é obrigatório"
    if (!formData.email.trim()) {
      tempErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email inválido"
    }
    if (!formData.phone.trim()) tempErrors.phone = "Telefone é obrigatório"
    if (!formData.message.trim()) tempErrors.message = "Mensagem é obrigatória"
    if (!formData.plan) tempErrors.plan = "Por favor, selecione um plano"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const formattedMessage = `
        Telefone: ${formData.phone}
        Plano escolhido: ${formData.plan}
        Mensagem: ${formData.message}
        ${formData.additionalIdeas ? `Ideias adicionais: ${formData.additionalIdeas}` : ""}
      `

      const formatted = {
        name: formData.fullName.substring(0, 100),
        email: formData.email,
        message: formattedMessage.substring(0, 1000),
      }

      setFormattedData(formatted)
      // Aqui você pode enviar os dados para uma API ou realizar outras ações necessárias
      console.log(formatted)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[40vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-500/80 z-10"></div>
          <img
            src="/placeholder.svg?height=400&width=1920&text=Contact+Us"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Entre em Contato
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Estamos aqui para transformar suas ideias em realidade
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-24 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Formulário de Contato</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Seu nome completo"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  placeholder="(00) 00000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="plan" className="block text-gray-700 text-sm font-bold mb-2">
                  Plano *
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.plan ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Selecione um plano</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {errors.plan && <p className="text-red-500 text-xs mt-1">{errors.plan}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.message ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Sua mensagem aqui"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="additionalIdeas" className="block text-gray-700 text-sm font-bold mb-2">
                  Ideias Adicionais
                </label>
                <textarea
                  id="additionalIdeas"
                  name="additionalIdeas"
                  value={formData.additionalIdeas}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
                  placeholder="Ideias adicionais (opcional)"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Display Formatted Data (for demonstration) */}
      {formattedData && (
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Dados Formatados (Demo):</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{JSON.stringify(formattedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Contact

