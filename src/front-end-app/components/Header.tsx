// components/Header.tsx
import styled from 'styled-components';
import Colors from './Colors';

const StyledHeader = styled.header`
  background-color: ${Colors.primaryColor};
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  display: inline-block;
  color: ${Colors.secondPrimaryColor};
  font-size: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

type HeaderProps = {
  className?: string; // ✅ optional now
};

export default function Header({ className }: HeaderProps) {
  return (
    <StyledHeader className={className}>
      <H1>JavaScript Framework Voting</H1>
    </StyledHeader>
  );
}
