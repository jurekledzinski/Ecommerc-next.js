import React from 'react';

import {
  CirclePath,
  Loader,
  LoaderCircle,
} from '../muistyles/CircleSpinner.styles';

const CircleSpinner = ({ radius }) => {
  return (
    <Loader className="loader">
      <LoaderCircle className="loader__circle">
        <CirclePath
          className="loader__path"
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </LoaderCircle>
    </Loader>
  );
};

export default CircleSpinner;
