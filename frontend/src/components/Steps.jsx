import { motion } from "framer-motion"

const Steps = () => {
  const steps = [
    {
      number: "01",
      title: "CONEXÃO INICIAL / ESCLARECIMENTO",
      description:
        "Você nos encontra online ou por indicação e, nesta etapa, esclarecemos todas as suas dúvidas sobre nossos serviços, prazos e condições de pagamento – com possibilidade de parcelamento em até 12x no cartão de crédito.",
    },
    {
      number: "02",
      title: "PLANEJAMENTO & CONTRATAÇÃO",
      description:
        "Após decidir dar o próximo passo, detalhamos seu projeto, enviamos o contrato de prestação de serviços e disponibilizamos um formulário para que você cadastre os dados da sua empresa de forma simples e transparente.",
    },
    {
      number: "03",
      title: "DESIGN & DESENVOLVIMENTO",
      description:
        "Nossa equipe de designers e desenvolvedores especializados trabalha na criação de um site inovador e responsivo, alinhado às necessidades do seu negócio e à identidade da sua marca.",
    },
    {
      number: "04",
      title: "APRESENTAÇÃO & CUSTOMIZAÇÃO",
      description:
        "Receba uma prévia do seu site e tenha a oportunidade de personalizar detalhes como textos, imagens e cores. Assim, garantimos que o resultado final seja exatamente o que você imaginou.",
    },
    {
      number: "05",
      title: "APROVAÇÃO & PUBLICAÇÃO",
      description:
        'Com seu aval, finalizamos o projeto e publicamos seu site no domínio "www.suaempresa.com.br", pronto para alavancar suas vendas e expandir sua presença online.',
    },
    {
      number: "06",
      title: "EXPERIMENTE O SUCESSO",
      description:
        "Desfrute de um site responsivo, otimizado para SEO e gerenciado por você, com um painel intuitivo para atualizações. Seu novo espaço digital está pronto para impulsionar seu sucesso!",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-100 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-center mb-12 text-green-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          DESCUBRA O PROCESSO QUE IMPULSIONA SEU NEGÓCIO
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              className="bg-white p-6 rounded-lg shadow-2xl hover:shadow-black transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <header className="flex items-center mb-4">
                <span className="text-3xl font-bold text-green-500 mr-3" itemProp="position">
                  [{step.number}]
                </span>
                <h3 className="text-xl font-semibold text-gray-800" itemProp="name">
                  {step.title}
                </h3>
              </header>
              <p className="text-gray-600" itemProp="text">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Steps
