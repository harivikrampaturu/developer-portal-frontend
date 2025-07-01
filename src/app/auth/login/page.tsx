'use client';

import React from 'react';
import { FormControl, Link as MuiLink, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useLoginForm } from '@/hooks/useLoginForm';
import { ErrorNotification } from '@/components/ErrorNotification';
import { Logo } from '@/components/Logo';
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
    RightContainer,
    RememberMeContainer
} from './styled';
import { lightTheme } from '@/theme/theme';
import { userDetails } from '@/store/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { ThemeProvider } from '@mui/material/styles';

export default function LoginPage() {
    const { error, handleLogin, handleClearError } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const { formData, handleChange } = useLoginForm();

    const fetchSelfDetails = async () => {
        await dispatch(userDetails());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin({
            email: formData.email,
            password: formData.password
        });
        fetchSelfDetails();
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Container>
                <RightContainer>
                    <StyledPaper>
                        <LogoContainer>
                            <Logo width={160} height={40} />
                        </LogoContainer>

                        <Title>Welcome to the Developer Portal</Title>
                        <Subtitle>Please sign in to access your account.</Subtitle>

                        <Form onSubmit={handleSubmit}>
                            <FormControl fullWidth margin="normal">
                                <StyledTextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formData.email}
                                    onChange={handleChange}
                                    theme={lightTheme}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <StyledTextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    label="Password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    theme={lightTheme}
                                />
                            </FormControl>

                            <RememberMeContainer>
                                <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
                                <MuiLink href="/auth/forgot-password" variant="body2">
                                    Forgot password?
                                </MuiLink>
                            </RememberMeContainer>

                            <SubmitButton type="submit" fullWidth variant="contained">
                                Log In
                            </SubmitButton>

                            <SignupContainer>
                                <SignupText>New on our platform?</SignupText>
                                <MuiLink
                                    component={Link}
                                    href="/auth/register"
                                    variant="body2"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    <SignupLink>Create an account</SignupLink>
                                </MuiLink>
                            </SignupContainer>
                        </Form>
                    </StyledPaper>
                </RightContainer>
                <ErrorNotification error={error} onClose={handleClearError} />
            </Container>
        </ThemeProvider>
    );
}
