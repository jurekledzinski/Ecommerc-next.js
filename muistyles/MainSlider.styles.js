import { styled } from '@mui/material/styles';

export const WrapperSlider = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '10px',
  backgroundColor: theme.palette.background.paper,
}));

export const Image = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  [theme.breakpoints.up('xs')]: {
    maxHeight: '70%',
  },
  [theme.breakpoints.up('sm')]: {
    maxHeight: '100%',
  },
}));

export const WrapperContent = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

export const LeftBoxSlide = styled('div')(({ theme }) => ({
  maxHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    order: 1,
    height: '20%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '50%',
    order: 'initial',
    height: 'initial',
  },
}));

export const RightBoxSlide = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    height: '60%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '50%',
    maxHeight: '100%',
    height: 'initial',
  },
}));

export const ContentLeftBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
  minHeight: '100px',
}));

export const optionsSlider = {
  autoplay: true,
  arrows: 'slider',
  breakpoints: {
    280: {
      fixedHeight: '420px',
    },
    1600: {
      fixedHeight: '350px',
    },
  },
  heightRatio: 0.4,
  resetProgress: false,
  speed: 1000,
  type: 'loop',
  width: '1200px',
  classes: {
    arrow: 'splide__arrow custom-arrow',
    page: 'splide__pagination__page cutsom-button',
  },
};

export const titleSlideStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontSize: {
    xs: '1.6rem',
    sm: '2.4rem',
    md: '3rem',
    lg: '3.6rem',
  },
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 600,
};

export const subtitleSlideStyles = {
  margin: '5px 0 10px 0',
  color: (theme) => theme.palette.text.primary,
  fontSize: {
    xs: '1.1rem',
    sm: '1.6rem',
  },
  fontWeight: 300,
};

export const buttonSlideStyles = {
  width: { xs: '100%', sm: '100px' },
  padding: '8px',
};
