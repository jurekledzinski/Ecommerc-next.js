import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  btn500PageStyles,
  boxWrapper500PageStyles,
  Section500Page,
  title500PageStyles,
  titleStatusCode500PageStyles,
} from '../muistyles/500.styles';

const ServerErrorPage = ({ statusCode, title }) => {
  const router = useRouter();

  useEffect(() => {
    window.onload = function () {
      Cookies.set('_ls', '1');
    };
  }, []);

  return (
    <Section500Page>
      <Box sx={boxWrapper500PageStyles}>
        <Typography variant="h3" sx={title500PageStyles}>
          {title}
        </Typography>
        <Typography variant="h3" sx={titleStatusCode500PageStyles}>
          {statusCode}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={btn500PageStyles}
          onClick={() => router.push('/')}
        >
          Back to homepage
        </Button>
      </Box>
    </Section500Page>
  );
};

export default ServerErrorPage;
