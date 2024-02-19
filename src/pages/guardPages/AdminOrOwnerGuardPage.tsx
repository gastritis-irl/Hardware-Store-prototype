import React from 'react';
import { Box, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';

function AdminOrOwnerGuardPage() {
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
      <Typography variant="h4" color="primary" sx={{ marginBottom: '1rem' }}>
        This page is only accessible to the admin or the owner.
      </Typography>
    </Box>
  );
}

export default AdminOrOwnerGuardPage;
