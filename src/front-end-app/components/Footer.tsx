// components/Footer.tsx
import styled from 'styled-components';
import Colors from './Colors';

const StyledFooter = styled.footer`
  background: ${Colors.primaryColor};
`;

const H5 = styled.h5`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  display: inline-block;
`;

const A = styled.a`
  color: ${Colors.grayColor};
  font-size: 0.8rem;
`;

// Explicit props type
type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <StyledFooter className={className}>
      <H5>
        <A href="https://github.com/maaify/javascript-framework-ratings">
          By MAAify
        </A>
      </H5>
    </StyledFooter>
  );
}
