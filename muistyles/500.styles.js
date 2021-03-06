import { styled } from '@mui/material/styles';

export const Section500Page = styled('section')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('xs')]: {
    minHeight: '100vh',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '100vh',
    padding: '20px',
  },
  backgroundColor: theme.palette.background.paper,
}));

export const title500PageStyles = {
  backgroundImage: `url("https://ik.imagekit.io/mdklwracd5rti/Shoppy/Others/Night-sky_qbg3LjX354.jpg")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '10px',
  textAlign: 'center',
  fontSize: { xs: '3rem', sm: '5.4rem' },
  fontFamily: 'Oswald, sans-serif',
  fontWeight: '600',
};

export const titleStatusCode500PageStyles = {
  color: (theme) => theme.palette.text.primary,
  textAlign: 'center',
  fontSize: { xs: '2rem', sm: '3.4rem' },
  fontFamily: 'Oswald, sans-serif',
  fontWeight: '600',
};

export const boxWrapper500PageStyles = {
  width: { xs: '95%', sm: '400px' },
};

export const btn500PageStyles = {
  display: 'block',
  margin: '20px auto 0px auto',
};
