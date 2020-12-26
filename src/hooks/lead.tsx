import React, { createContext, useState, useContext } from 'react';

interface LeadContextData {
  reloadLead: boolean;
  setReloadLead(status: boolean): void;
  leadUpdateEndpoint: string;
  setLeadUpdateEndpoint(endpoint: string): void;
  isLoading: boolean;
  setIsLoading(loading: boolean): void;
}

const LeadContext = createContext<LeadContextData>({} as LeadContextData);

const LeadProvider: React.FC = ({ children }) => {
  const [reloadLead, setReloadLead] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadUpdateEndpoint, setLeadUpdateEndpoint] = useState('');

  return (
    <LeadContext.Provider
      value={{
        reloadLead,
        setReloadLead,
        leadUpdateEndpoint,
        setLeadUpdateEndpoint,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

function useLead(): LeadContextData {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error('use Auth must be used within an LeadProvider');
  }

  return context;
}

export { LeadProvider, useLead };
