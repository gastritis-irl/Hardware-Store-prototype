import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

type ThemeSwitcherProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

function ThemeSwitcher({ darkMode, toggleDarkMode }: ThemeSwitcherProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<WbSunnyIcon sx={{ color: '#ff6d00' }} />}
            checkedIcon={<NightsStayIcon sx={{ color: '#fff' }} />}
            name="themeSwitch"
            sx={{
              transition: 'ease-out 0.8s',
              '& .MuiSwitch-thumb': {
                backgroundColor: darkMode ? '#ff6d00' : '#f4f4f4',
              },
              '& .MuiSwitch-track': {
                backgroundColor: darkMode ? '#424242' : '#bdbdbd',
              },
            }}
          />
        }
        sx={{ color: darkMode ? '#69959e' : '#2329a2' }}
        label={darkMode ? 'Dark Mode' : 'Light Mode'}
      />
    </Box>
  );
}

export default ThemeSwitcher;
