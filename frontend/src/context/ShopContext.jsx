import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/assets"
import axios from 'axios'

export const ShopContext = createContext();

function ShopContextProvider({ children }) {

    const [token, setToken] = useState('')
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL



    const value = {
        navigate,
        backendUrl,
        setToken,token
    };



    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
