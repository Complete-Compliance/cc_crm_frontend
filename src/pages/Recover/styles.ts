import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
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
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 40px 0;
    width: 340px;

    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ba382f;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ba382f')};
    }
  }
`;

export const Information = styled.section`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1em;
  margin: 1em 1em 0 1em;

  width: 90%;

  background: #28262e;
  border: 1px solid #f4ede8;

  p {
    margin: 1em 0 0 0;
    padding: 0;

    font-size: 1.2em;
    color: #f4ede8;
  }

  span {
    margin-top: 0.4em;
    color: #9c9c9c;
    font-style: italic;
  }

  strong {
    color: #ba382f;
    font-style: bold;
  }
`;
