import { styled } from '@mui/material/styles';

export const TableWrapper = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '4px',
}));

export const TrTable = styled('tr')(({ theme }) => ({
  lineHeight: '2',
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.tablerow,
  },
}));

export const TdTable = styled('td')(({ theme }) => ({
  padding: '8px',
  borderTop: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  lineHeight: '20px',
  textAlign: 'left',
  verticalAlign: 'top',
  fontSize: '1.3rem',
  '&:first-of-type': {
    width: '120px',
  },
  '&.feature-name': {
    backgroundColor: '#42a5f5',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'Oswald, sans-serif',
  },
}));
