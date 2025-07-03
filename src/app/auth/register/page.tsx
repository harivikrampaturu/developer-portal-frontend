'use client';

import { useState } from 'react';
import { FormControl, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { register, clearError } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar } from '@mui/material';
import { Logo } from '@/components/Logo';

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
    RightContainer
} from '../login/styled';
import { ThemeProvider } from '@mui/material/styles';

export default function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { error } = useSelector((state: RootState) => state.auth);

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

        const result = await dispatch(
            register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            })
        );

        if (register.fulfilled.match(result)) {
            router.push('/auth/login');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Container>
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
                            <Logo width={160} height={40} />
                        </LogoContainer>

                        <Title>Create your account to get started</Title>
                        <Subtitle>Make your app management easy and efficient!</Subtitle>

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
                                    theme={lightTheme}
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
                                    theme={lightTheme}
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
                                    theme={lightTheme}
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
                                    theme={lightTheme}
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
                                    theme={lightTheme}
                                />
                            </FormControl>

                            <SubmitButton type="submit" fullWidth variant="contained">
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
                        </Form>
                    </StyledPaper>
                </RightContainer>
            </Container>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => dispatch(clearError())}>
                <Alert severity="error" onClose={() => dispatch(clearError())}>
                    {error}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
