import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            try {
                const user = JSON.parse(loggedInUser);
                setIsAuthenticated(true);
                setIsAdmin(user.administrador === 1);
                setUser(user);
            } catch (error) {
                console.error('Error parsing JSON from localStorage', error);
            }
        }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setIsAdmin(userData.administrador === 1);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
