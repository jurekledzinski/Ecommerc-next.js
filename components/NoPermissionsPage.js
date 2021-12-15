import { useRouter } from 'next/router';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  btnNoPermissionStyles,
  boxNoPermissionWrapperStyles,
  SectionChangePassword,
  titleNoPermissionStyles,
} from '../muistyles/ChangePasswordForm.styles';

const NoPermissionsPage = () => {
  const router = useRouter();
  return (
    <SectionChangePassword>
      <Box sx={boxNoPermissionWrapperStyles}>
        <Typography
          id="transition-modal-title"
          variant="h3"
          sx={titleNoPermissionStyles}
        >
          No permissions to see this page!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/')}
          sx={btnNoPermissionStyles}
        >
          Back to homepage
        </Button>
      </Box>
    </SectionChangePassword>
  );
};

export default NoPermissionsPage;
