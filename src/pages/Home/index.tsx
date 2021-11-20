import React from 'react';
import AppHeader from '../../components/AppHeader';
import SearchLeads from './components/SearchLeads';
import SearchEmails from './components/SearchEmails';
import SendEmails from './components/SendEmails';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <AppHeader />

      <SearchLeads />
      <SearchEmails />
      <SendEmails />
    </Container>
  );
};

export default Home;
