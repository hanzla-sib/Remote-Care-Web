import AuthReducer from "./AuthReducer";

import { createContext ,useEffect,useReducer} from "react";

const INITIAL_STATE={
curruser:JSON.parse(localStorage.getItem("user"))||null,
};

export const AuthContext=createContext(INITIAL_STATE);
export const AuthContextProvider =({children})=>{
    const[state,dispatch]=useReducer(AuthReducer,INITIAL_STATE);
    
    useEffect(()=>{
localStorage.setItem("user",JSON.stringify(state.curruser))
    },[state.curruser])
   
    return(
        <AuthContext.Provider value={{curruser:state.curruser,dispatch}} >
        {children}
        </AuthContext.Provider>
    )
};