import React from 'react';
import 'react-day-picker/lib/style.css';
import { FiAlertTriangle } from 'react-icons/fi';
import AppHeader from '../../components/AppHeader';

import { Container, Content } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <AppHeader />

      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FiAlertTriangle style={{ color: '#ffd900' }} size={40} />
        <p style={{ marginTop: 10 }}>IN DEVELOPMENT...</p>
      </Content>
    </Container>
  );
};

export default Home;
