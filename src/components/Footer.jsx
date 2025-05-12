import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'contexts/AuthContext';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ listLength }) => {
  // const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = () => {
    // navigate('/login');
    // localStorage.removeItem('authToken');
    // return;
    logout();
  };

  return (
    <StyledFooter>
      <p>Remaining items: {listLength}</p>
      <StyledButton onClick={handleClick}>Logout</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
