import styled from '@emotion/styled';
import { ToggleButtonGroup } from '@mui/material';
import themeConfig from 'config/theme.config';

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    zIndex: 10,
    fontSize: '14px', // Adjust font size
    padding: '4px',
    backgroundColor: themeConfig.palette.background.light,
    borderColor: state.isFocused
      ? themeConfig.palette.border.focus
      : themeConfig.palette.border.dark, // Purple border // 9444E6
    boxShadow: state.isFocused
      ? `0 0 0 1px ${themeConfig.palette.border.focus}`
      : 'none', // Optional box-shadow when focused
    '&:hover': {
      borderColor: themeConfig.palette.border.focus // Hover effect for the border
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '14px' // Font size for the selected value
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: '14px' // Font size for the dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px', // Font size for options
    backgroundColor: state.isFocused
      ? themeConfig.palette.background.dark
      : 'white', // Highlight option on hover
    color: state.isFocused
      ? themeConfig.palette.border.focus
      : themeConfig.palette.text.primary
  })
};

export const ApiKeyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.light};
  padding: 1.6rem;
`;

export const Actions = styled.div`
 display: flex;
 align-items: center,
 justify-content: flex-end;
`;

export const ToggleTabs = styled(ToggleButtonGroup)`
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 0.5rem;
  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.palette.border.light}`};
  .MuiToggleButton-root {
    color: ${({ theme }) => `1px solid ${theme.palette.background.paper}`};
    border: none;
    padding: 8px 16px;
    text-transform: none;
    font-size: 14px;
    font-weight: 500;

    margin-right: 0.6rem;
    background-color: ${({ theme }) =>
      `1px solid ${theme.palette.primary.dark}`};

    &.Mui-selected {
      background-color: ${({ theme }) => ` ${theme.palette.primary.dark}`};
      border-radius: 8px !important;
      color: white;
      border-color: ${({ theme }) => ` ${theme.palette.primary.dark}`};

      &:hover {
        background-color: ${({ theme }) => ` ${theme.palette.primary.dark}`};
      }
    }

    &:hover {
      // background-color: ${({ theme }) => ` ${theme.palette.primary.main}`};
      border-radius: 8px !important;
    }
  }
`;

export const CustomChipStyle = {
  backgroundColor: themeConfig.palette.background.light,
  color: themeConfig.palette.text.secondary,
  fontSize: '1rem',
  fontWeight: '500',
  borderRadius: '8px',
  border: `1px solid ${themeConfig.palette.border.light}`, // Matching border color
  padding: '1px',
  '& .MuiChip-deleteIcon': {
    transform: 'scale(0.7)',
    color: themeConfig.palette.text.primary,
    '&:hover': {
      color: themeConfig.palette.text.secondary // Slightly darker teal on hover
    }
  },
  '&:hover': {
    backgroundColor: themeConfig.palette.background.dark // Lighter teal on hover
  }
};
