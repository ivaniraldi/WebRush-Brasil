"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const currentYear = new Date().getFullYear();

  const services = [
    { name: t.footer.pwaDev, href: "/servicios/desarrollo" },
    { name: t.footer.digitalMarketing, href: "/servicios/marketing" },
    { name: t.footer.qualityControl, href: "/servicios/quality-assurance" },
  ];

  const traducedMessage = () => {
    if (language === "es") {
      return "Hola, estoy interesado en los servicios de WebRush Brasil.";
    } else if (language === "en") {
      return "Hello, I am interested in WebRush Brasil services.";
    } else {
      return "Olá, estou interessado nos serviços da WebRush Brasil.";
    }
  };

  return (
    <footer className="bg-gray-900 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold gradient-text font-heading">
                WebRush
              </span>
              <span className="text-2xl font-bold ml-1 text-white font-heading">
                Brasil
              </span>
            </Link>
            <p className="text-gray-300 mb-4 font-body">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/WebRush-Brasil/61574912904790/"
                className="text-white hover:text-[#a855f7] transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-square-facebook text-2xl"
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://www.instagram.com/webrush_br/"
                className="text-white hover:text-[#a855f7] transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-instagram text-2xl"
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://www.linkedin.com/company/webrush-brasil/"
                className="text-white hover:text-[#a855f7] transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-linkedin text-2xl"
                  aria-hidden="true"
                ></i>
              </a>
              <a
                href="https://x.com/WebRushBrasil"
                className="text-white hover:text-[#a855f7] transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa-brands fa-square-x-twitter text-2xl"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-bold mb-4 text-white font-heading">
              {t.footer.services}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {services.map((service, index) => (
                <div key={index} className="mb-2">
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-[#a855f7] transition-colors font-body text-sm"
                  >
                    {service.name}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-bold mb-4 text-white font-heading">
              {t.footer.contact}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="material-icons mr-2 text-[#a855f7] mt-0.5">
                  policy
                </span>
                <span className="text-gray-300 font-body">
                 CNPJ: 57.983.669/0001-68
                </span>
              </li>
              <li className="flex items-start">
                <span className="material-icons mr-2 text-[#a855f7] mt-0.5">
                  email
                </span>
                <span className="text-gray-300 font-body">
                  <a
                    href="mailto:contato@webrushbrasil.com.br"
                    className="hover:text-[#a855f7] transition-colors font-body text-sm underline"
                  >
                    contato@webrushbrasil.com.br
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="material-icons mr-2 text-[#a855f7] mt-0.5">
                  phone_in_talk
                </span>
                <span className="text-gray-300 font-body">
                  <a
                    href={`https://wa.me/554892058069?text=${encodeURIComponent(traducedMessage())}`}
                    className="hover:text-[#a855f7] transition-colors font-body text-sm underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +55 (48) 9205-8069
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="material-icons mr-2 text-[#a855f7] mt-0.5">
                  schedule
                </span>
                <span className="text-gray-300 font-body">
                  {t.footer.hours}
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/contacto"
                className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white font-medium hover:opacity-90 transition-opacity font-body text-sm"
              >
                {t.footer.getInTouch}
                <span className="material-icons ml-1 text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="mt-4"></div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 font-body">
              © {currentYear} WebRush Brasil® & PyN Soluçoes em TI LTDA.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/use-terms"
                className="text-gray-400 hover:text-[#a855f7] text-sm transition-colors font-body"
              >
                {t.footer.terms}
              </Link>
              <Link
                href="/privacy-pol"
                className="text-gray-400 hover:text-[#a855f7] text-sm transition-colors font-body"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-[#a855f7] text-sm transition-colors font-body"
              >
                {t.footer.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}