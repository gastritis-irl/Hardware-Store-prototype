import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: '1rem',
        }}
      >
        <Typography variant="h2" color="primary">
          Welcome to Hardware Store
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Your one-stop shop for all your hardware needs
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Get Started
        </Button>
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center', pb: 2 }}>
          <Typography variant="body2">Contact us: email@example.com | +1 234 567 890</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
