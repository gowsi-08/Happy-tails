import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return setIsAuthenticated(false);

                const res = await axios.get('http://localhost:5000/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
               if(res.data.message){
                setIsAuthenticated(true);
               }
                
            } catch (err) {
                console.error(err);
                setIsAuthenticated(false); 
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
