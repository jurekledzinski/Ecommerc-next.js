import { useRouter } from 'next/router';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  CircleCancelElementOne,
  CircleCancelElementTwo,
  DivIconCancel,
  DivCancel,
  GElementCancelSvg,
  PolylineCancelElement,
  rediretCancelBtn,
  SectionCancelPage,
  titleCancelPageStyles,
} from '../muistyles/CancelPaidOrder.styles';

const CancelPaidOrder = () => {
  const router = useRouter();

  const handleBackHomePage = () => {
    router.push('/');
  };

  return (
    <SectionCancelPage>
      <Box>
        <DivCancel className="animation-ctn">
          <DivIconCancel className="icon icon--order-success svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="154px"
              height="154px"
            >
              <GElementCancelSvg>
                <CircleCancelElementOne
                  className="circle"
                  cx="75"
                  cy="75"
                  r="55"
                ></CircleCancelElementOne>
                <CircleCancelElementTwo
                  id="colored"
                  cx="75"
                  cy="75"
                  r="55"
                ></CircleCancelElementTwo>
                <PolylineCancelElement
                  className="polyline"
                  points="43.5,77.8  112.2,77.8 "
                />
              </GElementCancelSvg>
            </svg>
          </DivIconCancel>
        </DivCancel>
        <Typography
          id="transition-modal-title"
          variant="h4"
          sx={titleCancelPageStyles}
        >
          Your order has been canceled successfully
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={rediretCancelBtn}
          type="submit"
          onClick={handleBackHomePage}
        >
          Back to home page
        </Button>
      </Box>
    </SectionCancelPage>
  );
};

export default CancelPaidOrder;
