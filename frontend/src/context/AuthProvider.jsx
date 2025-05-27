import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    auth: {},
    setAuth: () => {}
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const stored = localStorage.getItem('auth');
        return stored ? JSON.parse(stored) : {};
    });

    // Keep localStorage in sync with auth state
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;