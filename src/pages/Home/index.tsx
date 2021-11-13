import React from 'react';
import AppHeader from '../../components/AppHeader';
import SearchLeads from './components/SearchLeads';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <AppHeader />

      <SearchLeads />
    </Container>
  );
};

export default Home;
