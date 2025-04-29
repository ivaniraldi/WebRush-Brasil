"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ContactCTA from "@/components/ContactCTA";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";

// Translations for es, en, pt
const translations = {
  es: {
    terms: {
      title: "Términos y Condiciones",
      subtitle: "Conoce las reglas y condiciones que rigen el uso de nuestros servicios.",
      sections: [
        {
          title: "1. Aceptación de los Términos",
          content:
            "Al utilizar nuestros servicios, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo, por favor no uses nuestros servicios. Estos términos pueden actualizarse periódicamente, y es tu responsabilidad revisar los cambios.",
        },
        {
          title: "2. Uso de los Servicios",
          content:
            "Nuestros servicios están destinados a usuarios mayores de 18 años. Está prohibido usar nuestros servicios para actividades ilegales o no autorizadas. Nos reservamos el derecho de suspender o cancelar cuentas que violen estas condiciones.",
        },
        {
          title: "3. Propiedad Intelectual",
          content:
            "Todo el contenido, incluidas imágenes, textos y software, es propiedad de nuestra empresa o sus licenciantes. No puedes reproducir, distribuir ni modificar nuestro contenido sin permiso expreso.",
        },
        {
          title: "4. Limitación de Responsabilidad",
          content:
            "No nos hacemos responsables por daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios. Nuestra responsabilidad está limitada al monto pagado por el servicio.",
        },
        {
          title: "5. Privacidad",
          content:
            "Tu privacidad es importante. Consulta nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos tu información personal.",
        },
        {
          title: "6. Contacto",
          content:
            "Si tienes preguntas sobre estos Términos y Condiciones, contáctanos a través de nuestro formulario de contacto o por correo electrónico.",
        },
      ],
    },
  },
  en: {
    terms: {
      title: "Terms and Conditions",
      subtitle: "Learn about the rules and conditions governing the use of our services.",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By using our services, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services. These terms may be updated periodically, and it is your responsibility to review changes.",
        },
        {
          title: "2. Use of Services",
          content:
            "Our services are intended for users over 18 years old. Using our services for illegal or unauthorized activities is prohibited. We reserve the right to suspend or terminate accounts that violate these conditions.",
        },
        {
          title: "3. Intellectual Property",
          content:
            "All content, including images, text, and software, is owned by our company or its licensors. You may not reproduce, distribute, or modify our content without express permission.",
        },
        {
          title: "4. Limitation of Liability",
          content:
            "We are not liable for indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the service.",
        },
        {
          title: "5. Privacy",
          content:
            "Your privacy matters. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.",
        },
        {
          title: "6. Contact",
          content:
            "If you have questions about these Terms and Conditions, contact us via our contact form or email.",
        },
      ],
    },
  },
  pt: {
    terms: {
      title: "Termos e Condições",
      subtitle: "Conheça as regras e condições que regem o uso dos nossos serviços.",
      sections: [
        {
          title: "1. Aceitação dos Termos",
          content:
            "Ao usar nossos serviços, você concorda em cumprir estes Termos e Condições. Se não concordar, por favor, não utilize nossos serviços. Estes termos podem ser atualizados periodicamente, e é sua responsabilidade revisar as alterações.",
        },
        {
          title: "2. Uso dos Serviços",
          content:
            "Nossos serviços são destinados a usuários maiores de 18 anos. É proibido usar nossos serviços para atividades ilegais ou não autorizadas. Reservamo-nos o direito de suspender ou encerrar contas que violem estas condições.",
        },
        {
          title: "3. Propriedade Intelectual",
          content:
            "Todo o conteúdo, incluindo imagens, textos e software, é propriedade da nossa empresa ou de seus licenciadores. Você não pode reproduzir, distribuir ou modificar nosso conteúdo sem permissão expressa.",
        },
        {
          title: "4. Limitação de Responsabilidade",
          content:
            "Não nos responsabilizamos por danos indiretos, incidentais ou consequentes decorrentes do uso de nossos serviços. Nossa responsabilidade é limitada ao valor pago pelo serviço.",
        },
        {
          title: "5. Privacidade",
          content:
            "Sua privacidade é importante. Consulte nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações pessoais.",
        },
        {
          title: "6. Contato",
          content:
            "Se tiver dúvidas sobre estes Termos e Condições, entre em contato conosco por meio do nosso formulário de contato ou por e-mail.",
        },
      ],
    },
  },
};

export default function TermsAndConditions() {
  const { language } = useLanguage();
  const t = translations[language] || translations.pt; // Fallback to Portuguese

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
    hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" },
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-950">
        {/* ParallaxHero */}
        <ParallaxHero
          title={t.terms.title}
          subtitle={t.terms.subtitle}
          backgroundImage="/images/terms_1.avif"
          height="60vh"
          overlayOpacity={0.6}
        />

        {/* Main Content */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16 sm:mb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                {t.terms.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative card-bg rounded-lg p-6 sm:p-7 gradient-border shadow-lg card-hover overflow-hidden group"
                    role="article"
                    aria-labelledby={`terms-section-${index}`}
                  >
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/15 to-[var(--secondary)]/5 opacity-70 transition-opacity duration-300 group-hover:opacity-0" />

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-md">
                        <span className="material-icons text-white text-xl">gavel</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      id={`terms-section-${index}`}
                      className="relative text-xl sm:text-2xl font-bold mb-3 text-white font-heading text-center z-10"
                    >
                      <span className="nav-link gradient-text">{section.title}</span>
                    </h3>

                    {/* Content */}
                    <p className="relative text-gray-300 text-sm sm:text-base mb-5 font-body text-center z-10">
                      {section.content}
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full mb-5 z-10" />

                    {/* Decorative Side Element */}
                    <div className="absolute left-0 top-1/4 w-2 h-1/3 bg-[var(--accent)]/30 rounded-r-md transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </div>
    </PageTransition>
  );
}