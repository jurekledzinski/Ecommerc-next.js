import React from 'react';
import Box from '@mui/material/Box';
import Check from '@mui/icons-material/Check';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import {
  boxStepperStyles,
  QontoConnector,
  QontoStepIconRoot,
} from '../muistyles/StepperBar.styles';

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
  return (
    <Box sx={boxStepperStyles}>
      <Stepper alternativeLabel activeStep={4} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperBar;
