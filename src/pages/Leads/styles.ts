import styled, { css, keyframes } from 'styled-components';

interface InformationCardProps {
  isExpanded: boolean;
  height?: string;
}

interface CardHeaderProps {
  isExpanded: boolean;
}

export const Container = styled.div``;

export const Content = styled.div`
  width: 100%;
  height: 500px;

  .MuiDataGrid-root {
    font-size: 1em;
    color: #f4ede8;
    border: none;

    padding: 1em;

    button {
      width: 3em;
      height: 3em;

      svg {
        transition: color 0.225s;

        width: 3em;
        height: 3em;
      }

      &:hover {
        svg {
          color: #ba382f;
        }
      }
    }
  }

  // Grid cell
  .MuiDataGrid-cell,
  .MuiDataGrid-cellWithRenderer,
  .MuiDataGrid-cellLeft {
    button {
      width: 1.6em;
      height: 1.6em;

      svg {
        transition: color 0.225s;

        width: 1.6em;
        height: 1.6em;
      }

      &:hover {
        svg {
          color: #ba382f;
        }
      }
    }
  }

  // Grid content view
  .MuiDataGrid-viewport {
    font-size: 0.8em;
  }

  .MuiDataGrid-columnsContainer,
  .MuiDataGrid-colCell {
    margin-bottom: 1em;

    button {
      width: 1em;
      height: 1em;

      svg {
        width: 1em;
        height: 1em;
      }
    }
  }

  .MuiDataGrid-toolbar {
    button {
      width: 1.6em;
      height: 1.6em;

      span {
        font-size: 1.6em;
      }

      margin: 0 0 0.6em 0;

      svg {
        width: 1.6em;
        height: 1.6em;
      }
    }
  }

  .MuiDataGrid-colCellWrapper {
    color: #ba382f;
  }

  .MuiTablePagination-caption,
  .MuiTablePagination-select,
  .MuiSelect-selectMenu {
    font-size: 2em;
  }

  .MuiDataGrid-columnSeparator {
    svg {
      color: #000;
    }
    color: #000;
  }
`;

export const ViewMoreButton = styled.button`
  background: transparent;
  border: 0;

  svg {
    transition: color 0.225s;

    color: #999591;
  }

  &:hover {
    svg {
      color: #c53030;
    }
  }
`;

export const FiltersContainer = styled.div<CardHeaderProps>`
  display: flex;
  flex-direction: row;

  margin-left: 30px;

  width: 800px;

  ${props =>
    !props.isExpanded &&
    css`
      display: none;
    `}

  form {
    margin-left: 10px;

    display: flex;
    flex-direction: column;
    section {
      div {
        margin-top: 0;
      }
    }
  }
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
  display: flex;
  flex-direction: column;

  width: 20em;
  background-color: #28262e;

  margin: 1em 0;

  border-radius: 20px;

  ${props =>
    props.isExpanded
      ? css`
          height: ${props.height ? props.height : '18em'};
          transition: all 0.5s ease-in-out;
          form {
            section {
              animation: ${blurEffectIn} 0.7s;
            }
          }
        `
      : css`
          height: 3em;
          transition: all 0.5s ease-in-out;
          form {
            section {
              opacity: 0;
            }
          }
        `}

  @media (min-width: 1024px) {
    width: 60em;
  }
`;

// REMIMDER: I have programmed this arrow animation CSS thinking that
// on the HTML I would be using a UP ARROW and
// that all the cards would start with expanded=True
// if one thing change, the logic will invert
export const CardHeader = styled.div<CardHeaderProps>`
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
