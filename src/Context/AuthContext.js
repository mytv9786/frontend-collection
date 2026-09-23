import React, { createContext, useReducer, useEffect } from 'react';
import { baseApi } from '../Services/BaseApi';
//import Storage from '../UI/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: !!action.payload.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // 1. యాప్ స్టార్ట్ అయినప్పుడు టోకెన్ లోడ్ చేసే లాజిక్
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        // టోకెన్ నిజంగా ఉంటేనే (null/undefined స్ట్రింగ్స్ కాకుండా ఉంటేనే) వెరిఫై చేస్తుంది
        if (token && token !== 'null' && token !== 'undefined') {
          const response = await fetch(`${baseApi}/api/users/profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            // ఒకవేళ సర్వర్ నుండి వచ్చిన యూజర్ డేటా ఖాళీగా ఉంటే ఆబ్జెక్ట్ సెట్ చేస్తుంది
            const userData = result && typeof result === 'object' ? result : {};

            dispatch({
              type: 'RESTORE_TOKEN',
              payload: { token, user: userData },
            });
            return;
          }
        }

        // టోకెన్ లేకపోయినా లేదా ఇన్వాలిడ్ అయినా స్టోరేజ్ క్లియర్ చేసి లాగౌట్ చేస్తుంది
        await AsyncStorage.removeItem('authToken');
        dispatch({ type: 'LOGOUT' });
      } catch (e) {
        console.error('Auth bootstrap error:', e);
        try {
          await AsyncStorage.removeItem('authToken');
        } catch (err) {}
        dispatch({ type: 'LOGOUT' });
      }
    };

    bootstrapAsync();
  }, []);

  // 2. లాగిన్ ఫంక్షన్
  const login = async (email, password) => {
    try {
      const response = await fetch(`${baseApi}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const result = await response.json();

      if (response.ok && result) {
        const token = result.token;
        const user =
          result.user && typeof result.user === 'object' ? result.user : {};

        if (token) {
          await AsyncStorage.setItem('authToken', token);
          dispatch({
            type: 'LOGIN',
            payload: { token, user },
          });
          return { success: true, message: result.message };
        }
      }
      return { success: false, message: result?.message || 'Login failed' };
    } catch (error) {
      return { success: false, message: 'Network Error' };
    }
  };

  // 3. రిజిస్ట్రేషన్ ఫంక్షన్
  const register = async (name, email, password, mobile) => {
    try {
      const response = await fetch(`${baseApi}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, mobile }),
      });

      const data = await response.json();
      return response.ok
        ? { success: true }
        : { success: false, message: data.message || 'Registration failed' };
    } catch (error) {
      return { success: false, message: 'Network Error' };
    }
  };

  // 4. లాగౌట్ ఫంక్షన్
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (e) {
      console.error('Logout storage error:', e);
    }
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
        token: state.token || null,
        user: state.user || {}, // null కి బదులు సేఫ్ గా ఖాళీ ఆబ్జెక్ట్ పాస్ అవుతుంది
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
