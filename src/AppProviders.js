import React from 'react';
import { AuthContextProvider } from '../src/Context/AuthContext';
import { ManagerContextProvider } from '../src/Context/ManagerContext';
import { CustomerContextProvider } from '../src/Context/CustomerContext';
import { PaymentContextProvider } from './Context/PaymentContext';

const AppProviders = ({ children }) => {
  return (
    <AuthContextProvider>
      <ManagerContextProvider>
        <CustomerContextProvider>
          <PaymentContextProvider>{children}</PaymentContextProvider>
        </CustomerContextProvider>
      </ManagerContextProvider>
    </AuthContextProvider>
  );
};

export default AppProviders;
