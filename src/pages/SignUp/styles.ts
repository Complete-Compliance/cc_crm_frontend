import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 40em;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimatedContent = styled.div`
  display: flex;
  flex-direction: column;

  place-content: center;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 2em 0 0.8em 0;
    width: 20em;
    font-size: 0.98em;

    text-align: center;

    h1 {
      margin-bottom: 1em;
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 1em;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 0.8em;
    }

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;

  animation: ${fadeIn} 1s;
`;
