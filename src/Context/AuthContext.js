import React, { createContext, useReducer, useEffect } from 'react';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseApi } from '../Services/BaseApi';
import Storage from '../UI/Storage';

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
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

  // Load user on App Start
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await Storage.getItem('authToken');
        //console.log(token);
        if (token) {
          // Verify token with backend
          const response = await fetch(`${baseApi}/api/users/profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result);
            dispatch({
              type: 'RESTORE_TOKEN',
              payload: { token, user: result },
            });
          } else {
            //await AsyncStorage.removeItem('authToken');
            dispatch({
              type: 'RESTORE_TOKEN',
              payload: { token: null, user: null },
            });
          }
        } else {
          dispatch({
            type: 'RESTORE_TOKEN',
            payload: { token: null, user: null },
          });
        }
      } catch (e) {
        dispatch({
          type: 'RESTORE_TOKEN',
          payload: { token: null, user: null },
        });
      }
    };

    bootstrapAsync();
  }, []);
  const login = async (email, password) => {
    try {
      const response = await fetch(
        `https://backend-collection-production.up.railway.app/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        // Use the key names returned by your specific backend (e.g., result.token)
        const token = result.token;
        const user = result.user;
        await Storage.setItem('authToken', token);
        dispatch({
          type: 'LOGIN',
          payload: { token, user },
        });

        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network Error' };
    }
  };

  const register = async (name, email, password, mobile) => {
    try {
      const response = await fetch(`${baseApi}/users/register`, {
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

  const logout = async () => {
    await Storage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: !!state.token,
        token: state.token,
        user: state.user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
