import { useRouter } from 'next/router';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { SectionChangePassword } from '../muistyles/ChangePasswordForm.styles';

const NoPermissionsPage = () => {
  const router = useRouter();
  return (
    <SectionChangePassword>
      <Box
        sx={{
          width: { xs: '80%', sm: 'initial' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          id="transition-modal-title"
          variant="h3"
          sx={{
            maxWidth: { xs: '95%', sm: 'initial' },
            color: (theme) => theme.palette.text.primary,
            fontSize: {
              xs: '14px',
              sm: '24px',
            },
            textAlign: { xs: 'center', sm: 'initial' },
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 300,
            fontFamily: 'Oswald, sans-serif',
          }}
        >
          No permissions to see this page!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/')}
          sx={{
            minWidth: { xs: '95%', sm: 'initial' },
            maxWidth: { xs: 'initial', sm: '150px' },
            marginTop: '20px',
          }}
        >
          Back to homepage
        </Button>
      </Box>
    </SectionChangePassword>
  );
};

export default NoPermissionsPage;
