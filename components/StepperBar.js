import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';

import {
  boxStepperStyles,
  QontoConnector,
  QontoStepIconRoot,
} from '../muistyles/StepperBar.styles';

import { ADD_STEP_STEPPER } from '../utils/constants';

import { StoreContext } from '../utils/store';

const steps = ['Login', 'Address', 'Place Order', 'Confirm'];

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const StepperBar = () => {
  const { dispatchStepper, stateStepper } = useContext(StoreContext);
  const [completed, setCompleted] = useState({});
  const router = useRouter();

  const handleStep = (step) => () => {
    if (step !== Number(Cookies.get('step'))) router.back();
    Cookies.set('step', JSON.stringify(step));
    dispatchStepper({
      type: ADD_STEP_STEPPER,
      data: Cookies.get('step'),
    });
  };

  return (
    <Box sx={boxStepperStyles}>
      <Stepper
        alternativeLabel
        activeStep={Number(stateStepper)}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperBar;
