import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  form {
    margin: 40px 0;
    width: 420px;
    display: flex;
    flex-direction: column;

    text-align: center;

    span {
      margin-bottom: 0.8em;
      color: #9c9c9c;
      font-style: italic;
    }

    h1 {
      margin-bottom: 0.2em;
      font-size: 1.6em;
      text-align: center;
    }
  }
`;
