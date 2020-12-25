import styled, { css } from 'styled-components';

import Tooltips from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrors: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: var(--white);
  border-radius: 10px;
  padding: 1.6rem;
  margin-bottom: 2rem;

  height: 30rem;

  width: 100%;
  max-width: 140rem;

  font: 16px Poppins, sans-serifa;

  border: 2px solid var(--white);
  color: var(--input-placeholder);



  & + div {
    margin-top: 1.6rem;
  }

  ${props =>
    props.isErrors &&
    css`
      border-color: var(--error-red);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--green);
      border-color: var(--green);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--green);
    `}

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--black);
    font-size:14px;
    resize: none;
    height: 100%;

    &::placeholder {
      color: var(--input-placeholder);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltips)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error-red);
    color: #fff;

    &::before {
      border-color: var(--error-red) transparent;
    }
  }
`;
