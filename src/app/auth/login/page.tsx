'use client';

import React from 'react';
import { FormControl, Link as MuiLink, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { useLoginForm } from '@/hooks/useLoginForm';
import { ErrorNotification } from '@/components/ErrorNotification';
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
    RememberMeContainer,
    OrDivider,
    SocialLoginContainer
} from './styled';
import { lightTheme } from '@/theme/theme';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { userDetails } from '@/store/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

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
        <Container theme={lightTheme}>
            <RightContainer>
                <StyledPaper>
                    <LogoContainer>
                        <Image src="/meeami-logo-black.jpg" alt="Materialize Logo" width={140} height={30} priority />
                    </LogoContainer>

                    <Title theme={lightTheme}>
                        Welcome to Developer Portal! <span>👋🏻</span>
                    </Title>
                    <Subtitle theme={lightTheme}>Please sign-in to your account and start the adventure</Subtitle>

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
                            <SignupText theme={lightTheme}>New on our platform?</SignupText>
                            <MuiLink
                                component={Link}
                                href="/auth/register"
                                variant="body2"
                                sx={{ textDecoration: 'none' }}
                            >
                                <SignupLink>Create an account</SignupLink>
                            </MuiLink>
                        </SignupContainer>

                        <OrDivider>
                            <span>or</span>
                        </OrDivider>

                        <SocialLoginContainer>
                            <IconButton sx={{ color: '#497CE2' }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#1DA1F2' }}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#333333' }}>
                                <GitHubIcon />
                            </IconButton>
                            <IconButton sx={{ color: '#DB4437' }}>
                                <GoogleIcon />
                            </IconButton>
                        </SocialLoginContainer>
                    </Form>
                </StyledPaper>
            </RightContainer>
            <ErrorNotification error={error} onClose={handleClearError} />
        </Container>
    );
}
