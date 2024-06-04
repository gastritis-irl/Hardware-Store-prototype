import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const CustomBackdrop = styled(Backdrop)(() => ({
  color: 'primary',
  zIndex: 9999,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
}));

function CustomLoader() {
  return (
    <CustomBackdrop open>
      <CircularProgress size={80} thickness={4.5} />
    </CustomBackdrop>
  );
}

export default CustomLoader;
