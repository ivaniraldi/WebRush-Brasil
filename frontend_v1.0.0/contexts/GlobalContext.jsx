/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export default GlobalContext;

const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]); // Nuevo estado para proyectos del portfolio
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

    // Consumiendo los posts del blog
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

    // Consumiendo los proyectos del portfolio
    const fetchPortfolioProjects = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/portfolio");
        setPortfolioProjects(response.data);
      } catch (error) {
        console.error("Error fetching portfolio projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    fetchPortfolioProjects(); // Llamada a la función del portfolio
  }, []);

  // Función para enviar un mensaje de contacto
  const sendContactMessage = async (contactData) => {
    setContactStatus({ loading: true, success: null, error: null });

    console.log("Datos de contacto:", contactData); // Log para verificar los datos
    try {
      const response = await axios.post("/api/contacts", contactData);
      console.log("Respuesta del servidor:", response.data); // Log para verificar la respuesta
      setContactStatus({
        loading: false,
        success: "Mensaje enviado con éxito",
        error: null,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error al enviar el mensaje";
      setContactStatus({
        loading: false,
        success: null,
        error: errorMessage,
      });
      console.error("Error sending contact message:", error);
      throw error;
    }
  };

  // Función para crear un nuevo proyecto en el portfolio
  const createPortfolioProject = async (projectData) => {
    try {
      const response = await axios.post("/api/portfolio", projectData);
      setPortfolioProjects((prevProjects) => [...prevProjects, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating portfolio project:", error);
      throw error;
    }
  };

  // Función para actualizar un proyecto en el portfolio
  const updatePortfolioProject = async (id, projectData) => {
    try {
      const response = await axios.put(`/api/portfolio/${id}`, projectData);
      setPortfolioProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? response.data : project
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating portfolio project:", error);
      throw error;
    }
  };

  // Función para eliminar un proyecto del portfolio
  const deletePortfolioProject = async (id) => {
    try {
      await axios.delete(`/api/portfolio/${id}`);
      setPortfolioProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Error deleting portfolio project:", error);
      throw error;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        setTheme,
        services,
        posts,
        portfolioProjects, // Añadido al contexto
        isLoading,
        contactStatus,
        sendContactMessage,
        createPortfolioProject, // Nueva función añadida
        updatePortfolioProject, // Nueva función añadida
        deletePortfolioProject, // Nueva función añadida
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };