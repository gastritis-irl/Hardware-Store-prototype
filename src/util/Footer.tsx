import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.secondary.contrastText,
        mt: 5,
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body1" color="inherit">
            © 2023 Hardware Store
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '& > :not(style)': { ml: 2 },
            }}
          >
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              Home
            </Link>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              About
            </Link>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
