import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import url from "../url"

// Criação do contexto
const AuthContext = createContext(null);

// Hook personalizado para usar o contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// Provider do contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ token });
        }
        setLoading(false);
    }, []);

    async function signIn(email, senha) {
        try {
            const response = await axios.post(`${url}/auth/login`, {
                email,
                senha
            });
            // console.log('response.data: ',response);
            
            const token = response.data.access_token; 
            
            if (!token) {
                throw new Error('Token não recebido');
            }
    
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ token });
            
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro completo:', error);
            throw error;
        }
    }

    function signOut() {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signOut,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}