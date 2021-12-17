import { useRouter } from 'next/router';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  CircleElementOne,
  CircleElementTwo,
  DivIconSuccess,
  DivSuccess,
  GElementSvg,
  PolylineElement,
  rediretSuccessBtn,
  SectionSuccessPage,
  subtitleSuccesPageStyles,
  successOrderPleaseWaitStyles,
  titleSuccesPageStyles,
} from '../muistyles/SuccessPaidOrder.styles';

const SuccessPaidOrder = ({ emailReceive }) => {
  const router = useRouter();

  const handleBackHomePage = () => {
    router.push('/');
  };

  return (
    <SectionSuccessPage>
      <Box>
        <DivSuccess className="animation-ctn">
          <DivIconSuccess className="icon icon--order-success svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="154px"
              height="154px"
            >
              <GElementSvg>
                <CircleElementOne
                  className="circle"
                  cx="75"
                  cy="75"
                  r="55"
                ></CircleElementOne>
                <CircleElementTwo
                  id="colored"
                  cx="75"
                  cy="75"
                  r="55"
                ></CircleElementTwo>
                <PolylineElement
                  className="polyline"
                  points="43.5,77.8 63.7,97.9 112.2,49.4"
                />
              </GElementSvg>
            </svg>
          </DivIconSuccess>
        </DivSuccess>
        <Typography
          id="transition-modal-title"
          variant="h4"
          sx={titleSuccesPageStyles}
        >
          Thank you for your purchase in our shop.
        </Typography>
        <Typography
          id="transition-modal-title"
          variant="body1"
          sx={subtitleSuccesPageStyles}
        >
          Soon you should receive confirmation email with order details, please
          keep it in case of any situation.
        </Typography>
        {emailReceive ? (
          <Button
            variant="outlined"
            size="large"
            sx={rediretSuccessBtn}
            type="submit"
            onClick={handleBackHomePage}
          >
            Back to home page
          </Button>
        ) : (
          <Typography variant="body1" sx={successOrderPleaseWaitStyles}>
            Please wait <span className="success_dot">.</span>
            <span className="success_dot">.</span>
            <span className="success_dot">.</span>
          </Typography>
        )}
      </Box>
    </SectionSuccessPage>
  );
};

export default SuccessPaidOrder;
