/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export default  GlobalContext;   

const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [services, setServices] = useState([]);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Consumiendo los servicios de la API
    axios.get("/api/services")
      .then(response => setServices(response.data))
      .catch(error => console.error("Error al obtener los servicios:", error));
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          // Reemplaza esto con tu llamada real a la API
          const response = await axios.get('/api/blog');
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchPosts();
  }, []);

  return (
    <GlobalContext.Provider value={{ theme, setTheme, services, posts, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider, };