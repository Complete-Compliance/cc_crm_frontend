import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
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

  ${props =>
    props.isErrored &&
    css`
      border-color: #ff9000;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ba382f;
      border-color: #ba382f;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ba382f;
    `}


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

export const Error = styled(Tooltip)`
  height: 1.6em;
  margin-left: 1.6em;

  svg {
    margin: 0;
  }

  span {
    background: #ff9000;
    color: #312e38;
    font-size: 1em;

    &::before {
      border-color: #ff9000 transparent;
    }
  }
`;
