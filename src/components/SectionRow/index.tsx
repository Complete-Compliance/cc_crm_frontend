import React from 'react';
import { Container } from './styles';

interface SectionProps {
  title?: string;
  subTitle?: string;
}

const Section: React.FC<SectionProps> = ({ title, subTitle, children }) => {
  return (
    <Container>
      {title && <strong>{title}</strong>}
      {subTitle && <span>{subTitle}</span>}

      {children}
    </Container>
  );
};

export default Section;
