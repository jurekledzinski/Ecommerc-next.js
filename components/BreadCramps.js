import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  BreadLink,
  breadCrampsWrapperStyles,
} from '../muistyles/BreadCramps.styles';

const BreadCramps = ({ endpoints }) => {
  const [breadCrampIndex, setBreadCrampIndex] = useState(null);

  useEffect(() => {
    setBreadCrampIndex(endpoints.length - 1);
  }, [endpoints]);

  return (
    <Box sx={breadCrampsWrapperStyles}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {endpoints.map((item, index) => (
          <Link href={item.url} key={index}>
            <BreadLink
              breadcrampindex={breadCrampIndex}
              index={index}
              onClick={() => setBreadCrampIndex(index)}
            >
              {item.name}
            </BreadLink>
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCramps;
