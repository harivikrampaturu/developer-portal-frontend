import { Theme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Paper, TextField, Button } from '@mui/material';

export const Container = styled('div')`
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.palette.grey[50]};
  
  @media (max-width: 899px) {
    flex-direction: column;
  }
`;

export const LeftContainer = styled('div')({
  flex: '1 1 50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '3rem'
});

export const RightContainer = styled('div')({
  flex: '1 1 50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem'
});

export const LogoContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1rem',
});

export const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  padding: 20px;
  
  @media (min-width: 600px) {
    padding: 40px;
  }
`;

export const Logo = styled('img')({
  width: 120,
  height: 'auto'
});

export const Title = styled('h2')`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.palette.text.primary};
  & span {
    display: inline-block;
    margin-left: 0.5rem;
  }
`;

export const Subtitle = styled('p')`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
`;

export const Form = styled('form')({
  width: '100%'
});

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
    background-color: #fff;
    &:hover fieldset {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
    & fieldset {
      border-color: ${({ theme }) => theme.palette.grey[200]};
    }
  }
`;

export const SubmitButton = styled(Button)({
  padding: '0.75rem',
  margin: '2rem 0 1.5rem',
  backgroundColor: '#6366F1',
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#4F46E5'
  }
});

export const SignupContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: '0.5rem'
});

export const SignupText = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme?.palette?.text?.secondary
}));

export const SignupLink = styled('a')({
  fontSize: '0.875rem',
  textDecoration: 'none',
  fontWeight: 500,
  color: '#6366F1',
  '&:hover': {
    color: '#4F46E5'
  }
});

export const RememberMeContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '1rem'
});

export const OrDivider = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '1.5rem 0',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    borderBottom: '1px solid #E0E0E0'
  },
  '& span': {
    padding: '0 1rem',
    color: '#757575',
    fontSize: '0.875rem'
  }
});

export const SocialLoginContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  marginBottom: '1.5rem'
});

export const ErrorNotification = styled.div`
  background-color: ${props => props.theme.palette.error.main};
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;