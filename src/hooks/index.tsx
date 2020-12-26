import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { LeadProvider } from './lead';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <LeadProvider>{children}</LeadProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
