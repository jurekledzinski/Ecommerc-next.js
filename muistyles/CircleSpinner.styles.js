import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const rotate = keyframes`
100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`;

export const Loader = styled('div')(({ theme }) => ({
  width: '100px',
  height: '100px',
}));

export const LoaderCircle = styled('svg')(({ theme }) => ({
  width: '100px',
  height: '100px',
  animation: `${rotate} 2s linear infinite`,
}));

export const CirclePath = styled('circle')(({ theme }) => ({
  strokeDasharray: '1, 200',
  strokeDashoffset: '0',
  animation: `${dash} 1.5s ease-in-out infinite`,
  strokeLinecap: 'round',
  stroke: theme.palette.text.primary,
}));
