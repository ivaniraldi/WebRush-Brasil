/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export default GlobalContext;

const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [contactStatus, setContactStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  useEffect(() => {
    // Consumiendo los servicios de la API
    axios
      .get("/api/services")
      .then((response) => setServices(response.data))
      .catch((error) =>
        console.error("Error al obtener los servicios:", error)
      );

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/blog");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Función para enviar un mensaje de contacto
  const sendContactMessage = async (contactData) => {
    setContactStatus({ loading: true, success: null, error: null });

    try {
      const response = await axios.post("/api/contacts", contactData);
      setContactStatus({
        loading: false,
        success: "Mensaje enviado con éxito",
        error: null,
      });
      return response.data; // Retorna los datos del contacto creado si es necesario
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al enviar el mensaje";
      setContactStatus({
        loading: false,
        success: null,
        error: errorMessage,
      });
      throw error; // Lanza el error para que el componente que lo llama pueda manejarlo si es necesario
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
        services,
        posts,
        isLoading,
        contactStatus,
        sendContactMessage, // Nueva función añadida al contexto
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };