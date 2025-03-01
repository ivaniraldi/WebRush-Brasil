import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import BlogPost from "./pages/BlogPost";
import CookieConsent from "react-cookie-consent";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />

      {/* Aviso de cookies */}
      <CookieConsent
        location="bottom"
        buttonText="Aceitar"
        cookieName="webRushBrasilCookie"
        style={{ background: "#4c5474" }}
        buttonStyle={{ color: "#4c5474", background: "#f8b459", borderRadius: "8px", padding: "10px 20px" }}
        expires={150}
      >
        Este site usa cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política de cookies.
        <button onClick={openModal} className="ml-2 text-blue-400 underline">
          Políticas de Cookies
        </button>
      </CookieConsent>

      {/* Modal de Políticas de Cookies */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96">
            <h2 className="text-xl font-bold mb-4">Política de Cookies</h2>
            <p className="text-sm mb-4">
              Nós usamos cookies para melhorar a experiência de navegação. Cookies são pequenos arquivos armazenados no
              seu dispositivo que nos ajudam a personalizar o conteúdo, analisar o tráfego e oferecer serviços
              relevantes. Ao continuar navegando em nosso site, você concorda com o uso de cookies.
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
