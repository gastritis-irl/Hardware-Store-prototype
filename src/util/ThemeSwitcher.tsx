import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type ThemeSwitcherProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

function ThemeSwitcher({ darkMode, toggleDarkMode }: ThemeSwitcherProps) {
  return <IconButton onClick={toggleDarkMode}>{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>;
}

export default ThemeSwitcher;
