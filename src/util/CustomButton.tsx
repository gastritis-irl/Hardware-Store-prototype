import React from 'react';
import { Button, ButtonProps } from '@mui/material';

type CustomButtonProps = ButtonProps & { children: React.ReactNode };

function CustomButton({ children, ...props }: CustomButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.dark,
        },
      }}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
