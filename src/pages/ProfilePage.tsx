import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useHardwarePartsByUser } from '../hooks/useUsers';
import { HardwarePart } from '../types/HardwarePart';

function ProfilePage() {
  const { authState } = useAuthContext();
  const { data: userHardwareParts } = useHardwarePartsByUser(authState.id);

  if (authState.id === -1) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <LockOpenIcon color="primary" style={{ fontSize: 60 }} />
          <Typography variant="h4" component="div" align="center" color="primary">
            Please login to view your profile
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Avatar
          alt="User profile picture"
          src="/alt3.png"
          sx={{ width: 128, height: 128, margin: 'auto', marginTop: '1rem' }}
        />
        <Typography variant="h4" component="div" align="center" color="secondary">
          {authState.email}
        </Typography>
        <Typography variant="h6" color="secondary" align="center">
          Role: {authState.role}
        </Typography>
        <Typography variant="h6" color="secondary" align="center">
          User ID: {authState.id}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userHardwareParts?.map((part: HardwarePart) => (
          <Grid item xs={12} sm={6} md={4} key={part.id}>
            <Card sx={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia
                component="img"
                height="140"
                image={Math.random() < 0.5 ? '/alt1.png' : '/alt2.png'}
                alt={part.name}
              />
              <CardContent>
                <Typography variant="h5" color="secondary">
                  {part.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {part.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={RouterLink} to={`/detail/${part.id}`}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProfilePage;
