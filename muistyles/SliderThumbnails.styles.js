import { styled } from '@mui/material/styles';

export const WrapperSlideMainThumbNails = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&::after': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'transparent',
    fontSize: '80px',
    transformOrigin: 'center',
    transition: '0.3s linear',
    opacity: '0',
  },
  '&:hover::after': {
    content: '"\\f1ee"',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#bababa',
    fontSize: '5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'material-design-iconic-font',
    transition: '0.3s linear',
    opacity: '1',
  },
}));

export const WrapperSliderThumbNails = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const mainSliderOptions = {
  type: 'fade',
  fixedHeight: '300px',
  pagination: false,
  arrows: false,
  classes: { slide: 'splide__slide your-class-arrows' },
};

export const thumbsOptions = {
  rewind: true,
  fixedWidth: '33.2%',
  fixedHeight: '100px',
  isNavigation: true,
  focus: 'center',
  focus: 'center',
  pagination: false,
  dragMinThreshold: {
    mouse: 4,
    touch: 10,
  },
  breakpoints: {
    600: {
      fixedWidth: '33.2%',
      fixedHeight: '100px',
    },
  },
};

export const WrapperSliderModalStyles = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    height: 'initial',
  },
  [theme.breakpoints.up('sm')]: {
    width: '500px',
    height: 'initial',
  },
}));

export const boxOverlayImageStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: (theme) => theme.palette.background.paper,
};
