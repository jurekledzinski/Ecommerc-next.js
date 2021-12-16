import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const checkmark = keyframes`
0% {
    stroke-dashoffset: 100px
}
100% {
    stroke-dashoffset: 0px
}
`;

const checkmarkCircle = keyframes`
0% {
    stroke-dashoffset: 480px 
}
100% {
    stroke-dashoffset: 960px
}
`;

const coloredCircle = keyframes`
0% {
    opacity:0
}
100% {
    opacity:100
}
`;

const fadeDots = keyframes`
from{
    opacity: 0;
  }
to{
    opacity: 1;
  }
`;

export const SectionSuccessPage = styled('section')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
  padding: '20px',
}));

export const DivSuccess = styled('div')(({ theme }) => ({
  textAlign: 'center',
}));

export const DivIconSuccess = styled('section')(({ theme }) => ({
  '& .polyline': {
    WebkitAnimation: `${checkmark} 0.25s ease-in-out 0.7s backwards`,
    animation: `${checkmark} 0.25s ease-in-out 0.7s backwards`,
  },
  '& .circle': {
    WebkitAnimation: `${checkmarkCircle} 0.6s ease-in-out backwards`,
    animation: `${checkmarkCircle} 0.6s ease-in-out backwards`,
  },
  '& #colored': {
    WebkitAnimation: `${coloredCircle} 0.6s ease-in-out 0.7s backwards`,
    animation: `${checkmarkCircle} 0.6s ease-in-out 0.7s backwards`,
  },
}));

export const GElementSvg = styled('g')(({ theme }) => ({
  fill: 'none',
  stroke: '#2ecc40',
  strokeWidth: '7',
}));

export const CircleElementOne = styled('circle')(({ theme }) => ({
  strokeDasharray: '480px 480px',
  strokeDashoffset: '960px',
}));

export const CircleElementTwo = styled('circle')(({ theme }) => ({
  fill: 'transparent',
  strokeDasharray: '480px 480px',
  strokeDashoffset: '960px',
}));

export const PolylineElement = styled('polyline')(({ theme }) => ({
  strokeDasharray: '100px 100px',
  strokeDashoffset: '200px',
  stroke: '#2ecc40',
  strokeWidth: '7',
}));

export const titleSuccesPageStyles = {
  marginTop: '10px',
  color: (theme) => theme.palette.text.primary,
  textAlign: 'center',
};

export const subtitleSuccesPageStyles = {
  marginTop: '10px',
  color: (theme) => theme.palette.text.primary,
  fontSize: '1.4rem',
  textAlign: 'center',
};

export const rediretSuccessBtn = {
  display: 'block',
  margin: '20px auto 0 auto',
};

export const successOrderPleaseWaitStyles = {
  marginTop: '20px',
  color: (theme) => theme.palette.text.primary,
  fontSize: '1.4rem',
  textAlign: 'center',
  '& > .success_dot:nth-of-type(1)': {
    animation: `${fadeDots} 1s 0.2s forwards linear infinite`,
  },
  '& > .success_dot:nth-of-type(2)': {
    animation: `${fadeDots} 1s 0.4s forwards linear infinite`,
  },
  '& > .success_dot:nth-of-type(3)': {
    animation: `${fadeDots} 1s 0.6s forwards linear infinite`,
  },
};
