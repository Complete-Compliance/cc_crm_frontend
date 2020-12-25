import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 40em;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 2em 0 0.8em 0;
    width: 20em;
    font-size: 1.1em;

    text-align: center;

    h1 {
      margin-bottom: 1em;
    }
  }

  > a {
    color: #ba382f;
    display: block;
    margin-top: 1.4em;
    margin-bottom: 1em;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 1.16em;

    display: flex;
    align-items: center;

    svg {
      margin-right: 1em;
    }

    &:hover {
      color: ${shade(0.2, '#ba382f')};
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
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;

  animation: ${fadeIn} 2s;
`;
