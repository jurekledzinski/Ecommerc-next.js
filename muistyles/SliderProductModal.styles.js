import { styled } from '@mui/material/styles';

export const optionsSliderModal = {
  perPage: 1,
  width: 500,
  heightRatio: 0.8,
  type: 'fade',
  pagination: false,
  breakpoints: {
    319: {
      heightRatio: 1,
    },
    320: {
      heightRatio: 0.75,
    },
    414: {
      heightRatio: 1,
    },
    600: {
      heightRatio: 0.65,
    },
    653: {
      heightRatio: 0.55,
    },
    768: {
      heightRatio: 0.65,
    },
    812: {
      heightRatio: 0.5,
    },
  },
};

export const ImageElement = styled('img')(({ theme }) => ({
  maxHeight: '100%',
  maxWidth: '100%',
  display: 'block',
  margin: '0 auto',
}));
