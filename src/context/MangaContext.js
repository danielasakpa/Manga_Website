// MangaContext.js
import React, { createContext, useContext, useReducer, useState } from 'react';

// Define the initial state
const initialState = {
    mangas: [],
    isLoading: false, // New state for loading indicator
};

// Define the action types
const actionTypes = {
    SET_MANGAS: 'SET_MANGAS',
    CLEAR_MANGAS: 'CLEAR_MANGAS',
    SET_LOADING: 'SET_LOADING', // New action type
};

// Create the context
const MangaContext = createContext();

// Define the reducer function
const mangaReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_MANGAS:
            return {
                ...state,
                mangas: action.payload,
            };
        case actionTypes.CLEAR_MANGAS:
            return {
                ...state,
                mangas: [],
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

// Create the context provider component
export const MangaProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mangaReducer, initialState);

    // Define the actions
    const setMangas = (mangas) => {
        dispatch({ type: actionTypes.SET_MANGAS, payload: mangas });
    };

    const clearMangas = () => {
        dispatch({ type: actionTypes.CLEAR_MANGAS });
    };

    const setLoading = (isLoading) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: isLoading });
    };

    return (
        <MangaContext.Provider
            value={{
                mangas: state.mangas,
                isLoading: state.isLoading,
                setMangas,
                clearMangas,
                setLoading,
            }}
        >
            {children}
        </MangaContext.Provider>
    );
};

// Create a custom hook for accessing the context
export const useMangaContext = () => {
    const context = useContext(MangaContext);
    if (!context) {
        throw new Error('useMangaContext must be used within a MangaProvider');
    }
    return context;
};
