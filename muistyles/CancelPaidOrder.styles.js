import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const checkmarkCancel = keyframes`
0% {
    stroke-dashoffset: 100px
}
100% {
    stroke-dashoffset: 0px
}
`;

const checkmarkCircleCancel = keyframes`
0% {
    stroke-dashoffset: 480px 
}
100% {
    stroke-dashoffset: 960px
}
`;

const coloredCircleCancel = keyframes`
0% {
    opacity:0
}
100% {
    opacity:100
}
`;

export const CircleCancelElementOne = styled('circle')(({ theme }) => ({
  strokeDasharray: '480px 480px',
  strokeDashoffset: '960px',
}));

export const CircleCancelElementTwo = styled('circle')(({ theme }) => ({
  fill: 'transparent',
  strokeDasharray: '480px 480px',
  strokeDashoffset: '960px',
}));

export const DivIconCancel = styled('section')(({ theme }) => ({
  '& .polyline': {
    WebkitAnimation: `${checkmarkCancel} 0.25s ease-in-out 0.7s backwards`,
    animation: `${checkmarkCancel} 0.25s ease-in-out 0.7s backwards`,
  },
  '& .circle': {
    WebkitAnimation: `${checkmarkCircleCancel} 0.6s ease-in-out backwards`,
    animation: `${checkmarkCircleCancel} 0.6s ease-in-out backwards`,
  },
  '& #colored': {
    WebkitAnimation: `${coloredCircleCancel} 0.6s ease-in-out 0.7s backwards`,
    animation: `${checkmarkCircleCancel} 0.6s ease-in-out 0.7s backwards`,
  },
}));

export const DivCancel = styled('div')(({ theme }) => ({
  textAlign: 'center',
}));

export const GElementCancelSvg = styled('g')(({ theme }) => ({
  fill: 'none',
  stroke: '#FF4136',
  strokeWidth: '7',
}));

export const PolylineCancelElement = styled('polyline')(({ theme }) => ({
  strokeDasharray: '100px 100px',
  strokeDashoffset: '200px',
  stroke: '#FF4136',
  strokeWidth: '7',
}));

export const rediretCancelBtn = {
  display: 'block',
  margin: '20px auto 0 auto',
};

export const SectionCancelPage = styled('section')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
  padding: '20px',
}));

export const titleCancelPageStyles = {
  marginTop: '10px',
  color: (theme) => theme.palette.text.primary,
  textAlign: 'center',
};
