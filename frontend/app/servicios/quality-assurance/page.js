"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

export default function QualityAssurancePage() {
  const { language } = useLanguage();
  const t = translations[language];

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
                {t.qa.title}
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                {t.qa.description}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {t.qa.services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 rounded-lg p-6 shadow-md"
                >
                  <h2 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h2>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <span className="material-icons text-[#a855f7] mr-2 text-sm">
                          check_circle
                        </span>
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
                {t.qa.benefits.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.qa.benefits.items.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-gray-900 p-6 rounded-lg shadow-md text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#a855f7] to-[#2563eb] flex items-center justify-center mx-auto mb-4">
                      <span className="material-icons text-white text-2xl">
                        {index === 0
                          ? "savings"
                          : index === 1
                          ? "verified"
                          : index === 2
                          ? "speed"
                          : "sentiment_satisfied_alt"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <img
                  src="https://i.imgur.com/sY0UVVN.png"
                  alt="Quality Assurance Process"
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="space-y-6"
              >

                <h2 className="text-2xl font-bold mb-4 text-white">
                A Importância de uma Equipe de QA
                </h2>
                <p className="text-gray-300">
                Uma equipe de QA (Quality Assurance) é um pilar essencial para
                  garantir o sucesso de qualquer projeto de software. Na
                  WebRush, entendemos o valor da qualidade em cada etapa do
                  desenvolvimento.
                </p>
                <p className="text-gray-300">
                  <ul>
                    <li> Qualidade como prioridade: Entregamos
                  produtos que atendem aos mais altos padrões, proporcionando
                  confiança tanto para os clientes quanto para os usuários
                  finais.</li>
                  <li>Prevenção eficaz: Identificamos erros em estágios
                  iniciais, reduzindo custos e tempos relacionados a
                  retrabalhos.</li>
                  <li>Otimização e escalabilidade: Desenvolvemos
                  processos sólidos que permitem o crescimento sustentável e
                  eficiente do seu negócio.</li>
                  </ul>
                </p>
                <p className="text-gray-300">
                Resumidamente, nossa equipe de QA
                  não apenas realiza testes, mas se torna um parceiro
                  estratégico que assegura sucesso e satisfação em cada entrega.
                </p>
                <div className="pt-4">
                  <Link
                    href="/contacto"
                    className="px-8 py-3 rounded-md bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white font-medium hover:opacity-90 transition-opacity inline-flex items-center"
                  >
                    Solicitar orçamento
                    <span className="material-icons ml-1">arrow_forward</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
