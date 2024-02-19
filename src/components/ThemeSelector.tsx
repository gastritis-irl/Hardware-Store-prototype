import React, { useEffect } from 'react';
import { ListItemIcon, MenuItem, Select, SelectChangeEvent, Theme, Tooltip, Typography } from '@mui/material';
import ClownIcon from '@mui/icons-material/EmojiEmotions';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PaletteIcon from '@mui/icons-material/Palette';
import { customTheme, darkTheme, lightTheme } from '../util/Theme';
import { useAuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/user/useAuth';

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
    <Tooltip title="Color theme" arrow placement="top">
      <Select
        onChange={handleChange}
        IconComponent={PaletteIcon}
        MenuProps={{ disableScrollLock: true }}
        variant="standard"
        disableUnderline
        defaultValue="light"
        renderValue={() => undefined}
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
          '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            color: 'secondary.main',
            transform: 'scale(1.2)',
            transition: 'transform 0.3s ease-in-out',
          },
          flexDirection: 'row',
          borderRadius: '1rem',
          marginY: '0.2rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MenuItem
          value="light"
          sx={{
            flexDirection: 'row',
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
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
        <MenuItem
          value="dark"
          sx={{
            flexDirection: 'row',
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
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
        <MenuItem
          value="custom"
          sx={{
            flexDirection: 'row',
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
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
    </Tooltip>
  );
}

export default ThemeSelector;
