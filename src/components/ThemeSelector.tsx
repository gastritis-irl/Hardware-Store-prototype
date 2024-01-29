import React, { useEffect } from 'react';
import { ListItemIcon, MenuItem, Select, SelectChangeEvent, Theme, Typography } from '@mui/material';
import ClownIcon from '@mui/icons-material/EmojiEmotions';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PaletteIcon from '@mui/icons-material/Palette';
import { customTheme, darkTheme, lightTheme } from '../util/Theme';
import { useAuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

type ThemeSelectorProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  const { authState } = useAuthContext();
  const {
    useUserThemeMutation: { mutate },
  } = useAuth();

  useEffect(() => {
    switch (theme) {
      case lightTheme:
        authState.themeId = 1;
        mutate(1);
        break;
      case darkTheme:
        authState.themeId = 2;
        mutate(2);
        break;
      case customTheme:
        authState.themeId = 3;
        mutate(3);
        break;
      default:
        authState.themeId = 1;
        mutate(1);
    }
  }, [theme]);
  const getThemeName = () => {
    if (theme === lightTheme) return 'light';
    if (theme === darkTheme) return 'dark';
    if (theme === customTheme) return 'custom';
    return '';
  };
  const handleChange = (event: SelectChangeEvent) => {
    switch (event.target.value) {
      case 'light':
        theme = lightTheme;
        setTheme(theme);
        break;
      case 'dark':
        theme = darkTheme;
        setTheme(theme);
        break;
      case 'custom':
        theme = customTheme;
        setTheme(theme);
        break;
      default:
        theme = lightTheme;
        setTheme(theme);
    }
  };

  return (
    <Select
      value={getThemeName()}
      onChange={handleChange}
      IconComponent={PaletteIcon}
      MenuProps={{ disableScrollLock: true }}
      variant="standard"
      sx={{
        '& .MuiSelect-root': {
          color: theme.palette.primary.main,
          transition: 'ease-out 0.8s',
        },
        '& .MuiSelect-icon': {
          color: theme.palette.primary.main,
          transition: 'ease-out 0.8s',
        },
        '& .MuiSelect-select': {
          color: theme.palette.primary.main,
          transition: 'ease-out 0.8s',
        },
        width: '150px',
        borderRadius: '1rem',
        marginY: '0.2rem',
      }}
    >
      <MenuItem value="light">
        <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}>
          <WbSunnyIcon
            fontSize="small"
            sx={{
              color: 'orange',
            }}
          />
        </ListItemIcon>
        <Typography variant="inherit" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          Light Theme
        </Typography>
      </MenuItem>
      <MenuItem value="dark">
        <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}>
          <NightsStayIcon
            fontSize="small"
            sx={{
              color: getThemeName() === 'light' ? 'grey' : 'white',
            }}
          />
        </ListItemIcon>
        <Typography variant="inherit" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          Dark Theme
        </Typography>
      </MenuItem>
      <MenuItem value="custom">
        <ListItemIcon sx={{ minWidth: 'auto', marginRight: '8px' }}>
          <ClownIcon
            fontSize="small"
            sx={{
              color: 'pink',
            }}
          />
        </ListItemIcon>
        <Typography variant="inherit" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          Joker Theme
        </Typography>
      </MenuItem>
    </Select>
  );
}

export default ThemeSelector;
