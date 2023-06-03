// Import required modules and components
import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

// Define the initial state for the authentication context
const INITIAL_STATE = {
    curruser: JSON.parse(localStorage.getItem("user")) || null,
};

// Create an authentication context using createContext
export const AuthContext = createContext(INITIAL_STATE);

// Create an authentication context provider component
export const AuthContextProvider = ({ children }) => {
    // Use the useReducer hook to manage state and dispatch actions
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // Store the current user in localStorage when it changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.curruser));
    }, [state.curruser]);

    // Render the AuthContext.Provider and pass the state and dispatch as values
    return (
        <AuthContext.Provider value={{ curruser: state.curruser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
