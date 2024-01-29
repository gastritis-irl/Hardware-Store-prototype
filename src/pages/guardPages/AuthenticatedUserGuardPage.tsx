import React from 'react';
import { Box, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';

function AuthenticatedUserGuardPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <Lock color="primary" style={{ fontSize: 60 }} />
      <Typography variant="h4">This page is only accessible to authenticated users.</Typography>
    </Box>
  );
}

export default AuthenticatedUserGuardPage;
