import styled from '@emotion/styled';
import { Paper, TextField, Button } from '@mui/material';
import type { Theme } from '@mui/material/styles';

type WithTheme = { theme?: Theme };

export const Container = styled('div')`
    min-height: 100vh;
    display: flex;
    background: ${({ theme }: WithTheme) => theme?.palette.background.default};

    @media (max-width: 899px) {
        flex-direction: column;
    }

    @media (max-width: 600px) {
        padding: 16px;
    }
`;

export const LeftContainer = styled('div')`
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 3rem;

    @media (max-width: 899px) {
        flex: 1 1 auto;
        padding: 2rem 1rem;
        min-height: 40vh;
    }

    @media (max-width: 600px) {
        padding: 1rem;
        min-height: 30vh;
    }
`;

export const RightContainer = styled('div')`
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;

    @media (max-width: 899px) {
        flex: 1 1 auto;
        padding: 2rem 1rem;
    }

    @media (max-width: 600px) {
        padding: 1rem;
    }
`;

export const LogoContainer = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
`;

export const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ theme }: WithTheme) => theme?.palette.background.paper};
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
    padding: 20px;

    @media (min-width: 600px) {
        padding: 40px;
    }

    @media (max-width: 600px) {
        border-radius: 16px;
        padding: 24px 16px;
        margin: 0 8px;
    }
`;

export const Logo = styled('img')`
    width: 160px;
    height: auto;

    @media (max-width: 600px) {
        width: 100px;
    }
`;

export const Title = styled('h2')`
    font-weight: 600;
    color: ${({ theme }: WithTheme) => theme?.palette.text.primary};
    font-size: 1.4rem;
    text-align: center;

    & span {
        display: inline-block;
        margin-left: 0.5rem;
    }

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
`;

export const Subtitle = styled('p')`
    margin-bottom: 2rem;
    color: ${({ theme }: WithTheme) => theme?.palette.text.secondary};
    text-align: center;
    font-size: 1rem;

    @media (max-width: 600px) {
        font-size: 0.875rem;
        margin-bottom: 1.5rem;
    }
`;

export const Form = styled('form')`
    width: 100%;
`;

export const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 8px;
        background-color: ${({ theme }: WithTheme) => theme?.palette.background.paper};

        &:hover fieldset {
            border-color: ${({ theme }: WithTheme) => theme?.palette.primary.main};
        }

        & fieldset {
            border-color: ${({ theme }: WithTheme) => theme?.palette.grey[200]};
        }
    }

    @media (max-width: 600px) {
        & .MuiOutlinedInput-root {
            font-size: 16px;
        }
    }
`;

export const SubmitButton = styled(Button)`
    padding: 0.75rem;
    margin: 2rem 0 1.5rem;
    background-color: ${({ theme }: WithTheme) => theme?.palette.primary.main};
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    min-height: 48px;
    color: ${({ theme }: WithTheme) => theme?.palette.getContrastText(theme?.palette.primary.main || '#d71920')};

    &:hover {
        background-color: ${({ theme }: WithTheme) => theme?.palette.primary.dark};
    }

    @media (max-width: 600px) {
        margin: 1.5rem 0 1rem;
        min-height: 44px;
    }
`;

export const SignupContainer = styled('div')`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }
`;

export const SignupText = styled('span')`
    font-size: 0.875rem;
    color: ${({ theme }: WithTheme) => theme?.palette.text.secondary};

    @media (max-width: 600px) {
        font-size: 0.8rem;
    }
`;

export const SignupLink = styled('a')`
    font-size: 0.875rem;
    text-decoration: none;
    font-weight: 500;
    color: ${({ theme }: WithTheme) => theme?.palette.primary.main};
    display: flex;
    align-items: center;

    &:hover {
        color: ${({ theme }: WithTheme) => theme?.palette.primary.dark};
    }

    @media (max-width: 600px) {
        font-size: 0.8rem;
    }
`;

export const RememberMeContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 1rem;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
`;

export const OrDivider = styled('div')`
    display: flex;
    align-items: center;
    margin: 1.5rem 0;

    &::before,
    &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid ${({ theme }: WithTheme) => theme?.palette.divider};
    }

    & span {
        padding: 0 1rem;
        color: ${({ theme }: WithTheme) => theme?.palette.text.secondary};
        font-size: 0.875rem;
    }

    @media (max-width: 600px) {
        margin: 1rem 0;
    }
`;

export const SocialLoginContainer = styled('div')`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (max-width: 600px) {
        flex-direction: column;
        gap: 0.75rem;
    }
`;

export const ErrorNotification = styled('div')`
    background-color: ${({ theme }: WithTheme) => theme?.palette.error.main};
    color: ${({ theme }: WithTheme) => theme?.palette.getContrastText(theme?.palette.error.main || '#d71920')};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 0.875rem;

    @media (max-width: 600px) {
        padding: 8px;
        font-size: 0.8rem;
    }
`;
