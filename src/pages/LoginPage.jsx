import React, { useState } from 'react';
import { useEffect } from 'react';
// Page navigation provided by react-router-dom's Link
import { Link, useNavigate } from 'react-router-dom';
// To redirect within a React component, use the React Hook provided by react-router-dom
import { useAuth } from 'contexts/AuthContext';

import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';

//modal dialog library
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Extract needed state and methods from AuthContext
  const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    // Using login method from useAuth context
    const success = await login({ username, password });

    //Login successful
    if (success) {
      Swal.fire({
        title: 'Login Successful',
        text: `Welcome back, ${username}`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        position: 'center',
      });
      return;
    }
    //Login failed
    Swal.fire({
      title: 'Oops',
      text: `User not found. Please check your credentials.`,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      position: 'center',
    });
  };

  //Check token validity on component mount
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Login to Taskfolio</h1>

      <AuthInputContainer>
        <AuthInput
          label='Username'
          placeholder='Enter your username'
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type='password'
          label='Password'
          placeholder='Enter your password'
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>Login</AuthButton>
      <Link to='/signup'>
      <AuthLinkText>Sign Up</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
