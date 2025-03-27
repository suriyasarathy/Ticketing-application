import { createContext, useState, useContext } from "react";

// Create Context
const Context = createContext();

// Context Provider Component
export const ContextProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <Context.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </Context.Provider>
  );
};

// Custom Hook to use Context
export const useProject = () => useContext(Context);
