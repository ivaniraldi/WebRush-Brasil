"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ContactCTA from "@/components/ContactCTA";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";

// Translations for es, en, pt
const translations = {
  es: {
    privacy: {
      title: "Política de Privacidad",
      subtitle: "Entiende cómo recopilamos, usamos y protegemos tu información personal.",
      sections: [
        {
          title: "1. Información que Recopilamos",
          content:
            "Recopilamos información que nos proporcionas directamente, como nombre, correo electrónico y datos de contacto al registrarte o usar nuestros servicios. También podemos recopilar datos automáticamente, como tu dirección IP, tipo de navegador y patrones de uso, mediante cookies y tecnologías similares.",
        },
        {
          title: "2. Uso de la Información",
          content:
            "Utilizamos tu información para proporcionar, mantener y mejorar nuestros servicios, personalizar tu experiencia, enviar comunicaciones de marketing (con tu consentimiento) y cumplir con obligaciones legales. No compartimos tus datos con terceros, salvo cuando sea necesario para operar el servicio o por requerimiento legal.",
        },
        {
          title: "3. Seguridad de los Datos",
          content:
            "Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdida o alteración. Sin embargo, ninguna transmisión por internet es completamente segura, y no podemos garantizar la seguridad absoluta.",
        },
        {
          title: "4. Tus Derechos",
          content:
            "Tienes derecho a acceder, corregir, eliminar o restringir el uso de tus datos personales. También puedes oponerte al procesamiento de tus datos o solicitar su portabilidad. Contáctanos para ejercer estos derechos, de acuerdo con las leyes aplicables.",
        },
        {
          title: "5. Cookies y Tecnologías Similares",
          content:
            "Usamos cookies para mejorar la funcionalidad del sitio, analizar el tráfico y personalizar contenido. Puedes gestionar tus preferencias de cookies en la configuración de tu navegador, aunque esto puede afectar la experiencia del usuario.",
        },
        {
          title: "6. Contacto",
          content:
            "Si tienes preguntas o inquietudes sobre nuestra Política de Privacidad, contáctanos a través de nuestro formulario de contacto o por correo electrónico.",
        },
      ],
    },
  },
  en: {
    privacy: {
      title: "Privacy Policy",
      subtitle: "Understand how we collect, use, and protect your personal information.",
      sections: [
        {
          title: "1. Information We Collect",
          content:
            "We collect information you provide directly, such as name, email, and contact details when you register or use our services. We may also automatically collect data like your IP address, browser type, and usage patterns through cookies and similar technologies.",
        },
        {
          title: "2. Use of Information",
          content:
            "We use your information to provide, maintain, and improve our services, personalize your experience, send marketing communications (with your consent), and comply with legal obligations. We do not share your data with third parties unless necessary for service operation or legal requirements.",
        },
        {
          title: "3. Data Security",
          content:
            "We implement technical and organizational security measures to protect your information from unauthorized access, loss, or alteration. However, no internet transmission is completely secure, and we cannot guarantee absolute security.",
        },
        {
          title: "4. Your Rights",
          content:
            "You have the right to access, correct, delete, or restrict the use of your personal data. You may also object to data processing or request data portability. Contact us to exercise these rights in accordance with applicable laws.",
        },
        {
          title: "5. Cookies and Similar Technologies",
          content:
            "We use cookies to enhance site functionality, analyze traffic, and personalize content. You can manage cookie preferences in your browser settings, though this may impact the user experience.",
        },
        {
          title: "6. Contact",
          content:
            "If you have questions or concerns about our Privacy Policy, contact us via our contact form or email.",
        },
      ],
    },
  },
  pt: {
    privacy: {
      title: "Política de Privacidade",
      subtitle: "Entenda como coletamos, usamos e protegemos suas informações pessoais.",
      sections: [
        {
          title: "1. Informações que Coletamos",
          content:
            "Coletamos informações que você fornece diretamente, como nome, e-mail e dados de contato ao se registrar ou usar nossos serviços. Também podemos coletar dados automaticamente, como seu endereço IP, tipo de navegador e padrões de uso, por meio de cookies e tecnologias semelhantes.",
        },
        {
          title: "2. Uso das Informações",
          content:
            "Usamos suas informações para fornecer, manter e melhorar nossos serviços, personalizar sua experiência, enviar comunicações de marketing (com seu consentimento) e cumprir obrigações legais. Não compartilhamos seus dados com terceiros, exceto quando necessário para operar o serviço ou por exigência legal.",
        },
        {
          title: "3. Segurança dos Dados",
          content:
            "Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou alteração. No entanto, nenhuma transmissão pela internet é completamente segura, e não podemos garantir segurança absoluta.",
        },
        {
          title: "4. Seus Direitos",
          content:
            "Você tem o direito de acessar, corrigir, excluir ou restringir o uso de seus dados pessoais. Também pode se opor ao processamento de seus dados ou solicitar sua portabilidade. Entre em contato para exercer esses direitos, conforme as leis aplicáveis.",
        },
        {
          title: "5. Cookies e Tecnologias Similares",
          content:
            "Usamos cookies para melhorar a funcionalidade do site, analisar tráfego e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do navegador, embora isso possa afetar a experiência do usuário.",
        },
        {
          title: "6. Contato",
          content:
            "Se tiver dúvidas ou preocupações sobre nossa Política de Privacidade, entre em contato conosco por meio do nosso formulário de contato ou por e-mail.",
        },
      ],
    },
  },
};

export default function PrivacyPolicy() {
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
          title={t.privacy.title}
          subtitle={t.privacy.subtitle}
          backgroundImage="/images/privacy_1.webp"
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
                {t.privacy.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative card-bg rounded-lg p-6 sm:p-7 gradient-border shadow-lg card-hover overflow-hidden group"
                    role="article"
                    aria-labelledby={`privacy-section-${index}`}
                  >
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/15 to-[var(--secondary)]/5 opacity-70 transition-opacity duration-300 group-hover:opacity-0" />

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-md">
                        <span className="material-icons text-white text-xl">lock</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      id={`privacy-section-${index}`}
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