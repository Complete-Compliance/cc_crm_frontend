import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    margin: 1.5rem;

    strong {
      font-size: 1.6rem;
      color: var(--table-black);
    }
  }
`;
