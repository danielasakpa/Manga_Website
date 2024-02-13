import React, { createContext, useState, useEffect, useContext } from 'react';
import { getOneUser } from '../API/user/user';
import { useAuth } from '../Auth/AuthProvider';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { token } = useAuth();

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const userData = await getOneUser(userId, token);
                setUser(userData);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching user:', error.message);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const { user, loading, setUser, setLoading } = useContext(UserContext);
    const { token } = useAuth();

    if (!token) {
        setUser(null);
    }

    if (!user && loading) {
        // You can add additional loading UI or return null if needed
        return { loading: true };
    }
    return { user, loading, setUser, setLoading };
};
