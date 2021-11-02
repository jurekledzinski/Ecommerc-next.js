import { styled } from '@mui/material/styles';

export const BreadLink = styled('a')(({ breadcrampindex, index, theme }) => ({
  color:
    breadcrampindex === index
      ? theme.palette.primary.light
      : theme.palette.text.primary,
  textDecoration: 'none',
  cursor: 'pointer',
  [theme.breakpoints.up('xs')]: {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.6rem',
  },
  transition: '0.2s ease',
  ':hover': { color: '#e5e5e5' },
}));

export const breadCrampsWrapperStyles = {
  paddingLeft: { xs: '12px', sm: '24px' },
  marginTop: (theme) => theme.spacing(3),
};
