import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate, useParams } from 'react-router-dom';
import { Delete, Transform } from '@mui/icons-material';
import { useAuthContext } from '../../context/AuthContext';
import { useFilterSort } from '../../hooks/useFilterSort';
import ProductsGrid from '../../components/ProductsGrid';
import { useFetchUser } from '../../hooks/user/useUsers';
import { User } from '../../types/User';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';

function ProfilePage() {
  const idString = useParams().id as string;
  const id = Number(idString);
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  const { data: fetchedUserData } = useFetchUser(id);
  const [userData, setUserData] = useState<User>({
    id: 0,
    email: '',
    createdAt: '',
    updatedAt: '',
    role: '',
  });

  const { mutate } = useDeleteUser();

  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData]);

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  const isAdmin = authState.role === 'ADMIN';
  const isOwner = authState.id === id;

  const { orderBy, direction, minPrice, maxPrice, textSearch } = useFilterSort();

  if (authState.id === -1) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '70vh',
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
    <Grid container sx={{ marginTop: '1rem', flexDirection: 'row' }}>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          marginTop: '1rem',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Grid item xs={12} md={4} flex={1} sx={{ margin: 'auto' }}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              maxWidth: 350,
              minHeight: 300,
            }}
          >
            <Avatar alt="User profile picture" src="/alt3.png" sx={{ width: 128, height: 128, marginTop: '1rem' }} />
            <CardContent>
              <Typography variant="h3">{userData.email}</Typography>
              <Typography variant="body1" color="text.secondary">
                Role: {userData.role}
              </Typography>
              <Grid
                container
                sx={{
                  marginTop: '1rem',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '1rem',
                  justifyContent: 'space-between',
                  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isOwner}
                  onClick={() => {
                    navigate(`/user/${userData.id}`);
                  }}
                  sx={{
                    width: '20px',
                    marginTop: '1rem',
                    paddingX: '4rem',
                    borderRadius: '1rem',
                    '&:hover': {
                      color: 'secondary.main',
                      transform: 'scale(1.2)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                    gap: '0.5rem',
                    flexDirection: 'row',
                  }}
                >
                  <Transform color="inherit" />
                  <Typography fontSize={12} color="inherit">
                    Edit Profile
                  </Typography>
                </Button>
                <Button
                  onClick={handleDelete}
                  color="error"
                  disabled={!isAdmin}
                  sx={{
                    width: '30px',
                    marginTop: '1rem',
                    paddingX: '4rem',
                    borderRadius: '1rem',
                    '&:hover': {
                      transform: 'scale(1.2)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                    gap: '0.5rem',
                    flexDirection: 'row',
                  }}
                >
                  <Delete color="inherit" />
                  <Typography fontSize={12} color="inherit">
                    Delete Profile
                  </Typography>
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <ProductsGrid
          userId={authState.id}
          minPrice={minPrice}
          maxPrice={maxPrice}
          direction={direction}
          orderBy={orderBy}
          textSearch={textSearch}
        />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
