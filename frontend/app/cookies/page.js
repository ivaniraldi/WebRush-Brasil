"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ContactCTA from "@/components/ContactCTA";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";

// Translations for es, en, pt
const translations = {
  es: {
    cookies: {
      title: "Política de Cookies",
      subtitle: "¡No solo de galletas vive el hombre! Descubre cómo usamos cookies digitales para mejorar tu experiencia.",
      sections: [
        {
          title: "1. ¿Galletas? ¿En serio?",
          content:
            "No, no te enviaremos galletas de chocolate por correo (¡aunque sería genial!). Las 'cookies' son pequeños archivos de texto que guardamos en tu dispositivo para que nuestro sitio funcione mejor, recuerde tus preferencias y nos ayude a entender cómo lo usas. ¡Piensa en ellas como migajas digitales que hacen tu visita más sabrosa!",
        },
        {
          title: "2. Tipos de Cookies (¡No son de avena ni chispas!)",
          content:
            "Usamos varios tipos: las cookies esenciales son como la harina, imprescindibles para que el sitio funcione. Las de rendimiento nos dicen cómo navegas (¡sin espiarte!). Las de funcionalidad recuerdan tus ajustes, y las de publicidad te muestran anuncios que te podrían gustar. Algunas las gestionan nuestros amigos de terceros, como Google Analytics.",
        },
        {
          title: "3. Tú Mandas con las Cookies",
          content:
            "Al entrar, te pedimos permiso para usar cookies con nuestro aviso súper amigable. Puedes aceptarlas todas (¡ñam!) o personalizar cuáles quieres. También puedes decirle a tu navegador que no quiere cookies, pero cuidado, el sitio podría no ser tan crujiente como esperas.",
        },
        {
          title: "4. Cookies de Otros (No de la Abuela)",
          content:
            "Nuestros socios, como Google Analytics o plataformas de anuncios, pueden dejar sus propias cookies para recopilar datos anónimos (nada de nombres ni secretos). Estas cookies siguen las reglas de sus propias políticas de privacidad, no las nuestras.",
        },
        {
          title: "5. Cambios en la Receta",
          content:
            "A veces ajustamos nuestra Política de Cookies para mejorar el sabor o cumplir con nuevas leyes. Te avisaremos en el sitio si hacemos cambios importantes, así no te pillamos desprevenido.",
        },
        {
          title: "6. ¿Hablamos de Galletas?",
          content:
            "Si tienes dudas sobre nuestras cookies digitales (o quieres compartir una receta de galletas reales), contáctanos por nuestro formulario o correo electrónico. ¡Estamos aquí para ayudarte!",
        },
      ],
    },
  },
  en: {
    cookies: {
      title: "Cookies Policy",
      subtitle: "Not just for snacking! Learn how we use digital cookies to make your experience better.",
      sections: [
        {
          title: "1. Cookies? Like, for Eating?",
          content:
            "Sorry, we’re not mailing you chocolate chip cookies (though that’d be awesome!). Web 'cookies' are tiny text files we store on your device to make our site work smoothly, remember your preferences, and help us see how you use it. Think of them as digital crumbs that make your visit extra tasty!",
        },
        {
          title: "2. Types of Cookies (No Oatmeal or Sprinkles)",
          content:
            "We use a few kinds: essential cookies are like flour, non-negotiable for the site to work. Performance cookies show us how you navigate (no spying!). Functionality cookies save your settings, and advertising cookies show ads you might like. Some are managed by our third-party pals, like Google Analytics.",
        },
        {
          title: "3. You’re the Cookie Boss",
          content:
            "When you arrive, we ask for your cookie permission with a friendly pop-up. You can accept all (yum!) or pick and choose. You can also tell your browser to skip cookies, but beware, the site might not be as crispy as you’d like.",
        },
        {
          title: "4. Third-Party Cookies (Not Grandma’s Recipe)",
          content:
            "Our partners, like Google Analytics or ad platforms, may drop their own cookies to collect anonymized data (no names or secrets). These cookies follow their own privacy policies, not ours.",
        },
        {
          title: "5. Tweaking the Recipe",
          content:
            "We might update our Cookies Policy to improve the flavor or meet new laws. We’ll let you know on the site if we make big changes, so you’re never caught off guard.",
        },
        {
          title: "6. Wanna Talk Cookies?",
          content:
            "Got questions about our digital cookies (or a killer cookie recipe to share)? Reach out via our contact form or email. We’re here to help!",
        },
      ],
    },
  },
  pt: {
    cookies: {
      title: "Política de Cookies",
      subtitle: "Não é só para comer! Descubra como usamos cookies digitais para melhorar sua experiência.",
      sections: [
        {
          title: "1. Cookies? Tipo Biscoitos?",
          content:
            "Desculpe, não vamos te enviar biscoitos de chocolate pelo correio (mas seria legal!). Os 'cookies' da web são pequenos arquivos de texto que salvamos no seu dispositivo para fazer nosso site funcionar melhor, lembrar suas preferências e nos ajudar a entender como você o usa. Pense neles como migalhas digitais que tornam sua visita mais gostosa!",
        },
        {
          title: "2. Tipos de Cookies (Sem Passas ou Gotas de Chocolate)",
          content:
            "Usamos vários tipos: cookies essenciais são como farinha, indispensáveis para o site funcionar. Cookies de desempenho nos mostram como você navega (sem bisbilhotar!). Cookies de funcionalidade guardam suas configurações, e cookies de publicidade mostram anúncios que você pode curtir. Alguns são gerenciados por nossos amigos de terceiros, como o Google Analytics.",
        },
        {
          title: "3. Você Manda nos Cookies",
          content:
            "Ao chegar, pedimos sua permissão para usar cookies com um aviso bem legal. Você pode aceitar todos (nham!) ou escolher quais quer. Também pode configurar seu navegador para recusar cookies, mas cuidado, o site pode não ficar tão crocante quanto esperado.",
        },
        {
          title: "4. Cookies de Terceiros (Não da Vovó)",
          content:
            "Nossos parceiros, como Google Analytics ou plataformas de anúncios, podem deixar seus próprios cookies para coletar dados anônimos (nada de nomes ou segredos). Esses cookies seguem as políticas de privacidade deles, não as nossas.",
        },
        {
          title: "5. Ajustando a Receita",
          content:
            "Às vezes, atualizamos nossa Política de Cookies para melhorar o sabor ou cumprir novas leis. Avisaremos no site se fizermos mudanças importantes, para não te pegar desprevenido.",
        },
        {
          title: "6. Quer Falar de Cookies?",
          content:
            "Tem dúvidas sobre nossos cookies digitais (ou uma receita de biscoito incrível para compartilhar)? Entre em contato pelo nosso formulário ou e-mail. Estamos aqui para ajudar!",
        },
      ],
    },
  },
};

export default function CookiesPolicy() {
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
        {/* ParallaxHero with literal cookies image */}
        <ParallaxHero
          title={t.cookies.title}
          subtitle={t.cookies.subtitle}
          backgroundImage="/images/cookies_1.webp"
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
                {t.cookies.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative card-bg rounded-lg p-6 sm:p-7 gradient-border shadow-lg card-hover overflow-hidden group"
                    role="article"
                    aria-labelledby={`cookies-section-${index}`}
                  >
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/15 to-[var(--secondary)]/5 opacity-70 transition-opacity duration-300 group-hover:opacity-0" />

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-md">
                        <span className="material-icons text-white text-xl">cookie</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      id={`cookies-section-${index}`}
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