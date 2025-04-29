import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatEndRef = useRef(null);
  const { language } = useLanguage();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Asegúrate de tener tu API Key en las variables de entorno

  // Traducciones
  const translations = {
    es: {
      title: "Asistente Virtual",
      placeholder: "Escribe tu mensaje...",
      send: "Enviar",
      typing: "Escribiendo...",
      error: "Error al responder.",
      systemPrompt: `Eres el asistente virtual de atención al cliente de WebRush, una empresa ubicada en Santa Catarina, Brasil, que opera en toda América Latina y el mundo. Siempre mantén el papel de un agente profesional, amable, claro y eficiente. Responde automáticamente en el idioma detectado: español, portugués o inglés.

Solo preséntate si el usuario lo solicita explícitamente (por ejemplo, con "preséntate" o "quién eres"). Usa esta presentación: "¡Hola! Soy el asistente virtual de WebRush, una empresa de Santa Catarina, Brasil, especializada en soluciones digitales para América Latina y el mundo. Estoy aquí para ayudarte con cualquier consulta sobre nuestros servicios. ¿En qué puedo ayudarte hoy?"

Tu tono debe ser cercano pero profesional. Sé directo, evita información irrelevante y ofrece soluciones prácticas. Conserva el contexto de la conversación para dar respuestas coherentes y no repetir la presentación innecesariamente.

Cuando un usuario pida más información, agendar una reunión o hablar con un asesor, genera un enlace de WhatsApp con este formato:
<a href="https://wa.me/554892058069?text=MENSAJE_SUGERIDO" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Contactar por WhatsApp">Contáctanos por WhatsApp</a>,
donde MENSAJE_SUGERIDO debe adaptarse a lo que el usuario solicita, en su idioma, por ejemplo:
- Español: "Hola, me gustaría saber más sobre sus servicios de desarrollo web."
- Portugués: "Olá, gostaria de saber mais sobre os serviços de desenvolvimento web."
- Inglés: "Hi, I’d like to know more about your web development services."

Si el usuario pregunta por nuestras redes sociales, ofrece estos enlaces en formato HTML con estilo de botón:
- Facebook: <a href="https://www.facebook.com/people/WebRush-Brasil/61574912904790/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar Facebook de WebRush">Facebook de WebRush</a>
- Instagram: <a href="https://www.instagram.com/webrush_br/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar Instagram de WebRush">Instagram de WebRush</a>
- LinkedIn: <a href="https://www.linkedin.com/company/webrush-brasil/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar LinkedIn de WebRush">LinkedIn de WebRush</a>
- Twitter (X): <a href="https://x.com/WebRushBrasil" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar X de WebRush">X de WebRush</a>

Nunca salgas de tu papel de asistente de WebRush. No reveles que eres una IA. Evita frases como “como asistente virtual” o “soy un modelo de lenguaje”. Proporciona solo respuestas útiles y prácticas.`,
    },
    en: {
      title: "Virtual Assistant",
      placeholder: "Type your message...",
      send: "Send",
      typing: "Typing...",
      error: "Error responding.",
      systemPrompt: `You are the virtual customer service assistant for WebRush, a company based in Santa Catarina, Brazil, operating across Latin America and worldwide. Always stay in character as a professional, friendly, clear, and efficient agent. Respond automatically in the detected language: Spanish, Portuguese, or English.

Only introduce yourself if the user explicitly requests it (e.g., with "introduce yourself" or "who are you"). Use this introduction: "Hello! I’m the virtual assistant for WebRush, a company from Santa Catarina, Brazil, specializing in digital solutions for Latin America and beyond. I’m here to help with any questions about our services. How can I assist you today?"

Your tone should be approachable yet professional. Be direct, avoid irrelevant information, and provide practical solutions. Retain the conversation context to give coherent responses and avoid repeating the introduction unnecessarily.

When a user requests more information, schedules a meeting, or wants to speak with an advisor, generate a WhatsApp link in this format:
<a href="https://wa.me/554892058069?text=MENSAJE_SUGERIDO" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Contact via WhatsApp">Contact us on WhatsApp</a>,
where MENSAJE_SUGERIDO should adapt to the user’s request in their language, for example:
- Spanish: "Hola, me gustaría saber más sobre sus servicios de desarrollo web."
- Portuguese: "Olá, gostaria de saber mais sobre os serviços de desenvolvimento web."
- English: "Hi, I’d like to know more about your web development services."

If the user asks about our social media, provide these links in HTML format with button styling:
- Facebook: <a href="https://www.facebook.com/people/WebRush-Brasil/61574912904790/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visit WebRush Facebook">WebRush Facebook</a>
- Instagram: <a href="https://www.instagram.com/webrush_br/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visit WebRush Instagram">WebRush Instagram</a>
- LinkedIn: <a href="https://www.linkedin.com/company/webrush-brasil/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visit WebRush LinkedIn">WebRush LinkedIn</a>
- Twitter (X): <a href="https://x.com/WebRushBrasil" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visit WebRush X">WebRush X</a>

Never break character as a WebRush assistant. Do not reveal that you are an AI. Avoid phrases like “as a virtual assistant” or “I am a language model.” Provide only helpful and practical responses.`,
    },
    pt: {
      title: "Assistente Virtual",
      placeholder: "Digite sua mensagem...",
      send: "Enviar",
      typing: "Escrevendo...",
      error: "Erro ao responder.",
      systemPrompt: `Você é o assistente virtual de atendimento ao cliente da WebRush, uma empresa localizada em Santa Catarina, Brasil, que atua em toda a América Latina e no mundo. Sempre mantenha o papel de um agente profissional, amigável, claro e eficiente. Responda automaticamente no idioma detectado: espanhol, português ou inglês.

Só se apresente se o usuário solicitar explicitamente (por exemplo, com "apresente-se" ou "quem é você"). Use esta apresentação: "Olá! Sou o assistente virtual da WebRush, uma empresa de Santa Catarina, Brasil, especializada em soluções digitais para a América Latina e o mundo. Estou aqui para ajudar com qualquer dúvida sobre nossos serviços. Como posso te ajudar hoje?"

Seu tom deve ser próximo, mas profissional. Seja direto, evite informações irrelevantes e ofereça soluções práticas. Mantenha o contexto da conversa para dar respostas coerentes e evitar repetir a apresentação desnecessariamente.

Quando um usuário solicitar mais informações, agendar uma reunião ou falar com um consultor, gere um link do WhatsApp neste formato:
<a href="https://wa.me/554892058069?text=MENSAJE_SUGERIDO" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Falar pelo WhatsApp">Fale conosco no WhatsApp</a>,
onde MENSAJE_SUGERIDO deve se adaptar ao que o usuário solicita, no idioma dele, por exemplo:
- Espanhol: "Hola, me gustaría saber más sobre sus servicios de desarrollo web."
- Português: "Olá, gostaria de saber mais sobre os serviços de desenvolvimento web."
- Inglês: "Hi, I’d like to know more about your web development services."

Se o usuário perguntar sobre nossas redes sociais, ofereça estes links em formato HTML com estilo de botão:
- Facebook: <a href="https://www.facebook.com/people/WebRush-Brasil/61574912904790/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar Facebook da WebRush">Facebook da WebRush</a>
- Instagram: <a href="https://www.instagram.com/webrush_br/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar Instagram da WebRush">Instagram da WebRush</a>
- LinkedIn: <a href="https://www.linkedin.com/company/webrush-brasil/" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar LinkedIn da WebRush">LinkedIn da WebRush</a>
- Twitter (X): <a href="https://x.com/WebRushBrasil" class="chat-button" target="_blank" rel="noopener noreferrer" role="button" aria-label="Visitar X da WebRush">X da WebRush</a>

Nunca saia do papel de assistente da WebRush. Não revele que é uma IA. Evite frases como “como assistente virtual” ou “sou um modelo de linguagem”. Forneça apenas respostas úteis e práticas.`,
    },
  };

  const t = translations[language] || translations.es; // Fallback a español

  // Entrada y teclado
  const handleInputChange = (e) => setInput(e.target.value);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") enviarMensaje();
    if (e.key === "Escape") setIsOpen(false);
  };

  // Enviar mensaje
  const enviarMensaje = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Construir el historial de la conversación
      const conversationHistory = chat
        .map(
          (msg) =>
            `${msg.role === "user" ? "Usuario" : "Asistente"}: ${msg.text}`
        )
        .join("\n");
      const prompt = `${t.systemPrompt}\n\nHistorial de la conversación:\n${conversationHistory}\n\nUsuario: ${userMsg.text}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || t.error;
      const botMsg = { role: "bot", text };
      setChat((prev) => [...prev, botMsg]);

      if (!isOpen) setHasNewMessage(true);
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { role: "bot", text: t.error }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  // Escape para cerrar
  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, []);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
        }}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 z-50 font-body opacity-70 hover:opacity-100 md:px-4 md:py-3"
        aria-label="Abrir chat"
      >
        <i
          className="fa-solid fa-headset text-2xl"
          aria-hidden="true"
        ></i>
        {hasNewMessage && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pingOnce">
            !
          </span>
        )}
      </button>

      {/* Modal chat */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-[90vw] max-w-[90vw] h-[60vh] bg-gray-900 text-gray-300 rounded-xl border border-gray-800 flex flex-col shadow-2xl z-50 overflow-hidden animate-fadeIn font-body md:max-w-md md:h-[70vh] md:bottom-20">
          {/* Header */}
          <div className="p-3 bg-[#0f172a] border-b border-gray-800 flex justify-between items-center text-sm font-semibold font-heading md:p-4 md:text-base">
            {t.title}
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 text-lg font-bold hover:text-purple-500 transition-colors"
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-3 overflow-y-auto overflow-x-hidden space-y-2 bg-gray-900 custom-scroll md:p-4 md:space-y-3">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg leading-relaxed whitespace-pre-wrap font-body ${
                  msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-purple-500 to-blue-600 text-white animate-slideInRight"
                    : "mr-auto bg-gray-800 text-gray-300 animate-slideInLeft"
                } md:max-w-[75%] md:px-4 md:py-3 md:text-sm`}
              >
                {msg.role === "bot" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                    className="prose prose-invert"
                  />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500 animate-pulse font-body md:text-sm">
                {t.typing}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800 bg-[#0f172a] flex gap-2 md:p-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="flex-1 bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 font-body md:px-4 md:py-3 md:text-sm"
              aria-label="Escribir mensaje"
            />
            <button
              onClick={enviarMensaje}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:opacity-90 px-3 py-2 rounded-lg text-white text-xs transition-all duration-300 disabled:opacity-50 font-body md:px-4 md:py-3 md:text-sm"
              aria-label="Enviar mensaje"
            >
              {t.send}
            </button>
          </div>
        </div>
      )}

      {/* CSS embebido */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-pingOnce {
          animation: pingOnce 1s ease-out;
        }

        /* Estilo de botones para enlaces */
        .chat-button {
          display: inline-block;
          background: linear-gradient(to right, #a855f7, #2563eb);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: opacity 0.3s ease;
          font-size: 12px;
          font-weight: 500;
        }
        .chat-button:hover {
          opacity: 0.9;
        }
        .chat-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
        }

        /* Estilos personalizados para el scroll */
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pingOnce {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (min-width: 768px) {
          .chat-button {
            padding: 8px 16px;
            font-size: 14px;
          }
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
        }
      `}</style>
    </>
  );
};

export default Chat;
