import styled, { keyframes, css } from 'styled-components';

interface InformationCardProps {
  isExpanded: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    position: fixed;
    top: 120px;

    strong {
      color: #ba382f;
    }
  }

  height: 80vh;
`;

export const LoadingContainer = styled.div`
  height: 180;
  width: 90;
`;

const blurEffectIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const InformationCard = styled.div<InformationCardProps>`
  width: 20em;
  background-color: #28262e;

  border-radius: 20px;

  section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${props =>
    props.isExpanded
      ? css`
          height: 15em;
          transition: all 0.5s ease-in-out;

          section {
            animation: ${blurEffectIn} 0.7s;
          }
        `
      : css`
          height: 3em;
          transition: all 0.5s ease-in-out;

          section {
            opacity: 0;
          }
        `}

  @media (min-width: 1024px) {
    width: 30em;
  }
`;

// REMIMDER: I have programmed this arrow animation CSS thinking that
// on the HTML I would be using a UP ARROW and
// that all the cards would start with expanded=True
// if one thing change, the logic will invert
export const CardHeader = styled.div<InformationCardProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 40px;

  button {
    background: transparent;
    border: 0;

    svg {
      margin: 1em 1.6em 0 0;

      transition: all 0.6s;

      color: #f3f3f3;

      width: 20px;
      height: 20px;

      ${props =>
        props.isExpanded
          ? css`
              transform: rotate(0deg);
            `
          : css`
              transform: rotate(-180deg);
            `}
    }
  }
  span {
    margin: 0.4em 0 0 1.6em;
    font-size: 1.4em;
    color: #ba382f;
  }
`;
