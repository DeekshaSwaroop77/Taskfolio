import React, { useEffect } from 'react';
import { useState } from 'react';
// Page navigation is provided by react-router-dom's Link
import { Link } from 'react-router-dom';
// To perform redirection inside a React component, use the React Hook provided by react-router-dom
import { useNavigate } from 'react-router-dom';

import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
// Modal dialog library
import Swal from 'sweetalert2';
import { useAuth } from 'contexts/AuthContext';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const navigate = useNavigate();
  // Get register method and authentication status
  const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }

    // -- Using useAuth context
    const success = await register({
      username,
      password,
      email,
    });

    // Registration successful
    if (success) {
      Swal.fire({
        title: 'Registration Successful',
        text: `Welcome, ${username}!`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        position: 'center',
      });
      return;
    }

    // Registration failed
    Swal.fire({
      title: 'Oops',
      text: `Registration failed. This email or username is already taken.`,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
      position: 'center',
    });
  };

  // Check for valid token
  useEffect(() => {
    // -- Using useAuth context
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>Create Your Account</h1>

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
          type='email'
          label='Email'
          placeholder='Enter your email'
          value={email}
          onChange={(emailInputValue) => setemail(emailInputValue)}
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
      <AuthButton onClick={handleClick}>Sign Up</AuthButton>
      <Link to='/login'>
        <AuthLinkText>Cancel</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
