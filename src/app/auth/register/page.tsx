'use client';

import { useState } from 'react';
import { FormControl, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { register, clearError } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { lightTheme } from '@/theme/theme';
import {
  Container,
  StyledPaper,
  Title,
  Subtitle,
  Form,
  StyledTextField,
  SubmitButton,
  SignupContainer,
  SignupText,
  SignupLink,
  LogoContainer,
  LeftContainer,
  RightContainer,
  OrDivider,
  SocialLoginContainer
} from '../login/styled';

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }

    const result = await dispatch(register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    }));

    if (register.fulfilled.match(result)) {
      router.push(ROUTES.DASHBOARD);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container theme={lightTheme}>
    {/*   <LeftContainer>
        <Image
          src="/register-character.png"
          alt="Character Illustration"
          width={800}
          height={800}
          style={{ maxWidth: '100%', height: 'auto' }}
          priority
        />
      </LeftContainer> */}

      <RightContainer>
        <StyledPaper>
          <LogoContainer>
            <Image
              src="/meeami-logo-black.jpg"
              alt="Materialize Logo"
              width={140}
              height={30}
              priority
            />
          </LogoContainer>
          
          <Title>Adventure starts here 🚀</Title>
          <Subtitle>Make your app management easy and fun!</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <StyledTextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <StyledTextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <StyledTextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <StyledTextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <StyledTextField
                fullWidth
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>

            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </SubmitButton>

            <SignupContainer>
              <SignupText>Already have an account?</SignupText>
              <MuiLink
                component={Link}
                href="/auth/login"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                <SignupLink>Sign in instead</SignupLink>
              </MuiLink>
            </SignupContainer>

            <OrDivider>
              <span>or</span>
            </OrDivider>

            <SocialLoginContainer>
              <IconButton sx={{ color: '#497CE2' }}><FacebookIcon /></IconButton>
              <IconButton sx={{ color: '#1DA1F2' }}><TwitterIcon /></IconButton>
              <IconButton sx={{ color: '#333333' }}><GitHubIcon /></IconButton>
              <IconButton sx={{ color: '#DB4437' }}><GoogleIcon /></IconButton>
            </SocialLoginContainer>
          </Form>
        </StyledPaper>
      </RightContainer>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => dispatch(clearError())}
      >
        <Alert severity="error" onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
} 