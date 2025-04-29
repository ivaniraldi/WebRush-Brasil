"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import translations from "@/translations"
import ContactCTA from "@/components/ContactCTA"
import PageTransition from "@/components/PageTransition"
import ParallaxHero from "@/components/ParallaxHero"

export default function CasosExitoPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      company: "TechSolutions Inc.",
      text: "WebRush Brasil transformó completamente nuestra presencia digital. Nuestro tráfico orgánico aumentó un 200% y las conversiones mejoraron significativamente.",
      image: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250",
    },
    {
      name: "Ana Silva",
      company: "Moda Express",
      text: "El equipo de WebRush Brasil entendió perfectamente nuestras necesidades y entregó un e-commerce que superó todas nuestras expectativas. Las ventas aumentaron un 150% en los primeros 3 meses.",
      image: "https://assets.bizclikmedia.net/668/6e487404753c345e1743ba1ea018d3b3:8383667b22bd74b206526bcba75062bf/10-zanele.jpg",
    },
    {
      name: "Roberto Gómez",
      company: "Consultora Global",
      text: "La estrategia de marketing digital implementada por WebRush Brasil nos ayudó a posicionarnos como líderes en nuestro sector. Altamente recomendados.",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQGTop61Wq1Tow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1560961975319?e=2147483647&v=beta&t=C7s26rUYx_lgCWDpZl_-g5bHSSUPmOJjO9sYPSaS8X8",
    },
  ]

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <ParallaxHero
          title={t.successCases.title}
          subtitle={t.successCases.description}
          backgroundImage="https://cdn.forbes.com.mx/2024/01/vista-aerea-equipo-empresarial.webp"
          height="70vh"
        />

        <section className="py-16 bg-[#0f172a]">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {t.successCases.caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  <div className={`order-2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md">
                      <img
                        src="https://i.imgur.com/31hCmSk.jpeg"
                        alt={caseStudy.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className={`order-1 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                    <span className="text-sm font-medium text-[#a855f7] font-body">{caseStudy.client}</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white font-heading">
                      {caseStudy.title}
                    </h2>
                    <p className="text-gray-300 mb-6 font-body">{caseStudy.description}</p>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white font-heading">Resultados:</h3>
                      <ul className="space-y-2">
                        {caseStudy.results.map((result, i) => (
                          <li key={i} className="flex items-start">
                            <span className="material-icons text-[#a855f7] mr-2 text-sm">check_circle</span>
                            <span className="text-gray-300 font-body">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-white font-heading">
                {t.successCases.testimonials}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-body">
                {t.successCases.testimonialsDescription}
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-gray-900 p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-white font-heading">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400 font-body">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic font-body">"{testimonial.text}"</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <ContactCTA />
      </div>
    </PageTransition>
  )
}
