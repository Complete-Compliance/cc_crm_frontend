import React, { ObjectHTMLAttributes } from 'react';
import { Container } from './styles';

interface SectionProps extends ObjectHTMLAttributes<HTMLTableSectionElement> {
  title?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, ...props }) => {
  return (
    <Container {...props}>
      {title && <strong>{title}</strong>}

      {children}
    </Container>
  );
};

export default Section;
