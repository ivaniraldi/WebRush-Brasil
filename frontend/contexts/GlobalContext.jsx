/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export default  GlobalContext;   

const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [services, setServices] = useState([]);
  

  useEffect(() => {
    // Consumiendo los servicios de la API
    axios.get("/api/services")
      .then(response => setServices(response.data))
      .catch(error => console.error("Error al obtener los servicios:", error));
  }, []);

  return (
    <GlobalContext.Provider value={{ theme, setTheme, services }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider, };