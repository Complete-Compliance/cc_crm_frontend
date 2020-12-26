import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 1em;
  padding: 1.2em;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.6em;
  }

  input {
    background: transparent;
    flex: 1;
    border: none;
    color: #f4ede8;
    font-size: 1em;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const OuterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-left: 0.4em;
    background: transparent;
    border: 0;

    svg {
      transition: all 0.4s;

      width: 20px;
      height: 20px;
    }

    &:hover {
      svg {
        transform: scale(1.2);
      }
    }
  }
`;
