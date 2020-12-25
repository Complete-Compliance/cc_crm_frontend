import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  width: 100%;
  height: 600px;

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

  .MuiTablePagination-caption {
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
