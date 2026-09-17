import React, { createContext, useReducer, useEffect } from 'react';
import { baseApi } from '../Services/BaseApi';

export const CustomerContext = createContext();

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CUSTOMERS':
      return action.payload || [];
    case 'SET_CUSTOMERS':
      return action.payload;
    case 'ADD_CUSTOMER':
      // Prevent duplicate CBP Numbers
      if (state.find(c => c.cbpNo === action.payload.cbpNo)) return state;
      return [action.payload, ...state];

    case 'REMOVE_CUSTOMER':
      return state.filter(c => c.id !== action.payload);

    default:
      return state;
  }
};

export const CustomerContextProvider = ({ children }) => {
  const [customers, dispatch] = useReducer(CustomerReducer, []);

  // You can implement API fetching here similar to your ManagerContext
  const fetchCustomersData = async () => {
    try {
      const response = await fetch(`${baseApi}/api/customers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Transform API data to match your App's format if needed
        const formattedData = data.map(user => ({
          id: user.customer_id.toString(),
          cbpNo: user.cbp_no,
          cbpName: user.cbp_name,
          customerName: user.contact_name,
          mobile: user.contact_number,
          email: user.email,
          accountManager: user.account_manager_name,
          address: user.address,
          username: user.username,
        }));
        dispatch({ type: 'SET_CUSTOMERS', payload: formattedData });
      }
    } catch (error) {
      console.log('Fetch Customers Failure ');
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const addCustomer = async formData => {
    console.log(formData);
    dispatch({ type: 'ADD_CUSTOMER', payload: formData });

    // Optional: await SaveCustomerApi(newCustomer);
  };

  const removeCustomer = id => {
    dispatch({ type: 'REMOVE_CUSTOMER', payload: id });
  };

  return (
    <CustomerContext.Provider
      value={{ customers, addCustomer, removeCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
