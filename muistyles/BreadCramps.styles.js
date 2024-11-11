import { styled } from '@mui/material/styles';

export const BreadLink = styled('span')(
  ({ breadcrampindex, index, theme }) => ({
    color:
      breadcrampindex === index
        ? theme.palette.primary.light
        : theme.palette.text.primary,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1.4rem',
    transition: '0.2s ease',
    ':hover': { color: '#e5e5e5' },
  })
);

export const breadCrampsWrapperStyles = {
  paddingLeft: { xs: '12px', sm: '24px' },
  marginTop: (theme) => theme.spacing(3),
};
