import { styled } from '@mui/material/styles';

export const SectionPaidOrdersUser = styled('section')(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.up('xs')]: {
    minHeight: 'calc(100vh - 90px)',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100vh - 139px)',
  },
}));
