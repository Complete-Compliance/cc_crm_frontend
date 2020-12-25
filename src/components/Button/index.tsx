import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  color?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  color,
  ...props
}) => (
  <Container type="button" color={color} {...props}>
    {loading && 'Carregando...'}
    {!loading && children}
  </Container>
);

export default Button;
