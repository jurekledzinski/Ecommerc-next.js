import { styled } from '@mui/material/styles';

export const mainSliderOptions = {
  type: 'fade',
  fixedHeight: '300px',
  pagination: false,
  arrows: false,
  cover: true,
};

export const thumbsOptions = {
  rewind: true,
  fixedWidth: '33.2%',
  fixedHeight: '100px',
  isNavigation: true,
  focus: 'center',
  focus: 'center',
  pagination: false,
  cover: true,
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
