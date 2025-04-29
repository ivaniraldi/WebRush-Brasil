"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import translations from "@/translations"
import ContactCTA from "@/components/ContactCTA"
import Link from "next/link"
import PageTransition from "@/components/PageTransition"

export default function MarketingPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <section className="pt-32 pb-16 bg-[#0f172a]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {t.marketing.heroTitle}
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {t.marketing.heroDescription}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {t.marketing.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 rounded-lg p-6 shadow-md"
                >
                  <h2 className="text-xl font-bold mb-3 text-white">{service.title}</h2>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <span className="material-icons text-[#a855f7] mr-2 text-sm">check_circle</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-white">
                {t.marketing.plansTitle}
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12">
                {t.marketing.plansDescription}
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {t.marketing.plans.map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className={`bg-gray-900 rounded-lg overflow-hidden relative ${plan.highlight ? "border-2 border-[#a855f7]" : ""}`}
                  >
                    {plan.highlight && (
                      <div className="absolute top-0 right-0 bg-[#a855f7] text-white text-xs font-bold px-3 py-1">
                        {plan.highlight}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="material-icons text-[#a855f7] mr-2 text-sm">check_circle</span>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.note && <p className="text-xs text-gray-400 mb-6">{plan.note}</p>}
                      <Link
                        href="/contacto"
                        className={`block w-full py-2 text-center rounded-md ${plan.highlight ? "bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white" : "bg-gray-700 text-white hover:bg-gray-600"} transition-colors`}
                      >
                        {t.marketing.planButton}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center mt-12"
            >
              <Link
                href="/contacto"
                className="px-8 py-3 rounded-md bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white font-medium hover:opacity-90 transition-opacity inline-flex items-center"
              >
                {t.contactCTA.button}
                <span className="material-icons ml-1">arrow_forward</span>
              </Link>
            </motion.div>
          </div>
        </section>

        <ContactCTA />
      </div>
    </PageTransition>
  )
}
