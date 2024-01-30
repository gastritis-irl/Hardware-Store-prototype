import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFetchUser } from '../hooks/user/useUsers';
import { useUpdateUser } from '../hooks/user/useUpdateUser';
import { User } from '../types/User';
import { useAdminOrOwnerGuard } from '../hooks/guard/useAdminOrOwnerGuard';
import { Transform } from '@mui/icons-material';

function UserEditPage() {
  const idString = useParams().id as string;
  const id = Number(idString);

  useAdminOrOwnerGuard(id);
  const { data: fetchedUserData } = useFetchUser(id);
  const [userData, setUserData] = useState<User>({
    id: 0,
    email: '',
    createdAt: '',
    updatedAt: '',
    role: '',
  });
  const updateUserMutation = useUpdateUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateUserMutation.mutate({ id, user: userData });
    navigate(`/profile/${id}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '1rem',
        justifyContent: 'center',
        height: '30vh',
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Edit your profile
      </Typography>
      <TextField
        required
        id="email"
        name="email"
        label="Email"
        fullWidth
        value={userData.email}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
        <Transform color="primary" />
        <Typography variant="h6" gutterBottom color="primary">
          Update
        </Typography>
      </Button>
    </Box>
  );
}

export default UserEditPage;
