import React from 'react';
import { Box, Switch, Tooltip } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

type ThemeSwitcherProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

function ThemeSwitcher({ darkMode, toggleDarkMode }: ThemeSwitcherProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
        <Box>
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
        </Box>
      </Tooltip>
    </Box>
  );
}

export default ThemeSwitcher;
