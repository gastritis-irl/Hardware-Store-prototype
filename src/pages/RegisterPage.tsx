import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useRegister } from '../hooks/useAuth';
import { useSnackbar } from '../context/SnackbarContext';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegister();
  const snackbar = useSnackbar();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerMutation.mutate({ email, password });

    if (!snackbar) {
      return;
    }
    snackbar.openSnackbar('User created successfully!', 'success');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </Box>
  );
}

export default RegisterPage;
