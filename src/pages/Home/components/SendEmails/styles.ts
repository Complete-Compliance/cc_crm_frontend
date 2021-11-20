import styled, { css } from 'styled-components';

interface ActionButtonProps {
  status?: string;
  deletable?: string;
}

export const Container = styled.div`
  margin-top: 360px;

  @media (min-width: 1024px) {
    margin-top: 264px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    display: inline-block;
    margin: 48px auto;
  }

  height: 180;
  width: 90;
`;

export const Content = styled.main`
  max-width: 1120px;
  height: 450px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  text-align: center;

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

  .MuiDataGrid-iconButtonContainer {
    margin-left: 5px;
  }
`;

export const FormContent = styled.div`
  width: 280px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  form {
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;

      button {
        width: 200px;
        margin: auto;
      }

      div {
        width: 300px;
        height: 56px;

        margin: 5px 20px 0 20px;
      }

      & + div {
        margin-bottom: 16px;
      }
    }
  }

  @media (min-width: 1024px) {
    width: 1120px;
    margin: 64px auto;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    form {
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      div {
        display: flex;
        flex-direction: row;

        button {
          width: 200px;
          margin: 0;
        }

        div {
          width: 300px;
          height: 30px;

          margin: 5px 20px 0 20px;
        }
      }
    }
  }
`;

export const ActionButton = styled.button<ActionButtonProps>`
  background: transparent;
  border: 0;

  svg {
    transition: color 0.225s;
  }

  ${props =>
    props.status &&
    props.status !== 'Created' &&
    css`
      display: none;
    `}

  ${props =>
    props.deletable &&
    props.deletable === 'Running' &&
    css`
      display: none;
    `}
`;
