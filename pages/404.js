import { useRouter } from 'next/router';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  btn404PageStyles,
  boxWrapper404PageStyles,
  Section404Page,
  title404PageStyles,
  titleStatusCode404PageStyles,
} from '../muistyles/404.styles';

const NotFoundPage = ({ statusCode, title }) => {
  const router = useRouter();

  return (
    <Section404Page>
      <Box sx={boxWrapper404PageStyles}>
        <Typography variant="h3" sx={title404PageStyles}>
          {title}
        </Typography>
        <Typography variant="h3" sx={titleStatusCode404PageStyles}>
          {statusCode}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={btn404PageStyles}
          onClick={() => router.push('/')}
        >
          Back to homepage
        </Button>
      </Box>
    </Section404Page>
  );
};

export default NotFoundPage;
