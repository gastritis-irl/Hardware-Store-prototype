import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, List, ListItem, ListItemText } from '@mui/material';
import { useHardwareParts } from '../hooks/useHardwareParts';
import { HardwarePart } from '../types/HardwarePart';

function HardwareListPage() {
  const { data: hardwareParts, isLoading, isError } = useHardwareParts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching data</div>;
  }

  return (
    <List>
      {hardwareParts?.map((part: HardwarePart) => (
        <ListItem key={part.id}>
          <ListItemText primary={part.name} secondary={part.description} />
          <Link component={RouterLink} to={`/detail/${part.id}`}>
            View Details
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default HardwareListPage;
