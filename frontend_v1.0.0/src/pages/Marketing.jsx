import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaChartLine, FaUsers, FaSearch, FaRocket, FaHandshake, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mkt_img_1 from '../assets/mkt/mkt_1.jpg';
import mkt_img_2 from '../assets/mkt/mkt_2.jpg';
import mkt_img_3 from '../assets/mkt/mkt_3.jpg';
import mkt_vid_1 from '../assets/mkt/mkt_vid_1.mp4';
import mkt_vid_2 from '../assets/mkt/mkt_vid_2.mp4';
import mkt_vid_3 from '../assets/mkt/mkt_vid_3.mp4';
import mkt_vid_4 from '../assets/mkt/mkt_vid_4.mp4';
import mkt_vid_5 from '../assets/mkt/mkt_vid_5.mp4';
import mkt_vid_6 from '../assets/mkt/mkt_vid_6.mp4';
import mkt_vid_7 from '../assets/mkt/mkt_vid_7.mp4';
import mkt_vid_8 from '../assets/mkt/mkt_vid_8.mp4';


const Marketing = () => {
  const services = [
    {
      title: "Gestão de Marketing",
      description: "Estratégias personalizadas para impulsionar seu negócio no mundo digital.",
      icon: <FaChartLine className="w-12 h-12 text-neon-green" />,
      features: [
        "Análise de mercado",
        "Planejamento estratégico",
        "Gestão de redes sociais",
        "Relatórios de resultados"
      ]
    },
    {
      title: "Publicidade Patrocinada",
      description: "Campanhas publicitárias eficazes no Google Ads e redes sociais.",
      icon: <FaBullseye className="w-12 h-12 text-neon-blue" />,
      features: [
        "Campanhas no Google Ads",
        "Publicidade em redes sociais",
        "Otimização de anúncios",
        "Análise de ROI"
      ]
    },
    {
      title: "SEO",
      description: "Otimização para mecanismos de busca e posicionamento orgânico.",
      icon: <FaSearch className="w-12 h-12 text-neon-pink" />,
      features: [
        "Pesquisa de palavras-chave",
        "Otimização on-page",
        "Link building",
        "Análise de concorrência"
      ]
    }
  ];

  const differentials = [
    {
      title: "Resultados Comprovados",
      description: "Mais de 100 clientes satisfeitos e casos de sucesso documentados.",
      icon: <FaChartLine className="w-8 h-8 text-neon-green" />
    },
    {
      title: "Equipe Especializada",
      description: "Profissionais certificados nas últimas tendências digitais.",
      icon: <FaUsers className="w-8 h-8 text-neon-blue" />
    },
    {
      title: "Suporte Dedicado",
      description: "Atendimento personalizado e acompanhamento constante dos resultados.",
      icon: <FaHandshake className="w-8 h-8 text-neon-pink" />
    }
  ];

  const plans = [
    {
      name: "Básico",
      price: "R$1.500",
      period: "mês",
      features: [
        "Gestão de redes sociais",
        "Publicação de conteúdo",
        "Relatórios mensais",
        "Suporte por e-mail",
        "1 campanha publicitária"
      ]
    },
    {
      name: "Profissional",
      price: "R$3.000",
      period: "mês",
      features: [
        "Tudo do plano básico",
        "Gestão do Google Ads",
        "Otimização SEO",
        "Suporte prioritário",
        "3 campanhas publicitárias",
        "Relatórios semanais"
      ]
    },
    {
      name: "Premium",
      price: "Personalizado",
      period: "mês",
      features: [
        "Tudo do plano profissional",
        "Estratégia personalizada",
        "Consultoria exclusiva",
        "Campanhas ilimitadas",
        "Suporte 24/7",
        "Relatórios diários",
        "Acesso a ferramentas premium"
      ]
    }
  ];

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
      title: "Gestão de Mídias Sociais",
      description: "Estratégias personalizadas para aumentar sua presença nas redes sociais e engajamento com seu público.",
      prints: [mkt_img_1, mkt_img_2, mkt_img_3]
    },
    {
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
      title: "Publicidade Digital",
      description: "Campanhas publicitárias eficazes no Google Ads e redes sociais para maximizar seu ROI.",
      videos: [mkt_vid_1, mkt_vid_2, mkt_vid_3, mkt_vid_4, mkt_vid_5, mkt_vid_6, mkt_vid_7, mkt_vid_8]
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
      title: "SEO e Posicionamento",
      description: "Otimização do seu site para melhorar o posicionamento nos mecanismos de busca."
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const printsSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Marketing Digital - WebRush Brasil</title>
        <meta name="description" content="Serviços de marketing digital, publicidade patrocinada e SEO para impulsionar seu negócio online." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80 z-10"></div>
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          >
            <img
              src="https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Marketing Digital"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
              Estratégias que Impulsionam seu Negócio
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Transforme sua presença digital com estratégias personalizadas e resultados mensuráveis.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              NOSSOS SERVIÇOS
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              SOLUÇÕES COMPLETAS
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Oferecemos estratégias personalizadas para cada etapa do seu negócio digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-center mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="text-neon-green mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel Principal Section */}
      <section className="py-16 bg-gray-800/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              NOSSOS CASOS DE SUCESSO
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Descubra como ajudamos empresas como a sua a crescer no mundo digital
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Slider {...sliderSettings}>
              {carouselItems.map((item, index) => (
                <div key={index} className="px-4">
                  <div className="relative rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent z-10"></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[450px] md:h-[200px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-gray-300 text-lg">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Carrusel de Prints e Vídeos Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Slider {...printsSliderSettings}>
              {/* Prints */}
              {carouselItems[0].prints.map((print, index) => (
                <div key={`print-${index}`} className="px-4">
                  <div className="relative rounded-xl overflow-hidden group">
                    <img
                      src={print}
                      alt={`Print ${index + 1}`}
                      className="w-full object-cover rounded-xl transform group-hover:scale-145 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
              
              {/* Vídeos */}
              {carouselItems[1].videos.map((video, index) => (
                <div key={`video-${index}`} className="px-4">
                  <div className="relative rounded-xl overflow-hidden group">
                    <video
                      className="w-full object-cover rounded-xl transform  transition-transform duration-500"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={video} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 rounded-full p-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-20 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              NOSSO DIFERENCIAL
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              POR QUE NOS ESCOLHER?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nossa experiência e metodologia garantem resultados excepcionais para seu negócio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentials.map((differential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105 p-8"
              >
                <div className="flex justify-center mb-6">
                  {differential.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {differential.title}
                </h3>
                <p className="text-gray-300 text-center">{differential.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gray-800/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              PLANOS E PREÇOS
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">Escolha o Plano Ideal para seu Negócio</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Planos flexíveis adaptados às necessidades do seu negócio. Todos incluem suporte dedicado e relatórios detalhados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Básico</h3>
                <div className="text-4xl font-bold text-neon-green mb-2">R$ 1.500</div>
                <div className="text-gray-400">/mês</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gestão de até 2 redes sociais
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  20 posts por mês
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  1 campanha publicitária
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Relatórios mensais
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Suporte por email
                </li>
              </ul>
              <div className="text-sm text-gray-400 mb-6">
                * Investimento em anúncios não incluído
              </div>
              <button className="w-full bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-neon-green/90 transition duration-300">
                Começar Agora
              </button>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-neon-green/50 hover:border-neon-green transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-neon-green/10 text-neon-green text-sm font-bold mb-4 rounded-full">
                  MAIS POPULAR
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">Profissional</h3>
                <div className="text-4xl font-bold text-neon-green mb-2">R$ 3.000</div>
                <div className="text-gray-400">/mês</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gestão de até 4 redes sociais
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  40 posts por mês
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gestão de Google Ads
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Otimização SEO básica
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  3 campanhas publicitárias
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Relatórios semanais
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Suporte prioritário
                </li>
              </ul>
              <div className="text-sm text-gray-400 mb-6">
                * Investimento em anúncios não incluído
              </div>
              <button className="w-full bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-neon-green/90 transition duration-300">
                Começar Agora
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                <div className="text-4xl font-bold text-neon-green mb-2">Personalizado</div>
                <div className="text-gray-400">/mês</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Gestão ilimitada de redes sociais
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Estratégia personalizada
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Consultoria exclusiva
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Campanhas ilimitadas
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Otimização SEO avançada
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Relatórios diários
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Suporte 24/7
                </li>
                <li className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-neon-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Acesso a ferramentas premium
                </li>
              </ul>
              <div className="text-sm text-gray-400 mb-6">
                * Preço personalizado de acordo com suas necessidades
              </div>
              <button className="w-full bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-neon-green/90 transition duration-300">
                Solicitar Orçamento
              </button>
            </motion.div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Informações Importantes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-neon-green font-bold mb-2">Investimento em Anúncios</h4>
                  <p className="text-gray-300">
                    Os valores dos planos incluem apenas a gestão e criação de conteúdo. O investimento em anúncios é separado e varia de acordo com seus objetivos.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-green font-bold mb-2">Prazo de Contrato</h4>
                  <p className="text-gray-300">
                    Recomendamos um compromisso mínimo de 3 meses para garantir resultados consistentes e otimização das campanhas.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-green font-bold mb-2">Personalização</h4>
                  <p className="text-gray-300">
                    Todos os planos podem ser personalizados de acordo com suas necessidades específicas. Entre em contato para uma proposta personalizada.
                  </p>
                </div>
                <div>
                  <h4 className="text-neon-green font-bold mb-2">Suporte</h4>
                  <p className="text-gray-300">
                    Oferecemos suporte técnico e estratégico em todos os planos, com diferentes níveis de atendimento conforme sua escolha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/30 relative overflow-hidden">
        {/* Efecto de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?marketing')] bg-cover bg-center opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              PRONTO PARA COMEÇAR?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green via-neon-blue to-neon-green">
              Transforme sua Presença Digital Hoje
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer online com soluções personalizadas e resultados excepcionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className=" mt-4 group relative border border-white bg-neon-green text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Solicitar Orçamento</span>
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
              </Link>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Marketing; 